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
import AdminLogin from '../pages/AdminLogin.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AdminProducts from '../pages/AdminProducts.vue'
import AdminOrders from '../pages/AdminOrders.vue'
import AdminAddProduct from '../pages/AdminAddProduct.vue'
import AdminUsers from '../pages/AdminUsers.vue'
import AdminReports from '../pages/AdminReports.vue'
import AdminCategories from '../pages/AdminCategories.vue'
import AdminSubCategories from '../pages/AdminSubCategories.vue'
import AdminDisputes from '../pages/AdminDisputes.vue'
import { useAdminAuthStore } from '../stores/adminAuth'

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
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/products/add/:id?',
    name: 'AdminAddProduct',
    component: AdminAddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/categories/:id/subcategories',
    name: 'AdminSubCategories',
    component: AdminSubCategories,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: AdminReports,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/disputes',
    name: 'AdminDisputes',
    component: AdminDisputes,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Route guard for admin authentication
router.beforeEach((to, from, next) => {
  const adminAuthStore = useAdminAuthStore()

  if (to.meta.requiresAuth && !adminAuthStore.isAuthenticated) {
    // Redirect to admin login if not authenticated
    next('/admin/login')
  } else {
    next()
  }
})

export default router