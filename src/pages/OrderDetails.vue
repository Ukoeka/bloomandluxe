<template>
  <SharedLayout>
    <section class="order-details-section section-padding fix">
      <div class="container">
        <div class="top-content mb-5">
          <h2>Order Details</h2>
          <ul class="list">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/my-orders">My Orders</router-link>
            </li>
            <li v-if="order">
              Order #{{ order.order_number }}
            </li>
          </ul>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Fetching order details...</p>
        </div>

        <div v-else-if="accessDenied" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          Access Denied: You do not have permission to view this order.
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <div v-else-if="order" class="row">
          <div class="col-lg-8">
            <!-- Payment Failed Alert -->
            <div v-if="showPaymentFailedAlert" class="alert alert-warning mb-4" role="alert">
              <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-circle me-3" style="font-size: 1.5rem;"></i>
                <div class="flex-grow-1">
                  <h6 class="alert-heading mb-1">Payment {{ order.payment_status === 'failed' ? 'Failed' : 'Pending' }}</h6>
                  <p class="mb-0">
                    {{ order.payment_status === 'failed' 
                      ? 'Your payment could not be processed. Please try again to complete your order.' 
                      : 'Your payment is still pending. You can retry to complete the payment.' 
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="card mb-4 shadow-sm border-0">
              <div class="card-header bg-white py-3">
                <h5 class="mb-0">Order Items</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table common-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Quantity</th>
                        <th class="text-center">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in order.line_items" :key="item.id">
                        <td>
                          <div class="d-flex align-items-center gap-3">
                            <img :src="getImageUrl(item.product?.image)" :alt="item.product?.name" class="img-fluid rounded" style="width: 50px; height: 50px; object-fit: cover;">
                            <div>
                              <span class="d-block">{{ item.product?.name || 'Unknown Product' }}</span>
                              <router-link 
                                v-if="order.status === 'delivered' && item.product?.id" 
                                :to="`/leave-review/${item.product.id}?orderId=${order.id}`" 
                                class="text-primary mt-1 d-inline-block" 
                                style="font-size: 0.85rem; text-decoration: underline;"
                              >
                                Leave a Review
                              </router-link>
                            </div>
                          </div>
                        </td>
                        <td class="text-center">${{ Number(item.product.price).toFixed(2) }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-center">${{ (Number(item.product.price) * item.quantity).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="card shadow-sm border-0 mb-4">
              <div class="card-header bg-white py-3">
                <h5 class="mb-0">Shipping Information</h5>
              </div>
              <div class="card-body">
                <p><strong>Name:</strong> {{ order.customer_name }}</p>
                <p><strong>Email:</strong> {{ order.customer_email }}</p>
                <p><strong>Phone:</strong> {{ order.customer_phone || 'N/A' }}</p>
                <p><strong>Address:</strong> {{ order.shipping_address }}</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card shadow-sm border-0 mb-4">
              <div class="card-header bg-white py-3">
                <h5 class="mb-0">Order Summary</h5>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <span>Status:</span>
                  <span :class="getStatusBadgeClass(order.status)">{{ order.status }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Payment Status:</span>
                  <span :class="getPaymentStatusBadgeClass(order.payment_status)">{{ order.payment_status }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Order Date:</span>
                  <span>{{ formatDate(order.created_at) }}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <span class="h6">Shipping Cost:</span>
                  <span class="h6 text-primary">${{ Number(order.shipping_cost).toFixed(2) }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="h5">Total Amount:</span>
                  <span class="h5 text-primary">${{ Number(order.total_amount).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Retry Payment Button -->
            <div v-if="showPaymentFailedAlert" class="mb-3">
              <button 
                @click="retryPayment" 
                class="theme-btn w-100" 
                :disabled="retrying"
              >
                <span v-if="retrying">
                  <i class="fas fa-spinner fa-spin me-2"></i>Processing...
                </span>
                <span v-else>
                  <i class="fas fa-redo me-2"></i>Retry Payment
                </span>
              </button>
              <div v-if="retryError" class="alert alert-danger mt-3 mb-0">
                {{ retryError }}
              </div>
            </div>

            <div class="text-center">
              <router-link to="/my-orders" class="theme-btn w-100">Back to My Orders</router-link>
            </div>
            
            <div v-if="order.payment_status === 'succeeded'" class="text-center mt-3">
              <router-link :to="`/create-dispute/${order.id}`" class="theme-btn theme-btn-secondary w-100">
                <i class="fas fa-ticket-alt me-2"></i>
                Create Dispute Ticket
              </router-link>
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
import { useAuthStore } from '../stores/auth'
import { useApiStore } from '../stores/api'

export default {
  name: 'OrderDetailsPage',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const apiStore = useApiStore()
    const order = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const accessDenied = ref(false)
    const retrying = ref(false)
    const retryError = ref(null)

    // Show payment failed alert if payment is not succeeded
    const showPaymentFailedAlert = computed(() => {
      if (!order.value) return false
      const failedStatuses = ['failed', 'pending', 'expired']
      return failedStatuses.includes(order.value.payment_status)
    })

    const fetchOrderDetails = async () => {
      loading.value = true
      error.value = null
      accessDenied.value = false
      try {
        order.value = await authStore.fetchOrderDetails(route.params.id)
        
        // Security: Verify ownership before showing order details
        const currentUserId = authStore.user?.id
        if (currentUserId) {
          const orderUserId = order.value.user_id || order.value.customer_id
          if (orderUserId && orderUserId !== currentUserId) {
            // Order doesn't belong to current user - deny access
            order.value = null
            accessDenied.value = true
            error.value = null
            return
          }
        }
      } catch (err) {
        error.value = 'Failed to fetch order details. Please try again later.'
        console.error('Error fetching order details:', err)
      } finally {
        loading.value = false
      }
    }

    const retryPayment = async () => {
      retrying.value = true
      retryError.value = null

      try {
        // Call API to retry payment for this order
        const response = await apiStore.post(`/orders/${order.value.id}/retry-payment`)

        if (response.checkout_url) {
          // Redirect to Stripe checkout
          window.location.href = response.checkout_url
        } else {
          throw new Error('No checkout URL received')
        }
      } catch (err) {
        retryError.value = err.response?.data?.message || err.message || 'Failed to retry payment. Please try again.'
        console.error('Retry payment error:', err)
        retrying.value = false
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'pending': return 'badge bg-warning text-dark'
        case 'processing': return 'badge bg-info'
        case 'shipped': return 'badge bg-primary'
        case 'delivered': return 'badge bg-success'
        case 'cancelled': return 'badge bg-danger'
        default: return 'badge bg-secondary'
      }
    }

    const getPaymentStatusBadgeClass = (status) => {
      switch (status) {
        case 'succeeded': return 'badge bg-success'
        case 'pending': return 'badge bg-warning text-dark'
        case 'failed': return 'badge bg-danger'
        case 'expired': return 'badge bg-secondary'
        case 'flagged': return 'badge bg-dark'
        default: return 'badge bg-secondary'
      }
    }

    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/cart/01.jpg'
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
      }
      const baseUrl = 'https://api.bloomandluxe.store/'
      return baseUrl + imagePath.replace(/^\//, '')
    }

    onMounted(() => {
      fetchOrderDetails()
      
      if (window.$) {
        const $ = window.$;
        
        // Sticky Header
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
        });

        // Sidebar Toggle
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
          $(".offcanvas__info").removeClass("info-open");
          $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
          $(".offcanvas__info").addClass("info-open");
          $(".offcanvas__overlay").addClass("overlay-open");
        });
      }
    })

    return {
      order,
      loading,
      error,
      accessDenied,
      retrying,
      retryError,
      showPaymentFailedAlert,
      formatDate,
      getStatusBadgeClass,
      getPaymentStatusBadgeClass,
      getImageUrl,
      retryPayment
    }
  }
}
</script>

<style scoped>
.badge {
  padding: 0.5em 0.75em;
  font-weight: 500;
  text-transform: capitalize;
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  font-weight: 600;
}

.theme-btn-secondary {
  background-color: #6c757d;
  border: 2px solid #6c757d;
  color: white;
}

.theme-btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
  color: white;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffc107;
  color: #856404;
}

.alert-warning .alert-heading {
  color: #856404;
  font-weight: 600;
}
</style>