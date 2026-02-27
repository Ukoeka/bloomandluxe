<template>
  <SharedLayout>
    <section class="my-orders-section section-padding fix">
      <div class="container">
        <div class="top-content mb-5">
          <h2>My Orders</h2>
          <ul class="list">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              My Orders
            </li>
          </ul>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Fetching your orders...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <div v-else class="table-responsive">
          <table class="table common-table">
            <thead>
              <tr>
                <th class="text-center">Order #</th>
                <th class="text-center">Date</th>
                <th class="text-center">Total</th>
                <th class="text-center">Status</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody v-if="orders.length > 0">
              <tr v-for="order in orders" :key="order.id">
                <td class="text-center">{{ order.order_number }}</td>
                <td class="text-center">{{ formatDate(order.created_at) }}</td>
                <td class="text-center">${{ Number(order.total_amount).toFixed(2) }}</td>
                <td class="text-center">
                  <span :class="getStatusBadgeClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="text-center">
                  <router-link :to="'/order-details/' + order.id" class="theme-btn btn-sm">
                    View Details
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="text-center py-5">
                  <div class="empty-orders">
                    <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                    <h4>No orders found</h4>
                    <p>It seems you haven't placed any orders yet.</p>
                    <router-link to="/categories" class="theme-btn alt-color radius-xs">Start Shopping</router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </SharedLayout>
</template>

<script>
import { onMounted, ref } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'MyOrdersPage',
  components: {
    SharedLayout
  },
  setup() {
    const authStore = useAuthStore()
    const orders = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchOrders = async () => {
      loading.value = true
      error.value = null
      try {
        orders.value = await authStore.fetchOrders()
      } catch (err) {
        error.value = 'Failed to fetch orders. Please try again later.'
        console.error('Error fetching orders:', err)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
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

    onMounted(() => {
      fetchOrders()
      
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
      orders,
      loading,
      error,
      formatDate,
      getStatusBadgeClass
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
.common-table th {
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
}
.common-table td {
    vertical-align: middle;
}
</style>
