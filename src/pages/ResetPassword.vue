<template>
  <SharedLayout>
    <section class="my-account-section section-padding fix">
      <div class="container">
        <div class="account-wrapper">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="account-box">
                <h3>Reset Password</h3>
                <p class="mb-4 text-muted">Enter your new password below.</p>

                <div v-if="!hasValidParams" class="alert alert-warning mb-3">
                  This reset link is invalid. Please
                  <router-link to="/forgot-password">request a new link</router-link>.
                </div>

                <div v-if="successMessage" class="alert alert-success mb-3">
                  {{ successMessage }}
                  <div class="mt-3">
                    <router-link to="/login" class="theme-btn btn-sm">Go to Login</router-link>
                  </div>
                </div>
                <div v-if="errorMessage" class="alert alert-danger mb-3">
                  {{ errorMessage }}
                </div>

                <div v-if="hasValidParams && !successMessage" class="contact-form-item">
                  <form @submit.prevent="handleSubmit">
                    <div class="row g-4">
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="email" v-model="form.email" placeholder="Email" required readonly>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input
                            :type="showPassword ? 'text' : 'password'"
                            v-model="form.password"
                            placeholder="New Password"
                            required
                            minlength="8"
                          >
                          <div class="icon" @click="showPassword = !showPassword">
                            <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input
                            :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="form.password_confirmation"
                            placeholder="Confirm New Password"
                            required
                            minlength="8"
                          >
                          <div class="icon" @click="showConfirmPassword = !showConfirmPassword">
                            <i :class="showConfirmPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <button
                          type="submit"
                          class="theme-btn header-btn w-100"
                          :disabled="auth.resetPasswordLoading"
                        >
                          <span
                            v-if="auth.resetPasswordLoading"
                            class="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {{ auth.resetPasswordLoading ? 'Resetting...' : 'Reset Password' }}
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
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'ResetPasswordPage',
  components: {
    SharedLayout
  },
  setup() {
    const route = useRoute()
    const auth = useAuthStore()

    const form = reactive({
      email: route.query.email || '',
      password: '',
      password_confirmation: '',
      token: route.query.token || ''
    })

    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')

    const hasValidParams = computed(() => !!form.email && !!form.token)

    const handleSubmit = async () => {
      successMessage.value = ''
      errorMessage.value = ''

      if (form.password !== form.password_confirmation) {
        errorMessage.value = 'Passwords do not match.'
        return
      }

      try {
        const response = await auth.resetPassword({ ...form })
        successMessage.value = response.message || 'Your password has been reset successfully.'
      } catch (error) {
        errorMessage.value = error.response?.data?.message || error.message || 'Failed to reset password.'
      }
    }

    return {
      auth,
      form,
      showPassword,
      showConfirmPassword,
      hasValidParams,
      successMessage,
      errorMessage,
      handleSubmit
    }
  }
}
</script>
