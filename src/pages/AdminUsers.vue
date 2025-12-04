<template>
  <AdminLayout>
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

.admin-users .btn-success {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-users .btn-success:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
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
  background-color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
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
</style>