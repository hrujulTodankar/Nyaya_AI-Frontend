// Nyaya AI API Integration Service
// Connects frontend to the existing Nyaya AI backend

import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for adding trace IDs
apiClient.interceptors.request.use(
  (config) => {
    // Add trace ID for request tracking
    config.headers['X-Trace-ID'] = generateTraceId()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

function generateTraceId() {
  return 'frontend_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Legal Query Service
export const legalQueryService = {
  // Single jurisdiction query
  async submitQuery(queryData) {
    try {
      const response = await apiClient.post('/nyaya/query', {
        query: queryData.query,
        jurisdiction_hint: queryData.jurisdiction_hint || 'India',
        domain_hint: queryData.domain_hint,
        user_context: {
          role: 'citizen',
          confidence_required: true
        }
      })
      
      return {
        success: true,
        data: response.data,
        trace_id: response.data.trace_id
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Query failed',
        trace_id: error.response?.data?.trace_id
      }
    }
  },

  // Multi-jurisdiction query
  async submitMultiJurisdictionQuery(queryData) {
    try {
      const response = await apiClient.post('/nyaya/multi_jurisdiction', {
        query: queryData.query,
        jurisdictions: queryData.jurisdictions
      })
      
      return {
        success: true,
        data: response.data,
        trace_id: response.data.trace_id
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Multi-jurisdiction query failed',
        trace_id: error.response?.data?.trace_id
      }
    }
  },

  // Explain reasoning
  async explainReasoning(traceId, explanationLevel = 'detailed') {
    try {
      const response = await apiClient.post('/nyaya/explain_reasoning', {
        trace_id: traceId,
        explanation_level: explanationLevel
      })
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Reasoning explanation failed'
      }
    }
  },

  // Submit feedback for RL engine
  async submitFeedback(feedbackData) {
    try {
      const response = await apiClient.post('/nyaya/feedback', {
        trace_id: feedbackData.trace_id,
        rating: feedbackData.rating,
        feedback_type: feedbackData.feedback_type || 'correctness',
        comment: feedbackData.comment
      })
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Feedback submission failed'
      }
    }
  },

  // Get trace information
  async getTrace(traceId) {
    try {
      const response = await apiClient.get(`/nyaya/trace/${traceId}`)
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Trace retrieval failed'
      }
    }
  }
}

// Health check service
export const healthService = {
  async checkHealth() {
    try {
      const response = await apiClient.get('/health')
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: 'Backend service unavailable'
      }
    }
  }
}

export default {
  legalQuery: legalQueryService,
  health: healthService
}