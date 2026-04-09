<template>
  <AdminLayout>
    <AdminPreloader :loading="loadingOrders" message="Loading orders..." />
    <div class="admin-orders">
      <h2 class="mb-4">Manage Orders</h2>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.order_number || `#${order.id}` }}</td>
              <td>{{ order.customer || 'N/A' }}</td>
              <td>{{ new Date(order.date).toLocaleDateString() }}</td>
              <td>${{ order.total }}</td>
              <td>
                <span :class="['badge', getPaymentStatusClass(order.payment_status)]">
                  {{ order.payment_status || 'pending' }}
                </span>
              </td>
              <td>
                <select
                  :value="order.status"
                  @change="updateStatus(order.id, $event.target.value)"
                  class="form-select form-select-sm"
                  style="width: auto;"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <router-link :to="'/admin/orders/' + order.id" class="btn btn-sm btn-primary">
                  View Details
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-container" v-if="totalPages > 1">
        <div class="pagination-info">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, totalOrders) }} of {{ totalOrders }} entries
        </div>
        <div class="pagination-controls">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1" 
            @click="currentPage--"
          >
            <i class="fas fa-chevron-left"></i> Previous
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page" 
            class="pagination-btn"
            :class="{ active: page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages" 
            @click="currentPage++"
          >
            Next <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AdminPreloader from '../components/AdminPreloader.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminOrders',
  components: {
    AdminLayout,
    AdminPreloader
  },
  setup() {
    const orders = ref([])
    const loadingOrders = ref(false)
    const apiStore = useApiStore()

    // Pagination state
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    const totalOrders = ref(0)

    const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage.value))

    const paginatedOrders = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return orders.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    const fetchOrders = async () => {
      loadingOrders.value = true
      try {
        const response = await apiStore.get('/admin/orders')
        orders.value = response.data || []
        totalOrders.value = orders.value.length
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        loadingOrders.value = false
      }
    }

    const updateStatus = async (orderId, status) => {
      try {
        await apiStore.put(`/admin/orders/${orderId}/status`, { status })
        await fetchOrders()
      } catch (error) {
        console.error('Failed to update order status:', error)
      }
    }

    const getPaymentStatusClass = (status) => {
      switch (status) {
        case 'succeeded':
          return 'bg-success'
        case 'pending':
        case 'processing':
          return 'bg-warning text-dark'
        case 'failed':
        case 'canceled':
          return 'bg-danger'
        case 'refunded':
          return 'bg-info text-dark'
        default:
          return 'bg-secondary'
      }
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      orders,
      loadingOrders,
      updateStatus,
      getPaymentStatusClass,
      currentPage,
      itemsPerPage,
      totalOrders,
      totalPages,
      paginatedOrders,
      visiblePages
    }
  }
}
</script>

<style scoped>
.admin-orders {
  padding: 20px 0;
}

.admin-orders .btn-primary {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.admin-orders .btn-primary:hover {
  background-color: #010F1C;
  border-color: #010F1C;
}

/* Pagination Styles */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-top: 20px;
  border-top: 1px solid #dee2e6;
}

.pagination-info {
  color: #6c757d;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-btn:hover:not(:disabled) {
  background: #6B8F71;
  color: white;
  border-color: #6B8F71;
}

.pagination-btn.active {
  background: #6B8F71;
  color: white;
  border-color: #6B8F71;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
}
</style>