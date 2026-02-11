// src/stores/auth.js
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
  }),

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
        // Adjust the URL to match your backend login endpoint
        const response = await api.post('/login', payload)
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
        this.loginError =
          err.response?.data?.message ||
          err.message ||
          'Login failed. Please try again.'
        throw err
      } finally {
        this.loginLoading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('userToken')
    },
  },
})
