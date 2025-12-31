from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import Dict, Any, List
import asyncio
from api.schemas import (
    QueryRequest, MultiJurisdictionRequest, ExplainReasoningRequest,
    FeedbackRequest, NyayaResponse, MultiJurisdictionResponse,
    ExplainReasoningResponse, FeedbackResponse, TraceResponse
)
from api.dependencies import get_trace_id, validate_nonce, emit_query_received_event
from api.response_builder import ResponseBuilder
from sovereign_agents.jurisdiction_router_agent import JurisdictionRouterAgent
from sovereign_agents.legal_agent import LegalAgent
from sovereign_agents.constitutional_agent import ConstitutionalAgent
from jurisdiction_router.router import JurisdictionRouter
from rl_engine.feedback_api import FeedbackAPI
from provenance_chain.lineage_tracer import tracer
from provenance_chain.hash_chain_ledger import ledger
from provenance_chain.event_signer import signer

router = APIRouter(prefix="/nyaya", tags=["nyaya"])

# Initialize agents and components
jurisdiction_router_agent = JurisdictionRouterAgent()
jurisdiction_router = JurisdictionRouter()
feedback_api = FeedbackAPI()

# Agent instances for different jurisdictions
agents = {
    "IN": LegalAgent(agent_id="india_legal_agent", jurisdiction="India"),
    "UK": LegalAgent(agent_id="uk_legal_agent", jurisdiction="UK"),
    "UAE": LegalAgent(agent_id="uae_legal_agent", jurisdiction="UAE")
}

@router.post("/query", response_model=NyayaResponse)
async def query_legal(
    request: QueryRequest,
    trace_id: str = Depends(get_trace_id),
    nonce: str = Depends(validate_nonce),
    background_tasks: BackgroundTasks = None
):
    """Execute a single-jurisdiction legal query."""
    try:
        # Emit query received event
        background_tasks.add_task(
            emit_query_received_event,
            request.query,
            trace_id
        )

        # Step 1: Call JurisdictionRouterAgent
        routing_result = await jurisdiction_router_agent.process({
            "query": request.query,
            "jurisdiction_hint": request.jurisdiction_hint,
            "domain_hint": request.domain_hint
        })

        target_jurisdiction = routing_result["target_jurisdiction"]
        target_agent_id = routing_result["target_agent"]

        # Step 2: Route to appropriate LegalAgent
        if target_jurisdiction not in agents:
            raise HTTPException(
                status_code=400,
                detail=ResponseBuilder.build_error_response(
                    "JURISDICTION_NOT_SUPPORTED",
                    f"Jurisdiction {target_jurisdiction} not supported",
                    trace_id
                ).dict()
            )

        agent = agents[target_jurisdiction]
        agent_result = await agent.process({
            "query": request.query,
            "trace_id": trace_id
        })

        # Step 3: Collect confidence and build response
        confidence = agent_result.get("confidence", 0.5)
        domain = request.domain_hint or "general"
        legal_route = [jurisdiction_router_agent.agent_id, agent.agent_id]

        # Placeholder for provenance chain and reasoning trace
        provenance_chain = []
        reasoning_trace = {
            "routing_decision": routing_result,
            "agent_processing": agent_result
        }

        # Emit decision explained event
        background_tasks.add_task(
            _emit_decision_explained_event,
            trace_id,
            confidence,
            legal_route
        )

        return ResponseBuilder.build_nyaya_response(
            domain=domain,
            jurisdiction=target_jurisdiction,
            confidence=confidence,
            legal_route=legal_route,
            trace_id=trace_id,
            provenance_chain=provenance_chain,
            reasoning_trace=reasoning_trace
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=ResponseBuilder.build_error_response(
                "INTERNAL_ERROR",
                "An internal error occurred",
                trace_id
            ).dict()
        )

