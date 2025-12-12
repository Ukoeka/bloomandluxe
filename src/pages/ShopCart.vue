<template>
  <SharedLayout>
    <!-- cart section start -->
    <div class="cart-section section-padding">
      <div class="container">
        <div class="cart-list-area">
          <div class="top-content">
            <h2>Shopping Cart</h2>
            <ul class="list">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                Shopping Cart
              </li>
            </ul>
          </div>
          <!-- Loading and Error States -->
          <div v-if="cartStore.loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading your cart...</p>
          </div>

          <div v-else-if="cartStore.error" class="alert alert-danger" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            {{ cartStore.error }}
          </div>

          <div v-else class="table-responsive">
            <table class="table common-table">
              <thead data-aos="fade-down">
                <tr>
                  <th class="text-center">Product</th>
                  <th class="text-center">Price</th>
                  <th class="text-center">Quantity</th>
                  <th class="text-center">Subtotal</th>
                </tr>
              </thead>
              <tbody v-if="cartStore.cartItems.length > 0">
                <tr v-for="item in cartStore.cartItems" :key="item.id" class="align-items-center py-3">
                  <td>
                    <div class="cart-item-thumb d-flex align-items-center gap-4">
                      <button type="button" @click.prevent="removeItem(item.id)" class="btn btn-link p-0 text-danger">
                        <i class="fas fa-times"></i>
                      </button>
                      <img class="w-100" :src="getImageUrl(item.image)" :alt="item.name || 'Product'">
                      <span class="head text-nowrap">{{ item.name || 'Unknown Product' }}</span>
                    </div>
                  </td>
                  <td class="text-center">
                    <span class="price-usd">
                      ${{ Number(item.price).toFixed(2) }} USD
                    </span>
                  </td>
                  <td class="price-quantity text-center">
                    <div
                      class="quantity d-inline-flex align-items-center justify-content-center gap-1 py-2 px-4 border n50-border_20 text-sm">
                      <button type="button" @click.prevent="decrementQuantity(item.id, item.quantity)" class="quantityDecrement" :disabled="item.quantity <= 1">
                        <i class="fal fa-minus"></i>
                      </button>
                      <input type="text" v-model.number="item.quantity" @change="updateQuantity(item.id, parseInt($event.target.value) || 1)" class="quantityValue" min="1">
                      <button type="button" @click.prevent="incrementQuantity(item.id, item.quantity)" class="quantityIncrement">
                        <i class="fal fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td class="text-center">
                    <span class="price-usd">
                      ${{ (Number(item.price) * item.quantity).toFixed(2) }} USD
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center py-5">
                    <div class="empty-cart">
                      <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                      <h4>Your cart is empty</h4>
                      <p>Add some products to get started!</p>
                      <router-link to="/categories" class="theme-btn alt-color radius-xs">Continue Shopping</router-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cart Summary -->
          <div v-if="cartStore.cartItems.length > 0" class="cart-summary mt-4 p-4 border rounded">
            <div class="row">
              <div class="col-md-12">
                <h4>Cart Summary</h4>
                <div class="summary-item d-flex justify-content-between">
                  <span>Total Items:</span>
                  <span>{{ totalItems }}</span>
                </div>
                <div class="summary-item d-flex justify-content-between">
                  <span>Total Price:</span>
                  <span class="fw-bold">${{ totalPrice.toFixed(2) }} USD</span>
                </div>
              </div>
            </div>
          </div>

          <div class="coupon-items d-flex flex-md-nowrap flex-wrap justify-content-end align-items-center gap-4 pt-4">
            <!-- <form action="#" class="d-flex flex-sm-nowrap flex-wrap align-items-center gap-3">
              <input type="text"
                placeholder="Enter coupon code">
              <button type="submit" class="theme-btn alt-color radius-xs">Apply</button>
            </form> -->
            <router-link to="/checkout" type="button" class="theme-btn alt-color radius-xs">Checkout</router-link>
          </div>
        </div>
      </div>
    </div>
  </SharedLayout>
</template>

<script>
import { onMounted, computed } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'
import { useCartStore } from '../stores/cart'

export default {
  name: 'ShopCartPage',
  components: {
    SharedLayout
  },
  setup() {
    const cartStore = useCartStore()

    const totalItems = computed(() => cartStore.getTotalItems())
    const totalPrice = computed(() => cartStore.getTotalPrice())

    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/cart/01.jpg' // Use a default cart image

      // If it's already an absolute URL, return as is
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
      }

      // If it's a relative path, prefix with API base URL (remove /api from the end)
      const baseUrl = 'https://api.digi-essentials.com/'
      return baseUrl + imagePath.replace(/^\//, '') // Remove leading slash if present
    }

    const removeItem = async (productId) => {
      await cartStore.removeFromCart(productId)
    }

    const updateQuantity = async (productId, newQuantity) => {
      if (newQuantity >= 0) {
        await cartStore.updateQuantity(productId, newQuantity)
      }
    }

    const incrementQuantity = async (productId, currentQuantity) => {
      await updateQuantity(productId, currentQuantity + 1)
    }

    const decrementQuantity = async (productId, currentQuantity) => {
      if (currentQuantity > 1) {
        await updateQuantity(productId, currentQuantity - 1)
      }
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
      removeItem,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      getImageUrl
    };
  }
}
</script>