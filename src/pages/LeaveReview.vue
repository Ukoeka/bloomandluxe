<template>
  <SharedLayout>
    <section class="leave-review-section section-padding pb-80 pt-100 fix">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="review-box card shadow-sm border-0 rounded-4">
              <div class="card-body p-5">
                
                <div class="text-center mb-4 pb-3 border-bottom">
                  <h2 class="mb-2">Leave a Review</h2>
                  <p class="text-muted">Your feedback helps us and other customers immensely!</p>
                </div>

                <div v-if="loadingProduct" class="text-center py-5">
                  <div class="spinner-border text-primary speed-fast" role="status"></div>
                  <p class="mt-3">Loading product details...</p>
                </div>

                <div v-else-if="error" class="alert alert-danger" role="alert">
                  <i class="fas fa-exclamation-triangle me-2"></i> {{ error }}
                  <div class="mt-3">
                    <router-link to="/my-orders" class="btn btn-outline-danger btn-sm">Take me back</router-link>
                  </div>
                </div>

                <div v-else-if="product" class="review-form-wrapper">
                  <!-- Product Summary -->
                  <div class="product-summary d-flex align-items-center gap-4 mb-5 p-3 bg-light rounded-3">
                    <img :src="getImageUrl(product.image)" :alt="product.name" class="img-fluid rounded" style="width: 80px; height: 80px; object-fit: cover;">
                    <div>
                      <h5 class="mb-1">{{ product.name }}</h5>
                      <span v-if="orderId" class="badge bg-secondary text-white">Order #{{ orderId }}</span>
                    </div>
                  </div>

                  <form @submit.prevent="submitReview">
                    <div class="mb-4 text-center">
                      <label class="form-label fw-bold d-block mb-3 fs-5">How would you rate this product?</label>
                      <div class="rating-input d-flex justify-content-center gap-2">
                        <span v-for="star in 5" :key="star"
                              @click="selectedRating = star"
                              class="star-input"
                              :class="{ 'selected': star <= selectedRating }">
                          <i class="fas fa-star"></i>
                        </span>
                      </div>
                      <div class="mt-2 text-muted small">
                        {{ ratingText(selectedRating) }}
                      </div>
                    </div>

                    <div class="mb-4">
                      <label for="reviewComment" class="form-label fw-bold">Write your review</label>
                      <textarea v-model="reviewComment" class="form-control bg-light border-0 py-3" id="reviewComment"
                                rows="5" placeholder="What did you like or dislike? How was the quality?"
                                required></textarea>
                    </div>

                    <div class="d-grid mt-5">
                      <button type="submit" class="theme-btn py-3 fs-5 rounded-3" :disabled="submitting || !selectedRating">
                        <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                        {{ submitting ? 'Submitting...' : 'Submit Review' }}
                      </button>
                    </div>
                  </form>
                </div>
                
                <!-- Success State -->
                <div v-else-if="success" class="text-center py-5">
                   <div class="success-icon mb-4 text-success">
                     <i class="fas fa-check-circle fa-4x"></i>
                   </div>
                   <h3>Thank you!</h3>
                   <p class="text-muted mb-4">Your review has been submitted successfully and is now visible to other customers.</p>
                   <router-link :to="`/product-details/${product?.id || productId}`" class="theme-btn">
                      View Product
                   </router-link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SharedLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApiStore } from '../stores/api'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'LeaveReview',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const api = useApiStore()

    const productId = computed(() => route.params.productId)
    const orderId = computed(() => route.query.orderId || '')
    
    const product = ref(null)
    const loadingProduct = ref(true)
    const error = ref(null)
    const success = ref(false)

    const selectedRating = ref(5)
    const reviewComment = ref('')
    const submitting = ref(false)

    const fetchProductDetails = async () => {
      loadingProduct.value = true
      error.value = null
      try {
        const response = await api.get(`/products/${productId.value}`)
        product.value = response.data
      } catch (err) {
        error.value = 'Failed to load product details. The product may no longer exist.'
        console.error('Error fetching product:', err)
      } finally {
        loadingProduct.value = false
      }
    }

    const submitReview = async () => {
      if (!selectedRating.value) {
        error.value = "Please select a star rating."
        return
      }

      submitting.value = true
      error.value = null

      try {
        await api.post(`/products/${productId.value}/reviews`, {
          // If the backend strictly needs 'order_id', pass it. If it validates on backend via recent purchase, that's fine too.
          order_id: orderId.value,
          rating: selectedRating.value,
          comment: reviewComment.value
        })
        
        success.value = true
        product.value = null // Hide form, show success
        
      } catch (err) {
        console.error('Error submitting review:', err)
        if(err.response?.status === 403 || err.response?.data?.message?.includes('purchase')) {
           error.value = err.response?.data?.message || 'You can only review products that you have successfully purchased and received.'
        } else {
           error.value = err.response?.data?.message || 'Failed to submit the review. Please check your data and try again.'
        }
      } finally {
        submitting.value = false
      }
    }

    const ratingText = (rating) => {
        switch(rating) {
            case 1: return "Poor"
            case 2: return "Fair"
            case 3: return "Average"
            case 4: return "Good"
            case 5: return "Excellent"
            default: return ""
        }
    }

    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/cart/01.jpg'
      if (imagePath.startsWith('http')) return imagePath
      return 'https://api.digi-essentials.com/' + imagePath.replace(/^\//, '')
    }

    onMounted(() => {
      fetchProductDetails()
      
      // Theme specific fixes
      if (window.$) {
        // Sticky Header
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
        });
        
        // Mobile Menu
        $('#mobile-menu').meanmenu({
          meanMenuContainer: '.mobile-menu',
          meanScreenWidth: "1199",
          meanExpand: ['<i class="far fa-plus"></i>'],
        });
      }
    })

    return {
      productId,
      orderId,
      product,
      loadingProduct,
      error,
      success,
      selectedRating,
      reviewComment,
      submitting,
      submitReview,
      ratingText,
      getImageUrl
    }
  }
}
</script>

<style scoped>
.leave-review-section {
    background-color: var(--bg-3, #F3F7FF);
    min-height: 80vh;
}

.star-input {
  color: #e0e0e0;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.star-input:hover {
  transform: scale(1.1);
}

.star-input.selected, .star-input:hover ~ .star-input {
  color: #ffc107; /* Bootstrap Warning color for stars */
}
/* Prevent hovered stars following cursor from lighting up inappropriately,
   instead we want all *previous* stars to be lit. The logic is tricky in CSS alone,
   but we handle the selected state in JS which works well.
*/
.rating-input:hover .star-input {
   color: #e0e0e0;
}
.star-input.selected {
    color: #ffc107 !important;
}

.form-control:focus {
    box-shadow: none;
    background-color: #fff !important;
    border: 1px solid var(--theme, #6B8F71) !important;
}
</style>
