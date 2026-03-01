<template>
  <AdminLayout>
    <AdminPreloader :loading="loading" message="Loading reports..." />
    <div class="admin-reports">
      <h2 class="mb-4">Reports</h2>

      <!-- Report Type Tabs -->
      <ul class="nav nav-tabs mb-4">
        <li class="nav-item" v-for="tab in tabs" :key="tab.key">
          <a
            class="nav-link"
            :class="{ active: activeReport === tab.key }"
            @click.prevent="switchTab(tab.key)"
            href="#"
          >
            {{ tab.label }}
          </a>
        </li>
      </ul>

      <!-- Report Generation Cards -->
      <div class="row mb-4">
        <div class="col-md-4" v-for="tab in tabs" :key="tab.key">
          <div class="card report-card" :class="{ 'border-primary': activeReport === tab.key }">
            <div class="card-body">
              <h5 class="card-title">{{ tab.label }}</h5>
              <p class="card-text">{{ tab.description }}</p>
              <button class="btn btn-primary" @click="generateReport(tab.key)">Generate Report</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>

      <!-- Report Results -->
      <div class="mt-4" v-if="reportData">
        <!-- Report Header -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>{{ currentTab?.label }}</h4>
          <button class="btn btn-sm btn-outline-secondary" @click="exportReport">Export CSV</button>
        </div>

        <!-- Summary Cards -->
        <div class="summary-cards mb-4">
          <div class="summary-card" v-for="stat in summaryStats" :key="stat.label">
            <div class="summary-value">{{ stat.value }}</div>
            <div class="summary-label">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Sales Report Table -->
        <div v-if="activeReport === 'sales'" class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedData.length === 0">
                <td colspan="8" class="text-center">No sales data available</td>
              </tr>
              <tr v-for="sale in paginatedData" :key="sale.id || sale.order_id" class="order-row">
                
                <td>{{ sale.year }}</td>
                <td>{{ sale.month }}</td>
                <td>{{ formatCurrency(sale.total || 0) }}</td>
                
              </tr>
            </tbody>
          </table>
        </div>

        <!-- User Activity Report Table -->
        <div v-if="activeReport === 'users'" class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Active Users</th>
                <th>Active Users Last 30days</th>
                <th>Admin Users</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedData.length === 0">
                <td colspan="8" class="text-center">No user data available</td>
              </tr>
              <tr v-for="user in paginatedData" :key="user.id || user.user_id">
                <td>{{ user.total_users }}</td>
                <td>{{ user.active_users_last_30_days }}</td>
                <td>{{ user.admin_users}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Inventory Report Table -->
        <div v-if="activeReport === 'inventory'" class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedData.length === 0">
                <td colspan="7" class="text-center">No inventory data available</td>
              </tr>
              <tr v-for="item in paginatedData" :key="item.id || item.product_id">
                <td>{{ item.id || item.product_id }}</td>
                <td>{{ item.name || item.product_name || item.title }}</td>
                <td>{{ item.category_name || item.category || 'Uncategorized' }}</td>
                <td>
                  <span :class="{ 'text-danger fw-bold': isLowStock(item.stock) }">
                    {{ item.stock || item.quantity || item.stock_quantity || 0 }}
                  </span>
                </td>
                <td>{{ formatCurrency(item.price || item.product_price) }}</td>
                <td>{{ formatCurrency(getItemTotalValue(item)) }}</td>
                <td>
                  <span :class="['badge', getInventoryStatusClass(item.stock)]">
                    {{ getInventoryStatus(item.stock) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container" v-if="totalPages > 1">
          <div class="pagination-info">
            Showing {{ paginationInfo.start }} to {{ paginationInfo.end }} of {{ totalItems }} entries
          </div>
          <div class="pagination-controls">
            <button
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="currentPage = currentPage - 1"
            >
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              class="pagination-btn"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="currentPage = currentPage + 1"
            >
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, computed } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AdminPreloader from '../components/AdminPreloader.vue'
import { useApiStore } from '../stores/api'

const TABS = [
  { key: 'sales', label: 'Sales Report', description: 'View detailed sales analytics and trends.', endpoint: '/admin/reports/sales' },
  { key: 'users', label: 'User Activity Report', description: 'Analyze user engagement and behavior.', endpoint: '/admin/reports/users' },
  { key: 'inventory', label: 'Inventory Report', description: 'Check stock levels and product performance.', endpoint: '/admin/reports/inventory' },
]

export default {
  name: 'AdminReports',
  components: { AdminLayout, AdminPreloader },
  setup() {
    const apiStore = useApiStore()
    const reportData = ref(null)
    const loading = ref(false)
    const errorMessage = ref('')
    const activeReport = ref('sales')
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    const tabs = TABS
    const currentTab = computed(() => TABS.find(t => t.key === activeReport.value))

    // ── Normalize API response into a flat array ──────────────────────────────
    const normalizeData = (data, keys = []) => {
      if (!data) return []
      if (Array.isArray(data)) return data
      for (const key of ['data', ...keys]) {
        if (Array.isArray(data[key])) return data[key]
      }
      return []
    }

    const activeData = computed(() => {
      switch (activeReport.value) {
        case 'sales':      return normalizeData(reportData.value, ['sales', 'orders'])
        case 'users':      return normalizeData(reportData.value, ['users'])
        case 'inventory':  return normalizeData(reportData.value, ['products', 'inventory'])
        default:           return []
      }
    })

    // ── Pagination ────────────────────────────────────────────────────────────
    const totalItems = computed(() => activeData.value.length)
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      return activeData.value.slice(start, start + itemsPerPage.value)
    })

    const paginationInfo = computed(() => ({
      start: Math.min((currentPage.value - 1) * itemsPerPage.value + 1, totalItems.value),
      end:   Math.min(currentPage.value * itemsPerPage.value, totalItems.value),
    }))

    const visiblePages = computed(() => {
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end   = Math.min(totalPages.value, start + maxVisible - 1)
      if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    })

    // ── Summary stats (dynamic per report type) ───────────────────────────────
    const summaryStats = computed(() => {
      const data = activeData.value
      if (activeReport.value === 'sales') {
        const total = data.reduce((s, x) => s + (parseFloat(x.total || x.amount || x.total_amount) || 0), 0)
        return [
          { label: 'Total Sales',      value: formatCurrency(total) },
          { label: 'Total Orders',     value: data.length },
          { label: 'Avg. Order Value', value: data.length ? formatCurrency(total / data.length) : '$0.00' },
        ]
      }
      if (activeReport.value === 'users') {
        const spent = data.reduce((s, u) => s + (parseFloat(u.total_spent || u.total_spend) || 0), 0)
        const active = data.filter(u => u.status === 'active').length || data.length
        return [
          { label: 'Total Users',  value: data.length },
          { label: 'Active Users', value: active },
          { label: 'Total Spent',  value: formatCurrency(spent) },
        ]
      }
      if (activeReport.value === 'inventory') {
        const stock = data.reduce((s, i) => s + (parseInt(i.stock || i.quantity || i.stock_quantity) || 0), 0)
        const value = data.reduce((s, i) => s + getItemTotalValue(i), 0)
        const low   = data.filter(i => isLowStock(i.stock)).length
        return [
          { label: 'Total Products',   value: data.length },
          { label: 'Total Stock',      value: stock },
          { label: 'Inventory Value',  value: formatCurrency(value) },
          { label: 'Low Stock Items',  value: low },
        ]
      }
      return []
    })

    // ── Actions ───────────────────────────────────────────────────────────────
    const switchTab = (key) => {
      activeReport.value = key
      reportData.value   = null
      currentPage.value  = 1
      errorMessage.value = ''
    }

    const generateReport = async (key) => {
      const tab = TABS.find(t => t.key === key)
      if (!tab) return
      loading.value      = true
      activeReport.value = key
      currentPage.value  = 1
      errorMessage.value = ''
      try {
        reportData.value = await apiStore.get(tab.endpoint)
      } catch (error) {
        console.error(`Failed to generate ${key} report:`, error)
        reportData.value   = []
        errorMessage.value = error.message || `Failed to load ${tab.label}`
      } finally {
        loading.value = false
      }
    }

    // ── Export ────────────────────────────────────────────────────────────────
    const exportReport = () => {
      const escapeCSV = (field) => {
        const str = String(field ?? '')
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? `"${str.replace(/"/g, '""')}"`
          : str
      }

      const configs = {
        sales: {
          headers: ['Order ID', 'Order Number', 'Customer', 'Date', 'Total', 'Payment Status', 'Order Status'],
          row: (s) => [
            s.id || s.order_id,
            s.order_number || `#${s.id}`,
            s.customer_name || s.customer || 'N/A',
            formatDate(s.created_at || s.date),
            s.total || s.amount || 0,
            s.payment_status || 'pending',
            s.status || s.order_status || 'pending',
          ],
        },
        users: {
          headers: ['User ID', 'Name', 'Email', 'Total Orders', 'Total Spent', 'Last Activity', 'Status'],
          row: (u) => [
            u.id,
            u.name || u.full_name || 'N/A',
            u.email || 'N/A',
            u.total_orders || 0,
            u.total_spent || 0,
            formatDate(u.last_activity || u.last_login),
            u.status || 'active',
          ],
        },
        inventory: {
          headers: ['Product ID', 'Product Name', 'Category', 'Stock', 'Price', 'Status'],
          row: (i) => [
            i.id,
            i.name || i.product_name || 'N/A',
            i.category_name || i.category || 'Uncategorized',
            i.stock || i.quantity || 0,
            i.price || 0,
            getInventoryStatus(i.stock),
          ],
        },
      }

      const config = configs[activeReport.value]
      if (!config) return

      const rows = activeData.value.map(config.row)
      const csv  = [config.headers, ...rows].map(r => r.map(escapeCSV).join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url  = URL.createObjectURL(blob)
      const a    = Object.assign(document.createElement('a'), { href: url, download: `${activeReport.value}_report.csv` })
      a.click()
      URL.revokeObjectURL(url)
    }

    // ── Helpers ───────────────────────────────────────────────────────────────
    const formatCurrency = (value) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(value) || 0)

    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A'
      const d = new Date(dateStr)
      return isNaN(d) ? 'N/A' : d.toLocaleDateString()
    }

    const getItemTotalValue = (item) => {
      const qty   = parseInt(item.stock || item.quantity || item.stock_quantity) || 0
      const price = parseFloat(item.price || item.product_price) || 0
      return qty * price
    }

    const isLowStock = (stock) => (parseInt(stock) || 0) < 10

    const getInventoryStatus = (stock) => {
      const qty = parseInt(stock) || 0
      if (qty === 0) return 'Out of Stock'
      if (qty < 10)  return 'Low Stock'
      return 'In Stock'
    }

    const getInventoryStatusClass = (stock) => {
      const qty = parseInt(stock) || 0
      if (qty === 0) return 'bg-danger'
      if (qty < 10)  return 'bg-warning text-dark'
      return 'bg-success'
    }

    const getPaymentStatusClass = (status) => ({
      succeeded: 'bg-success', completed: 'bg-success', paid: 'bg-success',
      pending: 'bg-warning text-dark', processing: 'bg-warning text-dark',
      failed: 'bg-danger', canceled: 'bg-danger', cancelled: 'bg-danger',
      refunded: 'bg-info text-dark',
    }[status] ?? 'bg-secondary')

    const getOrderStatusClass = (status) => ({
      delivered: 'bg-success', completed: 'bg-success',
      pending: 'bg-warning text-dark', processing: 'bg-warning text-dark', shipped: 'bg-warning text-dark',
      cancelled: 'bg-danger', canceled: 'bg-danger', refunded: 'bg-danger',
    }[status] ?? 'bg-secondary')

    const getUserStatusClass = (status) => ({
      active: 'bg-success',
      inactive: 'bg-warning text-dark',
      banned: 'bg-danger', suspended: 'bg-danger',
    }[status] ?? 'bg-secondary')

    return {
      tabs, currentTab, loading, reportData, activeReport,
      currentPage, errorMessage, itemsPerPage,
      totalItems, totalPages, paginatedData, paginationInfo, visiblePages,
      summaryStats, switchTab, generateReport, exportReport,
      formatCurrency, formatDate, getItemTotalValue,
      isLowStock, getInventoryStatus, getInventoryStatusClass,
      getPaymentStatusClass, getOrderStatusClass, getUserStatusClass,
    }
  }
}
</script>

