<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading product..." />
    <div class="admin-product-view" v-if="product">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Details - #{{ product.id }}</h2>
        <router-link to="/admin/products" class="btn btn-secondary">
          <i class="fas fa-arrow-left me-2"></i>Back to Products
        </router-link>
      </div>

      <div class="row">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Product Images</h5>
              <span class="text-muted" v-if="allImages.length > 0">{{ allImages.length }} image(s)</span>
            </div>
            <div class="card-body">
              <div class="product-images">
                <div class="main-image text-center mb-4">
                  <img v-if="currentImage" :src="getImageUrl(currentImage)" :alt="product.name" class="img-fluid" style="max-height: 400px; object-fit: contain; border-radius: 8px;" @error="handleImageError">
                  <img v-else src="/assets/img/product/bag1.jpg" :alt="product.name" class="img-fluid" style="max-height: 400px; object-fit: contain; border-radius: 8px;">
                </div>
                <div class="thumbnail-grid" v-if="allImages.length > 1">
                  <div 
                    v-for="(img, index) in allImages" 
                    :key="index" 
                    class="thumbnail-item"
                    :class="{ active: currentImageIndex === index }"
                    @click="currentImageIndex = index"
                  >
                    <img :src="getImageUrl(img)" :alt="`Thumbnail ${index + 1}`" @error="handleImageError">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3">
              <h5 class="mb-0">Product Description</h5>
            </div>
            <div class="card-body">
              <p>{{ product.description || 'No description available.' }}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Product Information</h5>
              <span class="badge" :class="product.is_active ? 'bg-success' : 'bg-secondary'">
                {{ product.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <strong>Name:</strong>
                <p class="mb-0 mt-1">{{ product.name }}</p>
              </div>
              <div class="mb-3">
                <strong>Price:</strong>
                <p class="mb-0 mt-1">${{ product.price }}</p>
              </div>
              <div class="mb-3">
                <strong>Category:</strong>
                <p class="mb-0 mt-1">{{ product.category?.name || 'N/A' }}</p>
              </div>
              <div class="mb-3">
                <strong>Stock:</strong>
                <p class="mb-0 mt-1" :class="product.stock > 0 ? 'text-success' : 'text-danger'">
                  {{ product.stock }} items
                </p>
              </div>
              <div class="mb-3" v-if="product.average_rating">
                <strong>Rating:</strong>
                <p class="mb-0 mt-1">
                  <i class="fas fa-star" v-for="i in 5" :key="i" :style="{ color: i <= Math.round(product.average_rating) ? '#f39c12' : '#ddd' }"></i>
                  <span class="ms-2 text-muted">({{ product.total_reviews || 0 }} reviews)</span>
                </p>
              </div>
              <div class="mb-3">
                <strong>Created:</strong>
                <p class="mb-0 mt-1 text-muted">{{ formatDate(product.created_at) }}</p>
              </div>
              <div class="mb-3" v-if="product.updated_at">
                <strong>Last Updated:</strong>
                <p class="mb-0 mt-1 text-muted">{{ formatDate(product.updated_at) }}</p>
              </div>
            </div>
          </div>

          <div class="card shadow-sm border-0">
            <div class="card-header bg-white py-3">
              <h5 class="mb-0">Actions</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <router-link :to="`/admin/products/add/${product.id}`" class="btn btn-primary">
                  <i class="fas fa-edit me-2"></i>Edit Product
                </router-link>
                <button @click="confirmDelete" class="btn btn-danger" :disabled="deleting">
                  <i class="fas fa-trash me-2"></i>{{ deleting ? 'Deleting...' : 'Delete Product' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!loading" class="alert alert-warning">
      Product not found.
    </div>
  </AdminLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AdminPreloader from '../components/AdminPreloader.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminProductView',
  components: {
    AdminLayout,
    AdminPreloader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const apiStore = useApiStore()
    const loading = ref(true)
    const deleting = ref(false)
    const product = ref(null)
    const currentImageIndex = ref(0)

    const getImageUrl = (path) => {
      if (!path) return '/assets/img/product/bag1.jpg'
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
      }
      return path
    }

    const handleImageError = (event) => {
      event.target.src = '/assets/img/product/bag1.jpg'
    }

    const allImages = computed(() => {
      if (!product.value) return []
      const images = []
      if (product.value.image) images.push(product.value.image)
      if (product.value.images && Array.isArray(product.value.images)) {
        images.push(...product.value.images)
      }
      return images.length > 0 ? images : ['/assets/img/product/bag1.jpg']
    })

    const currentImage = computed(() => {
      return allImages.value[currentImageIndex.value] || ''
    })

    const fetchProduct = async () => {
      loading.value = true
      try {
        const response = await apiStore.get(`/admin/products/${route.params.id}`)
        product.value = response.data
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        loading.value = false
      }
    }

    const confirmDelete = async () => {
      if (confirm(`Are you sure you want to delete "${product.value.name}"? This action cannot be undone.`)) {
        deleting.value = true
        try {
          await apiStore.delete(`/admin/products/${product.value.id}`)
          router.push('/admin/products')
        } catch (error) {
          console.error('Failed to delete product:', error)
          alert('Failed to delete product. Please try again.')
        } finally {
          deleting.value = false
        }
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      loading,
      deleting,
      product,
      currentImageIndex,
      allImages,
      currentImage,
      getImageUrl,
      handleImageError,
      confirmDelete,
      formatDate
    }
  }
}
</script>

<style>
.admin-product-view {
  padding: 20px 0;
}

.admin-product-view h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.admin-product-view .product-images {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.admin-product-view .main-image img {
  border-radius: 8px;
  background: white;
  padding: 10px;
}

.admin-product-view .thumbnail-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.admin-product-view .thumbnail-item {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.admin-product-view .thumbnail-item:hover {
  border-color: #6B8F71;
}

.admin-product-view .thumbnail-item.active {
  border-color: #6B8F71;
}

.admin-product-view .thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-product-view .btn-primary {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.admin-product-view .btn-primary:hover {
  background-color: #010F1C;
  border-color: #010F1C;
}

.admin-product-view .btn-secondary {
  background-color: #55585B;
  border-color: #55585B;
  color: white;
}

.admin-product-view .btn-secondary:hover {
  background-color: #010F1C;
  border-color: #010F1C;
  color: white;
}

.admin-product-view .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.admin-product-view .btn-danger:hover {
  background-color: #bb2d3b;
  border-color: #bb2d3b;
}

.admin-product-view .btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>