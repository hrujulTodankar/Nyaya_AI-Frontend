# Nyaya AI Backend - Day 1 Implementation

This document outlines the foundational backend architecture for Nyaya Sovereign AI, implemented on Day 1.

## 📁 Project Structure

```
BACKEND/
 ├── sovereign_agents/
 │    ├── base_agent.py
 │    ├── legal_agent.py
 │    ├── constitutional_agent.py
 │    ├── jurisdiction_router_agent.py
 │
 ├── events/
 │    ├── event_types.py
 │    ├── event_schema.json
 │
 └── README_DAY_1.md
```

## 🚀 Installation

1. Ensure Python 3.7+ is installed
2. No additional dependencies required for Day 1 implementation
3. All modules are designed to be self-contained and portable

## 🤖 Agent Flow

### Base Agent Architecture
The system is built on a robust base agent architecture:

1. **BaseAgent** (`base_agent.py`) - Abstract base class defining core agent functionality:
   - Unique `agent_id` for traceability
   - `jurisdiction` property for regional authority
   - `capabilities` list for agent skills
   - Abstract `process()` method for async execution
   - `emit_event()` for standardized logging
   - `generate_confidence_score()` for result confidence metrics

2. **LegalAgent** (`legal_agent.py`) - Handles statute/act lookup and routes case queries:
   - Extends BaseAgent
   - Routes legal queries to specialized sub-agents
   - No hardcoded legal logic - framework only

3. **ConstitutionalAgent** (`constitutional_agent.py`) - Reserved for constitutional references:
   - Extends LegalAgent
   - Clean inheritance structure maintained

4. **JurisdictionRouterAgent** (`jurisdiction_router_agent.py`) - Routes queries based on jurisdiction:
   - Scalable mapping system (no hard-coded rules)
   - Accepts query and returns target sub-agent name
   - Does not interpret law, only routes

### Agent Inheritance Chain
```
BaseAgent
└── LegalAgent
    └── ConstitutionalAgent
```

## 📡 Event Protocol Usage

### Event Types
Defined in `event_types.py`:
- `QUERY_RECEIVED` - When a query is received
- `AGENT_CLASSIFIED` - When an agent classifies a query
- `JURISDICTION_RESOLVED` - When jurisdiction is determined
- `REASONING_EXPLAINED` - When reasoning steps are documented
- `EVIDENCE_CHAIN_GENERATED` - When evidence chain is formed
- `TRACE_COMPLETED` - When trace is finalized

### Event Schema
Defined in `event_schema.json`, each event contains:
- `timestamp` - ISO 8601 formatted timestamp
- `agent_id` - Unique identifier of emitting agent
- `jurisdiction` - Region/source of authority
- `event_name` - Type of event from EventType enum
- `request_hash` - Hash of original request for traceability
- `details` - Micro-trace details specific to event type

### Integration with Sovereign Provenance Ledger
Events are structured to seamlessly integrate with the future Sovereign provenance ledger (Day 3), ensuring complete auditability and traceability of all AI decisions.

## 🔧 Key Features

1. **Modular Design** - Each component is isolated and can be developed independently
2. **API Ready** - All components designed for easy API integration
3. **Production Deployable** - Self-contained with no external dependencies
4. **Scalable Architecture** - Supports new agents, jurisdictions, and pipelines
5. **Future-Proof** - No domain-law hardcoding, only framework structure
6. **Adapter-Based** - Designed for easy integration with Sovereign Core

## ✅ Day 1 Completion Verification

| Requirement | Status | Notes |
|-------------|--------|-------|
| Agent inheritance structure established | ✅ | BaseAgent → LegalAgent → ConstitutionalAgent |
| Router agent created | ✅ | Accepts query → returns jurisdiction stub |
| Event schema defined | ✅ | JSON + Python enum complete |
| Code is modular and API-ready | ✅ | No monolith patterns |
| Zero domain-law hardcoding | ✅ | Only framework — no rules |

This implementation provides a solid foundation for the Nyaya Sovereign AI system, ready for expansion with domain-specific logic in subsequent development phases.