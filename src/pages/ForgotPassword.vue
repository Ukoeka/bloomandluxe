<template>
  <SharedLayout>
    <section class="my-account-section section-padding fix">
      <div class="container">
        <div class="account-wrapper">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="account-box">
                <h3>Forgot Password</h3>
                <p class="mb-4 text-muted">
                  Enter your email address and we will send you a link to reset your password.
                </p>
                <div v-if="successMessage" class="alert alert-success mb-3">
                  {{ successMessage }}
                </div>
                <div v-if="errorMessage" class="alert alert-danger mb-3">
                  {{ errorMessage }}
                </div>
                <div class="contact-form-item">
                  <form @submit.prevent="handleSubmit">
                    <div class="row g-4">
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input
                            type="email"
                            v-model="email"
                            placeholder="Your Email"
                            required
                            :disabled="auth.forgotPasswordLoading"
                          >
                        </div>
                      </div>
                      <h6>
                        Remember your password?
                        <router-link to="/login">Back to login</router-link>
                      </h6>
                      <div class="col-lg-12">
                        <button
                          type="submit"
                          class="theme-btn header-btn w-100"
                          :disabled="auth.forgotPasswordLoading"
                        >
                          <span
                            v-if="auth.forgotPasswordLoading"
                            class="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {{ auth.forgotPasswordLoading ? 'Sending...' : 'Send Reset Link' }}
                        </button>
                      </div>
                    </div>
                  </form>
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
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'ForgotPasswordPage',
  components: {
    SharedLayout
  },
  setup() {
    const auth = useAuthStore()
    const email = ref('')
    const successMessage = ref('')
    const errorMessage = ref('')

    const handleSubmit = async () => {
      successMessage.value = ''
      errorMessage.value = ''

      try {
        const response = await auth.forgotPassword({ email: email.value })
        successMessage.value = response.message || 'If an account exists with that email, we have sent a password reset link.'
        email.value = ''
      } catch (error) {
        errorMessage.value = error.response?.data?.message || error.message || 'Failed to send reset link.'
      }
    }

    return {
      auth,
      email,
      successMessage,
      errorMessage,
      handleSubmit
    }
  }
}
</script>
