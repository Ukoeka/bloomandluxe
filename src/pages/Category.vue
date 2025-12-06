<template>
  <SharedLayout>
    <section class="product-collection-section-2 section-padding fix">
      <div class="container">
        <div class="section-title-area">
          <div class="section-title style-3">
            <h6 class="sub-title wow fadeInUp">
              {{ subcategories[0]?.parent_name }}
            </h6>

            <h2 class="wow fadeInUp" data-wow-delay=".3s">
              Shop from the best quality outfits
            </h2>
          </div>

          <ul class="nav">
            <li class="nav-item wow fadeInUp" data-wow-delay=".3s">
              <a href="#All" data-bs-toggle="tab" class="nav-link active"> All </a>
            </li>

            <!-- SAFE SUBCATEGORY LOOP -->
            <li
              v-for="subcategory in (subcategories || [])"
              :key="subcategory?.id"
              class="nav-item wow fadeInUp"
              data-wow-delay=".3s"
            >
              <a :href="`#${subcategory?.name}`" data-bs-toggle="tab" class="nav-link">
                {{ subcategory?.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="tab-content">
          <div id="All" class="tab-pane fade show active">
            <div class="row">

              <!-- SAFE PRODUCTS LOOP -->
              <div
                v-for="product in (products || [])"
                :key="product?.id"
                class="col-xl-3 col-lg-4 col-md-6"
              >
                <div class="product-collection-item">
                  <div class="product-image">
                    <img :src="product?.image" alt="img" />
                    <div class="product-btn">
                      <router-link to="/shop-cart" class="theme-btn-2">Add To Cart</router-link>
                    </div>
                  </div>
                  <div class="product-content">
                    <p>{{ product?.category }}</p>
                    <h4>
                      <router-link :to="`/product-details/${product?.id}`">{{ product?.name }}</router-link>
                    </h4>
                    <span>{{ product?.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SUB CATEGORY TABS -->
          <div
            v-for="subcategory in (subcategories || [])"
            :key="subcategory?.id"
            :id="subcategory?.name"
            class="tab-pane fade"
          >
            <div class="row">
              <div
                v-for="product in (products || []).filter(p => p?.category === subcategory?.name)"
                :key="product?.id"
                class="col-xl-3 col-lg-4 col-md-6"
              >
                <div class="product-collection-item">
                  <div class="product-image">
                    <img :src="product?.image" alt="img" />
                    <div class="product-btn">
                      <router-link to="/shop-cart" class="theme-btn-2">Add To Cart</router-link>
                    </div>
                  </div>
                  <div class="product-content">
                    <p>{{ product?.category }}</p>
                    <h4>
                      <router-link :to="`/product-details/${product?.id}`">{{ product?.name }}</router-link>
                    </h4>
                    <span>{{ product?.price }}</span>
                  </div>
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
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Category',
  components: { SharedLayout },

  setup() {

    const route = useRoute();
    const apiStore = useApiStore();

    const subcategories = ref([])
    const products = ref([])
    const category = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const fetchCategory = async () => {
      try {
        const response = await apiStore.get(`/categories/${route.params.id}`);
        category.value = response?.data || response;
      } catch (err) {
        error.value = "Failed to load category";
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await apiStore.get(`/categories/${route.params.id}/subcategories`);
        subcategories.value = (response?.data || response)
      } catch (err) {
        error.value = "Failed to load subcategories";
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await apiStore.get(`products?category_id=${route.params.id}&min_price=0&max_price=10000`);
        const data = response?.data || response;
        products.value = Array.isArray(data) ? data : [];
      } catch (err) {
        error.value = "Failed to load products";
      }
    };

    onMounted(async () => {
      await fetchCategory();
      await fetchSubcategories();
      await fetchProducts();
      loading.value = false;
    });

    return {
      subcategories,
      category,
      products,
      loading,
      error
    };
  }
}
</script>
