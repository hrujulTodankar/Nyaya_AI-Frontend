# Nyaya AI - Sovereign Legal Intelligence Platform

## 🔍 Project Overview

Nyaya AI is a sovereign-compliant multi-agent legal intelligence platform designed to provide transparent, auditable legal analysis across multiple jurisdictions (India, UK, UAE). The system follows a modular architecture that ensures:

- **Sovereign Provenance**: Complete audit trail with signed events and hash chaining
- **Multi-jurisdictional Support**: Legal analysis across India, UK, and UAE jurisdictions
- **Constitutional Compliance**: Special handling for Indian constitutional law
- **Real-time Feedback**: Reinforcement learning engine for continuous improvement
- **API-first Design**: Clean, well-documented RESTful endpoints

## 🏗️ System Architecture

The Nyaya AI backend is composed of 6 core modules that work together to provide a comprehensive legal intelligence platform:

### 1. API Gateway (FastAPI)
- Entry point for all client requests
- Handles authentication, rate limiting, and request routing
- Provides standardized response formats
- Implements CORS and security middleware

### 2. Sovereign Agents
- **BaseAgent**: Core functionality with ID, jurisdiction, and capabilities
- **LegalAgent**: Specialized for legal query processing
- **ConstitutionalAgent**: Handles constitutional law references (India-specific)
- **JurisdictionRouterAgent**: Routes queries to appropriate legal agents

### 3. Jurisdiction Router
- **Resolver Pipeline**: Determines the most appropriate jurisdiction for queries
- **Confidence Aggregator**: Combines confidence scores from multiple agents
- **Fallback Manager**: Handles low-confidence scenarios with alternative jurisdictions

### 4. RL Engine (Reinforcement Learning)
- **Feedback Processor**: Receives and processes user feedback
- **Performance Memory**: Stores agent performance metrics
- **Reward Engine**: Computes +reward/-penalty based on feedback scores (1-5)

### 5. Provenance Chain
- **Event Signer**: Signs all events using HMAC-SHA256
- **Hash Chain Ledger**: Immutable chain of signed events
- **Lineage Tracer**: Tracks request lineage and provides audit trails
- **Nonce Manager**: Prevents replay attacks

### 6. Data Bridge
- **JSON Loader**: Safely loads legal datasets without modification
- **Validator**: Ensures data integrity and schema compliance
- **Standard Schemas**: Section, Act, and Case objects with jurisdiction tags

## 📡 API Documentation

### Base URL
`http://localhost:8000` (default)

### Endpoints

#### POST `/nyaya/query`
Execute a single-jurisdiction legal query.

**Request Body:**
```json
{
  "query": "What are the penalties for theft under Indian law?",
  "jurisdiction_hint": "India",
  "domain_hint": "criminal",
  "user_context": {
    "role": "citizen",
    "confidence_required": true
  }
}
```

**Response:**
```json
{
  "domain": "criminal",
  "jurisdiction": "IN",
  "confidence": 0.85,
  "legal_route": ["jurisdiction_router_agent", "india_legal_agent"],
  "constitutional_articles": ["Article 14", "Article 21"],
  "provenance_chain": [],
  "reasoning_trace": {},
  "trace_id": "uuid-string"
}
```

#### POST `/nyaya/multi_jurisdiction`
Execute parallel legal analysis across multiple jurisdictions.

**Request Body:**
```json
{
  "query": "What are the rights of employees?",
  "jurisdictions": ["India", "UK", "UAE"]
}
```

**Response:**
```json
{
  "comparative_analysis": {
    "India": { /* NyayaResponse */ },
    "UK": { /* NyayaResponse */ },
    "UAE": { /* NyayaResponse */ }
  },
  "confidence": 0.78,
  "trace_id": "uuid-string"
}
```

#### POST `/nyaya/explain_reasoning`
Explain reasoning without re-executing agents.

**Request Body:**
```json
{
  "trace_id": "uuid-string",
  "explanation_level": "detailed"
}
```

#### POST `/nyaya/feedback`
Submit system-level RL feedback.

