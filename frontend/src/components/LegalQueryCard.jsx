import React, { useState } from 'react'
import FeedbackButtons from './FeedbackButtons.jsx'

const LegalQueryCard = () => {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState(null)
  const [traceId, setTraceId] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call to Nyaya AI backend
    try {
      // This would integrate with the actual Nyaya AI API
      setTimeout(() => {
        const mockTraceId = 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        setTraceId(mockTraceId)
        setResponse({
          confidence: 0.85,
          jurisdiction: 'India',
          analysis: `Based on what you've described, under Indian law, your situation involves several important considerations. Let me break this down for you in clear terms...`,
          recommendations: [
            'Document all relevant communications and transactions',
            'Consider speaking with a local legal professional',
            'Review the specific facts against the applicable statutes'
          ]
        })
        setIsSubmitting(false)
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="consultation-card">
      {/* Eye-catching header with icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          💬
        </div>
        <div>
          <h2 style={{
            fontSize: '1.8rem',
            color: '#2c3e50',
            margin: 0,
            fontWeight: '700'
          }}>
            Get Legal Guidance
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            AI-powered analysis in seconds
          </p>
        </div>
      </div>

      {/* Benefits section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
        marginBottom: '25px'
      }}>
        {[
          { icon: '⚡', text: 'Instant Response' },
          { icon: '🌍', text: 'Multi-Jurisdiction' },
          { icon: '🔒', text: 'Confidential' }
        ].map((benefit, i) => (
          <div key={i} style={{
            flex: 1,
            padding: '12px',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '5px' }}>{benefit.icon}</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#667eea' }}>{benefit.text}</div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <form onSubmit={handleSubmit}>
        <div className="consultation-section">
          <div className="section-label">Describe Your Legal Situation</div>
          <textarea
            className="consultation-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: I signed a contract for services, but the other party hasn't delivered. What are my options?"
            style={{
              minHeight: '140px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <button
          type="submit"
          className="consultation-btn"
          disabled={isSubmitting || !query.trim()}
          style={{ 
            width: '100%',
            fontSize: '16px',
            padding: '16px'
          }}
        >
          {isSubmitting ? '🔍 Analyzing Your Case...' : '✨ Get Legal Analysis'}
        </button>
      </form>

      {/* Response Section */}
      {response && (
        <div style={{ 
          marginTop: '25px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: '#2c3e50',
            marginBottom: '15px'
          }}>
            My Legal Assessment
          </h3>
          
          <p style={{ 
            marginBottom: '15px', 
            lineHeight: '1.6' 
          }}>
            {response.analysis}
          </p>

          <div style={{ marginBottom: '15px' }}>
            <strong>Analysis Confidence:</strong> {Math.round(response.confidence * 100)}%
          </div>

          <div>
            <strong style={{ display: 'block', marginBottom: '10px' }}>
              Suggested Actions:
            </strong>
            <ul style={{ paddingLeft: '20px' }}>
              {response.recommendations.map((rec, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Feedback Section */}
          <FeedbackButtons traceId={traceId} context="Legal Query Response" />
        </div>
      )}
    </div>
  )
}

export default LegalQueryCard