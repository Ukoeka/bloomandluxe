<template>
  <SharedLayout>
    <!-- Hero Section Start -->
    <section class="hero-section-3">
      <div class="arrow-button">
        <button class="array-prev">
          <i class="fa-light fa-chevron-left"></i>
        </button>
        <button class="array-next">
          <i class="fa-light fa-chevron-right"></i>
        </button>
      </div>
      <div class="swiper hero-slider">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="hero-3">
              <div class="hero-bg bg-cover" style="background-image: url(assets/img/hero/hero.jpeg);"></div>
              <div class="container">
                <div class="row g-4">
                  <div class="col-lg-10">
                    <div class="hero-content">
                      <p data-animation="fadeInUp" data-delay="1.3s">Winter Special Collection</p>
                      <h1 data-animation="fadeInUp" data-delay="1.5s">
                        New Collection With <br> Modern Style
                      </h1>
                      <div class="hero-button" data-animation="fadeInUp" data-delay="1.7s">
                        <a href="/shop" class="theme-btn">Shop Now <i class="fa-regular fa-arrow-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="hero-3">
              <div class="hero-bg bg-cover" style="background-image: url(assets/img/hero/hero2.jpeg);"></div>
              <div class="container">
                <div class="row g-4">
                  <div class="col-lg-10">
                    <div class="hero-content">
                      <p data-animation="fadeInUp" data-delay="1.3s">Winter Special Collection</p>
                      <h1 data-animation="fadeInUp" data-delay="1.5s">
                        New Collection With <br> Modern Style
                      </h1>
                      <div class="hero-button" data-animation="fadeInUp" data-delay="1.7s">
                        <a href="/shop" class="theme-btn">Shop Now <i class="fa-regular fa-arrow-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="hero-3">
              <div class="hero-bg bg-cover" style="background-image: url(assets/img/hero/hero3.jpeg);"></div>
              <div class="container">
                <div class="row g-4">
                  <div class="col-lg-10">
                    <div class="hero-content">
                      <p data-animation="fadeInUp" data-delay="1.3s">Winter Special Collection</p>
                      <h1 data-animation="fadeInUp" data-delay="1.5s">
                        New Collection With <br> Modern Style
                      </h1>
                      <div class="hero-button" data-animation="fadeInUp" data-delay="1.7s">
                        <a href="/shop" class="theme-btn">Shop Now <i class="fa-regular fa-arrow-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section Start -->
    <section class="feature-section fix">
      <div class="container">
        <div class="feature-wrapper">
          <div class="feature-item style-2 wow fadeInUp" data-wow-delay=".2s">
            <div class="icon">
              <img src="assets/img/icon/01.svg" alt="img">
            </div>
            <div class="content">
              <h6>Fast Delivery</h6>
              <p>Get your ordered items in just few days</p>
            </div>
          </div>
          <div class="feature-item wow fadeInUp" data-wow-delay=".4s">
            <div class="icon">
              <img src="assets/img/icon/02.svg" alt="img">
            </div>
            <div class="content">
              <h6>Guaranteed Quality</h6>
              <p>Quality products on all products</p>
            </div>
          </div>
          <div class="feature-item wow fadeInUp" data-wow-delay=".6s">
            <div class="icon">
              <img src="assets/img/icon/03.svg" alt="img">
            </div>
            <div class="content">
              <h6>Member Discount</h6>
              <p>Discounts for returning customers</p>
            </div>
          </div>
          <div class="feature-item wow fadeInUp" data-wow-delay=".8s">
            <div class="icon">
              <img src="assets/img/icon/04.svg" alt="img">
            </div>
            <div class="content">
              <h6>Support 24/7</h6>
              <p>Contact us 24 hours a day</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop-bg-section Start -->
    <section class="shop-bg-section fix">
      <div class="row g-4">
        <div class="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
          <div class="bg-image bg-cover" style="background-image: url(assets/img/shop/kid.jpeg);">
            <div class="content bg-white badge">
              <h3><a href="/shop">Kids</a></h3>
              <p>2025 Collection</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-image style-2 bg-cover" style="background-image: url(assets/img/shop/man-1.png);">
            <div class="content">
              <h3><a href="/shop">Men</a></h3>
              <p>2025 Collection</p>
            </div>
          </div>
          <div class="bg-image mt-20 style-2 bg-cover" style="background-image: url(assets/img/shop/woman-1.png);">
            <div class="content">
              <h3><a href="/shop">Women</a></h3>
              <p>2025 Collection</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Store Section Start -->
    <section class="product-store-section section-padding fix">
      <div class="container">
        <div class="section-title text-center">
          <h6 class="sub-title wow fadeInUp">Top views in this week</h6>
          <h2 class="wow fadeInUp" data-wow-delay=".3s">Our Product In Store</h2>
        </div>

        <div class="product-wrapper">
          <!-- DYNAMIC CATEGORY TABS -->
          <ul class="nav">
            <li
              v-for="(category, index) in categories"
              :key="category.id"
              class="nav-item wow fadeInUp"
              :data-wow-delay="`.${3 + index * 2}s`"
            >
              <a
                href="javascript:void(0)"
                @click="activeCategory = category"
                :class="['nav-link', { 'active': activeCategory?.id === category.id }, { 'bb-none': index === categories.length - 1 }]"
              >
                {{ category.name }}
              </a>
            </li>
          </ul>

          <!-- Loading State -->
          <div v-if="storeLoading" class="row mt-4">
            <div class="col-12 text-center py-5">
              <p>Loading products...</p>
            </div>
          </div>

          <!-- PRODUCTS -->
          <div v-else class="tab-content">
            <div class="tab-pane fade show active">
              <div class="row">
                <div
                  v-for="product in storeProducts"
                  :key="product.id"
                  class="col-xl-3 col-lg-4 col-md-6"
                >
                  <div class="product-store-item">
                    <div class="product-image">
                      <img :src="product.image" alt="img" />
                      <div class="cart-btn">
                        <button @click="addToCart(product)" class="theme-btn">
                          <i class="fa-regular fa-cart-shopping"></i> Add To Cart
                        </button>
                      </div>
                      <ul class="social-icon">
                        <li>
                          <router-link :to="`/product-details/${product.id}`">
                            <i class="fa-regular fa-cart-shopping"></i>
                          </router-link>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <router-link :to="`/product-details/${product.id}`">
                            <i class="fa-regular fa-heart"></i>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="product-content">
                      <div class="content">
                        <span>{{ activeCategory?.name }}</span>
                      </div>
                      <h5>
                        <router-link :to="`/product-details/${product.id}`">{{ product.name }}</router-link>
                      </h5>
                      <h6>${{ product.price }}</h6>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-if="storeProducts.length === 0" class="col-12 text-center py-5">
                  <p>No products found in this category.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Shop Discover Section Start -->
    <section class="shop-discover-section section-padding fix">
      <div class="container">
        <div class="section-title-area">
          <div class="section-title">
            <h6 class="sub-title wow fadeInUp">More to Discover</h6>
            <h2 class="wow fadeInUp" data-wow-delay=".3s">Trending Arrivals</h2>
          </div>
          <a href="/shop" class="theme-btn theme-btn-2 wow fadeInUp" data-wow-delay=".5s">View More Items</a>
        </div>
        <div class="shop-discover-wrapper">
          <div class="row g-5">
            <div class="col-lg-6">
              <div class="swiper discover-slider">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="shop-discover-item">
                      <div class="shop-image">
                        <img src="assets/img/shop/20.jpg" alt="img">
                      </div>
                      <div class="content">
                        <div class="star">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <p>Whitetails Store</p>
                        <h4><a href="/product-details/1">Whitetails Women's Open Sky</a></h4>
                        <h6>$76.00 <del>$84.00</del></h6>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="shop-discover-item">
                      <div class="shop-image">
                        <img src="assets/img/shop/21.jpg" alt="img">
                      </div>
                      <div class="content">
                        <div class="star">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <p>Whitetails Store</p>
                        <h4><a href="/product-details/1">Whitetails Women's Open Sky</a></h4>
                        <h6>$76.00 <del>$84.00</del></h6>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="shop-discover-item">
                      <div class="shop-image">
                        <img src="assets/img/shop/20.jpg" alt="img">
                      </div>
                      <div class="content">
                        <div class="star">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <p>Whitetails Store</p>
                        <h4><a href="/product-details/1">Whitetails Women's Open Sky</a></h4>
                        <h6>$76.00 <del>$84.00</del></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-dot-5">
                <div class="dot-5"></div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="bg-image-2 bg-cover" style="background-image: url(assets/img/shop/22.jpg);">
                <div class="content">
                  <h3>
                    <a href="/product-details/1">Short Sleeve Tunic <br> Tops Casual Swing</a>
                  </h3>
                  <a href="/product-details/1" class="theme-btn">Explore More <i class="fa-regular fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section Start -->
    <section class="testimonial-section section-padding section-bg fix">
      <div class="array-buttons">
        <button class="array-prev">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="array-next">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div class="shape">
        <img src="assets/img/testimonial/circle.png" alt="img">
      </div>
      <div class="container">
        <div class="swiper testimonial-slider-2">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="testimonial-card-item">
                <div class="testimonial-content">
                  <h4>The Review Are In</h4>
                  <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-duotone fa-solid fa-star"></i>
                  </div>
                  <p>" How you use the city or town name is up to you. All <br> results may be freely used in any work."</p>
                  <div class="info-item">
                    <div class="client-image">
                      <img src="assets/img/testimonial/client-3.png" alt="img">
                    </div>
                    <div class="text">
                      <h6>Theodore Handle</h6>
                      <span>CO Founder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="testimonial-card-item">
                <div class="testimonial-content">
                  <h4>The Review Are In</h4>
                  <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-duotone fa-solid fa-star"></i>
                  </div>
                  <p>" How you use the city or town name is up to you. All <br> results may be freely used in any work."</p>
                  <div class="info-item">
                    <div class="client-image">
                      <img src="assets/img/testimonial/client-3.png" alt="img">
                    </div>
                    <div class="text">
                      <h6>Theodore Handle</h6>
                      <span>CO Founder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="testimonial-card-item">
                <div class="testimonial-content">
                  <h4>The Review Are In</h4>
                  <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-duotone fa-solid fa-star"></i>
                  </div>
                  <p>" How you use the city or town name is up to you. All <br> results may be freely used in any work."</p>
                  <div class="info-item">
                    <div class="client-image">
                      <img src="assets/img/testimonial/client-3.png" alt="img">
                    </div>
                    <div class="text">
                      <h6>Theodore Handle</h6>
                      <span>CO Founder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Instagram Banner Section Start -->
    <div class="instagram-banner fix">
      <div class="instagram-wrapper style-3">
        <div class="swiper instagram-banner-slider-2">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="instagram-banner-items mt-0">
                <div class="banner-image">
                  <img src="assets/img/shop/ig-pic3.png" alt="insta-img">
                  <a href="https://instagram.com/bloomandluxestore?" target="_blank" class="icon">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="instagram-banner-items mt-0">
                <div class="banner-image">
                  <img src="assets/img/shop/ig-pic4.png" alt="insta-img">
                  <a href="https://www.tiktok.com/@bloomlux.store" target="_blank" class="icon">
                    <i class="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="instagram-banner-items mt-0">
                <div class="banner-image">
                  <img src="assets/img/shop/ig-pic1.png" alt="insta-img">
                  <a href="https://www.facebook.com/share/17ZJGw6Lnc/?mibextid=wwXIfr" target="_blank" class="icon">
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="instagram-banner-items mt-0">
                <div class="banner-image">
                  <img src="assets/img/shop/ig-pic2.png" alt="insta-img">
                  <a href="https://www.tiktok.com/@bloomlux.store" target="_blank" class="icon">
                    <i class="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="instagram-banner-items mt-0">
                <div class="banner-image">
                  <img src="assets/img/shop/man-1.png" alt="insta-img">
                  <a href="https://instagram.com/bloomandluxestore?" target="_blank" class="icon">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </SharedLayout>
