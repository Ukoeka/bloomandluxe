// src/stores/auth.js
import { defineStore } from 'pinia'
import { useApiStore } from './api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
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
        const data = await api.post('/api/register', payload)
        // assuming the backend returns user data
        this.user = data.user || null
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        return data
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
        const data = await api.post('/api/login', payload)
        // assuming the backend returns user data
        this.user = data.user || null
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        return data
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
      localStorage.removeItem('user')
    },
  },
})
