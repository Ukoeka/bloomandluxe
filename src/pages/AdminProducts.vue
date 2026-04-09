<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading products..." />
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
                    :show-view="true"
                    @view="viewProduct"
                    @edit="editProduct"
                    @delete="deleteProduct($event.id)"
                  />
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
import { useRouter } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AdminPreloader from '../components/AdminPreloader.vue'
import AdminTableActions from '../components/AdminTableActions.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminProducts',
  components: {
    AdminLayout,
    AdminPreloader,
    AdminTableActions
  },
  setup() {
    const router = useRouter()
    const products = ref([])
    const loading = ref(true)
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

    const fetchProducts = async (page = 1) => {
      loading.value = true
      try {
        const response = await apiStore.get('/admin/products', { params: { page, per_page: perPage.value } })
        products.value = response?.data?.data || []
        if (response?.data?.meta) {
          currentPage.value = response.data.meta.current_page || 1
          totalPages.value = response.data.meta.last_page || 1
          perPage.value = response.data.meta.per_page || 15
        } else if (response?.data?.last_page) {
          currentPage.value = response.data.current_page || 1
          totalPages.value = response.data.last_page || 1
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        loading.value = false
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
        fetchProducts(page)
      }
    }

    const editProduct = (product) => {
      router.push(`/admin/products/add/${product.id}`)
    }

    const viewProduct = (product) => {
      router.push(`/admin/products/view/${product.id}`)
    }

    const deleteProduct = async (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await apiStore.delete(`/admin/products/${id}`)
          await fetchProducts(currentPage.value)
        } catch (error) {
          console.error('Failed to delete product:', error)
        }
      }
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      loading,
      products,
      currentPage,
      totalPages,
      visiblePages,
      changePage,
      viewProduct,
      editProduct,
      deleteProduct
    }
  }
}
</script>

<style scoped>
.admin-products .btn-success {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.admin-products .btn-success:hover {
  background-color: #010F1C;
  border-color: #010F1C;
}

.admin-products .btn-outline-danger {
  color: #EF6CC2;
  border-color: #EF6CC2;
}

.admin-products .btn-outline-danger:hover {
  background-color: #EF6CC2;
  border-color: #EF6CC2;
  color: white;
}

.admin-products .pagination {
  margin: 0;
}

.admin-products .page-link {
  color: #6B8F71;
  border-color: #dee2e6;
}

.admin-products .page-link:hover {
  color: #010F1C;
  background-color: #f8f9fa;
}

.admin-products .page-item.active .page-link {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.admin-products .page-item.disabled .page-link {
  color: #6c757d;
}
</style>
