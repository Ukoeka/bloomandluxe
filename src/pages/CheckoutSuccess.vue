<template>
  <SharedLayout>
    <section class="checkout-section fix section-padding">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="checkout-success-wrapper text-center">
              <div class="success-icon mb-4">
                <i class="fas fa-check-circle" style="font-size: 80px; color: #28a745;"></i>
              </div>
              <h2 class="mb-3">Payment Successful!</h2>
              <p class="lead mb-4">Thank you for your order. Your payment has been processed successfully.</p>
              
              <div v-if="orderInfo" class="order-details mb-4 p-4" style="background: #f8f9fa; border-radius: 8px;">
                <h4 class="mb-3">Order Details</h4>
                <p><strong>Order Number:</strong> {{ orderInfo.order_number }}</p>
                <p><strong>Total Amount:</strong> AUD {{ orderInfo.total_amount }}</p>
                <p><strong>Status:</strong> <span class="badge bg-success">{{ orderInfo.status }}</span></p>
              </div>

              <p v-if="orderInfo && !isLoggedIn" class="text-muted mb-4">
                Save your order number for your records.
                <template v-if="orderEmail">
                  Log in or sign up with <strong>{{ orderEmail }}</strong> to view this order in My Orders.
                </template>
                <template v-else>
                  <router-link :to="{ path: '/login', query: { redirect: '/my-orders' } }">Log in</router-link>
                  to track your orders.
                </template>
              </p>

              <div class="action-buttons">
                <router-link to="/" class="theme-btn me-3">
                  Continue Shopping
                </router-link>
                <router-link
                  v-if="orderInfo && isLoggedIn"
                  :to="`/order-details/${orderInfo.id}`"
                  class="theme-btn"
                >
                  View Order
                </router-link>
                <router-link
                  v-else-if="!isLoggedIn"
                  :to="{ path: '/login', query: { redirect: '/my-orders' } }"
                  class="theme-btn"
                >
                  Log in to track orders
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SharedLayout>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'CheckoutSuccess',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const apiStore = useApiStore()
    const authStore = useAuthStore()
    const orderInfo = ref(null)
    const isLoggedIn = computed(() => !!authStore.token)
    const orderEmail = ref('')
    const loading = ref(true)
    const error = ref(null)

    onMounted(async () => {
      const sessionId = route.query.session_id

      if (sessionId) {
        try {
          // Verify the session and get order info
          const response = await apiStore.post('/cart/verify-order', { session_id: sessionId })
          if (response.order) {
            orderInfo.value = response.order
            orderEmail.value = response.order.customer_email || ''
          }
          loading.value = false
        } catch (err) {
          error.value = 'Failed to verify payment. Please contact support.'
          loading.value = false
          console.error('Error verifying payment:', err)
        }
      } else {
        loading.value = false
      }
    })

    return {
      orderInfo,
      orderEmail,
      isLoggedIn,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.checkout-success-wrapper {
  padding: 60px 20px;
}

.success-icon {
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.order-details {
  text-align: left;
}

.action-buttons {
  margin-top: 30px;
}
</style>

