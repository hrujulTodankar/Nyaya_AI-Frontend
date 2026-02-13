import React, { useState } from 'react'
import FeedbackButtons from './FeedbackButtons.jsx'
import { legalQueryService } from '../services/nyayaApi.js'

const LegalQueryCard = () => {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState(null)
  const [traceId, setTraceId] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSubmitting(true)
    setResponse(null)
    
    try {
      const result = await legalQueryService.submitQuery({
        query: query,
        jurisdiction_hint: 'India'
      })

      if (result.success) {
        setTraceId(result.trace_id)
        setResponse({
          confidence: result.data.confidence || 0.85,
          jurisdiction: result.data.jurisdiction || 'India',
          caseType: result.data.domain || 'General Legal Matter',
          analysis: result.data.reasoning_trace?.summary || 'Legal analysis completed. Please consult with a legal professional for detailed advice.',
          nextSteps: [
            {
              step: 'Document Everything',
              description: 'Gather and organize all relevant documents, communications, contracts, and evidence related to your case',
              priority: 'Immediate',
              timeline: 'Within 24-48 hours'
            },
            {
              step: 'Consult Legal Professional',
              description: 'Schedule consultation with a lawyer specializing in this area to review your specific circumstances',
              priority: 'High',
              timeline: 'Within 1 week'
            }
          ],
          jurisdictionProcedure: [
            { step: 1, title: 'Legal Consultation', description: 'Consult with lawyer to understand your legal position and options', duration: '1 week' },
            { step: 2, title: 'Gather Evidence', description: 'Collect all relevant documents and evidence supporting your case', duration: '2-3 weeks' },
            { step: 3, title: 'File Complaint/Suit', description: 'File appropriate legal action in relevant court or tribunal', duration: '1-2 months' }
          ],
          recommendations: [
            'Review the limitation period for your type of case',
            'Preserve all evidence in its original form',
            'Consult with a licensed attorney for specific legal advice'
          ]
        })
      } else {
        alert(`Error: ${result.error || 'Failed to get response from backend'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert(`Error: ${error.message || 'Failed to connect to backend'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Query Form */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '32px'
      }}>
        <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '24px' }}>Ask Legal Question</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your legal question..."
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              resize: 'vertical',
              marginBottom: '16px'
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting || !query.trim()}
            style={{
              padding: '12px 32px',
              background: isSubmitting || !query.trim() ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isSubmitting || !query.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Analyzing...' : 'Get Legal Analysis'}
          </button>
        </form>
      </div>

      {/* Response Section */}
      {response && (
        <div style={{ 
          marginTop: '25px', 
          padding: '32px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px'
        }}>
          <h3 style={{
            fontSize: '20px',
            color: '#fff',
            marginBottom: '16px'
          }}>
            Legal Assessment
          </h3>
          
          <p style={{ 
            marginBottom: '24px', 
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            {response.analysis}
          </p>

          <div style={{ marginBottom: '24px', color: 'rgba(255, 255, 255, 0.8)' }}>
            <strong>Analysis Confidence:</strong> {Math.round(response.confidence * 100)}%
          </div>

          {/* Suggested Next Legal Steps */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ 
              color: '#fff', 
              fontSize: '18px', 
              marginBottom: '16px',
              borderBottom: '2px solid rgba(59, 130, 246, 0.5)',
              paddingBottom: '8px'
            }}>
              Suggested Next Legal Steps
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {response.nextSteps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#fff'
                      }}>
                        {index + 1}
                      </div>
                      <h5 style={{ color: '#fff', fontSize: '16px', margin: 0, fontWeight: '600' }}>
                        {step.step}
                      </h5>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{
                        padding: '4px 12px',
                        background: step.priority === 'Immediate' ? 'rgba(239, 68, 68, 0.2)' : 
                                   step.priority === 'High' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                        border: step.priority === 'Immediate' ? '1px solid rgba(239, 68, 68, 0.4)' : 
                               step.priority === 'High' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(59, 130, 246, 0.4)',
                        borderRadius: '12px',
                        color: step.priority === 'Immediate' ? '#ef4444' : 
                               step.priority === 'High' ? '#f59e0b' : '#3b82f6',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {step.priority}
                      </span>
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {step.timeline}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Jurisdiction-Specific Legal Procedure */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ 
              color: '#fff', 
              fontSize: '18px', 
              marginBottom: '16px',
              borderBottom: '2px solid rgba(139, 92, 246, 0.5)',
              paddingBottom: '8px'
            }}>
              {response.caseType} Procedure in {response.jurisdiction}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {response.jurisdictionProcedure.map((proc, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    {proc.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ color: '#fff', fontSize: '15px', margin: '0 0 6px 0', fontWeight: '600' }}>
                      {proc.title}
                    </h5>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                      {proc.description}
                    </p>
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    borderRadius: '12px',
                    color: '#a78bfa',
                    fontSize: '12px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    {proc.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Recommendations */}
          <div>
            <strong style={{ display: 'block', marginBottom: '12px', color: '#fff', fontSize: '16px' }}>
              Additional Recommendations:
            </strong>
            <ul style={{ paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              {response.recommendations.map((rec, index) => (
                <li key={index} style={{ marginBottom: '8px', lineHeight: '1.6' }}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Feedback Section */}
          <FeedbackButtons traceId={traceId} context="Legal Query Response" />
        </div>
      )}
    </>
  )
}

export default LegalQueryCard