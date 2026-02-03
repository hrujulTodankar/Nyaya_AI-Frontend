# Nyaya AI Frontend-Backend API Contract

This document defines the exact API response shapes used by the frontend. No guessing allowed - all fields are documented based on the backend schemas.

## Base Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  trace_id?: string;
}
```

## Case Presentation Endpoints

### 1. GET /nyaya/case_summary

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| trace_id | string | Yes | UUID trace identifier |
| jurisdiction | string | Yes | Jurisdiction code (India, UK, UAE) |

**Response Shape:**
```typescript
interface CaseSummaryResponse {
  caseId: string | null;
  title: string | null;
  overview: string | null;
  keyFacts: string[];
  jurisdiction: string | null;
  confidence: number | null; // 0.0 to 1.0
  summaryAnalysis: string | null;
  dateFiled: string | null;
  status: string | null;
  parties: {
    plaintiff?: string;
    defendant?: string;
  } | null;
  trace_id: string;
}
```

**Empty State (when no data):**
```typescript
{
  caseId: null,
  title: null,
  overview: null,
  keyFacts: [],
  jurisdiction: null,
  confidence: null,
  summaryAnalysis: null,
  dateFiled: null,
  status: null,
  parties: null
}
```

### 2. GET /nyaya/legal_routes

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| trace_id | string | Yes | UUID trace identifier |
| jurisdiction | string | Yes | Jurisdiction code |
| case_type | string | Yes | Type of legal case |

**Response Shape:**
```typescript
interface LegalRoutesResponse {
  routes: LegalRoute[];
  jurisdiction: string;
  caseType: string;
  trace_id: string;
}

interface LegalRoute {
  name: string;
  description: string;
  recommendation: string;
  suitability: number; // 0.0 to 1.0
  estimatedDuration?: string;
  estimatedCost?: string;
  pros?: string[];
  cons?: string[];
}
```

**Empty State:**
```typescript
{
  routes: [],
  jurisdiction: null,
  caseType: null
}
```

### 3. GET /nyaya/timeline

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| trace_id | string | Yes | UUID trace identifier |
| jurisdiction | string | Yes | Jurisdiction code |
| case_id | string | Yes | Case identifier |

**Response Shape:**
```typescript
interface TimelineResponse {
  events: TimelineEvent[];
  jurisdiction: string;
  caseId: string;
  trace_id: string;
}