<style scoped>
.admin-reports {
  padding: 20px 0;
}

.admin-reports .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-reports .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

/* Nav Tabs */
.nav-tabs .nav-link {
  cursor: pointer;
  color: #495057;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
  color: var(--theme, #6B8F71);
}

.nav-tabs .nav-link.active {
  color: var(--theme, #6B8F71);
  background: transparent;
  border-bottom-color: var(--theme, #6B8F71);
}

/* Report Cards */
.report-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.report-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.report-card.border-primary {
  border-color: var(--theme, #6B8F71) !important;
}

/* Summary Cards */
.summary-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.summary-card {
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d60);
  color: white;
  padding: 20px 30px;
  border-radius: 10px;
  min-width: 180px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
}

.summary-label {
  font-size: 14px;
  opacity: 0.9;
}

/* Table Styles */
.table-responsive {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.table thead {
  background-color: var(--header, #010F1C);
  color: white;
}

.table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
  padding: 14px 12px;
}

.table td {
  padding: 12px;
  vertical-align: middle;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

/* Badge Styles */
.badge {
  padding: 6px 12px;
  font-weight: 500;
  font-size: 12px;
}

/* Pagination Styles */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-top: 20px;
  border-top: 1px solid #dee2e6;
}

.pagination-info {
  color: #6c757d;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--theme, #6B8F71);
  color: white;
  border-color: var(--theme, #6B8F71);
}

.pagination-btn.active {
  background: var(--theme, #6B8F71);
  color: white;
  border-color: var(--theme, #6B8F71);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .summary-cards {
    flex-direction: column;
  }

  .summary-card {
    width: 100%;
  }

  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
}
</style>