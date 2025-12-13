<template>
  <div class="product-reviews-section">
    <h3 class="section-title">Customer Reviews</h3>

    <!-- Rating Summary -->
    <div v-if="stats.total_reviews > 0" class="rating-summary mb-4">
      <div class="row align-items-center">
        <div class="col-md-3 text-center">
          <div class="average-rating">
            <h2 class="rating-number">{{ stats.average_rating.toFixed(1) }}</h2>
            <div class="stars">
              <span v-for="star in 5" :key="star" class="star"
                    :class="{ 'filled': star <= Math.round(stats.average_rating) }">
                ★
              </span>
            </div>
            <p class="reviews-count">{{ stats.total_reviews }} reviews</p>
          </div>
        </div>
        <div class="col-md-9">
          <div class="rating-breakdown">
            <div v-for="rating in [5,4,3,2,1]" :key="rating" class="rating-bar">
              <span class="rating-label">{{ rating }} star</span>
              <div class="progress">
                <div class="progress-bar" :style="{ width: stats.rating_distribution[rating].percentage + '%' }"></div>
              </div>
              <span class="rating-count">{{ stats.rating_distribution[rating].count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Write Review Button -->
    <div v-if="canReview" class="text-center mb-4">
      <button @click="showReviewForm = !showReviewForm" class="theme-btn">
        {{ showReviewForm ? 'Cancel Review' : 'Write a Review' }}
      </button>
    </div>

    <!-- Review Form -->
    <div v-if="showReviewForm" class="review-form card mb-4">
      <div class="card-body">
        <h5>Write Your Review</h5>
        <form @submit.prevent="submitReview">
          <div class="mb-3">
            <label class="form-label">Rating</label>
            <div class="rating-input">
              <span v-for="star in 5" :key="star"
                    @click="selectedRating = star"
                    class="star-input"
                    :class="{ 'selected': star <= selectedRating }">
                ★
              </span>
            </div>
          </div>

          <div class="mb-3">
            <label for="reviewComment" class="form-label">Your Review</label>
            <textarea v-model="reviewComment" class="form-control" id="reviewComment"
                      rows="4" placeholder="Share your experience with this product..."
                      required></textarea>
          </div>

          <div class="mb-3">
            <label for="orderSelect" class="form-label">Select Order</label>
            <select v-model="selectedOrderId" class="form-control" id="orderSelect" required>
              <option value="">Choose an order...</option>
              <option v-for="product in reviewableProducts" :key="product.order_id"
                      :value="product.order_id">
                Order #{{ product.order_number }} - {{ product.product.name }}
              </option>
            </select>
          </div>

          <button type="submit" class="theme-btn" :disabled="submitting">
            <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
            Submit Review
          </button>
        </form>
      </div>
    </div>

    <!-- Reviews List -->
    <div class="reviews-list">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border text-primary"></div>
        <p class="mt-2">Loading reviews...</p>
      </div>

      <div v-else-if="reviews.length === 0" class="text-center py-4">
        <p class="text-muted">No reviews yet. Be the first to review this product!</p>
      </div>

      <div v-else>
        <div v-for="review in reviews" :key="review.id" class="review-item card mb-3">
          <div class="card-body">
            <div class="review-header d-flex justify-content-between align-items-start">
              <div>
                <h6 class="review-author">{{ review.user.name }}</h6>
                <div class="review-rating">
                  <span v-for="star in 5" :key="star" class="star"
                        :class="{ 'filled': star <= review.rating }">
                    ★
                  </span>
                  <small class="text-muted ms-2">{{ formatDate(review.created_at) }}</small>
                </div>
              </div>
              <div v-if="review.is_verified_purchase" class="verified-badge">
                <i class="fas fa-check-circle text-success"></i>
                <small class="text-success">Verified Purchase</small>
              </div>
            </div>

            <div v-if="review.comment" class="review-content mt-2">
              <p>{{ review.comment }}</p>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMorePages" class="text-center mt-4">
          <button @click="loadMoreReviews" class="theme-btn alt-color" :disabled="loading">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useApiStore } from '../stores/api'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'ProductReviews',
  props: {
    productId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const api = useApiStore()
    const auth = useAuthStore()

    const reviews = ref([])
    const stats = ref({
      total_reviews: 0,
      average_rating: 0,
      rating_distribution: {}
    })
    const loading = ref(false)
    const showReviewForm = ref(false)
    const selectedRating = ref(5)
    const reviewComment = ref('')
    const selectedOrderId = ref('')
    const submitting = ref(false)
    const reviewableProducts = ref([])
    const currentPage = ref(1)
    const hasMorePages = ref(false)

    const canReview = computed(() => {
      return auth.isAuthenticated && reviewableProducts.value.length > 0
    })

    const loadReviews = async (page = 1) => {
      loading.value = true
      try {
        const response = await api.get(`/products/${props.productId}/reviews?page=${page}`)
        if (page === 1) {
          reviews.value = response.data.reviews
          stats.value = response.data.stats
        } else {
          reviews.value.push(...response.data.reviews)
        }
        hasMorePages.value = response.data.reviews.length === 10 // Assuming 10 per page
        currentPage.value = page
      } catch (error) {
        console.error('Error loading reviews:', error)
      } finally {
        loading.value = false
      }
    }

    const loadReviewableProducts = async () => {
      if (!auth.isAuthenticated) return

      try {
        const response = await api.get('/reviews/reviewable-products')
        reviewableProducts.value = response.data.products.filter(p => p.product.id == props.productId)
      } catch (error) {
        console.error('Error loading reviewable products:', error)
      }
    }

    const submitReview = async () => {
      if (!selectedOrderId.value || !selectedRating.value) return

      submitting.value = true
      try {
        await api.post(`/products/${props.productId}/reviews`, {
          order_id: selectedOrderId.value,
          rating: selectedRating.value,
          comment: reviewComment.value
        })

        // Reset form
        selectedRating.value = 5
        reviewComment.value = ''
        selectedOrderId.value = ''
        showReviewForm.value = false

        // Reload reviews and reviewable products
        await loadReviews(1)
        await loadReviewableProducts()

        // Show success message (you might want to use a toast notification)
        alert('Review submitted successfully!')

      } catch (error) {
        console.error('Error submitting review:', error)
        alert('Error submitting review. Please try again.')
      } finally {
        submitting.value = false
      }
    }

    const loadMoreReviews = () => {
      loadReviews(currentPage.value + 1)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(() => {
      loadReviews()
      loadReviewableProducts()
    })

    return {
      reviews,
      stats,
      loading,
      showReviewForm,
      selectedRating,
      reviewComment,
      selectedOrderId,
      submitting,
      reviewableProducts,
      canReview,
      submitReview,
      loadMoreReviews,
      formatDate
    }
  }
}
</script>

<style scoped>
.product-reviews-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.average-rating .rating-number {
  font-size: 3rem;
  font-weight: bold;
  color: #f39c12;
  margin: 0;
}

.stars, .rating-input {
  display: flex;
  gap: 2px;
  margin: 0.5rem 0;
}

.star, .star-input {
  color: #ddd;
  font-size: 1.2rem;
  cursor: pointer;
}

.star.filled, .star-input.selected {
  color: #f39c12;
}

.star-input:hover {
  color: #f39c12;
}

.reviews-count {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-label {
  min-width: 60px;
  font-size: 0.9rem;
}

.progress {
  flex: 1;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
}

.progress-bar {
  background-color: #f39c12;
  border-radius: 4px;
}

.rating-count {
  min-width: 30px;
  text-align: right;
  font-size: 0.9rem;
  color: #666;
}

.review-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.review-author {
  margin: 0;
  font-weight: 600;
}

.review-rating {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.review-content {
  margin-top: 0.75rem;
}

.review-form .card-body {
  padding: 1.5rem;
}

.theme-btn {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.theme-btn:hover {
  background-color: #e67e22;
}

.theme-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.theme-btn.alt-color {
  background-color: #3498db;
}

.theme-btn.alt-color:hover {
  background-color: #2980b9;
}
</style>