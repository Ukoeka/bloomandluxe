<template>
  <SharedLayout>
    <!-- Checkout Section Start -->
    <section class="checkout-section fix section-padding">
      <div class="container">
        <div class="checkout-wrapper">
          <div class="top-content">
            <h2>Checkout</h2>
            <ul class="list">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                Checkout
              </li>
            </ul>
          </div>
          <form id="checkout-form" @submit.prevent="submitOrder">
            <div class="row g-4">
              <div class="col-lg-8">
                <div class="checkout-single-wrapper">
                  <div class="checkout-single boxshado-single">
                    <h4>Billing Details</h4>
                    <div v-if="submitError" class="alert alert-danger mb-3">
                      {{ submitError }}
                    </div>
                    <div class="checkout-single-form">
                      <div class="row g-4">
                        <div class="col-lg-6">
                          <div class="input-single">
                            <span>First Name*</span>
                            <input type="text" v-model="formData.firstName" name="user-first-name" id="userFirstName" required
                              placeholder="First Name">
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="input-single">
                            <span>Last Name*</span>
                            <input type="text" v-model="formData.lastName" name="user-last-name" id="userLastName" required
                              placeholder="Last Name">
                          </div>
                        </div>
                      
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Street Address*</span>
                            <input v-model="formData.address" name="user-address" id="userAddress"
                              placeholder="Home number and street name" required>
                          </div>
                        </div>

                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Town/ City*</span>
                            <input v-model="formData.city" name="towncity" id="towncity" placeholder="Town/City" required>
                          </div>
                        </div>
                        
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>State*</span>
                            <select v-model="formData.state" name="state" id="state" class="state-select" required>
                              <option value="" disabled>Select your state</option>
                              <option value="NSW">New South Wales</option>
                              <option value="SA">South Australia</option>
                              <option value="TAS">Tasmania</option>
                              <option value="WA">Western Australia</option>
                              <option value="VIC">Victoria</option>
                              <option value="QLD">Queensland</option>
                              <option value="NT">Northern Territory</option>
                              <option value="ACT">ACT</option>
                            </select>
                          </div>
                        </div>
                        
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Delivery Method*</span>
                            <select v-model="formData.deliveryMethod" name="deliveryMethod" id="deliveryMethod" class="state-select" required>
                              <option value="" disabled>Select Preferred Method</option>
                              <option value="standard">Standard (5-7 days) - $12.00</option>
                              <option value="express">Express (3-5 days) - $15.00</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Phone*</span>
                            <input v-model="formData.phone" type="tel" placeholder="Phone" inputmode="numeric" pattern="[0-9]*" required @input="formData.phone = formData.phone.replace(/\D/g, '')">
                          </div>
                        </div>
                        
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Email Address*</span>
                            <input v-model="formData.email" type="email" placeholder="Email" :readonly="isLoggedIn" :disabled="isLoggedIn" required>
                          </div>
                        </div>
                        
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Order Notes (optional)</span>
                            <textarea v-model="formData.notes" name="notes" id="notes"
                              placeholder="Notes about your order, e.g special notes for delivery."></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4">
                <div class="checkout-order-area">
                  <h3>Your Order</h3>
                  <div class="product-checout-area">
                    <div class="checkout-item d-flex align-items-center justify-content-between">
                      <p>Product</p>
                      <p>Subtotal</p>
                    </div>
                    
                    <div v-for="item in cartStore.cartItems" :key="item.id" class="checkout-item d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <img :src="getImageUrl(item.image)" :alt="item.name" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
                        <div>
                          <p class="mb-0">{{ item.name || 'Product' }}</p>
                          <small class="text-muted">Qty: {{ item.quantity }}</small>
                        </div>
                      </div>
                      <p>${{ (Number(item.price) * item.quantity).toFixed(2) }}</p>
                    </div>
                    
                    <div class="checkout-item d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>${{ totalPrice.toFixed(2) }}</p>
                    </div>
                    
                    <div class="checkout-item d-flex justify-content-between">
                      <p>Shipping</p>
                      <div class="shopping-items">
                        <div v-if="formData.deliveryMethod" class="shipping-display">
                          <p class="mb-0">{{ deliveryMethodLabel }}: ${{ shippingFee.toFixed(2) }}</p>
                        </div>
                        <div v-else class="text-muted">
                          <p class="mb-0">Select deliver method</p>
                        </div>
                      </div>
                    </div>

                    <div class="checkout-item d-flex justify-content-between">
                      <p>Tax (10%)</p>
                      <p>${{ taxAmount.toFixed(2) }}</p>
                    </div>
                    
                    <div class="checkout-item d-flex align-items-center justify-content-between">
                      <p><strong>Total</strong></p>
                      <p><strong>${{ totalWithShippingAndTax.toFixed(2) }}</strong></p>
                    </div>
                   
                    <button type="submit" form="checkout-form" class="theme-btn mt-4" :disabled="isSubmitting || cartStore.cartItems.length === 0">
                      <span v-if="isSubmitting">
                        <i class="fas fa-spinner fa-spin me-2"></i>Processing...
                      </span>
                      <span v-else>
                        Proceed To Checkout
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </SharedLayout>
</template>

