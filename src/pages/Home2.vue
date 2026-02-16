
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
              <button id="openButton" class="account-text d-flex align-items-center gap-2">
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
      <div class="container-fluid">
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

    <!-- Modal Version 2 -->
    <div class="modal modal-common-wrap fade" id="exampleModal2" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="shop-details-wrapper">
              <div class="row">
                <div class="col-lg-6">
                  <div class="shop-details-image">
                    <div class="tab-content">
                      <div class="shop-thumb">
                        <img src="/assets/img/shop/popup.jpg" alt="img">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="product-details-content">
                    <h3 class="pb-3">Sulwhasoo Essential Cream</h3>
                    <div class="star pb-3">
                      <a href="#"> <i class="fas fa-star"></i></a>
                      <a href="#"><i class="fas fa-star"></i></a>
                      <a href="#"> <i class="fas fa-star"></i></a>
                      <a href="#"><i class="fas fa-star"></i></a>
                      <a href="#"><i class="fas fa-star"></i></a>
                      <span>(25 Customer Review)</span>
                    </div>
                    <p class="mb-3">
                      In today's online world, a brand's success lies in combining
                      technological planning and social strategies to draw
                      customers in–and keep them coming back
                    </p>
                    <div class="price-list">
                      <h3>$1,260.00</h3>
                    </div>
                    <div class="cart-wrp">
                      <div class="cart-quantity">
                        <form id='myform' method='POST' class='quantity' action='#'>
                          <input type='button' value='-' class='qtyminus minus'>
                          <input type='text' name='quantity' value='0' class='qty'>
                          <input type='button' value='+' class='qtyplus plus'>
                        </form>
                      </div>
                      <a href="/product-details/1" class="icon">
                        <i class="far fa-heart"></i>
                      </a>
                      <div class="social-profile">
                        <span class="plus-btn"><i class="far fa-share"></i></span>
                        <ul>
                          <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                          <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                          <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                          <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="shop-btn">
                      <a href="/shop-cart" class="theme-btn">
                        <span> Add to cart</span>
                      </a>
                      <a href="/product-details/1" class="theme-btn">
                        <span> Buy now</span>
                      </a>
                    </div>
                    <h6 class="details-info"><span>SKU:</span> <a href="/product-details/1">124224</a></h6>
                    <h6 class="details-info"><span>Categories:</span> <a href="/product-details/1">Crux Indoor Fast and Easy</a></h6>
                    <h6 class="details-info style-2"><span>Tags:</span> <a href="/product-details/1"> <b>accessories</b> <b>business</b></a></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero-Section Start -->
    <section class="hero-section hero-1 fix hero-bg">
      <div class="arrow-button">
        <button class="array-prev active">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="array-next">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div class="shape">
        <img src="/assets/img/hero/shape.png" alt="img">
      </div>
      <div class="right-image">
        <img src="/assets/img/hero/02.png" alt="img">
      </div>
      <div class="video">
        <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" class="video-btn video-popup">
          <i class="fa-duotone fa-play"></i>
        </a>
        <div class="circle-image">
          <img src="/assets/img/hero/circle.png" alt="img">
        </div>
      </div>
      <div class="container">
        <div class="hero-items">
          <div class="hero-content">
            <h6>45% MEGA SALE OFFER</h6>
            <h1>
              Discover Customizable Furniture
            </h1>
            <router-link to="/contact" class="theme-btn">Discover Now</router-link>
            <p>
              Unlock unbeatable savings on every purchase. Introducing our new collection of stylish and comfortable sofas, designed to elevate your living space with modern elegance.
            </p>
          </div>
          <div class="swiper hero-image-slider">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="hero-image">
                  <img src="/assets/img/hero/01.png" alt="img">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="hero-image">
                  <img src="/assets/img/hero/01.png" alt="img">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="hero-image">
                  <img src="/assets/img/hero/01.png" alt="img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature-Section Start -->
    <section class="feature-section fix">
      <div class="container">
        <div class="feature-wrapper">
          <div class="feature-item style-2 wow fadeInUp" data-wow-delay=".2s">
            <div class="icon">
              <img src="/assets/img/icon/01.svg" alt="img">
            </div>
            <div class="content">
              <h6>
                Free Delivary
              </h6>
              <p>Orders from all item</p>
            </div>
          </div>
          <div class="feature-item wow fadeInUp" data-wow-delay=".4s">
            <div class="icon">
              <img src="/assets/img/icon/02.svg" alt="img">
            </div>
            <div class="content">
              <h6>
                Return & Refunf
              </h6>
              <p>Maney back guarantee</p>
            </div>
          </div>
          <div class="feature-item wow fadeInUp" data-wow-delay=".6s">
            <div class="icon">
              <img src="/assets/img/icon/03.svg" alt="img">
            </div>
            <div class="content">
              <h6>
                Member Discount
              </h6>
              <p>Onevery order over $140.00</p>
            </div>
          </div>
          <div class="feature-item wow fadeInUp" data-wow-delay=".8s">
            <div class="icon">
              <img src="/assets/img/icon/04.svg" alt="img">
            </div>
            <div class="content">
              <h6>
                Support 24/7
              </h6>
              <p>Contact us 24 hours a day</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Offer-Section Start -->
    <section class="offer-section section-padding pt-0 fix">
      <div class="container">
        <div class="offer-wrapper">
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="offer-card-item wow fadeInUp" data-wow-delay=".3s">
                <div class="content">
                  <p>UP TO 20% OFF</p>
                  <h3>
                    <router-link to="/product-details">Accent Leisure <br> Chairs</router-link>
                  </h3>
                  <router-link to="/product-details" class="theme-btn">Shop Now <i class="fa-regular fa-arrow-right"></i></router-link>
                </div>
                <div class="offer-image">
                  <img src="/assets/img/offer/01.png" alt="img">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 wow fadeInUp" data-wow-delay=".5s">
                  <div class="offer-box">
                    <div class="content">
                      <span>Trending</span>
                      <h3>
                        <router-link to="/product-details">Exotic Chairs</router-link>
                      </h3>
                    </div>
                    <div class="offer-image">
                      <img src="/assets/img/offer/02.png" alt="img">
                    </div>
                  </div>
                </div>
                <div class="col-md-6 wow fadeInUp" data-wow-delay=".7s">
                  <div class="offer-box style-2">
                    <div class="content">
                      <span>New Collection</span>
                      <h3>
                        <router-link to="/product-details">Luxury Sofa</router-link>
                      </h3>
                    </div>
                    <div class="offer-image">
                      <img src="/assets/img/offer/03.png" alt="img">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div class="offer-bg-box bg-cover" style="background-image: url(/assets/img/offer/04.jpg);">
                <div class="content">
                  <p>Collection</p>
                  <h3>
                    <router-link to="/product-details">Interior Decor <br> Furniture</router-link>
                  </h3>
                  <router-link to="/product-details" class="theme-btn">Shop Now <i class="fa-regular fa-arrow-right"></i></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About-Section Start -->
    <section class="about-section section-padding fix pt-0">
      <div class="container">
        <div class="about-wrapper">
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="about-image">
                <img src="/assets/img/about/01.jpg" alt="img" class="wow fadeInUp" data-wow-delay=".3s">
                <div class="about-image-2">
                  <img src="/assets/img/about/02.jpg" alt="img" class="wow fadeInUp" data-wow-delay=".5s">
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="about-content">
                <div class="section-title style-2">
                  <h6 class="sub-title wow fadeInUp">
                    Unity Collection
                  </h6>
                  <h2 class="wow fadeInUp" data-wow-delay=".3s">
                    Shop our limited
                    Edition Collaborations
                  </h2>
                </div>
                <div class="text">
                  <p class="wow fadeInUp" data-wow-delay=".5s">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras vel mi quam. Fusce vehicula vitae mauris sit amet tempor. Donec consectetur lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. dolore magna
                  </p>
                  <router-link to="/about" class="theme-btn wow fadeInUp" data-wow-delay=".7s">More about us <i class="fa-regular fa-arrow-right"></i></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop-Section Start -->
    <section class="shop-section section-padding fix section-bg">
      <div class="container custom-container">
        <div class="section-title text-center">
          <h6 class="sub-title wow fadeInUp">
            Choose Your Category
          </h6>
          <h2 class="wow fadeInUp" data-wow-delay=".3s">
            Choose Your Category
          </h2>
        </div>
        <div class="swiper shop-slider">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="shop-box-item">
                <div class="shop-image">
                  <img src="/assets/img/shop/01.png" alt="img">
                </div>
                <div class="content">
                  <h4>
                    <router-link to="/shop-grid">Chair</router-link>
                  </h4>
                  <p>starting @ $48.00</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="shop-box-item">
                <div class="shop-image">
                  <img src="/assets/img/shop/02.png" alt="img">
                </div>
                <div class="content">
                  <h4>
                    <router-link to="/shop-grid">Bed</router-link>
                  </h4>
                  <p>starting @ $48.00</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="shop-box-item">
                <div class="shop-image">
                  <img src="/assets/img/shop/03.png" alt="img">
                </div>
                <div class="content">
                  <h4>
                    <router-link to="/shop-grid">Sofa</router-link>
                  </h4>
                  <p>starting @ $48.00</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="shop-box-item">
                <div class="shop-image">
                  <img src="/assets/img/shop/04.png" alt="img">
                </div>
                <div class="content">
                  <h4>
                    <router-link to="/shop-grid">Table</router-link>
                  </h4>
                  <p>starting @ $48.00</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="shop-box-item">
                <div class="shop-image">
                  <img src="/assets/img/shop/05.png" alt="img">
                </div>
                <div class="content">
                  <h4>
                    <router-link to="/shop-grid">Side Drawer</router-link>
                  </h4>
                  <p>starting @ $48.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="shop-pagi-items">
          <div class="shop-dot"></div>
        </div>
      </div>
    </section>

    <!-- product-section Start -->
    <section class="product-section section-padding fix">
      <div class="container">
        <div class="section-title-area">
          <div class="section-title wow fadeInUp">
            <h6 class="sub-title">
              Product Collection
            </h6>
            <h2 class="wow fadeInUp" data-wow-delay=".3s">
              Featured Collections
            </h2>
          </div>
          <ul class="nav">
            <li class="nav-item wow fadeInUp" data-wow-delay=".3s">
              <a href="#Course" data-bs-toggle="tab" class="nav-link active">
                All Collection
              </a>
            </li>
            <li class="nav-item wow fadeInUp" data-wow-delay=".5s">
              <a href="#Curriculum" data-bs-toggle="tab" class="nav-link">
                Popular
              </a>
            </li>
            <li class="nav-item wow fadeInUp" data-wow-delay=".5s">
              <a href="#Instructors" data-bs-toggle="tab" class="nav-link">
                On sale
              </a>
            </li>
            <li class="nav-item wow fadeInUp" data-wow-delay=".5s">
              <a href="#Reviews" data-bs-toggle="tab" class="nav-link bb-none">
                Best Rated
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div id="Course" class="tab-pane fade show active">
            <div class="row">
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/01.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Marmont gold-tone ring</router-link>
                    </h4>
                    <p>Sterling silver erring</p>
                    <span>$76.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/02.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Pop gold baselight</router-link>
                    </h4>
                    <p>Gold vermeil, pearl</p>
                    <span>$19.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/03.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Diamond vintage ring</router-link>
                    </h4>
                    <p>14k yellow gold</p>
                    <span>$19.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/04.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Amber earrings close-up</router-link>
                    </h4>
                    <p>Gold vermeil, white topaz</p>
                    <span>$23.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/05.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Gold malachite earrings</router-link>
                    </h4>
                    <p>Sterling silver erring</p>
                    <ul class="doller">
                      <li>
                        $19.00 <del>$27.00</del>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/06.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Gold jewellery baselight</router-link>
                    </h4>
                    <p>14k yellow gold</p>
                    <span>$16.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/07.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Prong diamond ring</router-link>
                    </h4>
                    <p>Gold vermeil, pearl</p>
                    <span>$102.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/08.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Malachite earrings</router-link>
                    </h4>
                    <p>14k yellow gold</p>
                    <ul class="doller">
                      <li>
                        $123.00 <del>$126.00</del>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="Curriculum" class="tab-pane fade">
            <div class="row">
              <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/01.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Marmont gold-tone ring</router-link>
                    </h4>
                    <p>Sterling silver erring</p>
                    <span>$76.00</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/02.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Pop gold baselight</router-link>
                    </h4>
                    <p>Gold vermeil, pearl</p>
                    <span>$19.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="Instructors" class="tab-pane fade">
            <div class="row">
              <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/03.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Diamond vintage ring</router-link>
                    </h4>
                    <p>14k yellow gold</p>
                    <span>$19.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="Reviews" class="tab-pane fade">
            <div class="row">
              <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="product-card-item">
                  <div class="product-image">
                    <img src="/assets/img/product/04.jpg" alt="img">
                    <ul class="social-icon">
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-cart-shopping"></i>
                        </router-link>
                      </li>
                      <li>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </li>
                      <li>
                        <router-link to="/product-details"><i class="fa-regular fa-heart"></i></router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="product-content">
                    <h4>
                      <router-link to="/product-details">Amber earrings close-up</router-link>
                    </h4>
                    <p>Gold vermeil, white topaz</p>
                    <span>$23.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cta-Section Start -->
    <section class="cta-section fix">
      <div class="left-shape">
        <img src="/assets/img/cta/shape-1.png" alt="img">
      </div>
      <div class="right-shape">
        <img src="/assets/img/cta/shape-2.png" alt="img">
      </div>
      <div class="man-shape">
        <img src="/assets/img/cta/shape-3.png" alt="img">
      </div>
      <div class="container">
        <div class="cta-wrapper">
          <div class="cta-content">
            <h6 class="wow fadeInUp" data-wow-delay=".3s">Sale 20% off all store</h6>
            <h2 class="wow fadeInUp" data-wow-delay=".5s">Subscribe our Newsletter</h2>
          </div>
          <div class="search-widget wow fadeInUp" data-wow-delay=".3s">
            <input type="email" id="email" placeholder="Enter Your Email">
            <button type="submit" class="theme-btn">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'Home2',
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