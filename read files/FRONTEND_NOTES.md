# Nyaya AI Frontend Notes

This document provides essential information for developers taking over frontend work on the Nyaya AI project.

---

## Component Responsibilities

### nyaya-ui-kit Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| [`CaseSummaryCard`](nyaya-ui-kit/components/CaseSummaryCard.jsx) | Displays case overview, key facts, jurisdiction, confidence score, and legal analysis | Reusable card for presenting legal case summaries |
| [`LegalRouteCard`](nyaya-ui-kit/components/LegalRouteCard.jsx) | Shows available legal pathways (Mediation, Arbitration, Litigation) with suitability scores, pros/cons, and cost estimates | Decision-support component for legal options |
| [`TimelineCard`](nyaya-ui-kit/components/TimelineCard.jsx) | Renders chronological case events with status indicators (completed, pending, overdue) | Visual timeline for case progress tracking |
| [`GlossaryCard`](nyaya-ui-kit/components/GlossaryCard.jsx) | Expandable legal terms with definitions, context, and confidence scores | Educational component for legal terminology |
| [`JurisdictionInfoBar`](nyaya-ui-kit/components/JurisdictionInfoBar.jsx) | Displays jurisdiction metadata (country, court system, authority framing, emergency guidance) | Information bar for legal context |
| [`ProceduralTimeline`](nyaya-ui-kit/components/ProceduralTimeline.jsx) | Shows jurisdiction-specific legal procedural steps (Filing → Investigation → Court) | Procedural guidance per jurisdiction |
| [`DisclaimerBox`](nyaya-ui-kit/components/DisclaimerBox.jsx) | Yellow warning banner for important notices/disclaimers | Reusable alert component |
| [`SessionStatus`](nyaya-ui-kit/components/SessionStatus.jsx) | Status indicator badge (active/inactive/expired) | Session state visualization |
| [`ConfidenceIndicator`](nyaya-ui-kit/components/ConfidenceIndicator.jsx) | Visual progress bar showing AI confidence percentage | Trust indicator component |
| [`LegalConsultationCard`](nyaya-ui-kit/components/LegalConsultationCard.jsx) | Form for scheduling legal consultations (name, email, legal issue, urgency) | Lead generation/callback request form |
| [`FeedbackButtons`](nyaya-ui-kit/components/FeedbackButtons.jsx) | User feedback UI (helpful, clear, matches situation) | RL feedback collection |
| [`LegalQueryCard`](nyaya-ui-kit/components/LegalQueryCard.jsx) | Main query input card with AI response display | Primary user interaction point |
| [`MultiJurisdictionCard`](nyaya-ui-kit/components/MultiJurisdictionCard.jsx) | Cross-jurisdictional comparison tool with procedural timelines | Comparative legal analysis |

### Frontend Application Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| [`App.jsx`](frontend/src/App.jsx) | Main application shell with navigation, header, and card renderer | Entry point with routing logic |
| [`index.css`](frontend/src/index.css) | Global styles including glassmorphism effects, animations, and responsive design | Design system base |

### Services

| Service | Responsibility | Location |
|---------|---------------|----------|
| [`nyayaApi.js`](frontend/src/services/nyayaApi.js) | Axios-based API client for backend communication | API integration layer |

---

## What NOT to Change

### 1. CSS Architecture (Critical)

- **Glassmorphism Design System**: The `frontend/src/index.css` file implements a specific glassmorphism effect. Changes here will affect all components.
- **Class Names**: Components use `.consultation-card`, `.consultation-input`, `.consultation-btn`, `.section-label`, and `.consultation-section`. These are shared across the entire UI.
- **Color Scheme**: The gradient background `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` and color variables should remain consistent.

### 2. Component Structure

- **nyaya-ui-kit Pattern**: Components in [`nyaya-ui-kit/`](nyaya-ui-kit/) are designed to be standalone. Don't add application-specific logic to them.
- **Error Handling**: Components have built-in error boundaries for missing data. Keep these patterns.
- **Prop Types**: Components expect specific prop structures (documented in each file). Changing these will break existing implementations.

### 3. API Integration

- **Trace ID Pattern**: All API requests include `X-Trace-ID` header for request tracking. Don't remove this.
- **Response Structure**: The `legalQueryService` returns `{ success, data, trace_id }` format. Keep this consistent.

### 4. Design Patterns

- **Section Labels**: All sections use `.section-label` with uppercase text and accent line.
- **Card Hover Effects**: Cards have translateY(-4px) and shadow enhancement on hover.
- **Animated Button**: Buttons have a shimmer effect (`::before` pseudo-element).

---

## Known Limitations

### 1. Mock Data in Components

The following components use **mock data** instead of real API integration:

- [`LegalQueryCard.jsx`](nyaya-ui-kit/components/LegalQueryCard.jsx) - Lines 17-33: Simulates API response with hardcoded data
- [`MultiJurisdictionCard.jsx`](nyaya-ui-kit/components/MultiJurisdictionCard.jsx) - Lines 32-56: Mock comparative analysis
- [`LegalConsultationCard.jsx`](nyaya-ui-kit/components/LegalConsultationCard.jsx) - Lines 29-37: Simulated form submission

