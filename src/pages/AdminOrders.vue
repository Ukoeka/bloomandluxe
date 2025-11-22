<template>
  <AdminLayout>
    <div class="admin-orders">
      <h2 class="mb-4">Manage Orders</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ new Date(order.date).toLocaleDateString() }}</td>
                <td>${{ order.total }}</td>
                <td>
                  <select :value="order.status" @change="updateStatus(order.id, $event.target.value)" class="form-select form-select-sm">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-primary" @click="viewOrderDetails(order)">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
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
                    <p><strong>Name:</strong> {{ selectedOrder.customer }}</p>
                    <p><strong>Email:</strong> {{ selectedOrder.email }}</p>
                    <p><strong>Phone:</strong> {{ selectedOrder.phone }}</p>
                    <p><strong>Address:</strong> {{ selectedOrder.address }}</p>
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
                    <tr v-for="item in selectedOrder.items" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>${{ item.price }}</td>
                      <td>${{ item.quantity * item.price }}</td>
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
        const data = await apiStore.get('/api/admin/orders')
        orders.value = data
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    const updateStatus = async (orderId, status) => {
      try {
        await apiStore.put(`/api/admin/orders/${orderId}/status`, { status })
        await fetchOrders()
      } catch (error) {
        console.error('Failed to update order status:', error)
      }
    }

    const viewOrderDetails = async (order) => {
      try {
        const details = await apiStore.get(`/api/admin/orders/${order.id}`)
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
.modal {
  z-index: 1050;
}

.admin-orders .btn-outline-primary {
  color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-orders .btn-outline-primary:hover {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}
</style>