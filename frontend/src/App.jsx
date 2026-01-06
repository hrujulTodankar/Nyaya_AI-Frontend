import React, { useState } from 'react'
import LegalQueryCard from './components/LegalQueryCard.jsx'
import MultiJurisdictionCard from './components/MultiJurisdictionCard.jsx'
import LegalConsultationCard from './components/LegalConsultationCard.jsx'

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
      default:
        return <LegalQueryCard />
    }
  }

  return (
    <div className="container">
      {/* Header with Advisory-Style Heading */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#2c3e50',
            margin: 0,
            fontWeight: '300'
          }}>
            Legal Consultation Center
          </h1>
          <div style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }}></span>
            Session Active
          </div>
        </div>
        <p style={{
          fontSize: '1.1rem',
          color: '#6c757d',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Based on what you've described, I can help you understand your legal position
          and guide you through the applicable laws and procedures.
        </p>
      </header>

      {/* Card Navigation with Consultation-Grade Labels */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'query', label: 'Ask Your Legal Question', description: 'Get personalized legal guidance' },
          { id: 'multi', label: 'Compare Across Jurisdictions', description: 'Analyze laws across regions' },
          { id: 'consultation', label: 'Schedule Consultation', description: 'Book a detailed legal review' }
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveCard(option.id)}
            style={{
              padding: '12px 20px',
              border: activeCard === option.id ? '2px solid #007bff' : '2px solid #e9ecef',
              borderRadius: '8px',
              background: activeCard === option.id ? '#007bff' : 'white',
              color: activeCard === option.id ? 'white' : '#495057',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <div style={{ fontWeight: '600' }}>{option.label}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{option.description}</div>
          </button>
        ))}
      </nav>

      {/* Active Consultation Card */}
      <div className="consultation-grid">
        {renderActiveCard()}
      </div>

      {/* Professional Disclaimer */}
      <div className="legal-disclaimer">
        <div className="disclaimer-title">⚖️ Important Legal Notice</div>
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px'
        }}>
          <strong style={{ color: '#856404' }}>NOT LEGAL REPRESENTATION</strong>
          <p style={{ margin: '8px 0 0 0', color: '#856404', fontSize: '14px' }}>
            This AI assistant provides general information only and does not constitute legal advice, representation, or attorney-client relationship.
          </p>
        </div>
        <p>
          The information provided here is for general guidance and educational purposes only.
          Based on typical legal scenarios, this analysis helps you understand your rights and obligations.
          However, every legal situation is unique, and the applicability of laws depends on specific circumstances.
        </p>
        <p style={{ marginTop: '10px' }}>
          I strongly recommend consulting with a qualified legal professional for advice tailored to your particular situation.
          This consultation interface does not create an attorney-client relationship and should not be relied upon as legal advice.
        </p>
      </div>
    </div>
  )
}

export default App