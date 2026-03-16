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
                  <a href="tel:+61401596099">+61 401 596 099</a>
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
                  <a href="/shop">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/my-orders">
                    Track Orders
                  </a>
                </li>
                
                <li>
                  <a href="/shop-cart">
                    cart
                  </a>
                </li>
                
                <!-- <li>
                  <router-link to="/my-orders">
                    Order History
                  </router-link>
                </li> -->
                
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
                    About Us
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact">
                    Contact US
                  </router-link>
                </li>
               
                
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
            <div class="single-footer-widget">
              <div class="widget-head">
                <h3></h3>
              </div>
              <div class="footer-content">
              
                <div class="social-item">
                  <h6>Follow Us On</h6>
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
      <div class="footer-bottom">
        <div class="footer-wrapper">
          <p class="wow fadeInUp" data-wow-delay=".3s">
            ©All Rights reserved | by <span>bloomandluxe</span>
          </p>
          
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