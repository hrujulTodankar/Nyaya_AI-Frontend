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
        
        // Display actual backend response
        const backendData = result.data
        console.log('Backend Response:', backendData)
        
        setResponse({
          // Core backend data
          confidence: backendData.confidence || 0,
          jurisdiction: backendData.jurisdiction || 'Unknown',
          domain: backendData.domain || 'General',
          
          // Legal assessment from backend
          legalRoute: backendData.legal_route || [],
          constitutionalArticles: backendData.constitutional_articles || [],
          reasoningTrace: backendData.reasoning_trace || {},
          
          // Full backend response for display
          fullResponse: backendData
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

      {/* Response Section - Backend Legal Assessment */}
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
            fontSize: '24px',
            color: '#fff',
            marginBottom: '24px',
            borderBottom: '2px solid rgba(59, 130, 246, 0.5)',
            paddingBottom: '12px'
          }}>
            🏛️ Legal Assessment from Backend
          </h3>

          {/* Jurisdiction & Domain */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px'
            }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginBottom: '4px' }}>Jurisdiction</div>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>{response.jurisdiction}</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px'
            }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginBottom: '4px' }}>Domain</div>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>{response.domain}</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px'
            }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginBottom: '4px' }}>Confidence</div>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>{Math.round(response.confidence * 100)}%</div>
            </div>
          </div>

          {/* Legal Route */}
          {response.legalRoute && response.legalRoute.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                color: '#fff', 
                fontSize: '18px', 
                marginBottom: '12px'
              }}>
                📋 Legal Route
              </h4>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px'
              }}>
                {response.legalRoute.map((agent, idx) => (
                  <div key={idx} style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    padding: '8px 0',
                    borderBottom: idx < response.legalRoute.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                  }}>
                    {idx + 1}. {agent}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Constitutional Articles */}
          {response.constitutionalArticles && response.constitutionalArticles.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                color: '#fff', 
                fontSize: '18px', 
                marginBottom: '12px'
              }}>
                ⚖️ Constitutional Articles
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {response.constitutionalArticles.map((article, idx) => (
                  <span key={idx} style={{
                    padding: '8px 16px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '20px',
                    color: '#f59e0b',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {article}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reasoning Trace */}
          {response.reasoningTrace && Object.keys(response.reasoningTrace).length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                color: '#fff', 
                fontSize: '18px', 
                marginBottom: '12px'
              }}>
                🧠 Reasoning Trace
              </h4>
              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px'
              }}>
                <pre style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  fontFamily: 'monospace'
                }}>
                  {JSON.stringify(response.reasoningTrace, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Full Backend Response */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ 
              color: '#fff', 
              fontSize: '18px', 
              marginBottom: '12px'
            }}>
              📊 Complete Backend Response
            </h4>
            <div style={{
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              <pre style={{
                color: '#10b981',
                fontSize: '12px',
                lineHeight: '1.5',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(response.fullResponse, null, 2)}
              </pre>
            </div>
          </div>

          {/* Trace ID */}
          <div style={{
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>Trace ID: </span>
            <span style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace' }}>{traceId}</span>
          </div>

          {/* Feedback Section */}
          <FeedbackButtons traceId={traceId} context="Legal Query Response" />
        </div>
      )}
    </>
  )
}

export default LegalQueryCard