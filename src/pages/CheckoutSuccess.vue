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
                <p><strong>Total Amount:</strong> ${{ orderInfo.total_amount }}</p>
                <p><strong>Status:</strong> <span class="badge bg-success">{{ orderInfo.status }}</span></p>
              </div>

              <div class="action-buttons">
                <router-link to="/" class="theme-btn me-3">
                  Continue Shopping
                </router-link>
                <router-link :to="`/order?order_id=${orderInfo?.id}`" class="theme-btn" v-if="orderInfo">
                  View Order
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'CheckoutSuccess',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const apiStore = useApiStore()
    const orderInfo = ref(null)
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

