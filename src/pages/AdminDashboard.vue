<template>
  <AdminLayout>
    <div class="admin-dashboard">
      <h2 class="mb-4">Admin Dashboard</h2>
        <div class="row">
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Total Products</h5>
                <p class="card-text">{{ productsCount }}</p>
                <router-link to="/admin/products" class="btn btn-primary">Manage Products</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Total Orders</h5>
                <p class="card-text">{{ ordersCount }}</p>
                <router-link to="/admin/orders" class="btn btn-primary">Manage Orders</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Total Users</h5>
                <p class="card-text">{{ usersCount }}</p>
                <router-link to="/admin/users" class="btn btn-primary">Manage Users</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Revenue</h5>
                <p class="card-text">${{ revenue }}</p>
                <router-link to="/admin/reports" class="btn btn-primary">View Reports</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <h4>Recent Orders</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.status }}</td>
                  <td>${{ order.total }}</td>
                  <td>
                    <router-link :to="`/admin/orders/${order.id}`" class="btn btn-sm btn-outline-primary">View</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: 'AdminDashboard',
  components: {
    AdminLayout
  },
  setup() {
    const productsCount = ref(0)
    const ordersCount = ref(0)
    const usersCount = ref(0)
    const revenue = ref(0)
    const recentOrders = ref([])
    const apiStore = useApiStore()

    const fetchDashboardData = async () => {
      try {
        const [products, orders, users, revenueData, ordersList] = await Promise.all([
          apiStore.get('/api/admin/products/count'),
          apiStore.get('/api/admin/orders/count'),
          apiStore.get('/api/admin/users/count'),
          apiStore.get('/api/admin/revenue'),
          apiStore.get('/api/admin/orders/recent')
        ])
        productsCount.value = products.count
        ordersCount.value = orders.count
        usersCount.value = users.count
        revenue.value = revenueData.total
        recentOrders.value = ordersList
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      productsCount,
      ordersCount,
      usersCount,
      revenue,
      recentOrders
    }
  }
}
</script>

<style scoped>
.admin-dashboard .card {
  margin-bottom: 20px;
}

.admin-dashboard .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-dashboard .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-dashboard .btn-outline-primary {
  color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-dashboard .btn-outline-primary:hover {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}
</style>