<template>
  <div id="preloader" class="preloader" v-if="showPreloader">
      <div class="animation-preloader">
        <div class="spinner"></div>
        <div class="txt-loading">
          <span data-text-preloader="B" class="letters-loading">B</span>
          <span data-text-preloader="L" class="letters-loading">L</span>
          <span data-text-preloader="O" class="letters-loading">O</span>
          <span data-text-preloader="O" class="letters-loading">O</span>
          <span data-text-preloader="M" class="letters-loading">M</span>
          <span data-text-preloader="" class="letters-loading">&</span>
          <span data-text-preloader="L" class="letters-loading">L</span>
          <span data-text-preloader="U" class="letters-loading">U</span>
          <span data-text-preloader="X" class="letters-loading">X</span>
          <span data-text-preloader="E" class="letters-loading">E</span>
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
  <button id="back-top" class="back-to-top">
      <i class="fa-regular fa-arrow-up"></i>
    </button>

    <!-- Mouse Cursor Start -->
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>
     <div class="fix-area">
      <div class="offcanvas__info">
        <div class="offcanvas__wrapper">
          <div class="offcanvas__content">
            <div class="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div class="offcanvas__logo">
                <a href="/">
                  <img src="/assets/img/logo/main-logo.png
                  " alt="logo-img">
                </a>
              </div>
              <div class="offcanvas__close">
                <button>
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
           
            <div class="mobile-menu fix mb-3"></div>
            <div class="offcanvas__contact">
              <h4>Contact Info</h4>
              <ul>
                <!-- <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon">
                    <i class="fal fa-map-marker-alt"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a target="_blank" href="#">Main Street, Melbourne, Australia</a>
                  </div>
                </li> -->
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon mr-15">
                    <i class="fal fa-envelope"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a href="mailto:info@example.com"><span class="mailto:info@example.com">contact@bloom&luxe.com</span></a>
                  </div>
                </li>
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon mr-15">
                    <i class="fal fa-clock"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a target="_blank" href="#">Sun-Sat 24/7</a>
                  </div>
                </li>
                <li class="d-flex align-items-center">
                  <div class="offcanvas__contact-icon mr-15">
                    <i class="far fa-phone"></i>
                  </div>
                  <div class="offcanvas__contact-text">
                    <a href="tel:+11002345909"> +61401596099</a>
                  </div>
                </li>
              </ul>
              <div class="header-button mt-4">
              </div>
              <a href="/contact" class="theme-btn"><span>Let’s Talk <i class="fa-solid fa-arrow-right"></i></span></a>
              <div class="social-icon d-flex align-items-center">
                <a href="https://www.facebook.com/share/17ZJGw6Lnc/?mibextid=wwXIfr"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.tiktok.com/@bloomlux.store?"><i class="fab fa-tiktok"></i></a>
                <a href="https://www.instagram.com/bloomandluxestore?"><i class="fab fa-instagram"></i></a>
                <!-- <a href="#"><i class="fab fa-linkedin-in"></i></a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas__overlay"></div>
  <!-- Header top Section Start -->
  <div class="header-top-section">
    <div class="container-fluid">
      <div class="header-top-wrapper header-3">
        <ul class="contact-list">
          <!-- <li>
            <i class="fa-brands fa-facebook-f"></i>
            7500k Followers
          </li> -->
          <li>
            <i class="fa-solid fa-phone"></i>
            <a href="tel:+40276328246">+402 763 282 46</a>
          </li>
        </ul>
        <div class="flag-wrapper">
          <div class="flag-wrap">
          </div>
          <div class="content">
            <button v-if="!isLoggedIn" id="openButton" class="account-text">
              <i class="fa-regular fa-user"></i>
              Log in
            </button>
            <div v-else class="user-info">
              <i class="fa-regular fa-user"></i>
              <span>Welcome, {{ authStore.user?.name || 'User' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Header Section Start -->
  <header id="header-sticky" class="header-1">
    <div class="container-fluid style-2">
      <div class="mega-menu-wrapper">
        <div class="header-main">
          <div class="logo">
            <router-link to="/" class="header-logo">
              <img src="/assets/img/logo/main-logo.png" alt="logo-img">
            </router-link>
            <router-link to="/" class="header-logo-2 d-none">
              <img src="/assets/img/logo/main-logo.png" alt="logo-img">
            </router-link>
          </div>
          <div class="mean__menu-wrapper">
            <div class="main-menu">
              <nav id="mobile-menu" style="display: block;">
                <ul>
                  <li class="has-dropdown active menu-thumb">
                    <router-link to="/">
                      Home
                    </router-link>
                    
                  </li>
                 
                  <li class="has-dropdown">
                    <a href="/about">
                      About Us
                    </a>
                    
                  </li>
                  <li>
                    <router-link to="/shop">
                      Shop
                    </router-link>
                    
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
            <div class="menu-cart">
              <div class="cart-box">
                <ul v-if="cartStore.cartItems.length > 0">
                  <li v-for="item in cartStore.cartItems.slice(0, 2)" :key="item.id">
                    <img :src="getImageUrl(item.image)" :alt="item.name">
                    <div class="cart-product">
                      <a href="#">{{ item.name || 'Product' }}</a>
                      <span>${{ Number(item.price).toFixed(2) }}</span>
                    </div>
                  </li>
                </ul>
                <div v-else class="text-center py-3">
                  <p>Your cart is empty</p>
                </div>
                <div v-if="cartStore.cartItems.length > 0" class="shopping-items">
                  <span>Total :</span>
                  <span>${{ totalPrice.toFixed(2) }}</span>
                </div>
                <div class="cart-button mb-4">
                  <router-link to="/shop-cart" class="theme-btn">
                    View Cart
                  </router-link>
                </div>
              </div>
              <router-link to="/shop-cart" class="cart-icon">
                <i class="fa-sharp fa-regular fa-bag-shopping"></i>
                <span v-if="totalItems > 0" class="cart-count">{{ totalItems }}</span>
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




   <div id="targetElement" class="side_bar slideInRight side_bar_hidden">
       <div class="side_bar_overlay"></div>
       <div class="cart-title mb-50">
         <h4 v-if="!isLoggedIn">Log in</h4>
         <h4 v-else>Account</h4>
       </div>
       <div v-if="!isLoggedIn" class="login-sidebar">
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
              <button class="theme-btn style-2" type="submit"><span>Log In</span></button>
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
          <a href="#" class="facebook-text style-2"><img src="/assets/img/facebook.png" alt="img">FACEBOOK</a>
          <a href="#" class="facebook-text google-text style-2"><img src="/assets/img/google.png" alt="img">Google</a>
        </div>
        <div class="user-icon-box">
          <img src="/assets/img/user.png" alt="img">
          <p>No account yet?</p>
          <a href="/login">Create an Account</a>
        </div>
      </div>
      <div v-else class="account-sidebar">
        <div class="user-info-section">
          <div class="user-avatar">
            <img src="/assets/img/user.png" alt="user">
          </div>
          <h5>{{ authStore.user?.name || 'User' }}</h5>
          <p>{{ authStore.user?.email || '' }}</p>
        </div>
        <div class="account-links">
          <a href="#" class="account-link">
            <i class="fas fa-user"></i>
            My Profile
          </a>
          <a href="#" class="account-link">
            <i class="fas fa-shopping-bag"></i>
            My Orders
          </a>
          <a href="#" class="account-link">
            <i class="fas fa-heart"></i>
            Wishlist
          </a>
          <a href="#" @click.prevent="logout" class="account-link">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </a>
        </div>
      </div>
      <button id="closeButton" class="x-mark-icon"><i class="fas fa-times"></i></button>
    </div>

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
</template>

<script>
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { computed } from 'vue'

export default {
  name: 'Header',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    const totalItems = computed(() => cartStore.getTotalItems())
    const totalPrice = computed(() => cartStore.getTotalPrice())
    const isLoggedIn = computed(() => !!authStore.user)

    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/cart/01.jpg' // Use a default cart image

      // If it's already an absolute URL, return as is
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
      }

      // If it's a relative path, prefix with API base URL
      const baseUrl = 'https://api.digi-essentials.com/'
      return baseUrl + imagePath.replace(/^\//, '') // Remove leading slash if present
    }

    const logout = () => {
      authStore.logout()
      // Optional: redirect to home page or show message
      alert('Logged out successfully!')
    }

    return {
      cartStore,
      authStore,
      totalItems,
      totalPrice,
      isLoggedIn,
      getImageUrl,
      logout
    }
  },
  data() {
    return {
      showPreloader: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.showPreloader = false;
    }, 1000);

    // Mobile Menu
    if (window.$ && $('#mobile-menu').length > 0) {
      $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "1199",
        meanExpand: ['<i class="far fa-plus"></i>'],
      });
    }

    // Sticky Header
    $(window).on("scroll", function() {
      if ($(this).scrollTop() > 250) {
        $("#header-sticky").addClass("sticky");
      } else {
        $("#header-sticky").removeClass("sticky");
      }
    });

    // Sidebar functionality
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const targetElement = document.getElementById('targetElement');
    const overlay = document.querySelector('.side_bar_overlay');

    if (openButton && targetElement) {
      openButton.addEventListener('click', () => {
        targetElement.classList.remove('side_bar_hidden');
      });
    }

    if (closeButton && targetElement) {
      closeButton.addEventListener('click', () => {
        targetElement.classList.add('side_bar_hidden');
      });
    }

    if (overlay && targetElement) {
      overlay.addEventListener('click', () => {
        targetElement.classList.add('side_bar_hidden');
      });
    }

    // Offcanvas functionality
    const sidebarToggle = document.querySelector('.sidebar__toggle');
    const offcanvasInfo = document.querySelector('.offcanvas__info');
    const offcanvasOverlay = document.querySelector('.offcanvas__overlay');
    const offcanvasClose = document.querySelector('.offcanvas__close button');

    if (sidebarToggle && offcanvasInfo) {
      sidebarToggle.addEventListener('click', () => {
        offcanvasInfo.classList.add('info-open');
        offcanvasOverlay.classList.add('overlay-open');
      });
    }

    if (offcanvasClose && offcanvasInfo) {
      offcanvasClose.addEventListener('click', () => {
        offcanvasInfo.classList.remove('info-open');
        offcanvasOverlay.classList.remove('overlay-open');
      });
    }

    if (offcanvasOverlay && offcanvasInfo) {
      offcanvasOverlay.addEventListener('click', () => {
        offcanvasInfo.classList.remove('info-open');
        offcanvasOverlay.classList.remove('overlay-open');
      });
    }

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
}
</script>

<style scoped>
.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  min-width: 20px;
}

.cart-icon {
  position: relative;
}

.account-sidebar {
  text-align: center;
}

.user-info-section {
  margin-bottom: 30px;
}

.user-avatar {
  margin-bottom: 15px;
}

.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info-section h5 {
  margin-bottom: 5px;
  color: #333;
}

.user-info-section p {
  color: #666;
  font-size: 14px;
}

.account-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.account-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: background 0.3s ease;
}

.account-link:hover {
  background: #e9ecef;
  color: #000;
}

.account-link i {
  width: 20px;
  color: #666;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-weight: 500;
}

.user-info i {
  color: #666;
}
</style>