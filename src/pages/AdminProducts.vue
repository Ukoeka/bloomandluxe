<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading products..." />
    <div class="admin-products">
      <div class="section-header d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <router-link to="/admin/products/add" class="btn btn-success">
          <i class="fas fa-plus me-2"></i>Add New Product
        </router-link>
      </div>
      
      <div class="table-container">
        <table class="modern-table" v-if="products.length > 0">
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
              <td class="product-id">#{{ product.id }}</td>
              <td class="product-name">{{ product.name }}</td>
              <td class="product-price">${{ product.price }}</td>
              <td class="product-category">{{ product.category?.name || 'N/A' }}</td>
              <td class="product-stock">
                <span class="stock-badge" :class="product.stock > 0 ? 'in-stock' : 'out-of-stock'">
                  {{ product.stock }} items
                </span>
              </td>
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
        <div v-else class="empty-state">
          <i class="fas fa-box"></i>
          <p>No products found</p>
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

    const fetchProducts = async (page = 1) => {
      loading.value = true
      try {
        const response = await apiStore.get('/admin/products', { params: { page, per_page: perPage.value } })
        console.log('Products response:', response)
        
        // Handle different response formats
        if (Array.isArray(response?.data)) {
          products.value = response.data
          totalItems.value = response.data.length
          totalPages.value = 1
        } else if (response?.data?.data) {
          products.value = response.data.data
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
          products.value = Array.isArray(response.data) ? response.data : []
          totalItems.value = products.value.length
          totalPages.value = 1
        } else {
          products.value = []
          totalItems.value = 0
          totalPages.value = 1
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        products.value = []
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
      perPage,
      totalItems,
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
.admin-products {
  padding: 0;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.btn-success {
  background: linear-gradient(135deg, #6B8F71, #5a7d5f);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background: linear-gradient(135deg, #5a7d5f, #4a6c4f);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(107, 143, 113, 0.3);
  color: white;
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

.product-id {
  font-weight: 600;
  color: #6B8F71;
}

.product-name {
  font-weight: 500;
  color: #2c3e50;
}

.product-price {
  font-weight: 600;
  color: #2c3e50;
}

.product-category {
  color: #6c757d;
}

.stock-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.stock-badge.in-stock {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
}

.stock-badge.out-of-stock {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
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