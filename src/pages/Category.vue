<template>
  <SharedLayout>
    <section class="product-collection-section-2 section-padding fix">
      <div class="container">
        <div class="section-title-area">
          <div class="section-title style-3">
            <h6 class="sub-title wow fadeInUp">
              {{ activeSubcategory?.parent_name || subcategories[0]?.parent_name }}
            </h6>

            <h2 class="wow fadeInUp" data-wow-delay=".3s">
              Shop from the best quality outfits
            </h2>
          </div>

          <ul class="nav">
            <!-- SUBCATEGORY LOOP -->
            <li
              v-for="subcategory in (subcategories || [])"
              :key="subcategory?.id"
              class="nav-item"
            >
              <a
                href="javascript:void(0)"
                @click="activeSubcategory = subcategory"
                :class="['nav-link', activeSubcategory?.id === subcategory?.id && 'active']"
              >
                {{ subcategory?.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="row mt-4">
          <div class="col-12 text-center">
            <p>Loading products...</p>
          </div>
        </div>

        <!-- PRODUCT LIST BY ACTIVE SUBCATEGORY -->
        <div v-else class="row mt-4">
          <div
            v-for="product in products"
            :key="product?.id"
            class="col-xl-3 col-lg-4 col-md-6"
          >
            <div class="product-collection-item">
              <div class="product-image">
                <img :src="product?.image" alt="img" style="width: 100%; height: 350px; object-fit: cover;" />
                <div class="product-btn">
                  <router-link to="/shop-cart" class="theme-btn-2">Add To Cart</router-link>
                </div>
              </div>

              <div class="product-content">
                <p>{{ product?.category?.name || product?.category }}</p>
                <h4>
                  <router-link :to="`/product-details/${product?.id}`">{{ product?.name }}</router-link>
                </h4>
                <span>${{ product?.price }}</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && products.length === 0" class="col-12 text-center">
            <p>No products found in this subcategory.</p>
          </div>
        </div>

      </div>
    </section>
  </SharedLayout>
</template>


<script>
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Category',
  components: { SharedLayout },

  setup() {

    const route = useRoute();
    const apiStore = useApiStore();

    const subcategories = ref([])
    const products = ref([])
    const activeSubcategory = ref(null)
    const loading = ref(false)

    const fetchSubcategories = async () => {
      try {
        const res = await apiStore.get(`/categories/${route.params.id}/subcategories`);
        subcategories.value = Array.isArray(res?.data) ? res.data : [];
        
        console.log('Subcategories fetched:', subcategories.value);
        
        if (subcategories.value.length > 0) {
          activeSubcategory.value = subcategories.value[0];
          console.log('Active subcategory set to:', activeSubcategory.value);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    const fetchProductsBySubcategory = async (subcategoryId) => {
      if (!subcategoryId) return;
      
      loading.value = true;
      try {
        // IMPORTANT: Try fetching with the subcategory ID directly
        const res = await apiStore.get(`products?category_id=${subcategoryId}`);
        const data = res?.data?.data || res?.data || res;
        products.value = Array.isArray(data) ? data : [];
        
        console.log(`=== Products for subcategory ID ${subcategoryId} (${activeSubcategory.value?.name}) ===`);
        console.log('API Response:', res);
        console.log('Products data:', data);
        console.log('Products array:', products.value);
        
        if (products.value.length > 0) {
          console.log('First product details:', products.value[0]);
          console.log('All products category IDs:', products.value.map(p => ({
            id: p.id,
            name: p.name,
            category_id: p.category_id,
            category: p.category
          })));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        products.value = [];
      } finally {
        loading.value = false;
      }
    };

    // Watch for active subcategory changes
    watch(activeSubcategory, (newSubcategory) => {
      if (newSubcategory) {
        console.log('Active subcategory changed to:', newSubcategory);
        fetchProductsBySubcategory(newSubcategory.id);
      }
    });

    onMounted(async () => {
      await fetchSubcategories();
      
      // Initial fetch for the first subcategory
      if (activeSubcategory.value) {
        await fetchProductsBySubcategory(activeSubcategory.value.id);
      }
    });

    return {
      subcategories,
      activeSubcategory,
      products,
      loading
    };
  }
}
</script>