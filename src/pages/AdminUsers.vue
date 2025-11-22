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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.status }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" @click="editUser(user)">Edit</button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">Delete</button>
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
    const apiStore = useApiStore()

    const fetchUsers = async () => {
      try {
        const data = await apiStore.get('/api/admin/users')
        users.value = data
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    const editUser = (user) => {
      // TODO: Implement edit functionality
      console.log('Edit user:', user)
    }

    const deleteUser = async (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await apiStore.delete(`/api/admin/users/${id}`)
          await fetchUsers()
        } catch (error) {
          console.error('Failed to delete user:', error)
        }
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      editUser,
      deleteUser
    }
  }
}
</script>

<style scoped>
.admin-users {
  padding: 20px 0;
}

.admin-users .btn-outline-primary {
  color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-users .btn-outline-primary:hover {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-users .btn-outline-danger {
  color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}

.admin-users .btn-outline-danger:hover {
  background-color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}
</style>