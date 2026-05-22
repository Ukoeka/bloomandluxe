// src/stores/auth.js
/* eslint-disable */
import { defineStore } from 'pinia'
import { useApiStore } from './api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('userToken') || null,
    registerError: null,
    registerLoading: false,
    loginError: null,
    loginLoading: false,
    forgotPasswordLoading: false,
    forgotPasswordError: null,
    resetPasswordLoading: false,
    resetPasswordError: null,
  }),

  getters: {
    isAuthenticated: (state) => {
      const auth = !!state.token || !!state.user
      console.log('[Auth Store] isAuthenticated:', auth, 'token:', !!state.token, 'user:', !!state.user)
      return auth
    }
  },

  actions: {
    async register(payload) {
      this.registerLoading = true
      this.registerError = null

      const api = useApiStore()

      try {
        // Adjust the URL to match your backend register endpoint
        const response = await api.post('/register', payload)
        // Backend returns { success, message, data: { user, token } }
        this.user = response.data?.user || null
        this.token = response.data?.token || null
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        if (this.token) {
          localStorage.setItem('userToken', this.token)
        }
        return response
      } catch (err) {
        this.registerError =
          err.response?.data?.message ||
          err.message ||
          'Registration failed. Please try again.'
        throw err
      } finally {
        this.registerLoading = false
      }
    },


    async login(payload) {
      this.loginLoading = true
      this.loginError = null

      const api = useApiStore()

      try {
        console.log('[Auth Store] Attempting login with:', payload.email)
        // Adjust the URL to match your backend login endpoint
        const response = await api.post('/login', payload)
        console.log('[Auth Store] Login response:', response)
        
        // Backend returns { success, message, data: { user, token } }
        this.user = response.data?.user || null
        this.token = response.data?.token || null
        
        console.log('[Auth Store] Setting user:', this.user)
        console.log('[Auth Store] Setting token:', this.token ? 'present' : 'missing')
        
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        if (this.token) {
          localStorage.setItem('userToken', this.token)
        }

        return response
      } catch (err) {
        console.error('[Auth Store] Login failed:', err)
        this.loginError =
          err.response?.data?.message ||
          err.message ||
          'Login failed. Please try again.'
        throw err
      } finally {
        this.loginLoading = false
      }
    },

    async forgotPassword(payload) {
      this.forgotPasswordLoading = true
      this.forgotPasswordError = null

      const api = useApiStore()

      try {
        const response = await api.post('/forgot-password', payload)
        return response
      } catch (err) {
        this.forgotPasswordError =
          err.response?.data?.message ||
          err.message ||
          'Failed to send reset link. Please try again.'
        throw err
      } finally {
        this.forgotPasswordLoading = false
      }
    },

    async resetPassword(payload) {
      this.resetPasswordLoading = true
      this.resetPasswordError = null

      const api = useApiStore()

      try {
        const response = await api.post('/reset-password', payload)
        return response
      } catch (err) {
        this.resetPasswordError =
          err.response?.data?.message ||
          err.message ||
          'Failed to reset password. Please try again.'
        throw err
      } finally {
        this.resetPasswordLoading = false
      }
    },

    logout() {
      console.log('[Auth Store] Logging out, clearing user and token')
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('userToken')
    },

    async fetchOrders() {
      const api = useApiStore()
      try {
        const response = await api.get('/orders')
        return response.data // response is { success: true, message: '...', data: [...] }
      } catch (err) {
        throw err
      }
    },

    async fetchOrderDetails(orderId) {
      const api = useApiStore()
      try {
        const response = await api.get(`/orders/${orderId}`)
        return response.data
      } catch (err) {
        throw err
      }
    },

    async createDispute(formData) {
      const api = useApiStore()
      try {
        const response = await api.post('/disputes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      } catch (err) {
        throw err
      }
    }
  },
})
