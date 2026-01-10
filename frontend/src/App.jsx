import React, { useState } from 'react'
import LegalQueryCard from './components/LegalQueryCard.jsx'
import MultiJurisdictionCard from './components/MultiJurisdictionCard.jsx'
import LegalConsultationCard from './components/LegalConsultationCard.jsx'
import CaseSummaryCard from './components/CaseSummaryCard.jsx'
import LegalRouteCard from './components/LegalRouteCard.jsx'
import TimelineCard from './components/TimelineCard.jsx'
import GlossaryCard from './components/GlossaryCard.jsx'

// Sample data for testing case presentation components
const sampleCaseSummary = {
  caseId: "CASE-2024-001",
  title: "Breach of Contract Dispute - Software Development Services",
  overview: "A dispute arising from alleged non-performance of software development services under a fixed-price contract valued at INR 2,500,000.",
  keyFacts: [
    "Contract signed on 15th March 2024 with delivery deadline of 30th June 2024",
    "Plaintiff alleges incomplete delivery and poor quality of deliverables",
    "Defendant claims force majeure due to COVID-19 related restrictions",
    "Multiple email communications and project management records available"
  ],
  jurisdiction: "India",
  confidence: 0.87,
  summaryAnalysis: "This appears to be a straightforward breach of contract case under Indian law. The Indian Contract Act, 1872, and relevant provisions of the Specific Relief Act, 1963, would govern the dispute. Key considerations include force majeure clauses, limitation periods, and availability of specific performance as a remedy.",
  dateFiled: "2024-07-15",
  status: "Pre-litigation",
  parties: {
    plaintiff: "TechSolutions Pvt Ltd",
    defendant: "DevCorp India"
  }
};

const sampleLegalRoutes = {
  routes: [
    {
      name: "Mediation",
      description: "Non-binding dispute resolution through a neutral third-party mediator who facilitates negotiation between parties.",
      recommendation: "Highly recommended as first step due to lower cost and faster resolution. Suitable for commercial disputes where relationship preservation is important.",
      suitability: 0.95,
      estimatedDuration: "2-4 weeks",
      estimatedCost: "INR 50,000-100,000",
      pros: [
        "Confidential process",
        "Preserves business relationships",
        "Lower cost than litigation",
        "Flexible outcomes"
      ],
      cons: [
        "Non-binding nature",
        "Requires mutual agreement to participate"
      ]
    },
    {
      name: "Arbitration",
      description: "Binding dispute resolution through private arbitration tribunal, often faster than court litigation.",
      recommendation: "Strong alternative to litigation for commercial contracts. Consider if contract contains arbitration clause.",
      suitability: 0.85,
      estimatedDuration: "3-6 months",
      estimatedCost: "INR 200,000-500,000",
      pros: [
        "Binding decision",
        "Expert arbitrators in technical fields",
        "Confidential proceedings",
        "Enforceable under New York Convention"
      ],
      cons: [
        "Limited appeal options",
        "May still be costly for small claims"
      ]
    },
    {
      name: "Civil Litigation",
      description: "Formal court proceedings through the Indian civil court system, including district courts and high courts.",
      recommendation: "Consider only after exhausting ADR options. Suitable when specific performance or injunction is required.",
      suitability: 0.60,
      estimatedDuration: "1-3 years",
      estimatedCost: "INR 300,000-1,000,000+",
      pros: [
        "Binding court judgment",
        "Right to appeal",
        "Public record",
        "Wide range of remedies available"
      ],
      cons: [
        "Lengthy process",
        "High costs",
        "Public nature may damage reputation",
        "Court backlog in India"
      ]
    }
  ],
  jurisdiction: "India",
  caseType: "Commercial Contract Dispute"
};

