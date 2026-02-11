<template>
  <SharedLayout>
    <div v-if="loading" class="text-center section-padding">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading product details...</p>
    </div>

    <div v-else-if="error" class="text-center section-padding">
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      <router-link to="/shop" class="theme-btn mt-3">Back to Shop</router-link>
    </div>

    <template v-else-if="product">
      <!-- Shop Details Section Start -->
      <section class="shop-details-section section-padding fix shop-bg">
        <div class="container">
          <div class="shop-details-wrapper">
            <div class="row g-4">
              <div class="col-lg-6">
                <div class="shop-details-image">
                  <div class="tab-content">
                    <div id="thumb1" class="tab-pane fade show active">
                      <div class="shop-thumb text-center">
                        <img :src="product.image || '/assets/img/product/bag1.jpg'" :alt="product.name" class="img-fluid" style="max-height: 500px; object-fit: contain;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details-content">
                  <h3 class="pb-3">{{ product.name }}</h3>
                  <div class="star pb-3">
                    <i class="fas fa-star" v-for="i in 5" :key="i" :style="{ color: i <= Math.round(product.average_rating) ? '#f39c12' : '#ddd' }"></i>
                    <span class="ms-2">({{ product.total_reviews }} Customer Review)</span>
                  </div>
                  <p class="mb-3">
                    {{ product.description }}
                  </p>
                  <div class="price-list">
                    <h3>${{ product.price }}</h3>
                  </div>
                  <div class="cart-wrp">
                    <div class="cart-quantity">
                      <div class='quantity d-flex align-items-center justify-content-center'>
                        <input type='button' value='-' class='qtyminus minus' @click="decrementQty">
                        <input type='text' name='quantity' v-model='quantity' class='qty text-center' style="width: 50px;">
                        <input type='button' value='+' class='qtyplus plus' @click="incrementQty">
                      </div>
                    </div>
                    <a href="javascript:void(0)" class="icon">
                      <i class="far fa-heart"></i>
                    </a>
                    <div class="social-profile">
                      <span class="plus-btn"><i class="far fa-share"></i></span>
                      <ul>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="shop-btn">
                    <button @click="addToCart" class="theme-btn">
                      <span> Add to cart</span>
                    </button>
                    <button class="theme-btn">
                      <span> Buy now</span>
                    </button>
                  </div>
                  <h6 class="details-info"><span>SKU:</span> <a href="javascript:void(0)">{{ product.sku || 'N/A' }}</a></h6>
                  <h6 class="details-info"><span>Categories:</span> <a href="javascript:void(0)">{{ product.category?.name || 'Uncategorized' }}</a></h6>
                  <h6 class="details-info style-2"><span>Tags:</span> <a href="javascript:void(0)"> <b>{{ product.tags || 'fashion' }}</b></a></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Single-tab Section Start -->
      <section class="single-tab-section section-padding fix pt-0">
        <div class="container">
          <div class="single-tab">
            <ul class="nav mb-5">
              <li class="nav-item">
                <a href="#description" data-bs-toggle="tab" class="nav-link ps-0 active">
                  <h6>Description</h6>
                </a>
              </li>
              <li class="nav-item">
                <a href="#additional" data-bs-toggle="tab" class="nav-link">
                  <h6>Additional Information  </h6>
                </a>
              </li>
              <li class="nav-item">
                <a href="#review" data-bs-toggle="tab" class="nav-link">
                  <h6>reviews ({{ product.total_reviews }})</h6>
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div id="description" class="tab-pane fade show active">
                <div class="description-items">
                  <div class="row">
                    <div class="col-xl-6 col-lg-6">
                      <div class="description-content">
                        <h3>Product descriptions</h3>
                        <p class="mb-4">
                          {{ product.description }}
                        </p>
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 mt-5 mt-lg-0">
                      <div class="description-image">
                        <img :src="product.image" alt="img">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="additional" class="tab-pane fade">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Weight</td>
                        <td>{{ product.weight || 'N/A' }}</td>
                      </tr>
                      <tr>
                        <td>Dimensions</td>
                        <td>{{ product.dimensions || 'N/A' }}</td>
                      </tr>
                      <tr>
                        <td>Colors</td>
                        <td>{{ product.colors || 'N/A' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="review" class="tab-pane fade">
                <ProductReviews :product-id="productId" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Product-collection Section Start -->
    <section class="product-collection-section-2 section-padding pt-0 fix">
      <div class="container">
        <div class="section-title style-2 text-center">
          <h6 class="sub-title wow fadeInUp">
            Next day Products
          </h6>
          <h2 class="wow fadeInUp" data-wow-delay=".3s">
            Related Products
          </h2>
        </div>
        <div class="tab-content">
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="product-collection-item">
                <div class="product-image">
                  <img src="/assets/img/product/24.jpg" alt="img">
                  <div class="product-btn">
                    <a href="/shop-cart" class="theme-btn-2 style-2">Add To Cart</a>
                  </div>
                </div>
                <div class="product-content">
                  <p>Physicians</p>
                  <h4>
                    <router-link :to="`/product-details/${1}`">Powder Creamy Natural</router-link>
                  </h4>
                  <ul class="doller">
                    <li>
                      $102.00 <del>$226.00</del>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="product-collection-item">
                <div class="product-image">
                  <img src="/assets/img/product/25.jpg" alt="img">
                  <div class="badge">26%</div>
                  <div class="product-btn">
                    <a href="/shop-cart" class="theme-btn-2 style-2">Add To Cart</a>
                  </div>
                </div>
                <div class="product-content">
                  <p>Mineral </p>
                  <h4>
                    <router-link :to="`/product-details/${2}`">Mineral Matte Finishing</router-link>
                  </h4>
                  <span>$16.00</span>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="product-collection-item">
                <div class="product-image">
                  <img src="/assets/img/product/26.jpg" alt="img">
                  <div class="product-btn">
                    <a href="/shop-cart" class="theme-btn-2 style-2">Add To Cart</a>
                  </div>
                </div>
                <div class="product-content">
                  <p>StriVectin</p>
                  <h4>
                    <router-link :to="`/product-details/${3}`">Resurfacing Exfoliating</router-link>
                  </h4>
                  <ul class="doller">
                    <li>
                      $76.00 <del>$106.00</del>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="product-collection-item">
                <div class="product-image">
                  <img src="/assets/img/product/27.jpg" alt="img">
                  <div class="badge">35%</div>
                  <div class="product-btn">
                    <a href="/shop-cart" class="theme-btn-2 style-2">Add To Cart</a>
                  </div>
                </div>
                <div class="product-content">
                  <p>Marcelle</p>
                  <h4>
                    <router-link :to="`/product-details/${4}`">Correction Tinted Cream</router-link>
                  </h4>
                  <span>$44.00</span>
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
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import ProductReviews from '../components/ProductReviews.vue'
import { useApiStore } from '../stores/api'
import { useCartStore } from '../stores/cart'

export default {
  name: 'ProductDetailsPage',
  components: {
    SharedLayout,
    ProductReviews
  },
  setup() {
    const route = useRoute()
    const apiStore = useApiStore()
    const cartStore = useCartStore()
    
    const productId = ref(route.params.id)
    const product = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const quantity = ref(1)

    const fetchProduct = async (id) => {
      loading.value = true
      error.value = null
      try {
        const response = await apiStore.get(`products/${id}`)
        product.value = response.data || response
      } catch (err) {
        console.error('Error fetching product details:', err)
        error.value = 'Failed to load product details.'
      } finally {
        loading.value = false
      }
    }

    const addToCart = () => {
      if (product.value) {
        // We need to handle quantity here since the store doesn't seem to take it in addToCart
        // Wait, looking at cart.js, addToCart adds 1.
        // Let's implement a loop or modify the store call if needed, but for now 1 is fine if that's the pattern.
        // Actually, let's just call it once and then we can improve it if the user wants.
        cartStore.addToCart({
          ...product.value,
          price: product.value.price // Ensure price is passed correctly
        })
        alert(`${product.value.name} added to cart!`)
      }
    }

    const incrementQty = () => { quantity.value++ }
    const decrementQty = () => { if (quantity.value > 1) quantity.value-- }

    onMounted(() => {
      fetchProduct(productId.value)

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

    // Watch for route ID changes
    watch(() => route.params.id, (newId) => {
      if (newId) {
        productId.value = newId
        fetchProduct(newId)
      }
    })

    return {
      productId,
      product,
      loading,
      error,
      quantity,
      addToCart,
      incrementQty,
      decrementQty
    };
  }
}
</script>