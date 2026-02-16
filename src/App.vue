<template>
  <div id="app">
    <!-- Wait until cart is restored before rendering the app -->
    <router-view v-if="cartInitialized" />
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'App',
  setup() {
    const cartStore = useCartStore()

    // Load cart ONLY when app starts (correct lifecycle)
    onMounted(() => {
      cartStore.loadCart()
    })

    // Prevent UI from rendering before hydration finishes
    const cartInitialized = computed(() => cartStore.initialized)

    return {
      cartInitialized
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