**Request Body:**
```json
{
  "trace_id": "uuid-string",
  "rating": 4,
  "feedback_type": "correctness",
  "comment": "The response was accurate and helpful"
}
```

#### GET `/nyaya/trace/{trace_id}`
Get full sovereign audit trail.

**Response:**
```json
{
  "trace_id": "uuid-string",
  "event_chain": [/* array of signed events */],
  "agent_routing_tree": {},
  "jurisdiction_hops": ["India"],
  "rl_reward_snapshot": {},
  "context_fingerprint": "fingerprint-string",
  "nonce_verification": true,
  "signature_verification": true
}
```

#### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "nyaya-api-gateway"
}
```

### Error Handling
All errors follow the standard error format:
```json
{
  "error_code": "ERROR_TYPE",
  "message": "Human-readable error message",
  "trace_id": "uuid-string"
}
```

## 🔐 Provenance & Security

### Event Signing
All events in the system are signed using HMAC-SHA256 with a configurable secret key. This ensures:
- Non-repudiation of events
- Integrity verification
- Audit trail authenticity

### Hash Chain
The provenance chain uses a linked-list structure where each event contains:
- Index in the chain
- Timestamp
- Event hash (SHA256 of the signed event)
- Previous event hash (creating the chain)
- Signed event data

### Nonce Protection
A nonce system prevents replay attacks by ensuring each request has a unique, one-time use token.

### Trace Retrieval
Full audit trails can be retrieved using trace IDs, providing complete visibility into:
- Agent routing decisions
- Jurisdiction transitions
- Event signatures
- Chain integrity verification

## 🎯 RL Engine Explanation

### What is Rewarded
- High user ratings (4-5 stars)
- Positive feedback on clarity, correctness, and usefulness
- Successful query completions
- Accurate jurisdiction routing

### What is Penalized
- Low user ratings (1-2 stars)
- Negative feedback
- Incorrect legal information
- Low confidence responses
- Failed jurisdiction routing

### What is NOT Learned
- The system does NOT perform machine learning training
- No model weights are updated
- No neural network training occurs
- The system only adjusts confidence scores and routing decisions based on feedback

## 🚀 How to Run

### Prerequisites
- Python 3.7+
- FastAPI
- Uvicorn
- Required dependencies (see requirements below)

### Environment Variables
```bash
HMAC_SECRET_KEY=your-secret-key-here
PORT=8000
HOST=0.0.0.0
```

### Installation
```bash
pip install fastapi uvicorn pydantic python-multipart
```

### Start Server
```bash
uvicorn api.main:app --host 0.0.0.0 --port 8000
```

### Run Tests
```bash
# Import the Postman collection for comprehensive testing
# See Nyaya_AI_Backend.postman_collection.json
```

### Import Postman
The Postman collection includes all endpoints with sample payloads and headers.

## 🤝 Handover Notes

### What Aditya Plugs Into
- **Data Bridge**: Load legal datasets into the system
- **Agent Logic**: Implement domain-specific legal reasoning
- **Event System**: Integrate with the provenance chain

### What Hrujul Consumes
- **API Endpoints**: All documented endpoints for frontend integration
- **Response Formats**: Standardized response schemas
- **Trace System**: Audit trail for transparency

### What Future Engineers Must NOT Break
- **Sovereign Compliance**: Never remove event signing or hash chaining
- **Provenance Chain**: Maintain immutable audit trail
- **API Contracts**: Keep backward compatibility for all endpoints
- **Data Bridge**: Preserve original JSON files, only normalize
- **Security**: Never bypass nonce validation or signature verification

## 📊 System Validation

The system has been validated to ensure:
- ✅ All endpoints respond correctly
- ✅ No runtime crashes in basic functionality
- ✅ Provenance chain validates correctly
- ✅ Trace retrieval works as expected
- ✅ RL feedback emits events properly
- ✅ Clean folder structure maintained
- ✅ No code duplication
- ✅ No unnecessary changes made

---

*This system is designed for sovereign compliance and transparent legal intelligence processing across multiple jurisdictions.*