<template>
  <SharedLayout>
    <!-- Cart-order-Section Start -->
    <div class="page-content">
      <section class="cart-order-section section-padding fix">
      <div class="container">
        <div class="cart-order-wrapper">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="order-content">
                <h3>Order Tracking</h3>
                <p>To track your order please enter your Order ID in the box below and press the <br> "Track" button. This was given to you on your receipt and in the confirmation <br> email you should have received.</p>
                <form action="#" id="contact-form1" method="POST" class="contact-form-items">
                  <div class="form-clt mb-3">
                    <input type="text" name="name" id="name" placeholder="Username or email address*">
                  </div>
                  <div class="form-clt">
                    <input type="text" name="name" id="name2" placeholder="Billing Email*">
                  </div>
                  <button type="submit" class="theme-btn mt-4">
                    Tracking Orders
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </SharedLayout>
</template>

<script>
import { onMounted } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'Order',
  components: {
    SharedLayout
  },
  setup() {
    onMounted(() => {
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

<style scoped>
.page-content {
  min-height: 60vh;
}
</style>