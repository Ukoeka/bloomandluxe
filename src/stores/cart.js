import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // ---------------- STATE ----------------
  const cartItems = ref([])
  const loading = ref(false)
  const error = ref(null)

  // This tells the UI when cart has been restored from localStorage
  const initialized = ref(false)

  // ---------------- ACTIONS ----------------

  const addToCart = (product) => {
    const quantity = product.quantity || 1

    const existingItem = cartItems.value.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        ...product,
        quantity
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
      return
    }

    const item = cartItems.value.find(item => item.id === product_id)

    if (item) {
      item.quantity = quantity
      saveCartToLocalStorage()
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCartToLocalStorage()
  }

  // ---------------- GETTERS ----------------

  const getTotalItems = () => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.value.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    )
  }

  // ---------------- LOCAL STORAGE ----------------

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  /**
   * IMPORTANT:
   * This must be called manually from App.vue
   * DO NOT auto-run inside the store.
   */
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cart')

      if (savedCart) {
        const parsed = JSON.parse(savedCart)

        if (Array.isArray(parsed)) {
          cartItems.value = parsed
        } else {
          cartItems.value = []
          localStorage.removeItem('cart')
        }
      } else {
        cartItems.value = []
      }
    } catch (err) {
      console.error('Failed to load cart:', err)
      cartItems.value = []
      localStorage.removeItem('cart')
    }

    initialized.value = true
  }

  // ---------------- RETURN ----------------

  return {
    cartItems,
    loading,
    error,
    initialized,

    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    getTotalItems,
    getTotalPrice,

    loadCart
  }
})