**Action Required**: Connect these to [`frontend/src/services/nyayaApi.js`](frontend/src/services/nyayaApi.js) endpoints.

### 2. Missing Real API Endpoints

The [`nyayaApi.js`](frontend/src/services/nyayaApi.js) service is configured but may lack complete endpoint coverage:

| Endpoint | Status |
|----------|--------|
| `/nyaya/query` | Implemented |
| `/nyaya/multi_jurisdiction` | Implemented |
| `/nyaya/explain_reasoning` | Implemented |
| `/nyaya/feedback` | Implemented |
| `/nyaya/trace/{traceId}` | Implemented |
| `/nyaya/rl_signal` | Implemented |

**Action Required**: Verify backend endpoints match these calls.

### 3. Frontend-Only Components

The [`frontend/src/components/`](frontend/src/components/) directory mirrors nyaya-ui-kit but currently wraps the same components. Future work may consolidate these.

### 4. Timeline Data Structure

[`TimelineCard.jsx`](nyaya-ui-kit/components/TimelineCard.jsx) expects events with this structure:
```javascript
{
  id: string,
  date: 'YYYY-MM-DD',
  title: string,
  description: string,
  type: 'event' | 'deadline' | 'milestone' | 'step',
  status: 'completed' | 'pending' | 'overdue',
  documents: string[], // optional
  parties: string[]    // optional
}
```

### 5. Jurisdiction Support

Currently hardcoded for three jurisdictions in [`ProceduralTimeline.jsx`](nyaya-ui-kit/components/ProceduralTimeline.jsx):
- India (IPC, CrPC, Evidence Act, etc.)
- UK (Criminal Justice Act, Courts Act)
- UAE (Federal laws, Sharia-influenced)

Adding new jurisdictions requires updates to this file.

---

## nyaya-ui-kit Component Stability

### 🟢 Stable Components (Ready for Production)

These components are well-tested and have stable APIs:

- [`ConfidenceIndicator`](nyaya-ui-kit/components/ConfidenceIndicator.jsx) - Simple visualization, no dependencies
- [`DisclaimerBox`](nyaya-ui-kit/components/DisclaimerBox.jsx) - Simple alert component
- [`SessionStatus`](nyaya-ui-kit/components/SessionStatus.jsx) - Status badge component
- [`JurisdictionInfoBar`](nyaya-ui-kit/components/JurisdictionInfoBar.jsx) - Display-only component
- [`ProceduralTimeline`](nyaya-ui-kit/components/ProceduralTimeline.jsx) - Static data display

### 🟡 Experimental Components (API May Change)

These components have complex logic or mock data:

- [`CaseSummaryCard`](nyaya-ui-kit/components/CaseSummaryCard.jsx) - Multiple optional fields, may need prop refactoring
- [`LegalRouteCard`](nyaya-ui-kit/components/LegalRouteCard.jsx) - Complex route data structure
- [`TimelineCard`](nyaya-ui-kit/components/TimelineCard.jsx) - Event sorting and formatting logic
- [`GlossaryCard`](nyaya-ui-kit/components/GlossaryCard.jsx) - Expandable state management

### 🔴 Needs Backend Dependency

These components require backend API integration to function correctly:

- [`LegalQueryCard`](nyaya-ui-kit/components/LegalQueryCard.jsx) - **Requires** `/nyaya/query` endpoint
- [`MultiJurisdictionCard`](nyaya-ui-kit/components/MultiJurisdictionCard.jsx) - **Requires** `/nyaya/multi_jurisdiction` endpoint
- [`LegalConsultationCard`](nyaya-ui-kit/components/LegalConsultationCard.jsx) - **Requires** consultation booking endpoint (not yet defined)
- [`FeedbackButtons`](nyaya-ui-kit/components/FeedbackButtons.jsx) - **Requires** `/nyaya/feedback` endpoint

---

## Development Notes

### Running the Application

```bash
# Frontend (Vite)
cd frontend && npm run dev

# Backend (if needed)
cd api && uvicorn main:app --reload
```

### Storybook

Components are documented in Storybook:
```bash
cd frontend && npm run storybook
```

### API Configuration

The API base URL is configured in [`frontend/src/services/nyayaApi.js`](frontend/src/services/nyayaApi.js:6):
```javascript
const API_BASE_URL = 'http://localhost:8000'
```

Update this for production deployment.

---

## Next Steps for Developer

1. **Connect Mock Components**: Replace mock data in `LegalQueryCard`, `MultiJurisdictionCard`, and `LegalConsultationCard` with real API calls.

2. **Define Consultation Endpoint**: `LegalConsultationCard` needs a backend endpoint for form submission.

3. **Add More Jurisdictions**: Extend `ProceduralTimeline` for additional countries if needed.

4. **Consolidate Components**: Consider merging `frontend/src/components/` with `nyaya-ui-kit/` to avoid duplication.

5. **Testing**: Add unit tests for component rendering and API service integration.

---

*Last Updated: 2024*
