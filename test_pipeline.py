#!/usr/bin/env python3
"""
Test script to verify the jurisdiction routing pipeline and RL engine components.
"""

import asyncio
from jurisdiction_router.router import JurisdictionRouter
from jurisdiction_router.resolver_pipeline import ResolverPipeline
from jurisdiction_router.confidence_aggregator import ConfidenceAggregator
from jurisdiction_router.fallback_manager import FallbackManager
from rl_engine.reward_engine import RewardEngine
from rl_engine.feedback_api import FeedbackAPI
from rl_engine.performance_memory import PerformanceMemory

async def test_jurisdiction_routing():
    """Test the jurisdiction routing pipeline."""
    print("Testing Jurisdiction Routing Pipeline...")
    
    # Initialize components
    router = JurisdictionRouter()
    resolver = ResolverPipeline()
    fallback_manager = FallbackManager(resolver)
    
    # Test queries
    test_queries = [
        "What are the fundamental rights in the Indian Constitution?",
        "How does the UK parliamentary system work?",
        "What are the laws regarding employment in UAE?",
        "Tell me about judicial review in the United States",  # Should default to India
    ]
    
    for query in test_queries:
        print(f"\nProcessing query: '{query}'")
        
        # Step 1: Route query to jurisdiction
        jurisdiction, confidence = router.route_query(query)
        print(f"  Routed to jurisdiction: {jurisdiction} (confidence: {confidence:.2f})")
        
        # Step 2: Process with fallback manager
        result = await fallback_manager.process_with_fallback(jurisdiction, query)
        print(f"  Selected agent: {result['selected_agent']}")
        print(f"  Confidence: {result['confidence']:.2f}")
        print(f"  Fallback used: {result.get('fallback_used', False)}")

async def test_rl_engine():
    """Test the RL reward engine."""
    print("\n\nTesting RL Reward Engine...")
    
    # Initialize components
    reward_engine = RewardEngine()
    feedback_api = FeedbackAPI(reward_engine)
    
    # Simulate a response and feedback
    response = {
        "jurisdiction": "IN",
        "selected_agent": "ConstitutionalAgent",
        "confidence": 0.85,
        "trace_id": "test-trace-123"
    }
    
    feedback = {
        "trace_id": "test-trace-123",
        "score": 4,
        "comment": "Good explanation of fundamental rights"
    }
    
    print(f"Processing feedback for response: {response}")
    print(f"Feedback received: {feedback}")
    
    # Process feedback
    reward_score, reward_details = reward_engine.compute_reward(response, feedback)
    print(f"Computed reward score: {reward_score:.2f}")
    print(f"Reward details: {reward_details}")
    
    # Record in performance memory
    reward_engine.update_performance_memory("test-trace-123", reward_score, reward_details)
    
    # Test feedback API
    api_response = feedback_api.receive_feedback(feedback)
    print(f"API response: {api_response}")

def test_performance_memory():
    """Test the performance memory component."""
    print("\n\nTesting Performance Memory...")
    
    # Initialize performance memory
    perf_memory = PerformanceMemory()
    
    # Record some performance data
    perf_memory.record_performance(
        trace_id="test-trace-123",
        agent_id="ConstitutionalAgent_IN",
        jurisdiction="IN",
        reward_score=0.75,
        confidence_before=0.85,
        confidence_after=0.87,
        details={"test": "performance record"}
    )
    
    # Get agent performance history
    history = perf_memory.get_agent_performance_history("ConstitutionalAgent_IN")
    print(f"Performance history entries: {len(history)}")
    
    # Calculate metrics
    metrics = perf_memory.calculate_agent_performance_metrics("ConstitutionalAgent_IN")
    print(f"Agent metrics: {metrics}")
    
    # Test confidence adjustment
    adjusted_confidence = perf_memory.adjust_confidence_based_on_performance(
        "ConstitutionalAgent_IN", 0.8
    )
    print(f"Adjusted confidence: {adjusted_confidence:.2f}")

async def main():
    """Run all tests."""
    await test_jurisdiction_routing()
    await test_rl_engine()
    test_performance_memory()
    print("\n\nAll tests completed successfully!")

if __name__ == "__main__":
    asyncio.run(main())