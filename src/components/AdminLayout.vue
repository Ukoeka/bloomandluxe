<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-content">
      <div class="container-fluid">
        <slot />
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

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.admin-content {
  margin-left: 280px;
  padding: 30px;
  width: calc(100% - 280px);
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>