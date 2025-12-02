import { defineStore } from 'pinia'
import axios from 'axios'
import { useAdminAuthStore } from './adminAuth'

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
    if (adminAuthStore.token) {
      config.headers.Authorization = `Bearer ${adminAuthStore.token}`
    }
    return config
  },
  (error) => {
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