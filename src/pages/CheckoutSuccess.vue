<template>
  <SharedLayout>
    <section class="checkout-section fix section-padding">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div v-if="loading" class="checkout-success-wrapper text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Confirming your payment...</p>
            </div>

            <div v-else-if="error" class="checkout-success-wrapper text-center">
              <div class="cancel-icon mb-4">
                <i class="fas fa-exclamation-circle" style="font-size: 80px; color: #dc3545;"></i>
              </div>
              <h2 class="mb-3">Verification Issue</h2>
              <p class="lead mb-4">{{ error }}</p>
              <router-link to="/contact" class="theme-btn">Contact Support</router-link>
            </div>

            <div v-else class="checkout-success-wrapper text-center">
              <div class="success-icon mb-4">
                <i
                  class="fas"
                  :class="isPaymentConfirmed ? 'fa-check-circle' : 'fa-clock'"
                  :style="{ fontSize: '80px', color: isPaymentConfirmed ? '#28a745' : '#ffc107' }"
                ></i>
              </div>
              <h2 class="mb-3">{{ pageTitle }}</h2>
              <p class="lead mb-4">{{ pageMessage }}</p>

              <div v-if="orderInfo" class="order-details mb-4 p-4" style="background: #f8f9fa; border-radius: 8px;">
                <h4 class="mb-3">Order Details</h4>
                <p><strong>Order Number:</strong> {{ orderInfo.order_number }}</p>
                <p><strong>Total Amount:</strong> AUD {{ orderInfo.total_amount }}</p>
                <p>
                  <strong>Payment:</strong>
                  <span :class="paymentBadgeClass">{{ paymentStatusText }}</span>
                </p>
                <p v-if="orderInfo.status">
                  <strong>Order Status:</strong>
                  <span class="badge bg-secondary">{{ orderInfo.status }}</span>
                </p>
              </div>

              <p v-if="orderInfo && !isLoggedIn && isPaymentConfirmed" class="text-muted mb-4">
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
                  v-if="orderInfo && isLoggedIn && isPaymentConfirmed"
                  :to="`/order-details/${orderInfo.id}`"
                  class="theme-btn"
                >
                  View Order
                </router-link>
                <router-link
                  v-else-if="!isLoggedIn && isPaymentConfirmed"
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

    const isPaymentConfirmed = computed(() => {
      if (!orderInfo.value) return false
      return orderInfo.value.payment_status === 'succeeded'
    })

    const isPaymentFlagged = computed(() => orderInfo.value?.payment_status === 'flagged')

    const pageTitle = computed(() => {
      if (isPaymentFlagged.value) return 'Payment Under Review'
      if (isPaymentConfirmed.value) return 'Payment Successful!'
      return 'Payment Processing'
    })

    const pageMessage = computed(() => {
      if (isPaymentFlagged.value) {
        return 'We received your payment but need to verify the amount. Our team will contact you shortly.'
      }
      if (isPaymentConfirmed.value) {
        return 'Thank you for your order. Your payment has been processed successfully.'
      }
      return 'Your payment is being confirmed. You will receive an email once it is complete. You can refresh this page in a moment.'
    })

    const paymentStatusText = computed(() => {
      if (!orderInfo.value) return ''
      const status = orderInfo.value.payment_status
      if (status === 'succeeded') return 'Paid'
      if (status === 'flagged') return 'Under review'
      if (status === 'pending') return 'Pending confirmation'
      return status
    })

    const paymentBadgeClass = computed(() => {
      if (isPaymentConfirmed.value) return 'badge bg-success'
      if (isPaymentFlagged.value) return 'badge bg-warning text-dark'
      return 'badge bg-secondary'
    })

    onMounted(async () => {
      const sessionId = route.query.session_id

      if (!sessionId) {
        error.value = 'Missing payment session. Please contact support with your order number.'
        loading.value = false
        return
      }

      try {
        const response = await apiStore.post('/cart/verify-order', { session_id: sessionId })
        if (response.order) {
          orderInfo.value = response.order
          orderEmail.value = response.order.customer_email || ''
        } else {
          error.value = 'Order not found. Please contact support.'
        }
      } catch (err) {
        error.value = 'Failed to verify payment. Please contact support.'
        console.error('Error verifying payment:', err)
      } finally {
        loading.value = false
      }
    })

    return {
      orderInfo,
      orderEmail,
      isLoggedIn,
      isPaymentConfirmed,
      isPaymentFlagged,
      pageTitle,
      pageMessage,
      paymentStatusText,
      paymentBadgeClass,
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
