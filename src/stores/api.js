import { defineStore } from 'pinia'
import axios from 'axios'
import { useAdminAuthStore } from './adminAuth'
import { useAuthStore } from './auth'

// Create a custom axios instance
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  transformRequest: [function (data, headers) {
    // Don't transform FormData
    if (data instanceof FormData) {
      return data
    }
    // For other data, use default JSON transformation
    if (typeof data === 'object' && data !== null) {
      headers['Content-Type'] = 'application/json'
      return JSON.stringify(data)
    }
    return data
  }],
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const adminAuthStore = useAdminAuthStore()
    const authStore = useAuthStore()

    // Select the correct token based on the request URL
    const isAdminRoute = config.url.startsWith('/admin')

    let token = null
    if (isAdminRoute && adminAuthStore.token) {
      token = adminAuthStore.token
    } else if (authStore.token) {
      token = authStore.token
    } else if (adminAuthStore.token) {
      // Fallback for cases where an admin might be accessing non-admin routes
      token = adminAuthStore.token
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log(`[API] Adding token to request: ${config.url}`)
    } else {
      console.log(`[API] No token available for request: ${config.url}`)
    }
    return config

  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to log errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('[API Error]', error.config?.url, error.response.status, error.response.data)
    } else if (error.request) {
      console.error('[API Error] No response received', error.config?.url, error.message)
    } else {
      console.error('[API Error]', error.message)
    }
    return Promise.reject(error)
  }
)

export const useApiStore = defineStore('api', {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async get(url, config = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get(url, config)
        return response.data
      } catch (error) {
        this.error = error.response?.data || error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async post(url, data, config = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.post(url, data, config)
        return response.data
      } catch (error) {
        this.error = error.response?.data || error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async put(url, data, config = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.put(url, data, config)
        return response.data
      } catch (error) {
        this.error = error.response?.data || error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async delete(url, config = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.delete(url, config)
        return response.data
      } catch (error) {
        this.error = error.response?.data || error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})