<script>
import { onMounted, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import { useCartStore } from '../stores/cart'
import { useApiStore } from '../stores/api'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'CheckoutPage',
  components: {
    SharedLayout
  },
  setup() {
    const cartStore = useCartStore()
    const router = useRouter()
    const apiStore = useApiStore()
    const authStore = useAuthStore()

    // Check if user is logged in
    const isLoggedIn = computed(() => !!authStore.user)

    // Ensure cart is loaded from localStorage
    if (!cartStore.initialized) {
      cartStore.loadCart()
    }

    const totalItems = computed(() => cartStore.getTotalItems())
    const totalPrice = computed(() => {
      const price = cartStore.getTotalPrice()
      return typeof price === 'number' ? price : 0
    })
    
    // Delivery pricing
    const DELIVERY_PRICES = {
      standard: 12.00,
      express: 15.00
    }
    
    const DELIVERY_TIMES = {
      standard: '5-7 days',
      express: '3-5 days'
    }
    
    // State code to full name mapping
    const STATE_NAMES = {
      'NSW': 'New South Wales',
      'SA': 'South Australia',
      'TAS': 'Tasmania',
      'WA': 'Western Australia',
      'VIC': 'Victoria',
      'QLD': 'Queensland',
      'NT': 'Northern Territory',
      'ACT': 'ACT'
    }
    
    // Get full state name for display
    const getStateName = computed(() => {
      return STATE_NAMES[formData.value.state] || formData.value.state
    })
    
    // Calculate shipping fee based on delivery method
    const shippingFee = computed(() => {
      if (!formData.value.deliveryMethod) return 0
      return DELIVERY_PRICES[formData.value.deliveryMethod] || 0
    })
    
    // Get delivery method label for display
    const deliveryMethodLabel = computed(() => {
      if (!formData.value.deliveryMethod) return ''
      const method = formData.value.deliveryMethod
      const time = DELIVERY_TIMES[method]
      const price = DELIVERY_PRICES[method]
      return `${method.charAt(0).toUpperCase() + method.slice(1)} (${time}) - ${price.toFixed(2)}`
    })
    
    // Calculate tax (10% of subtotal)
    const taxAmount = computed(() => {
      const base = totalPrice.value || 0
      return base * 0.10
    })

    // Calculate total with shipping and tax
    const totalWithShippingAndTax = computed(() => {
      const base = totalPrice.value || 0
      const shipping = shippingFee.value || 0
      const tax = taxAmount.value || 0
      return base + shipping + tax
    })

    // Form data
    const formData = ref({
      firstName: authStore.user?.name?.split(' ')[0] || '',
      lastName: authStore.user?.name?.split(' ').slice(1).join(' ') || '',
      email: authStore.user?.email || '',
      phone: authStore.user?.phone || '',
      address: '',
      city: '',
      state: '',
      deliveryMethod: '',
      notes: ''
    })

    const isSubmitting = ref(false)
    const submitError = ref('')

    const submitOrder = async () => {
      if (cartStore.cartItems.length === 0) {
        submitError.value = 'Your cart is empty'
        return
      }

      if (!formData.value.state) {
        submitError.value = 'Please select your state'
        return
      }

      if (!formData.value.deliveryMethod) {
        submitError.value = 'Please select a delivery method'
        return
      }

      isSubmitting.value = true
      submitError.value = ''

      try {
        // Prepare checkout data with cart items and shipping
        const checkoutData = {
          customer_name: `${formData.value.firstName} ${formData.value.lastName}`.trim(),
          customer_email: formData.value.email,
          customer_phone: formData.value.phone,
          shipping_address: `${formData.value.address}, ${formData.value.city}, ${getStateName.value}`.trim(),
          shipping_location: formData.value.state, // Send state code (NSW, VIC, etc)
          delivery_method: formData.value.deliveryMethod,
          delivery_time: DELIVERY_TIMES[formData.value.deliveryMethod],
          shipping_fee: shippingFee.value,
          tax_amount: taxAmount.value,
          total_amount: totalWithShippingAndTax.value,
          order_notes: formData.value.notes || '',
          // Send cart items directly in request
          items: cartStore.cartItems.map(item => ({
            product_id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }

        // Create order and get Stripe checkout URL
        const response = await apiStore.post('/cart/checkout', checkoutData)

        if (response.checkout_url) {
          // Clear cart after successful checkout
          cartStore.clearCart()
          // Redirect to Stripe checkout
          window.location.href = response.checkout_url
        } else {
          throw new Error('No checkout URL received')
        }

      } catch (error) {
        submitError.value = error.response?.data?.message || error.message || 'Failed to create checkout session. Please try again.'
        console.error('Checkout error:', error)
        isSubmitting.value = false
      }
    }

    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/cart/01.jpg'

      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
      }

      const baseUrl = 'https://api.bloomandluxe.store/api'
      return baseUrl + imagePath.replace(/^\//, '')
    }
    
    onMounted(() => {
      // Redirect to cart if empty after cart is initialized
      if (cartStore.cartItems.length === 0) {
        router.push('/shop-cart')
        return
      }
      
      // Initialize jQuery plugins and custom JS
      if (window.$) {
        const $ = window.$;
        
        // Sidebar Toggle
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
          $(".offcanvas__info").removeClass("info-open");
          $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
          $(".offcanvas__info").addClass("info-open");
          $(".offcanvas__overlay").addClass("overlay-open");
        });

        // Sidebar Area
        $("#openButton").on("click", function(e) {
          e.preventDefault();
          $("#targetElement").removeClass("side_bar_hidden");
        });
        $("#closeButton").on("click", function(e) {
          e.preventDefault();
          $("#targetElement").addClass("side_bar_hidden");
        });

        // Video Popup
        $('.img-popup').magnificPopup({
          type: "image",
          gallery: { enabled: true },
        });
        $('.video-popup').magnificPopup({
          type: 'iframe'
        });

        // Counterup
        $(".count").counterUp({
          delay: 15,
          time: 4000,
        });

        // Wow Animation
        new WOW().init();

        // Nice Select - Initialize selects with custom styling
        $('#state').niceSelect();
        $('#deliveryMethod').niceSelect();
        
        // Listen for nice-select changes and update Vue model
        $('#state').on('change', function() {
          formData.value.state = $(this).val();
        });
        
        $('#deliveryMethod').on('change', function() {
          formData.value.deliveryMethod = $(this).val();
        });

        // Sticky Header
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
        });

        // Search Popup
        $(".search-trigger").on("click", function (e) {
          e.preventDefault();
          $(".search-wrap").animate({ opacity: "toggle" }, 500);
          $(".nav-search, #search-close").addClass("open");
        });
        $(".search-close").on("click", function (e) {
          e.preventDefault();
          $(".search-wrap").animate({ opacity: "toggle" }, 500);
          $(".nav-search, #search-close").removeClass("open");
        });

        // Back to Top
        $(window).on('scroll', function() {
          if ($(this).scrollTop() > 20) {
            $("#back-top").addClass("show");
          } else {
            $("#back-top").removeClass("show");
          }
        });
        $(document).on('click', '#back-top', function() {
          $('html, body').animate({ scrollTop: 0 }, 800);
          return false;
        });

        // Preloader
        $(window).on('load', function() {
          $(".preloader").addClass('loaded');
          $(".preloader").delay(600).fadeOut();
        });
      }
    });

    return {
      cartStore,
      totalItems,
      totalPrice,
      shippingFee,
      deliveryMethodLabel,
      taxAmount,
      totalWithShippingAndTax,
      getImageUrl,
      formData,
      isSubmitting,
      submitError,
      submitOrder,
      getStateName,
      isLoggedIn,
      authStore
    };
  }
}
</script>

<style scoped>
.checkout-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.checkout-item:last-child {
  border-bottom: none;
}

.alert {
  padding: 12px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}
</style>