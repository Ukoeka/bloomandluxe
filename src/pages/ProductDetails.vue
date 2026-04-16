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
                        <img :src="currentImage" :alt="product.name" class="img-fluid"
                          style="max-height: 500px; object-fit: contain;">
                      </div>
                    </div>
                  </div>
                  <div class="thumbnail-images d-flex gap-2 mt-3" v-if="productImages.length > 1">
                    <div v-for="(img, index) in productImages" :key="index" class="thumbnail-item"
                      :class="{ active: currentImageIndex === index }" @click="currentImageIndex = index"
                      style="cursor: pointer; width: 80px; height: 80px; border: 2px solid #ddd; padding: 2px;"
                      :style="currentImageIndex === index ? 'border-color: #f39c12;' : ''">
                      <img :src="img" :alt="`${product.name} ${index + 1}`" class="img-fluid"
                        style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details-content">
                  <h3 class="pb-3">{{ product.name }}</h3>
                  <div class="star pb-3">
                    <i class="fas fa-star" v-for="i in 5" :key="i"
                      :style="{ color: i <= Math.round(product.average_rating) ? '#f39c12' : '#ddd' }"></i>
                    <span class="ms-2">({{ product.total_reviews }} Customer Review)</span>
                  </div>
                  <p class="mb-3">
                    {{ product.description }}
                  </p>
                  <div class="price-list">
                    <h3>${{ product.price }}</h3>
                    <span v-if="quantity > 1" class="total-price ms-2">
                      Total: ${{ totalPrice.toFixed(2) }}
                    </span>
                  </div>
                  <div class="stock-info mb-3" v-if="product.stock !== undefined">
                    <span :class="product.stock > 0 ? 'text-success' : 'text-danger'">
                      <strong>{{ product.stock }}</strong> items available in stock
                    </span>
                  </div>
                  <div class="cart-wrp">
                    <div class="cart-quantity">
                      <div class='quantity d-flex align-items-center justify-content-center'>
                        <input type='button' value='-' class='qtyminus minus' @click="decrementQty">
                        <input type='text' name='quantity' v-model='quantity' class='qty text-center'
                          style="width: 50px;">
                        <input type='button' value='+' class='qtyplus plus' @click="incrementQty">
                      </div>
                    </div>


                  </div>
                  <div class="shop-btn">
                    <button @click="addToCart" class="theme-btn">
                      <span> Add to cart</span>
                    </button>
                    <!-- <button class="theme-btn">
                      <span> Buy now</span>
                    </button> -->
                  </div>
                  <!-- <h6 class="details-info"><span>SKU:</span> <a href="javascript:void(0)">{{ product.sku || 'N/A' }}</a></h6> -->
                  <h6 class="details-info"><span>Categories:</span> <a href="javascript:void(0)">{{
                    product.category?.name || 'Uncategorized' }}</a></h6>
                  <h6 class="details-info style-2"><span>Tags:</span> <a href="javascript:void(0)"> <b>{{ product.tags
                        || 'fashion' }}</b></a></h6>
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
                  <h6>Additional Information </h6>
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
                        <img :src="currentImage" alt="img">
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
    <!-- <section class="product-collection-section-2 section-padding pt-0 fix">
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
    </section> -->

  </SharedLayout>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import ProductReviews from '../components/ProductReviews.vue'
import { useApiStore } from '../stores/api'
import { useCartStore } from '../stores/cart'
import Swal from 'sweetalert2'

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
    const currentImageIndex = ref(0)

    const productImages = computed(() => {
      if (!product.value) return []
      const images = []
      if (product.value.image) images.push(product.value.image)
      if (product.value.images && Array.isArray(product.value.images)) {
        product.value.images.forEach(img => {
          const url = typeof img === 'object' ? img.url : img
          if (url && !images.includes(url)) images.push(url)
        })
      }
      return images.length > 0 ? images : ['/assets/img/product/bag1.jpg']
    })


    const currentImage = computed(() => {
      return productImages.value[currentImageIndex.value] || '/assets/img/product/bag1.jpg'
    })

    // Calculate total price based on quantity
    const totalPrice = computed(() => {
      if (!product.value) return 0
      return Number(product.value.price) * quantity.value
    })

    const fetchProduct = async (id) => {
      loading.value = true
      error.value = null
      currentImageIndex.value = 0
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
        // Check if adding more than available stock
        const availableStock = product.value.stock || 999
        const existingItem = cartStore.cartItems.find(item => item.id === product.value.id)
        const currentQty = existingItem ? existingItem.quantity : 0
        const requestedQty = quantity.value

        if (currentQty + requestedQty > availableStock) {
          Swal.fire(`Only ${availableStock - currentQty} more items available in stock!`)
          return
        }

        cartStore.addToCart({
          ...product.value,
          price: product.value.price,
          quantity: quantity.value
        })
        Swal.fire(`${quantity.value} x ${product.value.name} added to cart!`)
      }
    }

    const incrementQty = () => {
      const maxStock = product.value?.stock || 999
      if (quantity.value < maxStock) quantity.value++
    }
    const decrementQty = () => { if (quantity.value > 1) quantity.value-- }

    onMounted(async () => {
      await fetchProduct(productId.value)

      // Initialize jQuery plugins
      if (!window.$) return

      $('.img-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
      })

      $('.video-popup').magnificPopup({ type: 'iframe' })

      $('.count').counterUp({
        delay: 15,
        time: 4000
      })

      new WOW().init()
      $('select').niceSelect()

      $(window).on('scroll', function () {
        $('#header-sticky').toggleClass('sticky', $(this).scrollTop() > 250)
        $('#back-top').toggleClass('show', $(this).scrollTop() > 20)
      })

      $(document).on('click', '#back-top', function () {
        $('html, body').animate({ scrollTop: 0 }, 800)
        return false
      })

      $(window).on('load', function () {
        $('.preloader').addClass('loaded').delay(600).fadeOut()
      })
    })

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
      totalPrice,
      addToCart,
      incrementQty,
      decrementQty,
      productImages,
      currentImage,
      currentImageIndex
    }
  }
}


</script>