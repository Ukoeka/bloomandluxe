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

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <div v-else-if="order" class="row">
          <div class="col-lg-8">
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
                            <span>{{ item.product?.name || 'Unknown Product' }}</span>
                          </div>
                        </td>
                        <td class="text-center">${{ Number(item.price).toFixed(2) }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-center">${{ (Number(item.price) * item.quantity).toFixed(2) }}</td>
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
                  <span class="h5">Total Amount:</span>
                  <span class="h5 text-primary">${{ Number(order.total_amount).toFixed(2) }}</span>
                </div>
              </div>
            </div>
            <div class="text-center">
                <router-link to="/my-orders" class="theme-btn w-100">Back to My Orders</router-link>
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
import { useAuthStore } from '../stores/auth'

export default {
  name: 'OrderDetailsPage',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const order = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchOrderDetails = async () => {
      loading.value = true
      error.value = null
      try {
        order.value = await authStore.fetchOrderDetails(route.params.id)
      } catch (err) {
        error.value = 'Failed to fetch order details. Please try again later.'
        console.error('Error fetching order details:', err)
      } finally {
        loading.value = false
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
      const baseUrl = 'https://api.digi-essentials.com/'
      return baseUrl + imagePath.replace(/^\//, '')
    }

    onMounted(() => {
      fetchOrderDetails()
      
       if (window.$) {
        // Sticky Header
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
        });
        
        // Mobile Menu
        $('#mobile-menu').meanmenu({
          meanMenuContainer: '.mobile-menu',
          meanScreenWidth: "1199",
          meanExpand: ['<i class="far fa-plus"></i>'],
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
      formatDate,
      getStatusBadgeClass,
      getPaymentStatusBadgeClass,
      getImageUrl
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
</style>
