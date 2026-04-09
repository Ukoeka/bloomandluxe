<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading users..." />
    <div class="admin-users">
      <div class="section-header mb-4">
        <h2>Manage Users</h2>
      </div>
      
      <div class="table-container">
        <table class="modern-table" v-if="users.length > 0">
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
            <tr v-for="user in users" :key="user.id">
              <td class="user-id">#{{ user.id }}</td>
              <td class="user-name">{{ user.name || 'N/A' }}</td>
              <td class="user-email">{{ user.email }}</td>
              <td>
                <span class="role-badge" :class="user.is_admin ? 'admin' : 'user'">
                  {{ user.is_admin ? 'Admin' : 'User' }}
                </span>
              </td>
              <td>
                <span class="email-badge" :class="user.email_verified_at ? 'verified' : 'unverified'">
                  {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button
                    v-if="!user.is_admin"
                    class="action-btn make-admin"
                    @click="toggleAdmin(user)"
                    :disabled="submitting"
                  >
                    <i class="fas fa-user-shield me-1"></i>Make Admin
                  </button>
                  <button
                    v-else
                    class="action-btn remove-admin"
                    @click="toggleAdmin(user)"
                    :disabled="submitting"
                  >
                    <i class="fas fa-user-minus me-1"></i>Remove Admin
                  </button>
                  <button
                    class="action-btn delete"
                    @click="deleteUser(user.id)"
                    :disabled="submitting"
                  >
                    <i class="fas fa-trash me-1"></i>Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-state">
          <i class="fas fa-users"></i>
          <p>No users found</p>
        </div>
      </div>

      <div class="pagination-container" v-if="totalPages > 1">
        <div class="pagination-info">
          Showing {{ (currentPage - 1) * perPage + 1 }} to {{ Math.min(currentPage * perPage, totalItems) }} of {{ totalItems }} entries
        </div>
        <div class="pagination-controls">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1" 
            @click="changePage(currentPage - 1)"
          >
            <i class="fas fa-chevron-left"></i> Previous
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page" 
            class="pagination-btn"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages" 
            @click="changePage(currentPage + 1)"
          >
            Next <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AdminPreloader from '../components/AdminPreloader.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminUsers',
  components: {
    AdminLayout,
    AdminPreloader
  },
  setup() {
    const users = ref([])
    const loading = ref(true)
    const submitting = ref(false)
    const apiStore = useApiStore()
    const currentPage = ref(1)
    const totalPages = ref(1)
    const perPage = ref(15)
    const totalItems = ref(0)

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    const fetchUsers = async (page = 1) => {
      loading.value = true
      try {
        const response = await apiStore.get('/admin/users', { params: { page, per_page: perPage.value } })
        console.log('Users response:', response)
        
        // Handle different response formats
        if (Array.isArray(response?.data)) {
          // Direct array response
          users.value = response.data
          totalItems.value = response.data.length
          totalPages.value = 1
        } else if (response?.data?.data) {
          // Laravel paginated response with data wrapper
          users.value = response.data.data
          if (response.data.meta) {
            currentPage.value = response.data.meta.current_page || 1
            totalPages.value = response.data.meta.last_page || 1
            perPage.value = response.data.meta.per_page || 15
            totalItems.value = response.data.meta.total || 0
          } else if (response.data.last_page) {
            currentPage.value = response.data.current_page || 1
            totalPages.value = response.data.last_page || 1
            totalItems.value = response.data.data?.length || 0
          }
        } else if (response?.data) {
          // Fallback
          users.value = Array.isArray(response.data) ? response.data : []
          totalItems.value = users.value.length
          totalPages.value = 1
        } else {
          users.value = []
          totalItems.value = 0
          totalPages.value = 1
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
        users.value = []
      } finally {
        loading.value = false
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
        fetchUsers(page)
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
          await fetchUsers(currentPage.value)
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
          await fetchUsers(currentPage.value)
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
      loading,
      users,
      submitting,
      currentPage,
      totalPages,
      perPage,
      totalItems,
      visiblePages,
      changePage,
      toggleAdmin,
      deleteUser
    }
  }
}
</script>

<style scoped>
.admin-users {
  padding: 0;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

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
}

.modern-table tbody td {
  padding: 20px 30px;
  vertical-align: middle;
}

.user-id {
  font-weight: 600;
  color: #6B8F71;
}

.user-name {
  font-weight: 500;
  color: #2c3e50;
}

.user-email {
  color: #6c757d;
}

.role-badge, .email-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.role-badge.admin {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.role-badge.user {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.email-badge.verified {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.email-badge.unverified {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-btn.make-admin {
  background: rgba(107, 143, 113, 0.1);
  color: #6B8F71;
}

.action-btn.make-admin:hover {
  background: #6B8F71;
  color: white;
}

.action-btn.remove-admin {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.action-btn.remove-admin:hover {
  background: #f39c12;
  color: white;
}

.action-btn.delete {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.action-btn.delete:hover {
  background: #e74c3c;
  color: white;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  margin-top: 20px;
  border-top: 1px solid #f1f3f4;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 12px;
}

.pagination-info {
  color: #6c757d;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-btn:hover:not(:disabled) {
  background: #6B8F71;
  color: white;
  border-color: #6B8F71;
}

.pagination-btn.active {
  background: #6B8F71;
  color: white;
  border-color: #6B8F71;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .modern-table {
    font-size: 14px;
  }
  
  .modern-table thead th,
  .modern-table tbody td {
    padding: 12px 15px;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 15px;
  color: #dee2e6;
}

.empty-state p {
  font-size: 16px;
}
</style>