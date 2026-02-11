
<template>
  <div>
    <!-- Preloader Start -->
    <div id="preloader" class="preloader">
      <div class="animation-preloader">
        <div class="spinner"></div>
        <div class="txt-loading">
          <span data-text-preloader="K" class="letters-loading">K</span>
          <span data-text-preloader="A" class="letters-loading">A</span>
          <span data-text-preloader="R" class="letters-loading">R</span>
          <span data-text-preloader="T" class="letters-loading">T</span>
          <span data-text-preloader="O" class="letters-loading">O</span>
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

    <!-- Mouse Cursor Start -->
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>

    <!-- fix-area Start -->
    <div class="fix-area">
      <div class="offcanvas__info">
        <div class="offcanvas__wrapper">
          <div class="offcanvas__content">
            <div class="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div class="offcanvas__logo">
                <a href="/">
                  <img src="/assets/img/logo/red-logo.svg" alt="logo-img">
                </a>
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
          <a href="/login">Create an Account</a>
        </div>
      </div>
      <button id="closeButton" class="x-mark-icon"><i class="fas fa-times"></i></button>
    </div>

    <!-- Sidebar Area Here -->
    <div id="targetElement2" class="side_bar-2 slideInRight side_bar_hidden2">
      <div class="side_bar_overlay"></div>
      <div class="main-sideber">
        <div class="single-sidebar-widget-2">
          <div class="wid-title">
            <h5>price filter</h5>
          </div>
          <div class="range__barcustom">
            <div class="slider">
              <div class="progress" style="left: 25%; right: 25%;"></div>
            </div>
            <div class="range-input">
              <input type="range" class="range-min" min="0" max="10000" value="2500">
              <input type="range" class="range-max" min="100" max="10000" value="7500">
            </div>
            <div class="range-items">
              <div class="price-input d-flex">
                <div class="field style-2">
                  <span>$</span>
                  <input type="number" class="input-min" value="95">
                </div>
                <div class="separators">-</div>
                <div class="field">
                  <span>$</span>
                  <input type="number" class="input-max" value="2500">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single-sidebar-widget-2">
          <div class="wid-title">
            <h5>Product Status</h5>
          </div>
          <div class="product-list">
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark bg-2 d-center"></span>
                </span>
                <span class="text-color">
                  On sale
                </span>
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox" checked="checked">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  In stock
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="single-sidebar-widget-2">
          <div class="courses-list">
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  <span class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span>
                  <span class="ratting-text">(22)</span>
                </span>
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  <span class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star color-2"></i>
                  </span>
                  <span class="ratting-text">(15)</span>
                </span>
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  <span class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star color-2"></i>
                    <i class="fas fa-star color-2"></i>
                  </span>
                  <span class="ratting-text">(03)</span>
                </span>
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  <span class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star color-2"></i>
                    <i class="fas fa-star color-2"></i>
                    <i class="fas fa-star color-2"></i>
                  </span>
                  <span class="ratting-text">(00)</span>
                </span>
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  <span class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star color-2"></i>
                    <i class="fas fa-star color-2"></i>
                    <i class="fas fa-star color-2"></i>
                    <i class="fas fa-star color-2"></i>
                  </span>
                  <span class="ratting-text">(00)</span>
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="single-sidebar-widget-2">
          <div class="wid-title">
            <h5>Categories</h5>
          </div>
          <div class="widget-categories">
            <ul>
              <li><a href="/product-details/1">Leather</a><span>10</span></li>
              <li><a href="/product-details/1">Classic Watch</a><span>28</span></li>
              <li><a href="/product-details/1">Leather Man Wacth</a><span>12</span></li>
              <li><a href="/product-details/1">Trending Watch</a><span>17</span></li>
              <li><a href="/product-details/1">Google</a><span>22</span></li>
              <li><a href="/product-details/1">Woman Wacth</a><span>14</span></li>
              <li><a href="/product-details/1">Tables</a><span>19</span></li>
              <li><a href="/product-details/1">ShopEngine</a><span>29</span></li>
            </ul>
          </div>
        </div>
        <div class="single-sidebar-widget-2">
          <div class="wid-title">
            <h5>Filter by Color</h5>
          </div>
          <div class="list">
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox" checked="checked">
                  <span class="checkmark d-center"></span>
                </span>
                <span class="text-color">
                  Red
                </span>
              </span>
              <span class="text">
                8
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark bg-2 d-center"></span>
                </span>
                <span class="text-color">
                  Dark Blue
                </span>
              </span>
              <span class="text">
                14
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark bg-3 d-center"></span>
                </span>
                <span class="text-color">
                  Orange
                </span>
              </span>
              <span class="text">
                18
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark bg-4 d-center"></span>
                </span>
                <span class="text-color">
                  Purple
                </span>
              </span>
              <span class="text">
                23
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark bg-5 d-center"></span>
                </span>
                <span class="text-color">
                  Yellow
                </span>
              </span>
              <span class="text">
                17
              </span>
            </label>
            <label class="checkbox-single">
              <span class="d-flex gap-xl-3 gap-2 align-items-center">
                <span class="checkbox-area d-center">
                  <input type="checkbox">
                  <span class="checkmark bg-6 d-center"></span>
                </span>
                <span class="text-color">
                  Green
                </span>
              </span>
              <span class="text">
                15
              </span>
            </label>
          </div>
        </div>
        <div class="single-sidebar-widget-2">
          <div class="wid-title">
            <h5>Popular Brands</h5>
          </div>
          <div class="brand-post">
            <div class="brand-item">
              <div class="brand-image">
                <img src="/assets/img/brand/b1.png" alt="img">
              </div>
              <div class="brand-image">
                <img src="/assets/img/brand/b2.png" alt="img">
              </div>
            </div>
            <div class="brand-item">
              <div class="brand-image">
                <img src="/assets/img/brand/b3.png" alt="img">
              </div>
              <div class="brand-image">
                <img src="/assets/img/brand/b4.png" alt="img">
              </div>
            </div>
            <div class="brand-item">
              <div class="brand-image">
                <img src="/assets/img/brand/b5.png" alt="img">
              </div>
              <div class="brand-image">
                <img src="/assets/img/brand/b6.png" alt="img">
              </div>
            </div>
          </div>
        </div>
      </div>
      <button id="closeButton2" class="x-mark-icon"><i class="fas fa-times"></i></button>
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
                                  <router-link to="/" class="theme-btn">
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
                                  <router-link to="/" class="theme-btn">
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
                        <li><router-link to="/">Home 02</router-link></li>
                        <li><router-link to="/">Home 03</router-link></li>
                      </ul>
                    </li>
                    <li class="has-dropdown">
                      <a href="/news">
                        Pages
                        <i class="fa-solid fa-chevron-down"></i>
                      </a>
                      <ul class="submenu">
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/order">Track Your Order</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/sign-up">Sign-Up</a></li>
                        <li><a href="/shop">Categories</a></li>
                        <li><a href="javascript:void(0)">Coming Soon</a></li>
                        <li><a href="javascript:void(0)">Forget Password</a></li>
                        <li><a href="/login">My Account</a></li>
                        <li><a href="javascript:void(0)">Faq</a></li>
                        <li><a href="/404">404</a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="/product-details/1">
                        Shop
                        <i class="fa-solid fa-chevron-down"></i>
                      </a>
                      <ul class="submenu">
                        <li><a href="/shop">Shop Grid</a></li>
                        <li><a href="javascript:void(0)">Shop Left Sideber</a></li>
                        <li><a href="javascript:void(0)">Shop Right Sideber</a></li>
                        <li><a href="/shop-cart">Shop Cart</a></li>
                        <li><a href="/checkout">Cheekout</a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="/news">
                        Blog
                        <i class="fa-solid fa-chevron-down"></i>
                      </a>
                      <ul class="submenu">
                        <li><a href="javascript:void(0)">Blog Grid</a></li>
                        <li><a href="javascript:void(0)">Blog List</a></li>
                        <li><a href="/news">Blog Details</a></li>
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
                    <a href="/shop-cart" class="theme-btn">
                      View Cart
                    </a>
                  </div>
                </div>
                <a href="/shop-cart" class="cart-icon">
                  <i class="fa-sharp fa-regular fa-bag-shopping"></i>
                </a>
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

    <!-- product-details-Section Start -->
    <section class="product-details-section section-padding fix">
      <div class="container">
        <div class="product-details-wrapper">
          <div class="top-content">
            <h2>Only Categories</h2>
            <ul class="list">
              <li>Home</li>
              <li>
                Only Categories
              </li>
            </ul>
          </div>
          <div class="product-details-sideber">
            <div class="product-details-wrap">
              <ul class="nav">
                <li class="nav-item">
                  <a href="#Course" data-bs-toggle="tab" class="nav-link active">
                    <i class="fa-regular fa-grid-2"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#Curriculum" data-bs-toggle="tab" class="nav-link">
                    <i class="fas fa-bars"></i>
                  </a>
                </li>
              </ul>
              <p>Showing 1–14 of 26 results</p>
            </div>
            <div class="shop-right">
              <div class="form-clt">
                <div class="nice-select" tabindex="0">
                  <span class="current">
                    Default sorting
                  </span>
                  <ul class="list">
                    <li data-value="1" class="option selected focus">
                      Default sorting
                    </li>
                    <li data-value="1" class="option">
                      Sort by popularity
                    </li>
                    <li data-value="1" class="option">
                      Sort by average rating
                    </li>
                    <li data-value="1" class="option">
                      Sort by latest
                    </li>
                  </ul>
                </div>
              </div>
              <div id="openButton2">
                <div class="filter-button">
                  <h6><a href="#"><span><img src="/assets/img/filter.png" alt="img"></span>Filter</a></h6>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div id="Course" class="tab-pane fade show active">
              <div class="row">
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-1.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Whitetails Store</p>
                      <h4>
                        <a href="/product-details/1">Whitetails Women's Open Sky</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$76.00 <del>$76.00</del></h6>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-2.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Backpack, Wonder</p>
                      <h4>
                        <a href="/product-details/1">Simple Modern School Boys</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$102.00 <del>$226.00</del></h6>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-3.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Shoe, Men's</p>
                      <h4>
                        <a href="/product-details/1">Women's Essentials Convertible</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$126.00 <del>$216.00</del></h6>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-4.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Bag, Wonder</p>
                      <h4>
                        <a href="/product-details/1">Calvin Klein Gabrianna Novelty</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$93.00 <del>$76.00</del></h6>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-5.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Shoes, Work Dress</p>
                      <h4>
                        <a href="/product-details/1">Govicta Men's Shoes Leather</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$120.00 <del>$76.00</del></h6>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-6.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Bag, Wonder</p>
                      <h4>
                        <a href="/product-details/1">Tommy Hilfiger Women’s Jaden</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$44.00 <del>$66.00</del></h6>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6">
                  <div class="product-details-item">
                    <div class="shop-image">
                      <img src="/assets/img/shop/shop-7.jpg" alt="img">
                      <ul class="shop-icon d-grid justify-content-center align-items-center">
                        <li>
                          <a href="/product-details/1"><i class="fa-regular fa-cart-shopping"></i></a>
                        </li>
                        <li>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i class="fa-regular fa-eye"></i>
                          </button>
                        </li>
                        <li>
                          <a href="/shop-cart"><i class="far fa-heart"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p>Bag, Wonder</p>
                      <h4>
                        <a href="/product-details/1">Tommy Hilfiger Women’s Jaden</a>
                      </h4>
                      <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <h6>$44.00 <del>$66.00</del></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
 name: 'ShopGrid',
 data() {
   return {
     products: [
       {
         id: 1,
         image: '/assets/img/shop/shop-1.jpg',
         store: 'Whitetails Store',
         name: 'Whitetails Women\'s Open Sky',
         rating: 4,
         price: 76.00,
         originalPrice: 76.00
       },
       {
         id: 2,
         image: '/assets/img/shop/shop-2.jpg',
         store: 'Backpack, Wonder',
         name: 'Simple Modern School Boys',
         rating: 4,
         price: 102.00,
         originalPrice: 226.00
       },
       {
         id: 3,
         image: '/assets/img/shop/shop-3.jpg',
         store: 'Shoe, Men\'s',
         name: 'Women\'s Essentials Convertible',
         rating: 4,
         price: 126.00,
         originalPrice: 216.00
       },
       {
         id: 4,
         image: '/assets/img/shop/shop-4.jpg',
         store: 'Bag, Wonder',
         name: 'Calvin Klein Gabrianna Novelty',
         rating: 4,
         price: 93.00,
         originalPrice: 76.00
       },
       {
         id: 5,
         image: '/assets/img/shop/shop-5.jpg',
         store: 'Shoes, Work Dress',
         name: 'Govicta Men\'s Shoes Leather',
         rating: 4,
         price: 120.00,
         originalPrice: 76.00
       },
       {
         id: 6,
         image: '/assets/img/shop/shop-6.jpg',
         store: 'Bag, Wonder',
         name: 'Tommy Hilfiger Women\'s Jaden',
         rating: 4,
         price: 44.00,
         originalPrice: 66.00
       },
       {
         id: 7,
         image: '/assets/img/shop/shop-7.jpg',
         store: 'Bag, Wonder',
         name: 'Tommy Hilfiger Women\'s Jaden',
         rating: 4,
         price: 44.00,
         originalPrice: 66.00
       }
     ],
     filteredProducts: [],
     searchQuery: '',
     sortBy: 'default',
     showLoginSidebar: false,
     showFilterSidebar: false,
     showModal: false,
     selectedProduct: null,
     cart: [],
     filters: {
       priceRange: { min: 0, max: 10000 },
       inStock: true,
       onSale: false,
       rating: null,
       categories: [],
       colors: []
     }
   }
 },
 mounted() {
   this.filteredProducts = [...this.products]
   this.initializeEventListeners()
 },
 methods: {
   initializeEventListeners() {
     // Login sidebar toggle
     const loginButton = document.getElementById('openButton')
     if (loginButton) {
       loginButton.addEventListener('click', () => {
         this.showLoginSidebar = !this.showLoginSidebar
         document.getElementById('targetElement').classList.toggle('side_bar_hidden', !this.showLoginSidebar)
       })
     }

     // Filter sidebar toggle
     const filterButton = document.getElementById('openButton2')
     if (filterButton) {
       filterButton.addEventListener('click', () => {
         this.showFilterSidebar = !this.showFilterSidebar
         document.getElementById('targetElement2').classList.toggle('side_bar_hidden2', !this.showFilterSidebar)
       })
     }

     // Close buttons
     const closeLogin = document.getElementById('closeButton')
     if (closeLogin) {
       closeLogin.addEventListener('click', () => {
         this.showLoginSidebar = false
         document.getElementById('targetElement').classList.add('side_bar_hidden')
       })
     }

     const closeFilter = document.getElementById('closeButton2')
     if (closeFilter) {
       closeFilter.addEventListener('click', () => {
         this.showFilterSidebar = false
         document.getElementById('targetElement2').classList.add('side_bar_hidden2')
       })
     }
   },
   searchProducts() {
     this.applyFilters()
   },
   sortProducts() {
     let sorted = [...this.filteredProducts]
     switch (this.sortBy) {
       case 'popularity':
         // Sort by rating (assuming higher rating = more popular)
         sorted.sort((a, b) => b.rating - a.rating)
         break
       case 'rating':
         sorted.sort((a, b) => b.rating - a.rating)
         break
       case 'latest':
         // For demo, sort by id (assuming higher id = newer)
         sorted.sort((a, b) => b.id - a.id)
         break
       default:
         sorted = [...this.products]
     }
     this.filteredProducts = sorted
   },
   applyFilters() {
     let filtered = [...this.products]

     // Search filter
     if (this.searchQuery) {
       filtered = filtered.filter(product =>
         product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
         product.store.toLowerCase().includes(this.searchQuery.toLowerCase())
       )
     }

     // Price filter
     filtered = filtered.filter(product =>
       product.price >= this.filters.priceRange.min &&
       product.price <= this.filters.priceRange.max
     )

     // Stock filter
     if (this.filters.inStock) {
       filtered = filtered.filter(product => product.price > 0) // Assuming all products are in stock
     }

     // Rating filter
     if (this.filters.rating) {
       filtered = filtered.filter(product => product.rating >= this.filters.rating)
     }

     this.filteredProducts = filtered
     this.sortProducts()
   },
   openModal(product) {
     this.selectedProduct = product
     this.showModal = true
   },
   closeModal() {
     this.showModal = false
     this.selectedProduct = null
   },
   addToCart(product) {
     const existingItem = this.cart.find(item => item.id === product.id)
     if (existingItem) {
       existingItem.quantity += 1
     } else {
       this.cart.push({ ...product, quantity: 1 })
     }
     // Update cart count in header
     this.updateCartCount()
   },
   updateCartCount() {
     const cartCountElement = document.querySelector('.cart-icon .number')
     if (cartCountElement) {
       cartCountElement.textContent = this.cart.reduce((total, item) => total + item.quantity, 0)
     }
   },
   renderStars(rating) {
     const fullStars = Math.floor(rating)
     const hasHalfStar = rating % 1 !== 0
     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

     let stars = ''
     for (let i = 0; i < fullStars; i++) {
       stars += '<i class="fa-solid fa-star"></i>'
     }
     if (hasHalfStar) {
       stars += '<i class="fa-solid fa-star-half-alt"></i>'
     }
     for (let i = 0; i < emptyStars; i++) {
       stars += '<i class="fa-regular fa-star"></i>'
     }
     return stars
   }
 },
 watch: {
   searchQuery() {
     this.applyFilters()
   },
   sortBy() {
     this.sortProducts()
   }
 }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>