const sampleTimeline = {
  events: [
    {
      id: "contract-signing",
      date: "2024-03-15",
      title: "Contract Signing",
      description: "Fixed-price software development contract signed between TechSolutions Pvt Ltd and DevCorp India for INR 2,500,000.",
      type: "milestone",
      status: "completed",
      documents: ["Contract_Agreement_2024.pdf"],
      parties: ["TechSolutions Pvt Ltd", "DevCorp India"]
    },
    {
      id: "project-deadline",
      date: "2024-06-30",
      title: "Project Delivery Deadline",
      description: "Original deadline for project completion as per contract terms.",
      type: "deadline",
      status: "completed",
      documents: ["Project_Scope_Document.pdf"]
    },
    {
      id: "delay-notification",
      date: "2024-07-05",
      title: "Delay Notification",
      description: "TechSolutions notified DevCorp of project delays and quality issues via email.",
      type: "event",
      status: "completed",
      documents: ["Delay_Notice_Email_2024.pdf"]
    },
    {
      id: "force-majeure-claim",
      date: "2024-07-10",
      title: "Force Majeure Claim",
      description: "DevCorp invoked force majeure clause citing COVID-19 restrictions affecting development team.",
      type: "event",
      status: "completed",
      documents: ["Force_Majeure_Notice.pdf"]
    },
    {
      id: "mediation-request",
      date: "2024-07-15",
      title: "Mediation Request",
      description: "Formal request for mediation filed with Indian Institute of Arbitration and Mediation.",
      type: "step",
      status: "pending",
      documents: ["Mediation_Request_Form.pdf"]
    },
    {
      id: "limitation-deadline",
      date: "2025-06-30",
      title: "Limitation Period Expires",
      description: "Three-year limitation period under Indian Limitation Act, 1963, for contract disputes.",
      type: "deadline",
      status: "pending"
    }
  ],
  jurisdiction: "India",
  caseId: "CASE-2024-001"
};

const sampleGlossary = {
  terms: [
    {
      term: "Breach of Contract",
      definition: "Violation of any term or condition of a contract without lawful excuse. Under Indian law, breach occurs when a party fails to perform their obligations as stipulated in the agreement.",
      context: "The plaintiff alleges that the defendant committed breach by failing to deliver the software within the agreed timeframe and to the specified quality standards.",
      relatedTerms: ["Material Breach", "Anticipatory Breach", "Remedies for Breach"],
      jurisdiction: "India"
    },
    {
      term: "Force Majeure",
      definition: "A clause in contracts that frees both parties from liability or obligation when an extraordinary event or circumstance beyond their control occurs, such as natural disasters, wars, or pandemics.",
      context: "The defendant has invoked the force majeure clause citing COVID-19 restrictions as preventing timely project completion.",
      relatedTerms: ["Act of God", "Frustration of Contract"],
      jurisdiction: "India"
    },
    {
      term: "Specific Performance",
      definition: "A court-ordered remedy requiring a party to perform their contractual obligations exactly as agreed, rather than paying damages. Available under Section 10 of the Specific Relief Act, 1963.",
      context: "The plaintiff may seek specific performance to compel the defendant to complete the software development work.",
      relatedTerms: ["Injunction", "Damages", "Quantum Meruit"],
      jurisdiction: "India"
    },
    {
      term: "Limitation Period",
      definition: "The maximum time period within which a legal action must be initiated after the cause of action arises. For contract disputes in India, this is generally three years under Article 55 of the Limitation Act, 1963.",
      context: "The limitation period for this contract dispute began from the date of the alleged breach (June 30, 2024) and will expire on June 30, 2027.",
      relatedTerms: ["Cause of Action", "Statute of Limitations"],
      jurisdiction: "India"
    },
    {
      term: "Arbitration Agreement",
      definition: "A clause in a contract that requires disputes to be resolved through arbitration rather than litigation. Governed by the Arbitration and Conciliation Act, 1996 in India.",
      context: "The contract contains an arbitration clause requiring disputes to be resolved through the Indian Council of Arbitration.",
      relatedTerms: ["Arbitral Tribunal", "Arbitral Award"],
      jurisdiction: "India"
    }
  ],
  jurisdiction: "India",
  caseType: "Commercial Contract Dispute"
};

