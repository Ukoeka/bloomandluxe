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
                  <select v-model="selectedCategory" class="form-select" id="productCategory" required :disabled="loadingCategories">
                    <option value="">
                      {{ loadingCategories ? 'Loading categories...' : 'Select Category' }}
                    </option>
                    <option v-for="category in mainCategories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3" v-if="availableSubcategories.length > 0">
                  <label for="productSubcategory" class="form-label">Subcategory</label>
                  <select v-model="productForm.category_id" class="form-select" id="productSubcategory" required>
                    <option value="">Select Subcategory</option>
                    <option v-for="sub in availableSubcategories" :key="sub.id" :value="sub.id">
                      {{ sub.name }}
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
                <button type="submit" class="btn btn-primary" :disabled="loading || !isCategorySelected">
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
import { ref, computed, onMounted, watch } from 'vue'
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
    const selectedCategory = ref('')

    const mainCategories = computed(() => {
      if (!categories.value || !Array.isArray(categories.value)) {
        return []
      }
      return categories.value.filter(c => !c.parent_id)
    })

    const availableSubcategories = computed(() => {
      if (!categories.value || !Array.isArray(categories.value) || !selectedCategory.value) {
        return []
      }
      return categories.value.map(c => c.children).flat().filter(c => c.parent_id == selectedCategory.value) || []
    })

    console.log(availableSubcategories.value, selectedCategory.value)

    // Check if a valid category is selected (either subcategory or main category without children)
    const isCategorySelected = computed(() => {
      if (!selectedCategory.value) return false
      
      // If there are subcategories available, one must be selected
      if (availableSubcategories.value.length > 0) {
        return !!productForm.value.category_id
      }
      
      // If no subcategories, the main category itself is valid
      return true
    })

    // Watch for category changes
    watch(selectedCategory, (newVal) => {
      if (!newVal) {
        productForm.value.category_id = ''
        return
      }

      const subcategories = categories.value.find(c => c.id == newVal).children || [];
      availableSubcategories.value = subcategories;
      // If there are no subcategories, use the main category as the product category
      if (subcategories.length === 0) {
        productForm.value.category_id = newVal
      } else {
        // If there are subcategories, clear the selection so user must choose one
        if (!subcategories.find(s => s.id == productForm.value.category_id)) {
          productForm.value.category_id = ''
        }
      }
    })

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
        
        // Find the category and set the parent category
        const category = categories.value.find(c => c.id == product.category_id)
        if (category) {
          if (category.parent_id) {
            // This is a subcategory
            selectedCategory.value = category.parent_id
          } else {
            // This is a main category
            selectedCategory.value = category.id
          }
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
        }
        reader.readAsDataURL(file)
      } else {
        // Clear preview if no file selected
        imagePreview.value = ''
        productForm.value.image = null
      }
    }

    const saveProduct = async () => {
      // Validate that we have a valid category
      if (!isCategorySelected.value) {
        alert('Please select a category')
        return
      }

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
      selectedCategory,
      mainCategories,
      availableSubcategories,
      loading,
      loadingCategories,
      isEditing,
      isCategorySelected,
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

.add-product-page .btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>