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
                            <input type="text" v-model="formData.firstName" name="user-first-name" id="userFirstName" required=""
                              placeholder="First Name">
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="input-single">
                            <span>Last Name*</span>
                            <input type="text" v-model="formData.lastName" name="user-last-name" id="userLastName" required=""
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
                            <input v-model="formData.city" name="towncity" id="towncity" placeholder="towncity" required>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Phone*</span>
                            <input v-model="formData.phone" name="phone" id="phone" placeholder="phone" required>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>Email Address*</span>
                            <input v-model="formData.email" type="email" name="email" id="email22" placeholder="email" required>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-check payment-save">
                            <input type="checkbox" class="form-check-input" name="save-for-next" id="saveForNext111">
                            <label for="saveForNext111">Save for my next payment</label>
                          </div>
                          <div class="input-check payment-save style-2">
                            <input type="checkbox" class="form-check-input" name="save-for-next"
                              id="saveForNext2">
                            <label for="saveForNext2">Ship to a different address?</label>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-single">
                            <span>order notes (optional)</span>
                            <textarea name="notes" id="notes"
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
                  <h3>Our Order</h3>
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
                      <p>Shipping</p>
                      <div class="shopping-items">
                        <div class="form-check d-flex align-items-center from-customradio">
                          <label class="form-check-label">
                            Free Shipping
                          </label>
                          <input class="form-check-input" type="radio" name="flexRadioDefault"
                            id="flexRadioDefault12">
                        </div>
                        <div class="form-check d-flex align-items-center from-customradio">
                          <label class="form-check-label">
                            Local: $15.00
                          </label>
                          <input class="form-check-input" type="radio" name="flexRadioDefault"
                            id="flexRadioDefault123">
                        </div>
                        <div class="form-check d-flex align-items-center from-customradio">
                          <label class="form-check-label">
                            Flat rate: $10.00
                          </label>
                          <input class="form-check-input" type="radio" name="flexRadioDefault"
                            id="flexRadioDefault124">
                        </div>
                      </div>
                    </div>
                    <div class="checkout-item d-flex align-items-center justify-content-between">
                      <p><strong>Total</strong></p>
                      <p><strong>${{ totalPrice.toFixed(2) }}</strong></p>
                    </div>
                    <div class="checkout-item-2">
                      <div class="form-check-2 d-flex align-items-center from-customradio-2">
                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                          id="flexRadioDefault1222">
                        <label class="form-check-label" for="flexRadioDefault1222">
                          Direct bank transfer
                        </label>
                      </div>
                      <p>
                        Make your payment directly into our bank account please use your Order ID as the
                        payment reference. Your order will not be shipped until the funds have cleared in
                        our account.
                      </p>
                      <div class="form-check-3 d-flex align-items-center from-customradio-2 mt-3">
                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                          id="flexRadioDefault12224">
                        <label class="form-check-label" for="flexRadioDefault12224">
                          Cash on delivery
                        </label>
                      </div>
                      <div class="form-check-3 d-flex align-items-center from-customradio-2 mt-3">
                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                          id="flexRadioDefault12225">
                        <label class="form-check-label" for="flexRadioDefault12225">
                          Paypal
                        </label>
                      </div>
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
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import { useCartStore } from '../stores/cart'
import { useApiStore } from '../stores/api'

export default {
  name: 'CheckoutPage',
  components: {
    SharedLayout
  },
  setup() {
    const cartStore = useCartStore()
    const router = useRouter()
    const apiStore = useApiStore()

    const totalItems = computed(() => cartStore.getTotalItems())
    const totalPrice = computed(() => cartStore.getTotalPrice())

    // Form data
    const formData = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: ''
    })

    const isSubmitting = ref(false)
    const submitError = ref('')

    // Redirect to cart if empty
    if (cartStore.cartItems.length === 0) {
      router.push('/shop-cart')
    }

    const submitOrder = async () => {
      if (cartStore.cartItems.length === 0) {
        submitError.value = 'Your cart is empty'
        return
      }

      isSubmitting.value = true
      submitError.value = ''

      try {
        // Prepare checkout data with cart items
        const checkoutData = {
          customer_name: `${formData.value.firstName} ${formData.value.lastName}`.trim(),
          customer_email: formData.value.email,
          customer_phone: formData.value.phone,
          shipping_address: `${formData.value.address}, ${formData.value.city}`.trim(),
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

      const baseUrl = 'https://api.digi-essentials.com/'
      return baseUrl + imagePath.replace(/^\//, '')
    }
    onMounted(() => {
      // Initialize jQuery plugins and custom JS
      if (window.$) {
        // Mobile Menu
        $('#mobile-menu').meanmenu({
          meanMenuContainer: '.mobile-menu',
          meanScreenWidth: "1199",
          meanExpand: ['<i class="far fa-plus"></i>'],
        });

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

        // Nice Select
        $('select').niceSelect();

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
      getImageUrl,
      formData,
      isSubmitting,
      submitError,
      submitOrder
    };
  }
}
</script>