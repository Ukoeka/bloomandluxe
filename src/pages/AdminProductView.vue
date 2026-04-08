<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading product..." />
    <div class="admin-product-view" v-if="product">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Details</h2>
        <div>
          <router-link :to="`/admin/products/add/${product.id}`" class="btn btn-primary me-2">
            <i class="fas fa-edit"></i> Edit
          </router-link>
          <router-link to="/admin/products" class="btn btn-secondary">Back to Products</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="product-images">
                <div class="main-image text-center mb-3">
                  <img v-if="currentImage" :src="currentImage" :alt="product.name" class="img-fluid" style="max-height: 400px; object-fit: contain;">
                  <img v-else src="/assets/img/product/bag1.jpg" :alt="product.name" class="img-fluid" style="max-height: 400px; object-fit: contain;">
                </div>
                <div class="thumbnail-grid" v-if="allImages.length > 1">
                  <div 
                    v-for="(img, index) in allImages" 
                    :key="index" 
                    class="thumbnail-item"
                    :class="{ active: currentImageIndex === index }"
                    @click="currentImageIndex = index"
                  >
                    <img :src="img" :alt="`Thumbnail ${index + 1}`">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="mb-3">{{ product.name }}</h3>
              <div class="mb-3">
                <span class="badge" :class="product.is_active ? 'bg-success' : 'bg-secondary'">
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <div class="mb-3">
                <strong>Price:</strong> ${{ product.price }}
              </div>
              <div class="mb-3">
                <strong>Category:</strong> {{ product.category?.name || 'N/A' }}
              </div>
              <div class="mb-3">
                <strong>Stock:</strong> 
                <span :class="product.stock > 0 ? 'text-success' : 'text-danger'">
                  {{ product.stock }} items
                </span>
              </div>
              <div class="mb-3">
                <strong>Description:</strong>
                <p class="mt-2">{{ product.description || 'No description available' }}</p>
              </div>
              <div class="mb-3" v-if="product.average_rating">
                <strong>Rating:</strong>
                <span class="ms-2">
                  <i class="fas fa-star" v-for="i in 5" :key="i" :style="{ color: i <= Math.round(product.average_rating) ? '#f39c12' : '#ddd' }"></i>
                  <span class="ms-2">({{ product.total_reviews || 0 }} reviews)</span>
                </span>
              </div>
              <div class="mb-3">
                <strong>Created:</strong> {{ formatDate(product.created_at) }}
              </div>
              <div class="mb-3" v-if="product.updated_at">
                <strong>Last Updated:</strong> {{ formatDate(product.updated_at) }}
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
import { useRoute } from 'vue-router'
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
    const apiStore = useApiStore()
    const loading = ref(true)
    const product = ref(null)
    const currentImageIndex = ref(0)

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
      product,
      currentImageIndex,
      allImages,
      currentImage,
      formatDate
    }
  }
}
</script>

<style scoped>
.admin-product-view {
  padding: 20px 0;
}

.product-images {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.main-image img {
  border-radius: 8px;
  background: white;
  padding: 10px;
}

.thumbnail-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.thumbnail-item {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.thumbnail-item:hover {
  border-color: var(--theme, #6B8F71);
}

.thumbnail-item.active {
  border-color: var(--theme, #6B8F71);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-product-view .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-product-view .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-product-view .btn-secondary {
  background-color: var(--text, #55585B);
  border-color: var(--text, #55585B);
}

.admin-product-view .btn-secondary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}
</style>