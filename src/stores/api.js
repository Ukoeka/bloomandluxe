import { defineStore } from 'pinia'
import axios from 'axios'

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
        const response = await axios.get(url, config)
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
        const response = await axios.post(url, data, config)
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
        const response = await axios.put(url, data, config)
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
        const response = await axios.delete(url, config)
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