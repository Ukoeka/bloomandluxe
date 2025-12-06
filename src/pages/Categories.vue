
<template>
  <SharedLayout>
    <!-- Preloader Start -->
   
    <!-- Back To Top Start -->
    

    <!--<< Mouse Cursor Start >>-->

    <!-- Sidebar Area Here -->
    

    <!-- Modal Version 2 -->
   
    <!-- Shop-categories-Section Start -->
    <div class="shop-categories-section section-padding">
      <div class="container">
        <div class="shop-categories-wrapper">
          <div class="top-content">
            <h2 class="wow fadeInUp" data-wow-delay=".3s">All Categories</h2>
            <ul class="list wow fadeInUp" data-wow-delay=".5s">
              <li>Home</li>
              <li>
                All Categories
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Shop-product-Section Start -->
    <section class="shop-product-section section-padding pt-0 fix">
      <div class="container">
        <div class="row g-4">
          <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s" v-for="category in categories" :key="category.id">
            <div class="shop-product-item">
              <div class="product-image">
                <img :src="getImageUrl(category.image)" alt="img">
                <!-- <ul class="shop-icon d-flex justify-content-center align-items-center">
                  <li>
                    <router-link to="/product-details"><i class="far fa-heart"></i></router-link>
                  </li>
                  <li>
                    <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i></router-link>
                  </li>
                  <li>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                      <i class="fa-regular fa-eye"></i>
                    </button>
                  </li>
                </ul> -->
              </div>
              <div class="content">
                <h3>
                  <router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
                </h3>
                <p>23 Products</p>
                <router-link :to="`/category/${category.id}`" class="link-btns">Shop Now <i class="fa-solid fa-chevron-right"></i></router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="shop-bottom">
          <p class="wow fadeInUp" data-wow-delay=".3s">Showing 12 of 46 products</p>
          <span class="text"></span>
          <router-link to="/product-details" class="theme-btn border-color wow fadeInUp" data-wow-delay=".5s">Load More</router-link>
        </div> -->
      </div>
    </section>

    <!-- Cta-Section Start -->
    <section class="cta-section fix">
      <div class="left-shape">
        <img src="/assets/img/cta/shape-1.png" alt="img">
      </div>
      <div class="right-shape">
        <img src="/assets/img/cta/shape-2.png" alt="img">
      </div>
      <div class="man-shape">
        <img src="/assets/img/cta/shape-3.png" alt="img">
      </div>
      <div class="container">
        <div class="cta-wrapper">
          <div class="cta-content">
            <h6 class="wow fadeInUp" data-wow-delay=".3s">Sale 20% off all store</h6>
            <h2 class="wow fadeInUp" data-wow-delay=".5s">Subscribe our Newsletter</h2>
          </div>
          <div class="search-widget wow fadeInUp" data-wow-delay=".3s">
            <input type="email" id="email" placeholder="Enter Your Email">
            <button type="submit" class="theme-btn">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </SharedLayout>
</template>
<script>
import { ref, onMounted } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'Categories',
  components: {
    SharedLayout
  },
  setup() {



     const categories = ref([])
    // const submitting = ref(false)
    const apiStore = useApiStore()

    const fetchCategories = async () => {
      try {
        const response = await apiStore.get('/categories')
        categories.value = response.data || []
        console.log('Categories:', categories.value);
        console.log('First category:', categories.value[0]);
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/placeholder.jpg'

      // If it's already an absolute URL, return as is
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
      }

      // If it's a relative path, prefix with API base URL
      const baseUrl = 'https://api.digi-essentials.com/'
      return baseUrl + imagePath.replace(/^\//, '') // Remove leading slash if present
    }

    

    onMounted(() => {
      // Preloader
      setTimeout(() => {
        $(".preloader").addClass('loaded');
        $(".preloader").delay(600).fadeOut();
      }, 100); // small delay to ensure DOM is ready
      fetchCategories();



   
    });

    return {
      categories,
      getImageUrl,
    };
  }
}
</script>