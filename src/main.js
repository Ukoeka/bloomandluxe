import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAdminAuthStore } from './stores/adminAuth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Check admin authentication on app start
const adminAuthStore = useAdminAuthStore()
adminAuthStore.checkAuth()

app.mount('#app')
