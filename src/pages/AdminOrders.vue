<template>
  <AdminLayout>
    <div class="admin-orders">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <i class="fas fa-shopping-cart"></i>
            Manage Orders
          </h1>
          <p class="page-subtitle">View and manage all customer orders</p>
        </div>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ orders.length }}</div>
              <div class="stat-label">Total Orders</div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-card">
        <div class="card-header">
          <h5 class="card-title">Orders List</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Order Status</th>
                  <th>Logistics Status</th>
                  <th>Tracking</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id" class="table-row">
                  <td class="order-id">{{ order.order_number || `#${order.id}` }}</td>
                  <td>
                    <div class="customer-info">
                      <div class="customer-avatar">
                        {{ order.customer?.charAt(0)?.toUpperCase() || 'U' }}
                      </div>
                      <div class="customer-details">
                        <div class="customer-name">{{ order.customer || 'N/A' }}</div>
                        <div class="customer-email">{{ order.email || '' }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ new Date(order.date).toLocaleDateString() }}</td>
                  <td class="order-total">${{ order.total }}</td>
                  <td>
                    <select
                      :value="order.status"
                      @change="updateStatus(order.id, $event.target.value)"
                      class="status-select"
                      :class="order?.status?.toLowerCase()"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <span class="logistics-badge" :class="order.logistics_status?.toLowerCase() || 'pending'">
                      {{ order.logistics_status || 'Pending' }}
                    </span>
                  </td>
                  <td>
                    <div class="tracking-info">
                      <div v-if="order.tracking_number" class="tracking-number">
                        {{ order.tracking_number }}
                      </div>
                      <div v-if="order.carrier_name" class="carrier-name">
                        {{ order.carrier_name }}
                      </div>
                      <span v-else class="no-tracking">Not set</span>
                    </div>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="viewOrderDetails(order)">
                      <i class="fas fa-eye"></i>
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
import { ref, onMounted } from 'vue'
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
    const apiStore = useApiStore()

    const fetchOrders = async () => {
      try {
        const data = await apiStore.get('/admin/orders')
        orders.value = data
      } catch (error) {
        console.error('Failed to fetch orders:', error)
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
      try {
        const details = await apiStore.get(`/admin/orders/${order.id}`)
        selectedOrder.value = details
      } catch (error) {
        console.error('Failed to fetch order details:', error)
      }
    }

    const closeModal = () => {
      selectedOrder.value = null
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      orders,
      selectedOrder,
      updateStatus,
      viewOrderDetails,
      closeModal
    }
  }
}
</script>

<style scoped>
.admin-orders {
  padding: 20px 0;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.header-content .page-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-content .page-title i {
  color: var(--theme, #6B8F71);
  font-size: 24px;
}

.page-subtitle {
  color: #6c757d;
  font-size: 16px;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  color: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(107, 143, 113, 0.3);
  min-width: 140px;
}

.stat-icon {
  font-size: 24px;
  opacity: 0.9;
}

.stat-info .stat-number {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2px;
}

.stat-info .stat-label {
  font-size: 12px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Content Card */
.content-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.card-header {
  padding: 25px 30px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.card-body {
  padding: 0;
}

/* Modern Table */
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
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modern-table tbody td {
  padding: 20px 30px;
  vertical-align: middle;
}

.order-id {
  font-weight: 600;
  color: var(--theme, #6B8F71);
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.customer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(107, 143, 113, 0.3);
}

.customer-name {
  font-weight: 600;
  color: #2c3e50;
}

.customer-email {
  font-size: 12px;
  color: #6c757d;
}

.status-select {
  padding: 6px 12px;
  border-radius: 20px;
  border: 2px solid #dee2e6;
  background: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.status-select:focus {
  outline: none;
  border-color: var(--theme, #6B8F71);
  box-shadow: 0 0 0 3px rgba(107, 143, 113, 0.1);
}

.status-select.pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  border-color: #e67e22;
}

.status-select.processing {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border-color: #2980b9;
}

.status-select.shipped {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  border-color: #8e44ad;
}

.status-select.delivered {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  border-color: #229954;
}

.status-select.cancelled {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border-color: #c0392b;
}

.order-total {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(107, 143, 113, 0.3);
  background: linear-gradient(135deg, #5a7d5f, #4a6d4f);
}

.btn-primary i {
  margin-right: 6px;
}

/* Logistics Badge */
.logistics-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  min-width: 100px;
  text-align: center;
}

.logistics-badge.pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.logistics-badge.preparing {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.logistics-badge.ready_for_pickup {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
}

.logistics-badge.picked_up {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.logistics-badge.in_transit {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.logistics-badge.out_for_delivery {
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  color: black;
}

.logistics-badge.delivered {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.logistics-badge.failed_delivery,
.logistics-badge.returned {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

/* Tracking Info */
.tracking-info {
  max-width: 150px;
}

.tracking-number {
  font-weight: 600;
  color: var(--theme, #6B8F71);
  font-size: 12px;
  margin-bottom: 2px;
}

.carrier-name {
  font-size: 11px;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.no-tracking {
  font-size: 12px;
  color: #6c757d;
  font-style: italic;
}

/* Modal Styles */
.modal {
  z-index: 1050;
}

.modal-content {
  border-radius: 16px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px 16px 0 0;
  padding: 20px 30px;
}

.modal-title {
  font-weight: 600;
  color: #2c3e50;
}

.modal-body {
  padding: 30px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .header-stats {
    justify-content: center;
  }

  .modern-table {
    font-size: 14px;
  }

  .modern-table thead th,
  .modern-table tbody td {
    padding: 12px 15px;
  }

  .customer-info {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>