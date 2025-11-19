<template>
  <SharedLayout>
    <!-- Shop-categories-Section Start -->
    <section class="sign-up-section section-padding fix">
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
            <img src="/assets/img/man-shape.png" alt="img">
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-6">
            
              <div class="account-box">
                <h3>sign-up to Bloom & Luxe</h3>
                
               
                <!-- <p>or Sign in with Email</p> -->
                <div class="contact-form-item">
                  <form action="#" id="contact-form2" method="POST">
                    <div class="row g-4">
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="email" id="email20" placeholder="First name">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="email" id="email21" placeholder="Last name">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="subject" id="Password" placeholder="Password">
                          <div class="icon">
                            <i class="fa-regular fa-eye"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="subject" id="password2" placeholder="Confirm Password">
                          <div class="icon">
                            <i class="fa-regular fa-eye"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="from-cheak-items">
                          <div class="form-check d-flex gap-2 from-customradio">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault11">
                            <label class="form-check-label" for="flexRadioDefault1">
                              Remember Me
                            </label>
                          </div>
                          <span>Forgot Password?</span>
                        </div>
                      </div>
                      <h6>Already have an account? <router-link>Login</router-link></h6>
                      <div class="col-lg-12">
                        <button type="submit" class="theme-btn w-100">
                          Sign Up
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
import { onMounted } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'SignUpPage',
  components: {
    SharedLayout
  },
  setup() {
    onMounted(() => {
      // Initialize jQuery plugins and custom JS
      if (window.$) {
        // Mobile Menu
        $('#mobile-menu').meanmenu({
          meanMenuContainer: '.mobile-menu',
          meanScreenWidth: "1199",
          meanExpand: ['<i class="far fa-plus"></i>'],
        });

        // Sidebar Toggle
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
          $(".offcanvas__info").removeClass("info-open");
          $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
          $(".offcanvas__info").addClass("info-open");
          $(".offcanvas__overlay").addClass("overlay-open");
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

        // Sticky Header
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("sticky");
          } else {
            $("#header-sticky").removeClass("sticky");
          }
        });

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

        // Preloader
        $(window).on('load', function() {
          $(".preloader").addClass('loaded');
          $(".preloader").delay(600).fadeOut();
        });
      }
    });

    return {};
  }
}
</script>