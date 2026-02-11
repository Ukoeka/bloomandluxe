<template>
  <SharedLayout>
    <section class="checkout-section fix section-padding">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="checkout-cancel-wrapper text-center">
              <div class="cancel-icon mb-4">
                <i class="fas fa-times-circle" style="font-size: 80px; color: #dc3545;"></i>
              </div>
              <h2 class="mb-3">Payment Cancelled</h2>
              <p class="lead mb-4">Your payment was cancelled. No charges have been made to your account.</p>
              
              <div v-if="orderId" class="alert alert-info mb-4">
                <p class="mb-0">Your order has been saved. You can complete the payment later.</p>
              </div>

              <div class="action-buttons">
                <router-link to="/shop-cart" class="theme-btn me-3">
                  Return to Cart
                </router-link>
                <router-link to="/" class="theme-btn">
                  Continue Shopping
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SharedLayout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'CheckoutCancel',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const orderId = ref(null)

    onMounted(() => {
      orderId.value = route.query.order_id
    })

    return {
      orderId
    }
  }
}
</script>

<style scoped>
.checkout-cancel-wrapper {
  padding: 60px 20px;
}

.cancel-icon {
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.action-buttons {
  margin-top: 30px;
}
</style>