@router.post("/multi_jurisdiction", response_model=MultiJurisdictionResponse)
async def multi_jurisdiction_query(
    request: MultiJurisdictionRequest,
    trace_id: str = Depends(get_trace_id),
    nonce: str = Depends(validate_nonce),
    background_tasks: BackgroundTasks = None
):
    """Execute parallel legal analysis across multiple jurisdictions."""
    try:
        # Emit query received event
        background_tasks.add_task(
            emit_query_received_event,
            request.query,
            trace_id
        )

        comparative_analysis = {}
        confidences = []

        # Execute agents in parallel
        tasks = []
        for jurisdiction in request.jurisdictions:
            if jurisdiction.value not in agents:
                continue
            agent = agents[jurisdiction.value]
            task = agent.process({
                "query": request.query,
                "trace_id": f"{trace_id}_{jurisdiction.value.lower()}"
            })
            tasks.append((jurisdiction.value, task))

        # Wait for all results
        results = await asyncio.gather(*[task for _, task in tasks], return_exceptions=True)

        for i, (jurisdiction, _) in enumerate(tasks):
            result = results[i]
            if isinstance(result, Exception):
                # Handle agent failure gracefully
                confidence = 0.1
                legal_route = ["failed"]
                provenance_chain = []
                reasoning_trace = {"error": str(result)}
            else:
                confidence = result.get("confidence", 0.5)
                legal_route = [agents[jurisdiction].agent_id]
                provenance_chain = []
                reasoning_trace = result

            confidences.append(confidence)

            comparative_analysis[jurisdiction] = ResponseBuilder.build_nyaya_response(
                domain="multi",
                jurisdiction=jurisdiction,
                confidence=confidence,
                legal_route=legal_route,
                trace_id=f"{trace_id}_{jurisdiction.lower()}",
                provenance_chain=provenance_chain,
                reasoning_trace=reasoning_trace
            )

        # Calculate aggregate confidence (mean)
        aggregate_confidence = sum(confidences) / len(confidences) if confidences else 0.0

        return ResponseBuilder.build_multi_jurisdiction_response(
            comparative_analysis=comparative_analysis,
            confidence=aggregate_confidence,
            trace_id=trace_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=ResponseBuilder.build_error_response(
                "INTERNAL_ERROR",
                "An internal error occurred",
                trace_id
            ).dict()
        )

@router.post("/explain_reasoning", response_model=ExplainReasoningResponse)
async def explain_reasoning(
    request: ExplainReasoningRequest,
    trace_id: str = Depends(get_trace_id),
    nonce: str = Depends(validate_nonce)
):
    """Explain reasoning without re-executing agents."""
    try:
        return ResponseBuilder.build_explain_reasoning_response(
            request.trace_id,
            request.explanation_level.value
        )
    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=ResponseBuilder.build_error_response(
                "TRACE_NOT_FOUND",
                f"Trace {request.trace_id} not found",
                trace_id
            ).dict()
        )

@router.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(
    request: FeedbackRequest,
    trace_id: str = Depends(get_trace_id),
    nonce: str = Depends(validate_nonce),
    background_tasks: BackgroundTasks = None
):
    """Submit system-level RL feedback."""
    try:
        # Forward to RL engine
        feedback_result = feedback_api.receive_feedback({
            "trace_id": request.trace_id,
            "score": request.rating,
            "nonce": nonce,
            "comment": request.comment
        })

        # Emit feedback received event
        background_tasks.add_task(
            _emit_feedback_received_event,
            request.trace_id,
            request.rating,
            request.feedback_type.value
        )

        return ResponseBuilder.build_feedback_response(
            status="recorded",
            trace_id=request.trace_id,
            message="Feedback recorded successfully"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=ResponseBuilder.build_error_response(
                "FEEDBACK_ERROR",
                "Failed to process feedback",
                trace_id
            ).dict()
        )

@router.get("/trace/{trace_id}", response_model=TraceResponse)
async def get_trace(trace_id: str):
    """Get full sovereign audit trail."""
    try:
        return ResponseBuilder.build_trace_response(trace_id)
    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=ResponseBuilder.build_error_response(
                "TRACE_NOT_FOUND",
                f"Trace {trace_id} not found",
                trace_id
            ).dict()
        )

# Helper functions for background tasks
async def _emit_decision_explained_event(trace_id: str, confidence: float, legal_route: List[str]):
    """Emit decision explained event."""
    event = {
        "timestamp": "current_timestamp",
        "agent_id": "api_gateway",
        "jurisdiction": "global",
        "event_name": "decision_explained",
        "request_hash": hash(str(legal_route)) % (10 ** 8),
        "details": {
            "confidence": confidence,
            "legal_route": legal_route
        }
    }
    # In real implementation, this would be added to the ledger

async def _emit_feedback_received_event(trace_id: str, rating: int, feedback_type: str):
    """Emit feedback received event."""
    event = {
        "timestamp": "current_timestamp",
        "agent_id": "api_gateway",
        "jurisdiction": "global",
        "event_name": "feedback_received",
        "request_hash": hash(f"{trace_id}:{rating}") % (10 ** 8),
        "details": {
            "rating": rating,
            "feedback_type": feedback_type
        }
    }
    # In real implementation, this would be added to the ledger