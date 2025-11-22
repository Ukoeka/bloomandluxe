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
}

.admin-content {
  margin-left: 250px;
  padding: 20px;
  width: calc(100% - 250px);
  min-height: 100vh;
  background-color: var(--bg, #F7F7F7);
}
</style>