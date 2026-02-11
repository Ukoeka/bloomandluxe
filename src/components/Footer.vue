<template>
  <!-- footer-section Start -->
  <footer class="footer-section footer-bg fix">
    <div class="container">
      <div class="footer-widget-wrapper">
        <div class="row">
          <div class="col-xl-3 col-lg-4 col-md-4 wow fadeInUp" data-wow-delay=".2s">
            <div class="single-footer-widget">
              <div class="widget-head">
                <router-link to="/" class="footer-logo">
                  <img src="/assets/img/logo/main-logo.png" alt="logo-img">
                </router-link>
              </div>
              <div class="footer-content">
                <div class="text">
                  <p>Got Questions? Call us</p>
                  <a href="tel:+67041390762">+670 413 90 762</a>
                </div>
                <ul class="contact-list">
                  <li>
                    <i class="fa-regular fa-envelope"></i>
                    <a href="mailto:contact@bloomandluxe.com">contact@bloomandluxe.com</a>
                  </li>
                  <!-- <li>
                    <i class="fa-regular fa-location-dot"></i>
                    79 Sleepy Hollow St.<br>
                    Jamaica, New York 1432
                  </li> -->
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
            <div class="single-footer-widget">
              <div class="widget-head">
                <h3>My Account</h3>
              </div>
              <ul class="list-items">
                <li>
                  <a href="/order">
                    Track Orders
                  </a>
                </li>
                <li>
                  <router-link to="/product-details">
                    Shipping
                  </router-link>
                </li>
                <li>
                  <a href="/shop-cart">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="/login">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="/order">
                    Order History
                  </a>
                </li>
                <li>
                  <router-link to="/contact">
                    Returns
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 ps-lg-5 wow fadeInUp" data-wow-delay=".6s">
            <div class="single-footer-widget">
              <div class="widget-head">
                <h3>Infomation</h3>
              </div>
              <ul class="list-items">
                <li>
                  <router-link to="/about">
                    Our Story
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact">
                    Careers
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact">
                    Privacy Policy
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact">
                    Terms & Conditions
                  </router-link>
                </li>
                <li>
                  <a href="/news">
                    Latest News
                  </a>
                </li>
                <li>
                  <router-link to="/contact">
                    Contact Us
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
            <div class="single-footer-widget">
              <div class="widget-head">
                <h3>Subcribe.</h3>
              </div>
              <div class="footer-content">
                <p class="f-text">Our conversation is just getting started</p>
                <div class="footer-input">
                  <input type="email" id="email2" placeholder="Enter Your Email">
                  <button class="newsletter-btn" type="submit">
                    <span>Subscribe</span>
                  </button>
                </div>
                <div class="social-item">
                  <h6>Follow Us On</h6>
                  <div class="social-icon d-flex align-items-center">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="bg-2"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-wrapper">
          <p class="wow fadeInUp" data-wow-delay=".3s">
            ©All Rights reserved | by <span>bloomandluxe</span>
          </p>
          <div class="bottom-list wow fadeInUp" data-wow-delay=".5s">
            <div class="app-image">
              <img src="/assets/img/footer/01.png" alt="img">
            </div>
            <div class="app-image">
              <img src="/assets/img/footer/02.png" alt="img">
            </div>
            <div class="app-image">
              <img src="/assets/img/footer/03.png" alt="img">
            </div>
            <div class="app-image">
              <img src="/assets/img/footer/04.png" alt="img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>