interface TimelineEvent {
  id: string;
  date: string; // ISO date format
  title: string;
  description: string;
  type: 'event' | 'deadline' | 'milestone' | 'step';
  status: 'completed' | 'pending' | 'overdue';
  documents?: string[];
  parties?: string[];
}
```

**Empty State:**
```typescript
{
  events: [],
  jurisdiction: null,
  caseId: null
}
```

### 4. GET /nyaya/glossary

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| trace_id | string | Yes | UUID trace identifier |
| jurisdiction | string | Yes | Jurisdiction code |
| case_type | string | Yes | Type of legal case |

**Response Shape:**
```typescript
interface GlossaryResponse {
  terms: GlossaryTerm[];
  jurisdiction: string;
  caseType: string;
  trace_id: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
  context?: string;
  relatedTerms?: string[];
  jurisdiction?: string;
  confidence?: number; // 0.0 to 1.0
}
```

**Empty State:**
```typescript
{
  terms: [],
  jurisdiction: null,
  caseType: null
}
```

### 5. GET /nyaya/jurisdiction_info

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| jurisdiction | string | Yes | Jurisdiction code |

**Response Shape:**
```typescript
interface JurisdictionInfo {
  country: string;
  courtSystem: string;
  authorityFraming: string;
  emergencyGuidance: string;
  legalFramework?: string;
  limitationAct?: string;
  constitution?: string;
}
```

**Example (India):**
```typescript
{
  country: "India",
  courtSystem: "Indian Judicial System",
  authorityFraming: "Formal and procedural, emphasizing due process and evidence-based decisions",
  emergencyGuidance: "File FIR at nearest Police Station, contact local magistrate for immediate orders",
  legalFramework: "Common Law System based on English law",
  limitationAct: "Limitation Act, 1963",
  constitution: "Constitution of India (1950)"
}
```

### 6. GET /nyaya/enforcement_status

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| trace_id | string | Yes | UUID trace identifier |
| jurisdiction | string | Yes | Jurisdiction code |

**Response Shape:**
```typescript
interface EnforcementStatusResponse {
  state: 'block' | 'escalate' | 'soft_redirect' | 'conditional' | 'clear';
  reason: string;
  blocked_path?: string;
  escalation_required: boolean;
  escalation_target?: string;
  redirect_suggestion?: string;
  safe_explanation: string;
  trace_id: string;
}
```

**State Descriptions:**
- `block`: Path is blocked - cannot proceed. Show red alert.
- `escalate`: Requires escalation to higher authority. Show orange alert.
- `soft_redirect`: Suggest alternative pathway. Show purple alert.
- `conditional`: Proceed with conditions. Show yellow alert.
- `clear`: No enforcement requirements. Hidden or show green.

## Legal Query Endpoints

### POST /nyaya/query

**Request Body:**
```typescript
{
  query: string;
  jurisdiction_hint?: 'India' | 'UK' | 'UAE';
  domain_hint?: 'criminal' | 'civil' | 'constitutional';
  user_context: {
    role: 'citizen' | 'lawyer' | 'student';
    confidence_required: boolean;
  }
}
```

**Response Shape:**
```typescript
interface NyayaResponse {
  domain: string;
  jurisdiction: string;
  confidence: number; // 0.0 to 1.0
  legal_route: string[];
  constitutional_articles: string[];
  provenance_chain: object[];
  reasoning_trace: object;
  trace_id: string;
  enforcement_status?: EnforcementStatusResponse;
}
```

### POST /nyaya/feedback

**Request Body:**
```typescript
{
  trace_id: string;
  rating: number; // 1-5
  feedback_type: 'clarity' | 'correctness' | 'usefulness';
  comment?: string;
}
```

**Response Shape:**
```typescript
{
  status: string;
  trace_id: string;
  message: string;
}
```

### POST /nyaya/rl_signal

**Request Body:**
```typescript
{
  trace_id: string;
  helpful: boolean;
  clear: boolean;
  match: boolean;
}
```

**Response Shape:**
```typescript
{
  status: string;
  trace_id: string;
  message: string;
}
```

## Error Response Shape

```typescript
interface ErrorResponse {
  error_code: string;
  message: string;
  trace_id: string;
}
```

## Frontend Validation Requirements

### Case Summary Validation
- `title`: Required, non-empty string
- `overview`: Required, non-empty string
- `keyFacts`: Required, must be array (can be empty)
- `jurisdiction`: Required, one of ['India', 'UK', 'UAE']
- `confidence`: Required, number between 0 and 1

### Legal Routes Validation
- `routes`: Required, must be array (can be empty)
- Each route must have: `name`, `description`, `recommendation`, `suitability`
- `suitability`: Number between 0 and 1

### Timeline Validation
- `events`: Required, must be array (can be empty)
- Each event must have: `id`, `date`, `title`, `description`, `type`, `status`
- `type`: One of ['event', 'deadline', 'milestone', 'step']
- `status`: One of ['completed', 'pending', 'overdue']

### Glossary Validation
- `terms`: Required, must be array (can be empty)
- Each term must have: `term`, `definition`
- `confidence`: Optional, number between 0 and 1 if present

### Enforcement Status Validation
- `state`: Required, one of ['block', 'escalate', 'soft_redirect', 'conditional', 'clear']
- `safe_explanation`: Required when state is not 'clear'
- `blocked_path`: Required when state is 'block'
- `escalation_target`: Required when state is 'escalate' and escalation_required is true
- `redirect_suggestion`: Required when state is 'soft_redirect'

## Edge Cases Handled

1. **Empty Response**: Return appropriate empty state UI
2. **Partial Data**: Use validation to fill missing fields with null/empty defaults
3. **Invalid State**: Default to 'clear' state for unknown enforcement states
4. **Missing trace_id**: Show error, do not proceed with UI rendering
5. **Network Error**: Show retry button with error message
6. **Timeout**: Show timeout error with retry option

## Device Breakpoints

| Breakpoint | Width | Target Device |
|------------|-------|---------------|
| Mobile | max-width: 768px | Smartphones |
| Tablet | 768px - 1024px | Tablets |
| Desktop | min-width: 1024px | Desktop PCs |