</template>

<script>
import SharedLayout from '@/components/SharedLayout.vue';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { useApiStore } from '@/stores/api';
import { useCartStore } from '@/stores/cart';
import Swal from 'sweetalert2';

export default {
  name: 'Home4',
  components: {
    SharedLayout
  },
  data() {
    return {
      showPreloader: true,
      // Product Store Section
      categories: [],
      activeCategory: null,
      storeProducts: [],
      storeLoading: false,
    }
  },

  watch: {
    activeCategory(newCategory) {
      if (newCategory) {
        this.fetchStoreProducts(newCategory.id);
      }
    }
  },

  async mounted() {
    setTimeout(() => {
      this.showPreloader = false;
    }, 1000);

    this.initSwipers();
    this.initQuantityButtons();
    this.initMouseCursor();

    await this.fetchCategories();
  },

  methods: {
    // ─── API Methods ───────────────────────────────────────────

    async fetchCategories() {
      try {
        const apiStore = useApiStore();
        const res = await apiStore.get('/categories');
        const data = res?.data?.data || res?.data || res;
        this.categories = Array.isArray(data) ? data : [];

        if (this.categories.length > 0) {
          this.activeCategory = this.categories[0];
          await this.fetchStoreProducts(this.activeCategory.id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

   async fetchStoreProducts(categoryId) {
  if (!categoryId) return;
  this.storeLoading = true;
  try {
    const apiStore = useApiStore();

    // Get all child IDs for the active category
    const activecat = this.categories.find(c => c.id === categoryId);
    const childIds = activecat?.children?.map(c => c.id) || [];
    
    // Use child IDs if they exist, otherwise fall back to the parent ID
    const idsToFetch = childIds.length > 0 ? childIds : [categoryId];

    // Fetch products for all relevant IDs in parallel
    const results = await Promise.all(
      idsToFetch.map(id => apiStore.get(`/products?category_id=${id}`))
    );

    // Merge all results into one array
    const allProducts = results.flatMap(res => {
      const data = res?.data?.data || res?.data || res;
      return Array.isArray(data) ? data : [];
    });

    this.storeProducts = allProducts.slice(0, 8);
  } catch (error) {
    console.error('Error fetching store products:', error);
    this.storeProducts = [];
  } finally {
    this.storeLoading = false;
  }
},

    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product);
      Swal.fire(`${product.name} added to cart!`);
    },

    // ─── Swiper & UI Methods ───────────────────────────────────

    initSwipers() {
      if (document.querySelector('.hero-slider')) {
        const heroSlider = new Swiper('.hero-slider', {
          loop: true,
          slidesPerView: 1,
          effect: 'slide',
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.array-next',
            prevEl: '.array-prev',
          },
          pagination: {
            el: '.dot',
            clickable: true,
          },
        });
        this.animatedSwiper('.hero-slider', heroSlider);
      }

      if (document.querySelector('.shop-slider-4')) {
        new Swiper('.shop-slider-4', {
          spaceBetween: 10,
          speed: 1300,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.array-buttons .array-next',
            prevEl: '.array-buttons .array-prev',
          },
          breakpoints: {
            1199: { slidesPerView: 3 },
            991: { slidesPerView: 2 },
            767: { slidesPerView: 2 },
            575: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          },
        });
      }

      if (document.querySelector('.discover-slider')) {
        new Swiper('.discover-slider', {
          spaceBetween: 10,
          speed: 1300,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.dot-5',
            clickable: true,
          },
          breakpoints: {
            1199: { slidesPerView: 2 },
            991: { slidesPerView: 2 },
            767: { slidesPerView: 2 },
            575: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          },
        });
      }

      if (document.querySelector('.testimonial-slider-2')) {
        new Swiper('.testimonial-slider-2', {
          spaceBetween: 30,
          speed: 2000,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.array-next',
            prevEl: '.array-prev',
          },
          breakpoints: {
            1199: { slidesPerView: 1 },
            991: { slidesPerView: 1 },
            767: { slidesPerView: 1 },
            575: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          },
        });
      }

      if (document.querySelector('.news-slider')) {
        new Swiper('.news-slider', {
          spaceBetween: 30,
          speed: 1300,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.array-next',
            prevEl: '.array-prev',
          },
          breakpoints: {
            1199: { slidesPerView: 3 },
            991: { slidesPerView: 2 },
            767: { slidesPerView: 2 },
            575: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          },
        });
      }

      if (document.querySelector('.instagram-banner-slider-2')) {
        new Swiper('.instagram-banner-slider-2', {
          spaceBetween: 30,
          speed: 2000,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1399: { slidesPerView: 5 },
            1199: { slidesPerView: 4 },
            991: { slidesPerView: 3 },
            767: { slidesPerView: 2 },
            650: { slidesPerView: 2 },
            575: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          },
        });
      }
    },

    animatedSwiper(selector, init) {
      const animated = function animated() {
        $(selector + " [data-animation]").each(function () {
          let anim = $(this).data("animation");
          let delay = $(this).data("delay");
          let duration = $(this).data("duration");
          $(this)
            .removeClass("anim" + anim)
            .addClass(anim + " animated")
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration,
            })
            .one("animationend", function () {
              $(this).removeClass(anim + " animated");
            });
        });
      };
      animated();
      init.on("slideChange", function () {
        $(selector + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
    },

    initQuantityButtons() {
      const inputs = document.querySelectorAll('#qty, #qty2, #qty3');
      const btnminus = document.querySelectorAll('.qtyminus');
      const btnplus = document.querySelectorAll('.qtyplus');

      if (inputs.length > 0 && btnminus.length > 0 && btnplus.length > 0) {
        inputs.forEach(function(input, index) {
          const min = Number(input.getAttribute('min')) || 0;
          const max = Number(input.getAttribute('max')) || 100;
          const step = Number(input.getAttribute('step')) || 1;

          function qtyminus(e) {
            const current = Number(input.value);
            let newval = current - step;
            if (newval < min) newval = min;
            input.value = Number(newval);
            e.preventDefault();
          }

          function qtyplus(e) {
            const current = Number(input.value);
            let newval = current + step;
            if (newval > max) newval = max;
            input.value = Number(newval);
            e.preventDefault();
          }

          if (btnminus[index]) btnminus[index].addEventListener('click', qtyminus);
          if (btnplus[index]) btnplus[index].addEventListener('click', qtyplus);
        });
      }
    },

    initMouseCursor() {
      function mousecursor() {
        if (document.body) {
          const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
          let n, i = 0, o = !1;
          (window.onmousemove = function(s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
              (e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
              (n = s.clientY),
              (i = s.clientX);
          }),
          document.body.addEventListener("mouseenter", function(event) {
            if (event.target.matches("a, .cursor-pointer")) {
              e.classList.add("cursor-hover");
              t.classList.add("cursor-hover");
            }
          }, true);
          document.body.addEventListener("mouseleave", function(event) {
            if (event.target.matches("a, .cursor-pointer")) {
              e.classList.remove("cursor-hover");
              t.classList.remove("cursor-hover");
            }
          }, true);
          if (e) e.style.visibility = "visible";
          if (t) t.style.visibility = "visible";
        }
      }
      mousecursor();
    }
  }
}
</script>

<style scoped>
.hero-content p, .hero-content h1 {
  color: #fff;
}

.bg-image .content h3,
.bg-image .content p {
  color: white;
}

.product-store-item .product-image img {
  height: 370px;
  object-fit: cover;
}

.hero-section-3 {
  min-height: unset !important;
  overflow: hidden;
}

.hero-section-3 .swiper,
.hero-section-3 .swiper-wrapper,
.hero-section-3 .swiper-slide {
  height: 100vh !important;
}

.hero-3 {
  height: 100vh;
  padding: 0 !important;
  display: flex;
  align-items: center;
}

.hero-3 .hero-bg {
  background-size: cover !important;
  background-position: center center !important;
}

@media (max-width: 767px) {
  .hero-3 .hero-bg {
    background-position: top center !important;
  }

  .hero-3 {
    padding: 120px 0 !important;
  }
}

@media (max-width: 575px) {
  .hero-3 {
    padding: 100px 0 !important;
  }

  .hero-3 .hero-content h1 {
    font-size: 28px !important;
  }

  .hero-3 .hero-content p {
    font-size: 14px !important;
  }
}
</style>