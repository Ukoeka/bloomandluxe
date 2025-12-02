<template>
  <div class="admin-sidebar">
    <div class="sidebar-header">
      <!-- <img src="/assets/img/logo/main-logo.png" alt="Logo" class="sidebar-logo"> -->
      <h4>Admin Panel</h4>
    </div>
    <nav class="sidebar-nav">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/dashboard" class="nav-link" :class="{ active: $route.name === 'AdminDashboard' }">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link" :class="{ active: $route.name === 'AdminProducts' }">
            <i class="fas fa-box"></i> Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/categories" class="nav-link" :class="{ active: $route.name === 'AdminCategories' }">
            <i class="fas fa-tags"></i> Categories
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link" :class="{ active: $route.name === 'AdminOrders' }">
            <i class="fas fa-shopping-cart"></i> Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/disputes" class="nav-link" :class="{ active: $route.name === 'AdminDisputes' }">
            <i class="fas fa-exclamation-triangle"></i> Disputes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/users" class="nav-link" :class="{ active: $route.name === 'AdminUsers' }">
            <i class="fas fa-users"></i> Users
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/reports" class="nav-link" :class="{ active: $route.name === 'AdminReports' }">
            <i class="fas fa-chart-bar"></i> Reports
          </router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'AdminSidebar',
  setup() {
    const router = useRouter()

    const logout = () => {
      // Clear admin token and redirect to login
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    }

    return {
      logout
    }
  }
}
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  height: 100vh;
  background-color: var(--header, #010F1C);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px 0;
}

.sidebar-header {
  padding: 20px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.sidebar-logo {
  width: 120px;
  height: auto;
  margin-bottom: 15px;
}

.sidebar-header h4 {
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: 500;
}

.sidebar-nav .nav-link {
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.sidebar-nav .nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-nav .nav-link.active {
  color: white;
  background-color: var(--theme, #6B8F71);
}

.sidebar-nav .nav-link i {
  margin-right: 10px;
  width: 20px;
}
</style>