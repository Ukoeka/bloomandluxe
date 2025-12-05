<template>
  <AdminLayout>
    <div class="add-product-page">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h2>
        <router-link to="/admin/products" class="btn btn-secondary">Back to Products</router-link>
      </div>
      <div class="row">
        <div class="col-md-8">
          <form @submit.prevent="saveProduct">
            <div class="card">
              <div class="card-body">
                <div class="mb-3">
                  <label for="productName" class="form-label">Product Name</label>
                  <input v-model="productForm.name" type="text" class="form-control" id="productName" required>
                </div>
                <div class="mb-3">
                  <label for="productPrice" class="form-label">Price</label>
                  <input v-model="productForm.price" type="number" step="0.01" class="form-control" id="productPrice" required>
                </div>
                <div class="mb-3">
                  <label for="productCategory" class="form-label">Category</label>
                  <select v-model="productForm.category_id" class="form-select" id="productCategory" required :disabled="loadingCategories">
                    <option value="">
                      {{ loadingCategories ? 'Loading categories...' : 'Select Category' }}
                    </option>
                    <option v-for="category in sortedCategories" :key="category.id" :value="category.id"
                            :style="{ 'padding-left': getCategoryIndent(category) + 'px' }">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="productStock" class="form-label">Stock Quantity</label>
                  <input v-model="productForm.stock" type="number" class="form-control" id="productStock" required>
                </div>
                <div class="mb-3">
                  <label for="productDescription" class="form-label">Description</label>
                  <textarea v-model="productForm.description" class="form-control" id="productDescription" rows="4"></textarea>
                </div>
                <div class="mb-3">
                  <label for="productImage" class="form-label">Product Image</label>
                  <input type="file" class="form-control" id="productImage" accept="image/*" @change="handleImageUpload">
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Save Product') }}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Product Preview</h5>
              <div class="text-center mb-3">
                <img v-if="imagePreview" :src="imagePreview" alt="Product preview" class="img-fluid" style="max-height: 200px;">
                <div v-else class="text-muted">
                  <i class="fas fa-image fa-3x mb-2"></i>
                  <p>No image selected</p>
                </div>
              </div>
              <h6>{{ productForm.name || 'Product Name' }}</h6>
              <p class="text-muted">${{ productForm.price || '0.00' }}</p>
              <p>{{ productForm.description || 'Product description will appear here.' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminAddProduct',
  components: {
    AdminLayout
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const apiStore = useApiStore()
    const loading = ref(false)
    const productForm = ref({
      name: '',
      price: 0,
      category_id: '',
      stock: 0,
      description: '',
      image: null
    })
    const imagePreview = ref('')
    const categories = ref([])
    const loadingCategories = ref(false)
    const isEditing = ref(false)
    const productId = ref(null)

    const sortedCategories = computed(() => {
      if (!categories.value || !Array.isArray(categories.value)) {
        return []
      }

      const result = []
      const categoryMap = new Map()

      // Create a map for quick lookup
      categories.value.forEach(cat => {
        categoryMap.set(cat.id, { ...cat, children: [] })
      })

      // Build the hierarchy
      categories.value.forEach(cat => {
        if (cat.parent_id) {
          const parent = categoryMap.get(cat.parent_id)
          if (parent) {
            parent.children.push(categoryMap.get(cat.id))
          }
        }
      })

      // Flatten the hierarchy with proper ordering
      const addCategory = (cat, level = 0) => {
        result.push({ ...cat, level })
        if (cat.children && Array.isArray(cat.children)) {
          cat.children.forEach(child => addCategory(child, level + 1))
        }
      }

      const mainCategories = categories.value.filter(cat => !cat.parent_id)
      mainCategories.forEach(cat => addCategory(categoryMap.get(cat.id)))

      return result
    })

    const getCategoryIndent = (category) => {
      return category.level * 15 // 15px indent per level for dropdown
    }

    const fetchCategories = async () => {
      loadingCategories.value = true
      try {
        const response = await apiStore.get('/admin/categories')
        categories.value = response.data || []
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        loadingCategories.value = false
      }
    }

    const fetchProduct = async (id) => {
      loading.value = true
      try {
        const response = await apiStore.get(`/admin/products/${id}`)
        const product = response.data
        productForm.value = {
          name: product.name || '',
          price: product.price || 0,
          category_id: product.category_id || '',
          stock: product.stock || 0,
          description: product.description || '',
          image: null // Don't pre-fill image file
        }
        if (product.image) {
          imagePreview.value = product.image // Assuming the API returns the image URL
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
        alert('Failed to load product data.')
        router.push('/admin/products')
      } finally {
        loading.value = false
      }
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        productForm.value.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
          console.log('Image preview set:', imagePreview.value)
        }
        reader.readAsDataURL(file)
      } else {
        // Clear preview if no file selected
        imagePreview.value = ''
        productForm.value.image = null
      }
    }

    const saveProduct = async () => {
      loading.value = true
      try {
        const formData = new FormData()
        formData.append('name', productForm.value.name)
        formData.append('price', productForm.value.price)
        formData.append('category_id', productForm.value.category_id)
        formData.append('stock', productForm.value.stock)
        formData.append('description', productForm.value.description)
        formData.append('is_active', '1')

        if (productForm.value.image) {
          formData.append('image', productForm.value.image)
          console.log('Image file:', productForm.value.image)
        }

        console.log('FormData contents:')
        for (let [key, value] of formData.entries()) {
          console.log(key, value)
        }

        if (isEditing.value) {
          formData.append('_method', 'PUT')
        }
        await apiStore.post(isEditing.value ? `/admin/products/${productId.value}` : '/admin/products', formData)
        router.push('/admin/products')
      } catch (error) {
        console.error('Failed to save product:', error)
        alert('Failed to save product. Please try again.')
      } finally {
        loading.value = false
      }
    }

    // Check if we're editing
    const id = route.params.id
    if (id) {
      isEditing.value = true
      productId.value = id
    }

    onMounted(async () => {
      await fetchCategories()
      if (isEditing.value) {
        await fetchProduct(productId.value)
      }
    })

    return {
      productForm,
      imagePreview,
      categories,
      sortedCategories,
      getCategoryIndent,
      loading,
      loadingCategories,
      isEditing,
      handleImageUpload,
      saveProduct
    }
  }
}
</script>

<style scoped>
.add-product-page {
  padding: 20px 0;
}

.add-product-page .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.add-product-page .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.add-product-page .btn-secondary {
  background-color: var(--text, #55585B);
  border-color: var(--text, #55585B);
}

.add-product-page .btn-secondary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}
</style>