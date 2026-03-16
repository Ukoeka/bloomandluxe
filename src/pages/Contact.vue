<template>
  <SharedLayout>
    <!-- Preloader Start -->
    <!-- Back To Top Start -->
    <button id="back-top" class="back-to-top">
      <i class="fa-regular fa-arrow-up"></i>
    </button>

    <!-- Mouse Cursor Start -->
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>

    <!-- fix-area Start -->
    

    <!-- Sidebar Area Here -->
    

    <!-- contact-us-Section Start -->
    <section class="contact-us-section section-padding fix">
      <div class="container">
        <div class="conatct-main-wrapper">
          <div class="content">
            <h2>Keep In Touch with Us</h2>
            <ul class="list">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                Contact
              </li>
            </ul>
          </div>
          <div class="contact-box-wrapper">
            <div class="row g-4">
              <div class="col-lg-8">
                <div class="comment-form-wrap">
                  <h3>Sent A Message</h3>
                  <!-- Success Message -->
                  <div v-if="successMessage" class="alert alert-success mb-4">
                    {{ successMessage }}
                  </div>
                  <!-- Error Message -->
                  <div v-if="errorMessage" class="alert alert-danger mb-4">
                    {{ errorMessage }}
                  </div>
                  <form @submit.prevent="submitForm" id="contact-form2">
                    <div class="row g-4">
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            v-model="formData.name"
                            placeholder="Your Name"
                            required
                          >
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input 
                            type="email" 
                            name="email" 
                            id="email20" 
                            v-model="formData.email"
                            placeholder="Email address"
                            required
                          >
                        </div>
                      </div>
                       <div class="col-lg-12">
                        <div class="form-clt">
                          <input 
                            type="text" 
                            name="subject" 
                            id="subject" 
                            v-model="formData.subject"
                            placeholder="Subject"
                            required
                          >
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <textarea 
                            name="message" 
                            id="message" 
                            v-model="formData.message"
                            placeholder="Type your message"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <!-- <div class="from-cheak-items">
                          <div class="form-check d-flex gap-2 from-customradio">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                            <label class="form-check-label" for="flexRadioDefault2">
                              Save my name, email, and website in this browser for the next time I comment.
                            </label>
                          </div>
                        </div> -->
                      </div>
                      <div class="col-lg-12">
                        <button type="submit" class="theme-btn" :disabled="loading">
                          <span v-if="loading">Sending...</span>
                          <span v-else>Send Message</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="contact-right">
                  <div class="contact-item">
                    <div class="icon">
                      <i class="fa-thin fa-comments"></i>
                    </div>
                    <div class="content">
                      <h6>
                        <a href="mailto:contact@bloomandluxe.com">
                          contact@bloomandluxe.com
                        </a>
                      </h6>
                    </div>
                  </div>
                 
                  <div class="contact-item mb-0">
                    <div class="icon">
                      <i class="fa-thin fa-share-nodes"></i>
                    </div>
                    <div class="content">
                      <h6>
                        Find on social media
                      </h6>
                    </div>
                  </div>
                  <div class="social-icon d-flex align-items-center">
                    <a href="https://www.facebook.com/share/17ZJGw6Lnc/?mibextid=wwXIfr" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.tiktok.com/@bloomlux.store" target="_blank" class="bg-2"><i class="fab fa-tiktok"></i></a>
                    <a href="https://www.instagram.com/bloomlux.store" target="_blank"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- map-Section Start -->
    
  </SharedLayout>
</template>

<script>
import { onMounted, ref } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'ContactPage',
  components: {
    SharedLayout
  },
  setup() {
    const api = useApiStore()
    
    // Form data
    const formData = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    // Loading state
    const loading = ref(false)
    
    // Message states
    const successMessage = ref('')
    const errorMessage = ref('')
    
    // Submit form handler
    const submitForm = async () => {
      // Clear previous messages
      successMessage.value = ''
      errorMessage.value = ''
      
      // Basic validation
      if (!formData.value.name || !formData.value.email || !formData.value.subject || !formData.value.message) {
        errorMessage.value = 'Please fill in all fields'
        return
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.value.email)) {
        errorMessage.value = 'Please enter a valid email address'
        return
      }
      
      loading.value = true
      
      try {
        const response = await api.post('/contact', {
          name: formData.value.name,
          email: formData.value.email,
          subject: formData.value.subject,
          message: formData.value.message
        })
        
        // Show success message
        successMessage.value = response.message || 'Your message has been sent successfully! We will get back to you soon.'
        
        // Reset form
        formData.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
        
      } catch (error) {
        console.error('Contact form error:', error)
        errorMessage.value = error.response?.data?.message || error.message || 'Failed to send message. Please try again.'
      } finally {
        loading.value = false
      }
    }
    
    onMounted(() => {
      // Preloader
      setTimeout(() => {
        $(".preloader").addClass('loaded');
        $(".preloader").delay(600).fadeOut();
      }, 100); // small delay to ensure DOM is ready

      // Initialize jQuery plugins and custom JS
      if (window.$) {
        // Sidebar Toggle
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
          $(".offcanvas__info").removeClass("info-open");
          $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
          $(".offcanvas__info").addClass("info-open");
          $(".offcanvas__overlay").addClass("overlay-open");
        });

        // Sticky Header
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
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
      }
    });

    return {
      formData,
      loading,
      successMessage,
      errorMessage,
      submitForm
    };
  }
}
</script>
<style scoped>
.contact-right{
  text-transform:none;
}

.alert {
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 14px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.theme-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>