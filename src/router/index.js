import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import ShopGrid from '../pages/ShopGrid.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import ShopCart from '../pages/ShopCart.vue'
import Checkout from '../pages/Checkout.vue'
import CheckoutSuccess from '../pages/CheckoutSuccess.vue'
import CheckoutCancel from '../pages/CheckoutCancel.vue'
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
import AdminProductView from '../pages/AdminProductView.vue'
import AdminOrders from '../pages/AdminOrders.vue'
import AdminAddProduct from '../pages/AdminAddProduct.vue'
import AdminUsers from '../pages/AdminUsers.vue'
import AdminReports from '../pages/AdminReports.vue'
import AdminCategories from '../pages/AdminCategories.vue'
import AdminSubCategories from '../pages/AdminSubCategories.vue'
import AdminDisputes from '../pages/AdminDisputes.vue'
import AdminOrderDetails from '../pages/AdminOrderDetails.vue'
import MyOrders from '../pages/MyOrders.vue'
import OrderDetails from '../pages/OrderDetails.vue'
import LeaveReview from '../pages/LeaveReview.vue'
import CreateDispute from '../pages/CreateDispute.vue'
import { useAdminAuthStore } from '../stores/adminAuth'
import { useAuthStore } from '../stores/auth'

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
    path: '/product-details/:id',
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
    component: Checkout,
    meta: { requiresUserAuth: true }
  },
  {
    path: '/checkout/success',
    name: 'CheckoutSuccess',
    component: CheckoutSuccess
  },
  {
    path: '/checkout/cancel',
    name: 'CheckoutCancel',
    component: CheckoutCancel
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
    path: '/shop',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/category/:id',
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
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/products/view/:id',
    name: 'AdminProductView',
    component: AdminProductView,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/orders/:id',
    name: 'AdminOrderDetails',
    component: AdminOrderDetails,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/products/add/:id?',
    name: 'AdminAddProduct',
    component: AdminAddProduct,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/categories/:id/subcategories',
    name: 'AdminSubCategories',
    component: AdminSubCategories,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: AdminReports,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/disputes',
    name: 'AdminDisputes',
    component: AdminDisputes,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: MyOrders,
    meta: { requiresUserAuth: true }
  },
  {
    path: '/order-details/:id',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: { requiresUserAuth: true }
  },
  {
    path: '/leave-review/:productId',
    name: 'LeaveReview',
    component: LeaveReview,
    meta: { requiresUserAuth: true }
  },
  {
    path: '/create-dispute/:orderId?',
    name: 'CreateDispute',
    component: CreateDispute,
    meta: { requiresUserAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const adminAuthStore = useAdminAuthStore()
  const authStore = useAuthStore()

  // Separate admin and user auth checks
  const requiresAdminAuth = to.meta.requiresAdminAuth === true
  const requiresUserAuth = to.meta.requiresUserAuth === true

  console.log('[Router] Navigation to:', to.path)
  console.log('[Router] requiresAdminAuth:', requiresAdminAuth, 'adminToken:', !!adminAuthStore.token)
  console.log('[Router] requiresUserAuth:', requiresUserAuth, 'userToken:', !!authStore.token)

  // Handle admin routes
  if (requiresAdminAuth) {
    if (!adminAuthStore.token) {
      console.log('[Router] Redirecting to admin login - no admin token')
      return next('/admin/login')
    }
    console.log('[Router] Admin authenticated, allowing navigation')
    return next()
  }

  // Handle user routes
  if (requiresUserAuth) {
    if (!authStore.token) {
      console.log('[Router] Redirecting to user login - no user token')
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }
    console.log('[Router] User authenticated, allowing navigation')
    return next()
  }

  // Public routes - no authentication required
  console.log('[Router] Public route, allowing navigation')
  next()
})

export default router