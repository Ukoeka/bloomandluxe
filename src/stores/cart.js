import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiStore } from './api'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const loading = ref(false)
  const error = ref(null)

  const addToCart = async (product) => {
    loading.value = true
    error.value = null
    const api = useApiStore()
    try {
      const response = await api.post('/cart', { action: 'add', product_id: product.id, quantity: 1 })
      // If API returns updated cart with full product data, use it
      if (response.items && response.items.length > 0) {
        cartItems.value = response.items
        saveCartToLocalStorage()
      } else {
        // Update local cart if API doesn't return full cart
        const existingItem = cartItems.value.find(item => item.id === product.id)
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          cartItems.value.push({
            ...product,
            quantity: 1
          })
        }
        saveCartToLocalStorage()
      }
    } catch (err) {
      error.value = err.message || 'Failed to add item to cart'
      // Fallback to local update
      const existingItem = cartItems.value.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cartItems.value.push({
          ...product,
          quantity: 1
        })
      }
      saveCartToLocalStorage()
    } finally {
      loading.value = false
    }
  }

  const removeFromCart = async (product_id) => {
    loading.value = true
    error.value = null
    const api = useApiStore()
    try {
      const response = await api.post('/cart', { action: 'remove', product_id })
      // If API returns updated cart, use it
      if (response.items) {
        cartItems.value = response.items
        saveCartToLocalStorage()
      } else {
        // Otherwise remove locally
        cartItems.value = cartItems.value.filter(item => item.id !== product_id)
        saveCartToLocalStorage()
      }
    } catch (err) {
      error.value = err.message || 'Failed to remove item from cart'
      // Fallback to local update
      cartItems.value = cartItems.value.filter(item => item.id !== product_id)
      saveCartToLocalStorage()
    } finally {
      loading.value = false
    }
  }

  const updateQuantity = async (product_id, quantity) => {
    loading.value = true
    error.value = null
    const api = useApiStore()
    try {
      if (quantity <= 0) {
        await removeFromCart(product_id)
      } else {
        const response = await api.post('/cart', { action: 'update', product_id, quantity })
        // If API returns updated cart, use it
        if (response.items) {
          cartItems.value = response.items
          saveCartToLocalStorage()
        } else {
          // Otherwise update locally
          const item = cartItems.value.find(item => item.id === product_id)
          if (item) {
            item.quantity = quantity
          }
          saveCartToLocalStorage()
        }
      }
    } catch (err) {
      error.value = err.message || 'Failed to update item quantity'
      // Fallback to local update
      const item = cartItems.value.find(item => item.id === product_id)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          cartItems.value = cartItems.value.filter(i => i.id !== product_id)
        } else {
          saveCartToLocalStorage()
        }
      }
    } finally {
      loading.value = false
    }
  }

  const getTotalItems = () => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.value.reduce((total, item) => total + (Number(item.price) * item.quantity), 0)
  }

  const clearCart = async () => {
    loading.value = true
    error.value = null
    const api = useApiStore()
    try {
      const response = await api.post('/cart', { action: 'clear' })
      // If API returns updated cart, use it
      if (response.items) {
        cartItems.value = response.items
        saveCartToLocalStorage()
      } else {
        // Otherwise clear locally
        cartItems.value = []
        saveCartToLocalStorage()
      }
    } catch (err) {
      error.value = err.message || 'Failed to clear cart'
      // Fallback to local clear
      cartItems.value = []
      saveCartToLocalStorage()
    } finally {
      loading.value = false
    }
  }

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const loadCart = async () => {
    loading.value = true
    error.value = null
    const api = useApiStore()
    try {
      const response = await api.get('/cart')
      // If API returns cart items with full product data, use them directly
      if (response.items && response.items.length > 0 && response.items[0].name) {
        cartItems.value = response.items
      } else {
        // If API only returns cart data with product_ids, we need to fetch product details
        // For now, fall back to localStorage which should have full product data
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          cartItems.value = JSON.parse(savedCart)
        } else {
          cartItems.value = []
        }
      }
    } catch (err) {
      error.value = err.message || 'Failed to load cart'
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        cartItems.value = JSON.parse(savedCart)
      }
    } finally {
      loading.value = false
    }
  }

  // Load cart on store initialization
  loadCart()

  return {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
    loadCart
  }
})