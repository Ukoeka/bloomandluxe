import { defineStore } from 'pinia'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useAdminAuthStore = defineStore('adminAuth', {
  state: () => ({
    token: localStorage.getItem('adminToken') || null,
    admin: null,
    isAuthenticated: !!localStorage.getItem('adminToken'),
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await apiClient.post('/admin/login', credentials)
        this.token = response.data.data.token
        this.admin = response.data.data.admin
        this.isAuthenticated = true
        localStorage.setItem('adminToken', this.token)

        return response.data
      } catch (error) {
        this.logout()
        throw error
      }
    },

    logout() {
      this.token = null
      this.admin = null
      this.isAuthenticated = false
      localStorage.removeItem('adminToken')
    },

    checkAuth() {
      const token = localStorage.getItem('adminToken')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        // Optionally, verify token with backend
      } else {
        this.logout()
      }
    },
  },
})