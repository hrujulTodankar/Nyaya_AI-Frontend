import React, { useState } from 'react'
import { legalQueryService } from '../services/nyayaApi.js'

const FeedbackButtons = ({ traceId, context = '' }) => {
  const [feedback, setFeedback] = useState({
    helpful: null, // true, false, or null
    clear: null, // true, false, or null
    matchesSituation: null // true, false, or null
  })
  const [submitting, setSubmitting] = useState(false)

  const submitFeedback = async (type, value) => {
    if (!traceId) return

    setSubmitting(true)
    try {
      const feedbackData = {
        trace_id: traceId,
        rating: value ? 1 : 0,
        feedback_type: type,
        comment: `${context} - ${type}: ${value ? 'positive' : 'negative'}`
      }

      await legalQueryService.submitFeedback(feedbackData)
      console.log(`Feedback submitted: ${type} = ${value}`)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleFeedback = (type, value) => {
    setFeedback(prev => ({ ...prev, [type]: value }))
    submitFeedback(type, value)
  }

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <h5 style={{
        fontSize: '14px',
        color: '#2c3e50',
        marginBottom: '15px',
        fontWeight: '600'
      }}>
        Help us improve our responses
      </h5>

      {/* Helpful/Not Helpful */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{
          fontSize: '13px',
          color: '#495057',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Was this response helpful?
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleFeedback('helpful', true)}
            disabled={submitting}
            style={{
              padding: '8px 12px',
              border: feedback.helpful === true ? '2px solid #28a745' : '2px solid #e9ecef',
              borderRadius: '6px',
              background: feedback.helpful === true ? '#28a745' : 'white',
              color: feedback.helpful === true ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            👍 Helpful
          </button>
          <button
            onClick={() => handleFeedback('helpful', false)}
            disabled={submitting}
            style={{
              padding: '8px 12px',
              border: feedback.helpful === false ? '2px solid #dc3545' : '2px solid #e9ecef',
              borderRadius: '6px',
              background: feedback.helpful === false ? '#dc3545' : 'white',
              color: feedback.helpful === false ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            👎 Not Helpful
          </button>
        </div>
      </div>

      {/* Was this clear? */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{
          fontSize: '13px',
          color: '#495057',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Was this clear?
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleFeedback('clear', true)}
            disabled={submitting}
            style={{
              padding: '6px 12px',
              border: feedback.clear === true ? '2px solid #28a745' : '2px solid #e9ecef',
              borderRadius: '6px',
              background: feedback.clear === true ? '#28a745' : 'white',
              color: feedback.clear === true ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Yes
          </button>
          <button
            onClick={() => handleFeedback('clear', false)}
            disabled={submitting}
            style={{
              padding: '6px 12px',
              border: feedback.clear === false ? '2px solid #dc3545' : '2px solid #e9ecef',
              borderRadius: '6px',
              background: feedback.clear === false ? '#dc3545' : 'white',
              color: feedback.clear === false ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* Did this match your situation? */}
      <div>
        <div style={{
          fontSize: '13px',
          color: '#495057',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Did this match your situation?
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleFeedback('matches_situation', true)}
            disabled={submitting}
            style={{
              padding: '6px 12px',
              border: feedback.matchesSituation === true ? '2px solid #28a745' : '2px solid #e9ecef',
              borderRadius: '6px',
              background: feedback.matchesSituation === true ? '#28a745' : 'white',
              color: feedback.matchesSituation === true ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Yes
          </button>
          <button
            onClick={() => handleFeedback('matches_situation', false)}
            disabled={submitting}
            style={{
              padding: '6px 12px',
              border: feedback.matchesSituation === false ? '2px solid #dc3545' : '2px solid #e9ecef',
              borderRadius: '6px',
              background: feedback.matchesSituation === false ? '#dc3545' : 'white',
              color: feedback.matchesSituation === false ? 'white' : '#495057',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackButtons