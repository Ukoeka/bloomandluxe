<template>
  <AdminLayout>
    <AdminPreloader :loading="loadingOrders" message="Loading orders..." />
    <div class="admin-orders">
      <div class="section-header mb-4">
        <h2>Manage Orders</h2>
      </div>
      
      <div class="table-container">
        <table class="modern-table">
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
              <td class="order-id">#{{ order.id }}</td>
              <td class="order-number">{{ order.order_number || `#${order.id}` }}</td>
              <td class="customer-name">{{ order.customer || 'N/A' }}</td>
              <td class="order-date">{{ new Date(order.date).toLocaleDateString() }}</td>
              <td class="order-total">${{ order.total }}</td>
              <td>
                <span class="payment-badge" :class="getPaymentStatusClass(order.payment_status)">
                  {{ order.payment_status || 'pending' }}
                </span>
              </td>
              <td>
                <select
                  :value="order.status"
                  @change="updateStatus(order.id, $event.target.value)"
                  class="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <router-link :to="'/admin/orders/' + order.id" class="action-btn">
                  <i class="fas fa-eye me-1"></i>View Details
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
          return 'succeeded'
        case 'pending':
        case 'processing':
          return 'pending'
        case 'failed':
        case 'canceled':
          return 'failed'
        case 'refunded':
          return 'refunded'
        default:
          return 'pending'
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
  padding: 0;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table thead th {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #495057;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 20px 30px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
}

.modern-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f3f4;
}

.modern-table tbody tr:hover {
  background: linear-gradient(135deg, #f8f9fa, #f1f3f4);
}

.modern-table tbody td {
  padding: 20px 30px;
  vertical-align: middle;
}

.order-id {
  font-weight: 600;
  color: #6B8F71;
}

.order-number {
  font-weight: 500;
  color: #2c3e50;
}

.customer-name {
  font-weight: 500;
  color: #2c3e50;
}

.order-date {
  color: #6c757d;
}

.order-total {
  font-weight: 600;
  color: #2c3e50;
}

.payment-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.payment-badge.succeeded {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.payment-badge.pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.payment-badge.failed {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.payment-badge.refunded {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.status-select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-select:focus {
  border-color: #6B8F71;
  outline: none;
}

.action-btn {
  background: rgba(107, 143, 113, 0.1);
  color: #6B8F71;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #6B8F71;
  color: white;
  transform: translateY(-1px);
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  margin-top: 20px;
  border-top: 1px solid #f1f3f4;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 12px;
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
  
  .modern-table {
    font-size: 14px;
  }
  
  .modern-table thead th,
  .modern-table tbody td {
    padding: 12px 15px;
  }
}
</style>