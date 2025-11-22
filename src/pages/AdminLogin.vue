<template>
  <SharedLayout>
    <!-- Admin Login Section -->
    <section class="my-account-section section-padding fix">
      <div class="container">
        <div class="account-wrapper">
          <div class="shape-1 float-bob-x">
            <img src="/assets/img/shape-1.png" alt="img">
          </div>
          <div class="shape-2 float-bob-y">
            <img src="/assets/img/shape-2.png" alt="img">
          </div>
          <div class="shape-3 float-bob-y">
            <img src="/assets/img/dot.png" alt="img">
          </div>
          <div class="shape-4 float-bob-x">
            <img src="/assets/img/shape-3.png" alt="img">
          </div>
          <div class="shape-5 float-bob-y">
            <!-- <img src="/assets/img/man-shape.png" alt="img"> -->
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="account-box">
                <h3>Admin Login</h3>
                <div class="contact-form-item">
                  <form @submit.prevent="handleLogin" id="admin-login-form" method="POST">
                    <div class="row g-4">
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input v-model="email" type="email" name="email" id="admin-email" placeholder="Admin Email" required>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input v-model="password" type="password" name="password" id="admin-password" placeholder="Password" required>
                          <div class="icon">
                            <i class="fa-regular fa-eye"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="from-cheak-items">
                          <div class="form-check d-flex gap-2 from-customradio">
                            <input class="form-check-input" type="checkbox" name="remember" id="admin-remember">
                            <label class="form-check-label" for="admin-remember">
                              Remember Me
                            </label>
                          </div>
                          <span>Forgot Password?</span>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <button type="submit" class="theme-btn header-btn w-100" :disabled="loading">
                          {{ loading ? 'Logging in...' : 'Login' }}
                        </button>
                      </div>
                    </div>
                  </form>
                  <p v-if="error" class="text-danger mt-3">{{ error }}</p>
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
import { useRouter } from 'vue-router'
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminLoginPage',
  components: {
    SharedLayout
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const router = useRouter()
    const apiStore = useApiStore()

    const handleLogin = async () => {
      loading.value = true
      error.value = ''
      try {
        // Assuming there's an API endpoint for admin login
        const response = await apiStore.post('/api/admin/login', { email: email.value, password: password.value })
        // Handle successful login, e.g., store token, redirect
        localStorage.setItem('adminToken', response.token)
        router.push('/admin/dashboard')
      } catch (err) {
        error.value = 'Login failed. Please check your credentials.'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      error,
      handleLogin
    }
  }
}
</script>