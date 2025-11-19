import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import ShopGrid from '../pages/ShopGrid.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import ShopCart from '../pages/ShopCart.vue'
import Checkout from '../pages/Checkout.vue'
import NotFound from '../pages/NotFound.vue'
import SignUp from '../pages/SignUp.vue'
import Login from '../pages/Login.vue'
import Home2 from '../pages/Home2.vue'
import Home4 from '../pages/Home5.vue'
import Order from '../pages/Order.vue'
import News from '../pages/News.vue'
import Categories from '../pages/Categories.vue'
import SubCategories from '../pages/Sub-categories.vue'
import Category from '../pages/Category.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopGrid
  },
  {
    path: '/product-details',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/shop-cart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home2',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/home4',
    name: 'Home4',
    component: Home4
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router