function App() {
  const [activeCard, setActiveCard] = useState('query')

  const renderActiveCard = () => {
    switch (activeCard) {
      case 'query':
        return <LegalQueryCard />
      case 'multi':
        return <MultiJurisdictionCard />
      case 'consultation':
        return <LegalConsultationCard />
      case 'test':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <CaseSummaryCard {...sampleCaseSummary} />
            <LegalRouteCard {...sampleLegalRoutes} />
            <TimelineCard {...sampleTimeline} />
            <GlossaryCard {...sampleGlossary} />
          </div>
        )
      default:
        return <LegalQueryCard />
    }
  }

  return (
    <div className="container">
      {/* Enhanced Header with Glassmorphism Effect */}
      <header style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}>
            <span style={{ fontSize: '24px', color: 'white' }}>⚖️</span>
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              fontWeight: '800',
              letterSpacing: '-0.5px'
            }}>
              Nyaya AI
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              margin: 0,
              fontWeight: '500'
            }}>
              Legal Intelligence Consultation
            </p>
          </div>
          <div style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#16a34a',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></span>
            AI ACTIVE
          </div>
        </div>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Based on what you've described, I can help you understand your legal position
          and guide you through the applicable laws and procedures. Our AI-powered consultation
          provides comprehensive legal analysis across multiple jurisdictions.
        </p>
      </header>

      {/* Enhanced Navigation with Modern Design */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'query', label: 'Ask Your Legal Question', description: 'Get personalized legal guidance' },
          { id: 'multi', label: 'Compare Across Jurisdictions', description: 'Analyze laws across regions' },
          { id: 'consultation', label: 'Schedule Consultation', description: 'Book a detailed legal review' },
          { id: 'test', label: 'Test Case Components', description: 'View sample case presentation components' }
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveCard(option.id)}
            style={{
              padding: '14px 24px',
              border: activeCard === option.id ? '2px solid rgba(96, 165, 250, 0.8)' : '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              background: activeCard === option.id ? 'rgba(96, 165, 250, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              color: activeCard === option.id ? '#3b82f6' : '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '14px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              boxShadow: activeCard === option.id ? '0 4px 15px rgba(96, 165, 250, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(96, 165, 250, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = activeCard === option.id ? '0 4px 15px rgba(96, 165, 250, 0.3)' : 'none';
            }}
          >
            <div style={{ fontWeight: '700', marginBottom: '4px' }}>{option.label}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{option.description}</div>
          </button>
        ))}
      </nav>

      {/* Active Consultation Card */}
      <div className="consultation-grid">
        {renderActiveCard()}
      </div>

      {/* Enhanced Professional Disclaimer */}
      <div className="legal-disclaimer">
        <div className="disclaimer-title">⚖️ Important Legal Notice</div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 206, 84, 0.05))',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '15px'
        }}>
          <strong style={{ color: '#d97706', fontSize: '16px' }}>NOT LEGAL REPRESENTATION</strong>
          <p style={{ margin: '10px 0 0 0', color: '#d97706', fontSize: '14px', lineHeight: '1.5' }}>
            This AI assistant provides general information only and does not constitute legal advice, representation, or attorney-client relationship.
          </p>
        </div>
        <p style={{ lineHeight: '1.7' }}>
          The information provided here is for general guidance and educational purposes only.
          Based on typical legal scenarios, this analysis helps you understand your rights and obligations.
          However, every legal situation is unique, and the applicability of laws depends on specific circumstances.
        </p>
        <p style={{ marginTop: '15px', lineHeight: '1.7' }}>
          I strongly recommend consulting with a qualified legal professional for advice tailored to your particular situation.
          This consultation interface does not create an attorney-client relationship and should not be relied upon as legal advice.
        </p>
      </div>
    </div>
  )
}

export default App