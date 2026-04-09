<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading users..." />
    <div class="admin-users">
      <h2 class="mb-4">Manage Users</h2>
      <div class="table-responsive">
        <table class="table table-striped">
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
              <td>{{ user.id }}</td>
              <td>{{ user.name || 'N/A' }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="badge" :class="user.is_admin ? 'bg-danger' : 'bg-primary'">
                  {{ user.is_admin ? 'Admin' : 'User' }}
                </span>
              </td>
              <td>
                <span class="badge" :class="user.email_verified_at ? 'bg-success' : 'bg-warning'">
                  {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                </span>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    v-if="!user.is_admin"
                    class="btn btn-success"
                    @click="toggleAdmin(user)"
                    :disabled="submitting"
                  >
                    Make Admin
                  </button>
                  <button
                    v-else
                    class="btn btn-warning"
                    @click="toggleAdmin(user)"
                    :disabled="submitting"
                  >
                    Remove Admin
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="deleteUser(user.id)"
                    :disabled="submitting"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-4" v-if="totalPages > 1">
        <div class="text-muted">
          Showing {{ currentPage }} of {{ totalPages }} pages
        </div>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
            </li>
            <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
            </li>
          </ul>
        </nav>
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

    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, currentPage.value + 2)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    const fetchUsers = async (page = 1) => {
      loading.value = true
      try {
        const response = await apiStore.get('/admin/users', { params: { page, per_page: perPage.value } })
        users.value = response?.data?.data || []
        if (response?.data?.meta) {
          currentPage.value = response.data.meta.current_page || 1
          totalPages.value = response.data.meta.last_page || 1
          perPage.value = response.data.meta.per_page || 15
        } else if (response?.data?.last_page) {
          currentPage.value = response.data.current_page || 1
          totalPages.value = response.data.last_page || 1
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
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
  padding: 20px 0;
}

.admin-users .btn-success {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.admin-users .btn-success:hover {
  background-color: #010F1C;
  border-color: #010F1C;
}

.admin-users .btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.admin-users .btn-warning:hover {
  background-color: #e0a800;
  border-color: #e0a800;
}

.admin-users .btn-danger {
  background-color: #EF6CC2;
  border-color: #EF6CC2;
}

.admin-users .btn-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.admin-users .pagination {
  margin: 0;
}

.admin-users .page-link {
  color: #6B8F71;
  border-color: #dee2e6;
}

.admin-users .page-link:hover {
  color: #010F1C;
  background-color: #f8f9fa;
}

.admin-users .page-item.active .page-link {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.admin-users .page-item.disabled .page-link {
  color: #6c757d;
}
</style>