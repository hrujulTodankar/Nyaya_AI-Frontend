# Nyaya UI Kit

A collection of reusable React UI components for legal case presentation and trust indicators in the Nyaya AI application.

## Components Built

### Case Presentation Components
- **CaseSummaryCard**: Displays case title, issue summary, key facts, and risk level
- **LegalRouteCard**: Shows possible legal paths, available actions, and involved authorities
- **TimelineCard**: Displays past actions, current stage, and next steps
- **GlossaryCard**: Explains legal terms with simple definitions

### Jurisdiction Display
- **JurisdictionInfoBar**: Shows country, court system, authority framing, and emergency guidance

### Procedural Timeline
- **ProceduralTimeline**: Material UI Stepper with duration ranges and current stage highlighting

### Trust Layer Components
- **DisclaimerBox**: Displays legal disclaimers clearly
- **SessionStatus**: Shows session state (Active/Inactive/Expired)
- **ConfidenceIndicator**: Visual indicator of AI confidence level

### Additional Components
- LegalConsultationCard, FeedbackButtons, LegalQueryCard, MultiJurisdictionCard

All components are self-contained, reusable, and styled with professional legal/government aesthetics using neutral colors and clean layouts.

## How to Import

```javascript
import { CaseSummaryCard, DisclaimerBox, SessionStatus } from 'nyaya-ui-kit';
```

## Tech Stack
- React
- CSS (inline styles for simplicity)
- Material UI (for Stepper component)

## Development
- Storybook for component development and documentation
- Run `npm run storybook` in the `frontend/` directory to view interactive component stories
- Built static site available in `frontend/storybook-static/` for deployment

## What Was NOT Touched
- Backend APIs
- Legal logic or wording
- Jurisdiction names, domains, or fields
- RL (Reinforcement Learning) or feedback formats

This kit contains only UI components that are drop-in compatible and do not modify any application logic.