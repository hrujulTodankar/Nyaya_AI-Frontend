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
      {/* Advisory-Style Heading */}
      <h2 style={{
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '20px',
        fontWeight: '400'
      }}>
        Let's Discuss Your Legal Matter
      </h2>

      {/* Consultation-Grade Section Label */}
      <div className="consultation-section">
        <div className="section-label">Please Describe Your Situation</div>
        <p style={{
          fontSize: '14px',
          color: '#6c757d',
          marginBottom: '15px',
          fontStyle: 'italic'
        }}>
          To provide you with the most accurate guidance, please share as many relevant details as possible about your circumstances.
        </p>
      </div>

      {/* Input with Conversational Placeholder */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="consultation-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I've encountered a legal issue and need to understand my rights and potential options. Based on what you've described, could you explain how the law applies to my situation and what steps I should consider?"
          style={{
            minHeight: '120px',
            fontSize: '16px'
          }}
        />
        
        <button
          type="submit"
          className="consultation-btn"
          disabled={isSubmitting || !query.trim()}
          style={{ width: '100%' }}
        >
          {isSubmitting ? 'Reviewing Your Case...' : 'Provide Legal Analysis'}
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