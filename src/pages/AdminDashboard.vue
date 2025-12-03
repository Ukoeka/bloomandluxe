<template>
  <AdminLayout>
    <div class="admin-dashboard">
      <!-- Welcome Header -->
      <div class="welcome-header">
        <div class="header-content">
          <h1 class="welcome-title">
            <i class="fas fa-tachometer-alt"></i>
            Welcome back, Admin!
          </h1>
          <p class="welcome-subtitle">Here's what's happening with your store today</p>
        </div>
        <div class="header-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card products-card">
          <div class="card-icon">
            <i class="fas fa-box"></i>
          </div>
          <div class="card-content">
            <h3 class="card-value">{{ productsCount }}</h3>
            <p class="card-label">Total Products</p>
            <div class="card-trend">
              <i class="fas fa-arrow-up"></i>
              <span>Active</span>
            </div>
          </div>
          <router-link to="/admin/products" class="card-action">
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>

        <div class="stat-card orders-card">
          <div class="card-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <div class="card-content">
            <h3 class="card-value">{{ ordersCount }}</h3>
            <p class="card-label">Total Orders</p>
            <div class="card-trend">
              <i class="fas fa-arrow-up"></i>
              <span>Processed</span>
            </div>
          </div>
          <router-link to="/admin/orders" class="card-action">
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>

        <div class="stat-card users-card">
          <div class="card-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="card-content">
            <h3 class="card-value">{{ usersCount }}</h3>
            <p class="card-label">Total Users</p>
            <div class="card-trend">
              <i class="fas fa-user-plus"></i>
              <span>Registered</span>
            </div>
          </div>
          <router-link to="/admin/users" class="card-action">
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>

        <div class="stat-card revenue-card">
          <div class="card-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="card-content">
            <h3 class="card-value">${{ revenue }}</h3>
            <p class="card-label">Total Revenue</p>
            <div class="card-trend">
              <i class="fas fa-chart-line"></i>
              <span>Growth</span>
            </div>
          </div>
          <router-link to="/admin/reports" class="card-action">
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>

      <!-- Recent Orders Section -->
      <div class="recent-orders-section">
        <div class="section-header">
          <h2 class="section-title">
            <i class="fas fa-clock"></i>
            Recent Orders
          </h2>
          <router-link to="/admin/orders" class="view-all-btn">
            View All Orders
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>

        <div class="orders-table-container">
          <table class="modern-orders-table">
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
              <tr v-for="order in recentOrders" :key="order.id" class="order-row">
                <td class="order-id">#{{ order.id }}</td>
                <td>
                  <div class="customer-info">
                    <div class="customer-avatar">
                      {{ order.customer.charAt(0).toUpperCase() }}
                    </div>
                    <span class="customer-name">{{ order.customer }}</span>
                  </div>
                </td>
                <td>
                  <span class="status-badge" :class="order.status.toLowerCase()">
                    {{ order.status }}
                  </span>
                </td>
                <td class="order-total">${{ order.total }}</td>
                <td>
                  <router-link :to="`/admin/orders/${order.id}`" class="action-btn">
                    <i class="fas fa-eye"></i>
                    View
                  </router-link>
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
          apiStore.get('/admin/products/count'),
          apiStore.get('/admin/orders/count'),
          apiStore.get('/admin/users/count'),
          apiStore.get('/admin/revenue'),
          apiStore.get('/admin/orders/recent')
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
.admin-dashboard {
  padding: 20px 0;
}

/* Welcome Header */
.welcome-header {
  background: linear-gradient(135deg, white 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.welcome-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(107,143,113,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(107,143,113,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(107,143,113,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.5;
}

.header-content {
  z-index: 1;
  position: relative;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome-title i {
  color: var(--theme, #6B8F71);
  font-size: 28px;
}

.welcome-subtitle {
  color: #6c757d;
  font-size: 18px;
  margin: 0;
  font-weight: 400;
}

.header-decoration {
  display: flex;
  gap: 15px;
}

.decoration-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  animation: float 3s ease-in-out infinite;
}

.decoration-circle:nth-child(2) {
  animation-delay: 1s;
}

.decoration-circle:nth-child(3) {
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns:  1fr 1fr 1fr 1fr;
  /* grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); */
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--theme, #6B8F71), #5a7d5f);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.products-card .card-icon {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.orders-card .card-icon {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.users-card .card-icon {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.revenue-card .card-icon {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.card-content {
  flex: 1;
}

.card-value {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.card-label {
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 8px 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-trend {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #27ae60;
  font-weight: 500;
}

.card-trend i {
  font-size: 10px;
}

.card-action {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(107, 143, 113, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme, #6B8F71);
  text-decoration: none;
  transition: all 0.3s ease;
}

.card-action:hover {
  background: var(--theme, #6B8F71);
  color: white;
  transform: scale(1.1);
}

/* Recent Orders Section */
.recent-orders-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.section-header {
  padding: 30px 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f3f4;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title i {
  color: var(--theme, #6B8F71);
}

.view-all-btn {
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(107, 143, 113, 0.3);
}

/* Orders Table */
.orders-table-container {
  padding: 0;
}

.modern-orders-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-orders-table thead th {
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

.modern-orders-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f3f4;
}

.modern-orders-table tbody tr:hover {
  background: linear-gradient(135deg, #f8f9fa, #f1f3f4);
}

.modern-orders-table tbody td {
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
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.customer-name {
  font-weight: 500;
  color: #2c3e50;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.status-badge.processing {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.status-badge.shipped {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
}

.status-badge.delivered {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.status-badge.cancelled {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.order-total {
  font-weight: 600;
  color: #2c3e50;
}

.action-btn {
  background: rgba(107, 143, 113, 0.1);
  color: var(--theme, #6B8F71);
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: var(--theme, #6B8F71);
  color: white;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .welcome-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .modern-orders-table {
    font-size: 14px;
  }

  .modern-orders-table thead th,
  .modern-orders-table tbody td {
    padding: 12px 15px;
  }

  .customer-info {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>