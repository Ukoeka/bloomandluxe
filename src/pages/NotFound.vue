<template>
  <div>
    <!-- Preloader Start -->
    <div id="preloader" class="preloader">
      <div class="animation-preloader">
        <div class="spinner">
        </div>
        <div class="txt-loading">
          <span data-text-preloader="K" class="letters-loading">
            K
          </span>
          <span data-text-preloader="A" class="letters-loading">
            A
          </span>
          <span data-text-preloader="R" class="letters-loading">
            R
          </span>
          <span data-text-preloader="T" class="letters-loading">
            T
          </span>
          <span data-text-preloader="O" class="letters-loading">
            O
          </span>
        </div>
        <p class="text-center">Loading</p>
      </div>
      <div class="loader">
        <div class="row">
          <div class="col-3 loader-section section-left">
            <div class="bg"></div>
          </div>
          <div class="col-3 loader-section section-left">
            <div class="bg"></div>
          </div>
          <div class="col-3 loader-section section-right">
            <div class="bg"></div>
          </div>
          <div class="col-3 loader-section section-right">
            <div class="bg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back To Top Start -->
    <button id="back-top" class="back-to-top">
      <i class="fa-regular fa-arrow-up"></i>
    </button>

    <!--<< Mouse Cursor Start >>-->
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>

    <!-- fix-area Start -->
    <div class="fix-area">
      <div class="offcanvas__info">
        <div class="offcanvas__wrapper">
          <div class="offcanvas__content">
            <div class="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div class="offcanvas__logo">
                <router-link to="/">
                  <img src="/assets/img/logo/red-logo.svg" alt="logo-img">
                </router-link>
              </div>
              <div class="offcanvas__close">
                <button>
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <p class="text d-none d-xl-block">
              Nullam dignissim, ante scelerisque the  is euismod fermentum odio sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean a imperdiet risus.
            </p>
            <div class="mobile-menu fix mb-3"></div>
            <div class="offcanvas__contact">
              <h4>Contact Info</h4>
              <ul>
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon">
                    <i class="fal fa-map-marker-alt"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a target="_blank" href="#">Main Street, Melbourne, Australia</a>
                  </div>
                </li>
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon mr-15">
                    <i class="fal fa-envelope"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a href="mailto:info@example.com"><span class="mailto:info@example.com">info@example.com</span></a>
                  </div>
                </li>
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon mr-15">
                    <i class="fal fa-clock"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a target="_blank" href="#">Mod-friday, 09am -05pm</a>
                  </div>
                </li>
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon mr-15">
                    <i class="far fa-phone"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a href="tel:+11002345909">+11002345909</a>
                  </div>
                </li>
              </ul>
              <div class="header-button mt-4">
              </div>
              <router-link to="/contact" class="theme-btn"><span>Let's Talk <i class="fa-solid fa-arrow-right"></i></span></router-link>
              <div class="social-icon d-flex align-items-center">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas__overlay"></div>

    <!-- Sidebar Area Here -->
    <div id="targetElement" class="side_bar slideInRight side_bar_hidden">
      <div class="side_bar_overlay"></div>
      <div class="cart-title mb-50">
        <h4>Log in</h4>
      </div>
      <div class="login-sidebar">
        <form action="#" id="contact-form" method="POST">
          <div class="row g-4">
            <div class="col-lg-12">
              <div class="form-clt">
                <span>Username or email address *</span>
                <input type="text" name="name15" id="name15" placeholder="">
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-clt">
                <span>Password *</span>
                <input id="password" type="password" placeholder="">
                <div class="icon"><i class="fa-regular fa-eye"></i></div>
              </div>
            </div>
            <div class="col-lg-12">
              <button class="theme-btn" type="submit"><span>Log In</span></button>
            </div>
            <div class="col-lg-12">
              <div class="from-cheak-items">
                <div class="form-check d-flex gap-2 from-customradio">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Remember Me
                  </label>
                </div>
                <p>Forgot Password?</p>
              </div>
            </div>
          </div>
        </form>
        <p class="text">Or login with</p>
        <div class="social-item">
          <a href="#" class="facebook-text"><img src="/assets/img/facebook.png" alt="img">FACEBOOK</a>
          <a href="#" class="facebook-text google-text"><img src="/assets/img/google.png" alt="img">Google</a>
        </div>
        <div class="user-icon-box">
          <img src="/assets/img/user.png" alt="img">
          <p>No account yet?</p>
          <router-link to="/account">Create an Account</router-link>
        </div>
      </div>
      <button id="closeButton" class="x-mark-icon"><i class="fas fa-times"></i></button>
    </div>

    <!-- Header top Section Start -->
    <div class="header-top-section">
      <div class="container-fluid">
        <div class="header-top-wrapper header-3">
          <ul class="contact-list">
            <li>
              <i class="fa-brands fa-facebook-f"></i>
              7500k Followers
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
              <a href="tel:+40276328246">+402 763 282 46</a>
            </li>
          </ul>
          <div class="flag-wrapper">
            <div class="flag-wrap">
              <div class="nice-select" tabindex="0">
                <span class="current">
                  English
                </span>
                <ul class="list">
                  <li data-value="1" class="option selected focus">
                    English
                  </li>
                  <li data-value="1" class="option">
                    Bangla
                  </li>
                  <li data-value="1" class="option">
                    Hindi
                  </li>
                </ul>
              </div>
            </div>
            <div class="flag-wrap">
              <div class="nice-select style-2" tabindex="0">
                <span class="current">
                  $Usd
                </span>
                <ul class="list">
                  <li data-value="1" class="option selected focus">
                    $Usd
                  </li>
                  <li data-value="1" class="option">
                    $Eur
                  </li>
                  <li data-value="1" class="option">
                    $Jpy
                  </li>
                </ul>
              </div>
            </div>
            <div class="content">
              <button id="openButton" class="account-text">
                <i class="fa-regular fa-user"></i>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Header Section Start -->
    <header id="header-sticky" class=" header-1">
      <div class="container-fluid style-2">
        <div class="mega-menu-wrapper">
          <div class="header-main">
            <div class="logo">
              <router-link to="/" class="header-logo">
                <img src="/assets/img/logo/red-logo.svg" alt="logo-img">
              </router-link>
              <router-link to="/" class="header-logo-2 d-none">
                <img src="/assets/img/logo/red-logo.svg" alt="logo-img">
              </router-link>
            </div>
            <div class="mean__menu-wrapper">
              <div class="main-menu">
                <nav id="mobile-menu" style="display: block;">
                  <ul>
                    <li class="has-dropdown active menu-thumb">
                      <router-link to="/">
                        Home
                        <i class="fa-solid fa-chevron-down"></i>
                      </router-link>
                      <ul class="submenu has-homemenu">
                        <li>
                          <div class="homemenu-items">
                            <div class="homemenu">
                              <div class="homemenu-thumb">
                                <img src="/assets/img/header/home-1.jpg" alt="img">
                                <div class="demo-button">
                                  <router-link to="/" class="theme-btn">
                                    Demo Page
                                  </router-link>
                                </div>
                              </div>
                              <div class="homemenu-content text-center">
                                <h4 class="homemenu-title">
                                  Home 01
                                </h4>
                              </div>
                            </div>
                            <div class="homemenu">
                              <div class="homemenu-thumb mb-15">
                                <img src="/assets/img/header/home-2.jpg" alt="img">
                                <div class="demo-button">
                                  <router-link to="/home2" class="theme-btn">
                                    Demo Page
                                  </router-link>
                                </div>
                              </div>
                              <div class="homemenu-content text-center">
                                <h4 class="homemenu-title">
                                  Home 02
                                </h4>
                              </div>
                            </div>
                            <div class="homemenu">
                              <div class="homemenu-thumb mb-15">
                                <img src="/assets/img/header/home-3.jpg" alt="img">
                                <div class="demo-button">
                                  <router-link to="/home3" class="theme-btn">
                                    Demo Page
                                  </router-link>
                                </div>
                              </div>
                              <div class="homemenu-content text-center">
                                <h4 class="homemenu-title">
                                  Home 03
                                </h4>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li class="has-dropdown active d-xl-none">
                      <router-link to="/" class="border-none">
                        Home
                      </router-link>
                      <ul class="submenu">
                        <li><router-link to="/">Home 01</router-link></li>
                        <li><router-link to="/home2">Home 02</router-link></li>
                        <li><router-link to="/home3">Home 03</router-link></li>
                      </ul>
                    </li>
                    <li class="has-dropdown">
                      <router-link to="/news-details">
                        Pages
                        <i class="fa-solid fa-chevron-down"></i>
                      </router-link>
                      <ul class="submenu">
                        <li><router-link to="/about">About Us</router-link></li>
                        <li><router-link to="/order">Track Your Order</router-link></li>
                        <li><router-link to="/login">Login</router-link></li>
                        <li><router-link to="/sign-up">Sign-Up</router-link></li>
                        <li><router-link to="/categories">Categories</router-link></li>
                        <li><router-link to="/coming-soon">Coming Soon</router-link></li>
                        <li><router-link to="/forgot-password">Forget Password</router-link></li>
                        <li><router-link to="/my-account">My Account</router-link></li>
                        <li><router-link to="/faq">Faq</router-link></li>
                        <li><router-link to="/404">404</router-link></li>
                      </ul>
                    </li>
                    <li>
                      <router-link to="/shop">
                        Shop
                        <i class="fa-solid fa-chevron-down"></i>
                      </router-link>
                      <ul class="submenu">
                        <li><router-link to="/shop">Shop Grid</router-link></li>
                        <li><router-link to="/shop-left-sidebar">Shop Left Sideber</router-link></li>
                        <li><router-link to="/shop-right-sidebar">Shop Right Sideber</router-link></li>
                        <li><router-link to="/shop-cart">Shop Cart</router-link></li>
                        <li><router-link to="/checkout">Cheekout</router-link></li>
                      </ul>
                    </li>
                    <li>
                      <router-link to="/news">
                        Blog
                        <i class="fa-solid fa-chevron-down"></i>
                      </router-link>
                      <ul class="submenu">
                        <li><router-link to="/news-grid">Blog Grid</router-link></li>
                        <li><router-link to="/news-list">Blog List</router-link></li>
                        <li><router-link to="/news-details">Blog Details</router-link></li>
                      </ul>
                    </li>
                    <li>
                      <router-link to="/contact">Contact Us</router-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div class="header-right d-flex justify-content-end align-items-center">
              <div class="search-widget">
                <form action="#">
                  <input type="text" placeholder="Search for Products...">
                  <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
              </div>
              <a href="#0" class="search-trigger search-icon style-2"><i class="fa-regular fa-magnifying-glass"></i></a>
              <ul class="header-icon">
                <li>
                  <a href="#"><i class="fa-regular fa-heart"></i><span class="number">4</span></a>
                </li>
              </ul>
              <div class="menu-cart">
                <div class="cart-box">
                  <ul>
                    <li>
                      <img src="/assets/img/cart/01.jpg" alt="image">
                      <div class="cart-product">
                        <a href="#">Android phone</a>
                        <span>118$</span>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li class="border-none">
                      <img src="/assets/img/cart/02.jpg" alt="image">
                      <div class="cart-product">
                        <a href="#">Macbook Book</a>
                        <span>268$</span>
                      </div>
                    </li>
                  </ul>
                  <div class="shopping-items">
                    <span>Total :</span>
                    <span>$386.00</span>
                  </div>
                  <div class="cart-button mb-4">
                    <router-link to="/shop-cart" class="theme-btn">
                      View Cart
                    </router-link>
                  </div>
                </div>
                <router-link to="/shop-cart" class="cart-icon">
                  <i class="fa-sharp fa-regular fa-bag-shopping"></i>
                </router-link>
              </div>
              <div class="header__hamburger d-xl-none my-auto">
                <div class="sidebar__toggle">
                  <i class="fas fa-bars"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- search-wrap Start -->
    <div class="search-wrap">
      <div class="search-inner">
        <i class="fas fa-times search-close" id="search-close"></i>
        <div class="search-cell">
          <form method="get">
            <div class="search-field-holder">
              <input type="search" class="main-search-input" placeholder="Search...">
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Error-Section Start -->
    <section class="Error-section section-padding fix">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9">
            <div class="error-items">
              <div class="error-image wow fadeInUp" data-wow-delay=".3s">
                <img src="/assets/img/404.png" alt="img">
              </div>
              <h2 class="wow fadeInUp" data-wow-delay=".5s">
                <span>Oops!</span> Page not found
              </h2>
              <p class="wow fadeInUp" data-wow-delay=".7s">The page you are looking for does not exist</p>
              <router-link to="/" class="theme-btn wow fadeInUp" data-wow-delay=".3s">
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- footer-section Start -->
    <footer class="footer-section footer-bg fix">
      <div class="container">
        <div class="footer-widget-wrapper">
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-4 wow fadeInUp" data-wow-delay=".2s">
              <div class="single-footer-widget">
                <div class="widget-head">
                  <router-link to="/" class="footer-logo">
                    <img src="/assets/img/logo/red-logo.svg" alt="logo-img">
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
                      <a href="mailto:cartly@gmail.com">cartly@gmail.com</a>
                    </li>
                    <li>
                      <i class="fa-regular fa-location-dot"></i>
                      79 Sleepy Hollow St.<br>
                      Jamaica, New York 1432
                    </li>
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
                    <router-link to="/order">
                      Track Orders
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/product-details">
                      Shipping
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/shop-cart">
                      Wishlist
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/my-account">
                      My Account
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/order">
                      Order History
                    </router-link>
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
                    <router-link to="/contact">
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
                    <router-link to="/news-details">
                      Latest News
                    </router-link>
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
              ©All Rights reserved | by <span>Karto.</span>
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
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'NotFound',
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