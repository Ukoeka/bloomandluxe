<template>
  <AdminLayout>
    <div class="admin-products">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <router-link to="/admin/products/add" class="btn btn-success">Add New Product</router-link>
      </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>${{ product.price }}</td>
                <td>{{ product.category?.name || 'N/A' }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <AdminTableActions
                    :item="product"
                    @edit="editProduct"
                    @delete="deleteProduct($event.id)"
                  />
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
import { useRouter } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AdminTableActions from '../components/AdminTableActions.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminProducts',
  components: {
    AdminLayout,
    AdminTableActions
  },
  setup() {
    const router = useRouter()
    const products = ref([])
    const apiStore = useApiStore()

    const fetchProducts = async () => {
      try {
        const response = await apiStore.get('/admin/products')
        console.log(response,'response');
        products.value = response?.data?.data || []
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    const editProduct = (product) => {
      router.push(`/admin/products/add/${product.id}`)
    }

    const deleteProduct = async (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await apiStore.delete(`/admin/products/${id}`)
          await fetchProducts()
        } catch (error) {
          console.error('Failed to delete product:', error)
        }
      }
    }

    onMounted(() => {
      fetchProducts()
      console.log('getting products',products.value)
    })

    return {
      products,
      editProduct,
      deleteProduct
    }
  }
}
</script>

<style scoped>
.admin-products .btn-success {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-products .btn-success:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-products .btn-outline-danger {
  color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}

.admin-products .btn-outline-danger:hover {
  background-color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}
</style>
