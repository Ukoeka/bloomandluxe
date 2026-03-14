<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading order details..." />
    <div class="admin-order-details" v-if="order">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Details - #{{ order.id }}</h2>
        <router-link to="/admin/orders" class="btn btn-secondary">
          <i class="fas fa-arrow-left me-2"></i>Back to Orders
        </router-link>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div class="row">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Order Items</h5>
              <span class="text-muted">Order Date: {{ formatDateTime(order.created_at) }}</span>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th class="text-center">Price</th>
                      <th class="text-center">Quantity</th>
                      <th class="text-center">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.items" :key="item.id">
                      <td>
                        <div class="d-flex align-items-center gap-3">
                          <img :src="getImageUrl(item.product?.image)" :alt="item.name" class="img-fluid rounded"
                            style="width: 50px; height: 50px; object-fit: cover;">
                          <span>{{ item.product.name || 'Unknown product' }}</span>
                        </div>
                      </td>
                      <td class="text-center">${{ Number(item.price).toFixed(2) }}</td>
                      <td class="text-center">{{ item.quantity }}</td>
                      <td class="text-center">${{ (Number(item.price) * item.quantity).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-end fw-bold">Subtotal:</td>
                      <td class="text-center">${{ (Number(order.total_amount) - Number(order.shipping_cost || 0) - Number(order.tax_amount || 0)).toFixed(2) }}</td>
                    </tr>
                    <tr v-if="order.shipping_cost > 0">
                      <td colspan="3" class="text-end fw-bold">Shipping Fee:</td>
                      <td class="text-center">${{ Number(order.shipping_cost).toFixed(2) }}</td>
                    </tr>
                    
                    <tr v-if="order.tax_amount > 0">
                      <td colspan="3" class="text-end fw-bold">Tax (10%):</td>
                      <td class="text-center">${{ Number(order.tax_amount).toFixed(2) }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-end fw-bold">Total:</td>
                      <td class="text-center">${{ Number(order.total_amount).toFixed(2) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-4">
              <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-white py-3">
                  <h5 class="mb-0">Customer Information</h5>
                </div>
                <div class="card-body">
                  <p><strong>Name:</strong> {{ order.customer_name || 'N/A' }}</p>
                  <p><strong>Email:</strong> <a :href="'mailto:' + order.email">{{ order.customer_email || 'N/A' }}</a>
                  </p>
                  <p><strong>Phone:</strong> {{ order.customer_phone || 'N/A' }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-white py-3">
                  <h5 class="mb-0">Shipping Information</h5>
                </div>
                <div class="card-body">
                  <p><strong>Address:</strong> {{ order.shipping_address || 'N/A' }}</p>
                </div>
                <div class="card-body">
                <strong>Shipping Method:</strong>
                <span class="fs-6">
                  &nbsp;{{ order.shipping_method}}
                </span>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3">
              <h5 class="mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-3 align-items-center">
                <span>Payment Status:</span>
                <span :class="['badge fs-6', getPaymentStatusClass(order.payment_status)]">
                  {{ order.payment_status || 'pending' }}
                </span>
              </div>
              
              <hr>
              <div class="mb-3">
                <label class="form-label d-block fw-bold">Order Status:</label>
                <select v-model="order.status" @change="updateOrderStatus($event.target.value)" class="form-select"
                  :disabled="updatingStatus">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div v-if="updatingStatus" class="form-text text-primary">
                  <i class="fas fa-spinner fa-spin me-1"></i> Updating...
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between mt-3">
                <span class="h5 mb-0">Total:</span>
                <span class="h5 mb-0 text-primary fw-bold">${{ Number(order.total_amount).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AdminPreloader from '../components/AdminPreloader.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminOrderDetails',
  components: {
    AdminLayout,
    AdminPreloader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const apiStore = useApiStore()

    const order = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const updatingStatus = ref(false)

    const fetchOrderDetails = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await apiStore.get(`/admin/orders/${route.params.id}`)
        order.value = response.data
      } catch (err) {
        error.value = 'Failed to fetch order details. Order might not exist.'
        console.error('Error fetching order details:', err)
      } finally {
        loading.value = false
      }
    }

    const updateOrderStatus = async (newStatus) => {
      updatingStatus.value = true
      try {
        await apiStore.put(`/admin/orders/${order.value.id}/status`, { status: newStatus })
        // Optional: Show success toast
      } catch (err) {
        console.error('Failed to update order status:', err)
        error.value = 'Failed to update order status.'
        // Revert status on failure
        fetchOrderDetails()
      } finally {
        updatingStatus.value = false
      }
    }

    const formatDateTime = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleString()
    }

    const getPaymentStatusClass = (status) => {
      switch (status?.toLowerCase()) {
        case 'succeeded':
          return 'bg-success'
        case 'pending':
        case 'processing':
          return 'bg-warning text-dark'
        case 'failed':
        case 'canceled':
        case 'cancelled':
          return 'bg-danger'
        case 'refunded':
          return 'bg-info text-dark'
        default:
          return 'bg-secondary'
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
    })

    return {
      order,
      loading,
      error,
      updatingStatus,
      updateOrderStatus,
      formatDateTime,
      getPaymentStatusClass,
      getImageUrl
    }
  }
}
</script>

<style scoped>
.admin-order-details {
  padding: 20px 0;
}

.card {
  border-radius: 10px;
}

.card-header {
  font-weight: 600;
}

.badge {
  text-transform: capitalize;
  padding: 0.5em 0.8em;
}
</style>
