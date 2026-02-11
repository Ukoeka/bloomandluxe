import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const loading = ref(false)
  const error = ref(null)

  const addToCart = (product) => {
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

  const removeFromCart = (product_id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== product_id)
    saveCartToLocalStorage()
  }

  const updateQuantity = (product_id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product_id)
    } else {
      const item = cartItems.value.find(item => item.id === product_id)
      if (item) {
        item.quantity = quantity
        saveCartToLocalStorage()
      }
    }
  }

  const getTotalItems = () => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.value.reduce((total, item) => total + (Number(item.price) * item.quantity), 0)
  }

  const clearCart = () => {
    cartItems.value = []
    saveCartToLocalStorage()
  }

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
      } catch (err) {
        console.error('Failed to load cart from localStorage:', err)
        cartItems.value = []
      }
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