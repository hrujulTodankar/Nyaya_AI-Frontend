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
          caseType: query.toLowerCase().includes('contract') ? 'Contract Dispute' :
                     query.toLowerCase().includes('property') ? 'Property Dispute' :
                     query.toLowerCase().includes('criminal') ? 'Criminal Matter' : 'Civil Matter',
          analysis: `Based on your legal question, under Indian law, your situation involves several important considerations. The facts you've described suggest potential legal remedies and courses of action that should be carefully evaluated.`,
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
            },
            {
              step: 'Send Legal Notice',
              description: 'Consider sending a formal legal notice to the other party outlining your grievances and demands',
              priority: 'Medium',
              timeline: 'Within 2-3 weeks'
            },
            {
              step: 'Explore Settlement',
              description: 'Attempt negotiation or mediation before pursuing formal litigation',
              priority: 'Medium',
              timeline: 'Within 1 month'
            }
          ],
          jurisdictionProcedure: query.toLowerCase().includes('contract') ? [
            { step: 1, title: 'Send Legal Notice', description: 'Send formal legal notice under Section 80 CPC demanding resolution', duration: '1-2 weeks' },
            { step: 2, title: 'Attempt Mediation', description: 'Engage in court-annexed or private mediation to resolve dispute amicably', duration: '2-4 weeks' },
            { step: 3, title: 'File Civil Suit', description: 'File suit in appropriate civil court for breach of contract and damages', duration: '1-2 months' },
            { step: 4, title: 'Trial Proceedings', description: 'Present evidence, examine witnesses, and argue case before judge', duration: '1-2 years' },
            { step: 5, title: 'Judgment & Appeal', description: 'Receive judgment and file appeal if necessary in higher court', duration: '6-12 months' }
          ] : query.toLowerCase().includes('property') ? [
            { step: 1, title: 'Title Verification', description: 'Verify property title and ownership documents with legal expert', duration: '1-2 weeks' },
            { step: 2, title: 'Legal Notice', description: 'Send legal notice to opposing party asserting your rights', duration: '1 week' },
            { step: 3, title: 'File Suit', description: 'File suit for declaration, possession, or injunction in civil court', duration: '2-3 months' },
            { step: 4, title: 'Interim Relief', description: 'Apply for temporary injunction to maintain status quo', duration: '1-2 months' },
            { step: 5, title: 'Final Decree', description: 'Obtain final decree and execute through court process', duration: '2-3 years' }
          ] : [
            { step: 1, title: 'Legal Consultation', description: 'Consult with lawyer to understand your legal position and options', duration: '1 week' },
            { step: 2, title: 'Gather Evidence', description: 'Collect all relevant documents and evidence supporting your case', duration: '2-3 weeks' },
            { step: 3, title: 'File Complaint/Suit', description: 'File appropriate legal action in relevant court or tribunal', duration: '1-2 months' },
            { step: 4, title: 'Court Proceedings', description: 'Attend hearings and present your case before the court', duration: '6-18 months' },
            { step: 5, title: 'Judgment', description: 'Receive court judgment and pursue enforcement if favorable', duration: '3-6 months' }
          ],
          recommendations: [
            'Review the limitation period for your type of case',
            'Preserve all evidence in its original form',
            'Avoid direct confrontation with the other party without legal counsel'
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