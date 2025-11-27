<template>
  <AdminLayout>
    <div class="admin-reports">
      <h2 class="mb-4">Reports</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Sales Report</h5>
              <p class="card-text">View detailed sales analytics and trends.</p>
              <button class="btn btn-primary" @click="generateSalesReport">Generate Report</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">User Activity Report</h5>
              <p class="card-text">Analyze user engagement and behavior.</p>
              <button class="btn btn-primary" @click="generateUserReport">Generate Report</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Inventory Report</h5>
              <p class="card-text">Check stock levels and product performance.</p>
              <button class="btn btn-primary" @click="generateInventoryReport">Generate Report</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4" v-if="reportData">
        <h4>Report Results</h4>
        <pre>{{ JSON.stringify(reportData, null, 2) }}</pre>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminReports',
  components: {
    AdminLayout
  },
  setup() {
    const reportData = ref(null)
    const apiStore = useApiStore()

    const generateSalesReport = async () => {
      try {
        const data = await apiStore.get('/admin/reports/sales')
        reportData.value = data
      } catch (error) {
        console.error('Failed to generate sales report:', error)
      }
    }

    const generateUserReport = async () => {
      try {
        const data = await apiStore.get('/admin/reports/users')
        reportData.value = data
      } catch (error) {
        console.error('Failed to generate user report:', error)
      }
    }

    const generateInventoryReport = async () => {
      try {
        const data = await apiStore.get('/admin/reports/inventory')
        reportData.value = data
      } catch (error) {
        console.error('Failed to generate inventory report:', error)
      }
    }

    return {
      reportData,
      generateSalesReport,
      generateUserReport,
      generateInventoryReport
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
</style>