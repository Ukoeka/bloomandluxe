<template>
  <SharedLayout>
    <section class="create-dispute-section section-padding fix">
      <div class="container">
        <div class="top-content mb-5">
          <h2>Create Dispute Ticket</h2>
          <ul class="list">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/my-orders">My Orders</router-link>
            </li>
            <li>
              <router-link :to="`/order-details/${orderId}`">Order #{{ orderNumber }}</router-link>
            </li>
            <li>Create Dispute</li>
          </ul>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card shadow-sm border-0">
              <div class="card-header bg-white py-4">
                <h5 class="mb-0">
                  <i class="fas fa-ticket-alt me-2 text-primary"></i>
                  Submit a Dispute
                </h5>
              </div>
              <div class="card-body p-4">
                <div v-if="successMessage" class="alert alert-success" role="alert">
                  <i class="fas fa-check-circle me-2"></i>
                  {{ successMessage }}
                </div>

                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  {{ errorMessage }}
                </div>

                <form @submit.prevent="submitDispute">
                  <!-- Order ID -->
                  <div class="mb-4">
                    <label for="orderId" class="form-label fw-semibold">
                      Order ID <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control form-control-lg" 
                      id="orderId" 
                      v-model="form.order_id"
                      readonly
                      required
                    >
                  </div>

                  <!-- Subject -->
                  <div class="mb-4">
                    <label for="subject" class="form-label fw-semibold">
                      Subject <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control form-control-lg" 
                      id="subject" 
                      v-model="form.subject"
                      placeholder="Enter the subject of your dispute"
                      required
                    >
                  </div>

                  <!-- Description -->
                  <div class="mb-4">
                    <label for="description" class="form-label fw-semibold">
                      Description <span class="text-danger">*</span>
                    </label>
                    <textarea 
                      class="form-control" 
                      id="description" 
                      v-model="form.description"
                      rows="6"
                      placeholder="Please describe your issue in detail"
                      required
                    ></textarea>
                  </div>

                  <!-- Attachment -->
                  <div class="mb-4">
                    <label for="attachment" class="form-label fw-semibold">
                      Attachment <span class="text-muted">(optional)</span>
                    </label>
                    <input 
                      type="file" 
                      class="form-control" 
                      id="attachment" 
                      @change="handleFileChange"
                      accept="image/*,.pdf,.doc,.docx"
                    >
                    <small class="text-muted">
                      Accepted formats: Image, PDF, DOC (Max 5MB)
                    </small>
                    <div v-if="form.attachment" class="mt-2">
                      <span class="badge bg-primary">
                        <i class="fas fa-paperclip me-1"></i>
                        {{ form.attachment.name }}
                        <i class="fas fa-times ms-2 cursor-pointer" @click="removeAttachment"></i>
                      </span>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="d-flex gap-3">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg flex-grow-1" 
                      :disabled="submitting"
                    >
                      <span v-if="submitting">
                        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                        Submitting...
                      </span>
                      <span v-else>
                        <i class="fas fa-paper-plane me-2"></i>
                        Submit Ticket
                      </span>
                    </button>
                    <router-link 
                      :to="`/order-details/${orderId}`" 
                      class="btn btn-outline-secondary btn-lg"
                    >
                      Cancel
                    </router-link>
                  </div>
                </form>
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
import SharedLayout from '../components/SharedLayout.vue'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'CreateDisputePage',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    
    const form = ref({
      order_id: '',
      subject: '',
      description: '',
      attachment: null
    })
    
    const submitting = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')
    const orderNumber = ref('')
    
    const orderId = computed(() => route.params.orderId || route.query.order_id || '')
    
    onMounted(() => {
      // Get order ID from route params or query
      form.value.order_id = orderId.value
      
      // Fetch order details to get order number
      if (orderId.value) {
        fetchOrderDetails()
      }
      
      // Initialize jQuery plugins
      initPlugins()
    })
    
    const fetchOrderDetails = async () => {
      try {
        const order = await authStore.fetchOrderDetails(orderId.value)
        orderNumber.value = order.order_number
      } catch (err) {
        console.error('Error fetching order:', err)
      }
    }
    
    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          errorMessage.value = 'File size must be less than 5MB'
          event.target.value = ''
          return
        }
        form.value.attachment = file
        errorMessage.value = ''
      }
    }
    
    const removeAttachment = () => {
      form.value.attachment = null
      document.getElementById('attachment').value = ''
    }
    
    const submitDispute = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      
      // Validate form
      if (!form.value.order_id || !form.value.subject || !form.value.description) {
        errorMessage.value = 'Please fill in all required fields'
        return
      }
      
      submitting.value = true
      
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('order_id', form.value.order_id)
        formData.append('subject', form.value.subject)
        formData.append('description', form.value.description)
        
        if (form.value.attachment) {
          formData.append('attachment', form.value.attachment)
        }
        
        // Submit dispute via API
        const response = await authStore.createDispute(formData)
        
        successMessage.value = 'Your dispute ticket has been submitted successfully!'
        
        // Redirect to order details after 2 seconds
        setTimeout(() => {
          router.push(`/order-details/${orderId.value}`)
        }, 2000)
        
      } catch (err) {
        console.error('Error submitting dispute:', err)
        errorMessage.value = err.response?.data?.message || 'Failed to submit dispute. Please try again.'
      } finally {
        submitting.value = false
      }
    }
    
    const initPlugins = () => {
      if (window.$) {
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
        });
        
        $('#mobile-menu').meanmenu({
          meanMenuContainer: '.mobile-menu',
          meanScreenWidth: "1199",
          meanExpand: ['<i class="far fa-plus"></i>'],
        });

        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
          $(".offcanvas__info").removeClass("info-open");
          $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
          $(".offcanvas__info").addClass("info-open");
          $(".offcanvas__overlay").addClass("overlay-open");
        });
      }
    }
    
    return {
      form,
      submitting,
      successMessage,
      errorMessage,
      orderId,
      orderNumber,
      handleFileChange,
      removeAttachment,
      submitDispute
    }
  }
}
</script>

<style scoped>
.create-dispute-section {
  background: #f8f9fa;
  min-height: 100vh;
}

.card {
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  border-color: #6B8F71;
  box-shadow: 0 0 0 0.2rem rgba(107, 143, 113, 0.15);
}

.btn-primary {
  background-color: #6B8F71;
  border-color: #6B8F71;
}

.btn-primary:hover {
  background-color: #5a7d5f;
  border-color: #5a7d5f;
}

.btn-primary:disabled {
  background-color: #6B8F71;
  border-color: #6B8F71;
  opacity: 0.7;
}

.cursor-pointer {
  cursor: pointer;
}

.badge {
  padding: 0.5em 0.75em;
  font-weight: 500;
}
</style>
