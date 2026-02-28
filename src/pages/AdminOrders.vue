<template>
  <AdminLayout>
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
                <button class="btn btn-sm btn-primary" @click="viewOrderDetails(order)">
                  View Details
                </button>
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

        <!-- Order Details Modal -->
        <div v-if="selectedOrder" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Order Details - #{{ selectedOrder.id }}</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <h6>Customer Information</h6>
                    <p><strong>Name:</strong> {{ selectedOrder.customer || 'N/A' }}</p>
                    <p><strong>Email:</strong> {{ selectedOrder.email || 'N/A' }}</p>
                    <p><strong>Phone:</strong> {{ selectedOrder.phone || 'N/A' }}</p>
                    <p><strong>Address:</strong> {{ selectedOrder.address || 'N/A' }}</p>
                  </div>
                  <div class="col-md-6">
                    <h6>Order Information</h6>
                    <p><strong>Date:</strong> {{ new Date(selectedOrder.date).toLocaleString() }}</p>
                    <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
                    <p><strong>Total:</strong> ${{ selectedOrder.total }}</p>
                    <p><strong>Payment Status:</strong> 
                      <span :class="['badge', getPaymentStatusClass(selectedOrder.payment_status)]">
                        {{ selectedOrder.payment_status || 'pending' }}
                      </span>
                    </p>
                  </div>
                </div>
                <h6 class="mt-3">Items</h6>
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in (selectedOrder.items || [])" :key="item.id || Math.random()">
                      <td>{{ item.name || 'N/A' }}</td>
                      <td>{{ item.quantity || 0 }}</td>
                      <td>${{ item.price || 0 }}</td>
                      <td>${{ (item.quantity || 0) * (item.price || 0) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminOrders',
  components: {
    AdminLayout
  },
  setup() {
    const orders = ref([])
    const selectedOrder = ref(null)
    const loadingOrders = ref(false)
    const loadingOrderDetails = ref(false)
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

    const viewOrderDetails = async (order) => {
      loadingOrderDetails.value = true
      try {
        const response = await apiStore.get(`/admin/orders/${order.id}`)
        selectedOrder.value = response.data
      } catch (error) {
        console.error('Failed to fetch order details:', error)
      } finally {
        loadingOrderDetails.value = false
      }
    }

    const closeModal = () => {
      selectedOrder.value = null
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
      selectedOrder,
      loadingOrders,
      loadingOrderDetails,
      updateStatus,
      viewOrderDetails,
      closeModal,
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
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-orders .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
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
  background: var(--theme, #6B8F71);
  color: white;
  border-color: var(--theme, #6B8F71);
}

.pagination-btn.active {
  background: var(--theme, #6B8F71);
  color: white;
  border-color: var(--theme, #6B8F71);
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