from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from enum import Enum

class UserRole(str, Enum):
    CITIZEN = "citizen"
    LAWYER = "lawyer"
    STUDENT = "student"

class DomainHint(str, Enum):
    CRIMINAL = "criminal"
    CIVIL = "civil"
    CONSTITUTIONAL = "constitutional"

class JurisdictionHint(str, Enum):
    INDIA = "India"
    UK = "UK"
    UAE = "UAE"

class UserContext(BaseModel):
    role: UserRole
    confidence_required: bool = True

class QueryRequest(BaseModel):
    query: str = Field(..., description="Legal query text")
    jurisdiction_hint: Optional[JurisdictionHint] = None
    domain_hint: Optional[DomainHint] = None
    user_context: UserContext

class MultiJurisdictionRequest(BaseModel):
    query: str = Field(..., description="Legal query text")
    jurisdictions: List[JurisdictionHint] = Field(..., min_items=1, max_items=3)

class ExplanationLevel(str, Enum):
    BRIEF = "brief"
    DETAILED = "detailed"
    CONSTITUTIONAL = "constitutional"

class ExplainReasoningRequest(BaseModel):
    trace_id: str = Field(..., description="UUID trace identifier")
    explanation_level: ExplanationLevel

class FeedbackType(str, Enum):
    CLARITY = "clarity"
    CORRECTNESS = "correctness"
    USEFULNESS = "usefulness"

class FeedbackRequest(BaseModel):
    trace_id: str = Field(..., description="UUID trace identifier")
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    feedback_type: FeedbackType
    comment: Optional[str] = Field(None, max_length=1000)

class NyayaResponse(BaseModel):
    domain: str
    jurisdiction: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    legal_route: List[str]
    constitutional_articles: List[str] = []
    provenance_chain: List[Dict[str, Any]] = []
    reasoning_trace: Dict[str, Any] = {}
    trace_id: str

class MultiJurisdictionResponse(BaseModel):
    comparative_analysis: Dict[str, NyayaResponse]
    confidence: float = Field(..., ge=0.0, le=1.0)
    trace_id: str

class ExplainReasoningResponse(BaseModel):
    trace_id: str
    explanation: Dict[str, Any]
    reasoning_tree: Dict[str, Any]
    constitutional_articles: List[str] = []

class FeedbackResponse(BaseModel):
    status: str
    trace_id: str
    message: str

class TraceResponse(BaseModel):
    trace_id: str
    event_chain: List[Dict[str, Any]]
    agent_routing_tree: Dict[str, Any]
    jurisdiction_hops: List[str]
    rl_reward_snapshot: Dict[str, Any]
    context_fingerprint: str
    nonce_verification: bool
    signature_verification: bool

class ErrorResponse(BaseModel):
    error_code: str
    message: str
    trace_id: str