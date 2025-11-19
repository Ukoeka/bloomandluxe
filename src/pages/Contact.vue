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
                  <form action="https://demo.labibly.xyz/karto/contact.php" id="contact-form2" method="POST">
                    <div class="row g-4">
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="name" id="name" placeholder="Your Name">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="email" id="email20" placeholder="Email address">
                        </div>
                      </div>
                       <div class="col-lg-12">
                        <div class="form-clt">
                          <input type="text" name="subject" id="name" placeholder="Subject">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-clt">
                          <textarea name="message" id="message" placeholder="Type your message"></textarea>
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
                        <button type="submit" class="theme-btn">
                          Send Message
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
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="bg-2"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
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
import { onMounted } from 'vue'
import SharedLayout from '../components/SharedLayout.vue'

export default {
  name: 'ContactPage',
  components: {
    SharedLayout
  },
  setup() {
    onMounted(() => {
      // Preloader
      setTimeout(() => {
        $(".preloader").addClass('loaded');
        $(".preloader").delay(600).fadeOut();
      }, 100); // small delay to ensure DOM is ready

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

    return {};
  }
}
</script>