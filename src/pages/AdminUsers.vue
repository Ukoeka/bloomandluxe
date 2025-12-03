<template>
  <AdminLayout>
    <div class="admin-users">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <i class="fas fa-users"></i>
            Manage Users
          </h1>
          <p class="page-subtitle">View and manage all registered users</p>
        </div>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-user-friends"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ users.length }}</div>
              <div class="stat-label">Total Users</div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-card">
        <div class="card-header">
          <h5 class="card-title">Users List</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Email Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" class="table-row">
                  <td class="user-id">{{ user.id }}</td>
                  <td>
                    <div class="user-info">
                      <div class="user-avatar">
                        {{ user.name?.charAt(0)?.toUpperCase() || 'U' }}
                      </div>
                      <div class="user-details">
                        <div class="user-name">{{ user.name || 'N/A' }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="role-badge" :class="user.is_admin ? 'admin' : 'user'">
                      {{ user.is_admin ? 'Admin' : 'User' }}
                    </span>
                  </td>
                  <td>
                    <span class="status-badge" :class="user.email_verified_at ? 'verified' : 'unverified'">
                      {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button
                        v-if="!user.is_admin"
                        class="btn btn-sm btn-success me-2"
                        @click="toggleAdmin(user)"
                        :disabled="submitting"
                      >
                        <i class="fas fa-user-shield"></i>
                        Make Admin
                      </button>
                      <button
                        v-else
                        class="btn btn-sm btn-warning me-2"
                        @click="toggleAdmin(user)"
                        :disabled="submitting"
                      >
                        <i class="fas fa-user-times"></i>
                        Remove Admin
                      </button>
                      <button
                        class="btn btn-sm btn-danger"
                        @click="deleteUser(user.id)"
                        :disabled="submitting"
                      >
                        <i class="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: 'AdminUsers',
  components: {
    AdminLayout
  },
  setup() {
    const users = ref([])
    const submitting = ref(false)
    const apiStore = useApiStore()

    const fetchUsers = async () => {
      try {
        const response = await apiStore.get('/admin/users')
        users.value = response.data || []
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    const toggleAdmin = async (user) => {
      const action = user.is_admin ? 'remove admin privileges from' : 'make admin'
      if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
        submitting.value = true
        try {
          if (user.is_admin) {
            await apiStore.post(`/admin/users/${user.id}/remove-admin`)
          } else {
            await apiStore.post(`/admin/users/${user.id}/make-admin`)
          }
          await fetchUsers()
        } catch (error) {
          console.error('Failed to update user admin status:', error)
        } finally {
          submitting.value = false
        }
      }
    }

    const deleteUser = async (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        submitting.value = true
        try {
          await apiStore.delete(`/admin/users/${id}`)
          await fetchUsers()
        } catch (error) {
          console.error('Failed to delete user:', error)
        } finally {
          submitting.value = false
        }
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      submitting,
      toggleAdmin,
      deleteUser
    }
  }
}
</script>

<style scoped>
.admin-users {
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

.user-id {
  font-weight: 600;
  color: var(--theme, #6B8F71);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
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

.user-name {
  font-weight: 600;
  color: #2c3e50;
}

.role-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-badge.admin {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.role-badge.user {
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  color: white;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.verified {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.status-badge.unverified {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-buttons .btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 6px 12px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-buttons .btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-buttons .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.action-buttons .btn i {
  margin-right: 5px;
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

  .user-info {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .action-buttons {
    justify-content: center;
  }
}
</style>