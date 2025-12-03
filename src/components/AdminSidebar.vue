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
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding: 0;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: width 0.3s ease;
}

.sidebar-header {
  padding: 30px 25px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.sidebar-logo {
  width: 120px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
}

.sidebar-header h4 {
  margin: 0;
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  padding: 20px 0;
}

.sidebar-nav .nav-item {
  margin: 5px 15px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.sidebar-nav .nav-link {
  color: rgba(255, 255, 255, 0.8);
  padding: 12px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.sidebar-nav .nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--theme, #6B8F71);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.sidebar-nav .nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar-nav .nav-link:hover::before {
  transform: scaleY(1);
}

.sidebar-nav .nav-link.active {
  color: white;
  background: var(--theme, #6B8F71);
  box-shadow: 0 4px 12px rgba(107, 143, 113, 0.3);
}

.sidebar-nav .nav-link.active::before {
  transform: scaleY(1);
  background: white;
}

.sidebar-nav .nav-link i {
  margin-right: 12px;
  width: 20px;
  font-size: 18px;
  transition: transform 0.3s ease;
}

.sidebar-nav .nav-link:hover i {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 250px;
  }
}
</style>