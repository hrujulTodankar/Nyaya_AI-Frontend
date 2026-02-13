import React, { useState } from 'react'
import { legalQueryService } from '../services/nyayaApi.js'

// Validate that traceId is a valid non-empty string
const isValidTraceId = (traceId) => {
  return typeof traceId === 'string' && traceId.length > 0 && traceId.trim().length > 0
}

// Validate that feedback value is a boolean
const isValidFeedbackValue = (value) => {
  return typeof value === 'boolean'
}

// Validate feedback type is one of the allowed types
const isValidFeedbackType = (type) => {
  const allowedTypes = ['helpful', 'clear', 'matches_situation', 'clarity', 'correctness', 'usefulness']
  return allowedTypes.includes(type)
}

const FeedbackButtons = ({ traceId, context = '' }) => {
  const [feedback, setFeedback] = useState({
    helpful: null, // true, false, or null
    clear: null, // true, false, or null
    matchesSituation: null // true, false, or null
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const submitFeedback = async (type, value) => {
    // Validate traceId before sending signal
    if (!isValidTraceId(traceId)) {
      console.log('Skipping feedback submission - no valid trace ID (demo mode)')
      return // Silently skip in demo mode
    }

    // Skip if trace ID is a mock ID
    if (traceId.startsWith('mock_')) {
      console.log('Skipping feedback submission - mock trace ID (demo mode)')
      return // Silently skip for mock IDs
    }

    // Validate feedback value
    if (!isValidFeedbackValue(value)) {
      setError('Invalid feedback value')
      console.warn('Attempted to submit feedback with invalid value:', value)
      return
    }

    // Validate feedback type
    if (!isValidFeedbackType(type)) {
      setError('Invalid feedback type')
      console.warn('Attempted to submit feedback with invalid type:', type)
      return
    }

    setError(null)
    setSubmitting(true)
    try {
      // Map boolean feedback to 1-5 rating scale
      // true → 5 (positive), false → 1 (negative)
      const rating = value ? 5 : 1
      
      const feedbackData = {
        trace_id: traceId,
        rating: rating,
        feedback_type: type,
        comment: `${context} - ${type}: ${value ? 'positive' : 'negative'}`
      }

      const result = await legalQueryService.submitFeedback(feedbackData)
      
      if (result.success) {
        console.log(`Feedback submitted successfully: ${type} = ${value}`)
      } else {
        setError(result.error || 'Failed to submit feedback')
        console.error('Feedback submission error:', result.error)
      }
    } catch (error) {
      setError('Failed to submit feedback')
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
      border: '1px solid #e9ecef',
      position: 'relative',
      zIndex: 10
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

      {/* Error display */}
      {error && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '6px',
          color: '#721c24',
          fontSize: '13px'
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default FeedbackButtons