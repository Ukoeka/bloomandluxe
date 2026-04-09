<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-content">
      <div class="container-fluid">
        <div class="admin-page-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar
  }
}
</script>

<style>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.admin-content {
  margin-left: 280px;
  padding: 30px;
  width: calc(100% - 280px);
  min-height: 100vh;
  background: #f5f7fa;
  transition: margin-left 0.3s ease;
}

.admin-page-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.admin-page-content .table {
  margin-bottom: 0;
}

.admin-page-content .table thead th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  font-weight: 600;
  padding: 12px;
}

.admin-page-content .table tbody td {
  padding: 12px;
  vertical-align: middle;
}

.admin-page-content .table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.02);
}

.admin-page-content .table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>