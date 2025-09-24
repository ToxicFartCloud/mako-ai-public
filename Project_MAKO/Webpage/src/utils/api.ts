
import axios from 'axios'

// Configuration for your local server
const LOCAL_SERVER_URL = 'http://localhost:3001' // Adjust port as needed
const FALLBACK_EMAIL = 'contact@mako-ai.org'

// Create axios instance with default config
const api = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
})

// Contact form data interface
export interface ContactFormData {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
}

// Function to send contact form data to your local server
export const sendContactMessage = async (formData: ContactFormData) => {
  try {
    // First, try to send to your local server
    const response = await api.post(`${LOCAL_SERVER_URL}/api/contact`, {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'mako-ai.org'
    })

    return response.data
  } catch (error) {
    console.error('Failed to send to local server:', error)

    // Fallback: Log the message locally and provide user feedback
    console.log('Contact Form Submission (Local Storage Fallback):', {
      ...formData,
      timestamp: new Date().toISOString(),
      note: 'This message was stored locally due to server connectivity issues'
    })

    // Store in localStorage as backup
    const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]')
    existingMessages.push({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    })
    localStorage.setItem('contact_messages', JSON.stringify(existingMessages))

    // For production, you might want to queue this for retry
    throw new Error('Unable to connect to server. Message saved locally for retry.')
  }
}

// Function to get stored messages (for debugging/admin purposes)
export const getStoredMessages = () => {
  return JSON.parse(localStorage.getItem('contact_messages') || '[]')
}

// Function to clear stored messages (after successful sync)
export const clearStoredMessages = () => {
  localStorage.removeItem('contact_messages')
}

// Health check function for your local server
export const checkServerHealth = async () => {
  try {
    const response = await api.get(`${LOCAL_SERVER_URL}/api/health`)
    return response.status === 200
  } catch (error) {
    console.warn('Local server health check failed:', error)
    return false
  }
}

// Example function for other API calls you might need
export const sendAnalytics = async (eventData: any) => {
  try {
    await api.post(`${LOCAL_SERVER_URL}/api/analytics`, eventData)
  } catch (error) {
    console.error('Analytics send failed:', error)
    // Silently fail for analytics
  }
}

export default api
