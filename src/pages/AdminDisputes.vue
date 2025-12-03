<template>
  <AdminLayout>
    <div class="admin-disputes">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <i class="fas fa-exclamation-triangle"></i>
            Manage Disputes
          </h1>
          <p class="page-subtitle">Handle customer disputes and complaints</p>
        </div>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ disputes.length }}</div>
              <div class="stat-label">Total Disputes</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Filter -->
      <div class="filter-section">
        <div class="filter-card">
          <div class="filter-icon">
            <i class="fas fa-filter"></i>
          </div>
          <div class="filter-content">
            <label for="statusFilter" class="filter-label">Filter by Status</label>
            <select
              id="statusFilter"
              v-model="statusFilter"
              @change="fetchDisputes"
              class="filter-select"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_review">In Review</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div class="content-card">
        <div class="card-header">
          <h5 class="card-title">Disputes List</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Order ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dispute in disputes" :key="dispute.id" class="table-row">
                  <td class="dispute-id">#{{ dispute.id }}</td>
                  <td>
                    <div class="user-info">
                      <div class="user-avatar">
                        {{ dispute.user?.name?.charAt(0)?.toUpperCase() || 'N' }}
                      </div>
                      <div class="user-details">
                        <div class="user-name">{{ dispute.user?.name || 'N/A' }}</div>
                        <div class="user-email">{{ dispute.user?.email || '' }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span v-if="dispute.order" class="order-link">#{{ dispute.order.id }}</span>
                    <span v-else class="no-order">N/A</span>
                  </td>
                  <td class="dispute-subject">{{ dispute.subject }}</td>
                  <td>
                    <select
                      :value="dispute.status"
                      @change="updateStatus(dispute.id, $event.target.value)"
                      class="status-select"
                      :class="dispute.status.toLowerCase()"
                    >
                      <option value="open">Open</option>
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>{{ new Date(dispute.created_at).toLocaleDateString() }}</td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="viewDisputeDetails(dispute)">
                      <i class="fas fa-eye"></i>
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Dispute Details Modal -->
      <div v-if="selectedDispute" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Dispute Details - #{{ selectedDispute.id }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Customer Information</h6>
                  <p><strong>Name:</strong> {{ selectedDispute.user?.name || 'N/A' }}</p>
                  <p><strong>Email:</strong> {{ selectedDispute.user?.email || 'N/A' }}</p>
                </div>
                <div class="col-md-6">
                  <h6>Dispute Information</h6>
                  <p><strong>Order ID:</strong> {{ selectedDispute.order?.id || 'N/A' }}</p>
                  <p><strong>Subject:</strong> {{ selectedDispute.subject || 'N/A' }}</p>
                  <p><strong>Status:</strong> {{ selectedDispute.status || 'N/A' }}</p>
                  <p><strong>Date:</strong> {{ selectedDispute.created_at ? new Date(selectedDispute.created_at).toLocaleString() : 'N/A' }}</p>
                </div>
              </div>

              <div class="mt-3">
                <h6>Description</h6>
                <p>{{ selectedDispute.description }}</p>
              </div>

              <div v-if="selectedDispute.attachments && selectedDispute.attachments.length > 0" class="mt-3">
                <h6>Attachments</h6>
                <div class="row">
                  <div v-for="(attachment, index) in selectedDispute.attachments" :key="index" class="col-md-3 mb-2">
                    <img :src="`/storage/${attachment}`" alt="Attachment" class="img-fluid" style="max-height: 100px; cursor: pointer;" @click="openImage(attachment)" @error="$event.target.style.display='none'">
                  </div>
                </div>
              </div>

              <div v-if="selectedDispute.admin_response" class="mt-3">
                <h6>Admin Response</h6>
                <div class="alert alert-info">
                  {{ selectedDispute.admin_response }}
                </div>
              </div>

              <div class="mt-3">
                <h6>Respond to Dispute</h6>
                <form @submit.prevent="submitResponse">
                  <div class="mb-3">
                    <label for="adminResponse" class="form-label">Response</label>
                    <textarea v-model="adminResponse" class="form-control" id="adminResponse" rows="4" required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="responseStatus" class="form-label">Update Status</label>
                    <select v-model="responseStatus" class="form-select" id="responseStatus">
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary" :disabled="submitting">
                    {{ submitting ? 'Submitting...' : 'Submit Response' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Modal -->
      <div v-if="selectedImage" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.8);" @click="closeImageModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-transparent border-0">
            <div class="modal-body text-center">
              <img :src="`/storage/${selectedImage}`" alt="Attachment" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminDisputes',
  components: {
    AdminLayout
  },
  setup() {
    const disputes = ref([])
    const selectedDispute = ref(null)
    const selectedImage = ref(null)
    const statusFilter = ref('')
    const adminResponse = ref('')
    const responseStatus = ref('in_review')
    const submitting = ref(false)
    const apiStore = useApiStore()

    const fetchDisputes = async () => {
      try {
        const params = statusFilter.value ? { status: statusFilter.value } : {}
        const response = await apiStore.get('/admin/disputes', { params })
        disputes.value = response.data || []
      } catch (error) {
        console.error('Failed to fetch disputes:', error)
      }
    }

    const updateStatus = async (disputeId, status) => {
      try {
        await apiStore.put(`/admin/disputes/${disputeId}`, { status })
        await fetchDisputes()
      } catch (error) {
        console.error('Failed to update dispute status:', error)
      }
    }

    const viewDisputeDetails = async (dispute) => {
      try {
        const response = await apiStore.get(`/admin/disputes/${dispute.id}`)
        selectedDispute.value = response.data
        adminResponse.value = selectedDispute.value.admin_response || ''
        responseStatus.value = selectedDispute.value.status
      } catch (error) {
        console.error('Failed to fetch dispute details:', error)
      }
    }

    const submitResponse = async () => {
      submitting.value = true
      try {
        await apiStore.put(`/admin/disputes/${selectedDispute.value.id}`, {
          status: responseStatus.value,
          admin_response: adminResponse.value
        })
        await fetchDisputes()
        closeModal()
      } catch (error) {
        console.error('Failed to submit response:', error)
      } finally {
        submitting.value = false
      }
    }

    const closeModal = () => {
      selectedDispute.value = null
      adminResponse.value = ''
      responseStatus.value = 'in_review'
    }

    const openImage = (image) => {
      selectedImage.value = image
    }

    const closeImageModal = () => {
      selectedImage.value = null
    }

    onMounted(() => {
      fetchDisputes()
    })

    return {
      disputes,
      selectedDispute,
      selectedImage,
      statusFilter,
      adminResponse,
      responseStatus,
      submitting,
      fetchDisputes,
      updateStatus,
      viewDisputeDetails,
      submitResponse,
      closeModal,
      openImage,
      closeImageModal
    }
  }
}
</script>

<style scoped>
.admin-disputes {
  padding: 20px 0;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.header-content .page-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-content .page-title i {
  color: #e74c3c;
  font-size: 24px;
}

.page-subtitle {
  color: #6c757d;
  font-size: 16px;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  min-width: 140px;
}

.stat-icon {
  font-size: 24px;
  opacity: 0.9;
}

.stat-info .stat-number {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2px;
}

.stat-info .stat-label {
  font-size: 12px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Filter Section */
.filter-section {
  margin-bottom: 30px;
}

.filter-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 400px;
}

.filter-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.filter-content {
  flex: 1;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 14px;
}

.filter-select {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--theme, #6B8F71);
  box-shadow: 0 0 0 3px rgba(107, 143, 113, 0.1);
}

/* Content Card */
.content-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.card-header {
  padding: 25px 30px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.card-body {
  padding: 0;
}

/* Modern Table */
.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table thead th {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #495057;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 20px 30px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
}

.modern-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f3f4;
}

.modern-table tbody tr:hover {
  background: linear-gradient(135deg, #f8f9fa, #f1f3f4);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modern-table tbody td {
  padding: 20px 30px;
  vertical-align: middle;
}

.dispute-id {
  font-weight: 600;
  color: #e74c3c;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(107, 143, 113, 0.3);
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
}

.user-email {
  font-size: 12px;
  color: #6c757d;
}

.order-link {
  font-weight: 600;
  color: var(--theme, #6B8F71);
  cursor: pointer;
}

.order-link:hover {
  text-decoration: underline;
}

.no-order {
  color: #6c757d;
  font-style: italic;
}

.dispute-subject {
  font-weight: 500;
  color: #2c3e50;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-select {
  padding: 6px 12px;
  border-radius: 20px;
  border: 2px solid #dee2e6;
  background: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.status-select:focus {
  outline: none;
  border-color: var(--theme, #6B8F71);
  box-shadow: 0 0 0 3px rgba(107, 143, 113, 0.1);
}

.status-select.open {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  border-color: #e67e22;
}

.status-select.in_review {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border-color: #2980b9;
}

.status-select.resolved {
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  border-color: #229954;
}

.status-select.closed {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
  border-color: #7f8c8d;
}

.btn-primary {
  background: linear-gradient(135deg, var(--theme, #6B8F71), #5a7d5f);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(107, 143, 113, 0.3);
  background: linear-gradient(135deg, #5a7d5f, #4a6d4f);
}

.btn-primary i {
  margin-right: 6px;
}

/* Modal Styles */
.modal {
  z-index: 1050;
}

.modal-content {
  border-radius: 16px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px 16px 0 0;
  padding: 20px 30px;
}

.modal-title {
  font-weight: 600;
  color: #2c3e50;
}

.modal-body {
  padding: 30px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .header-stats {
    justify-content: center;
  }

  .filter-card {
    max-width: 100%;
  }

  .modern-table {
    font-size: 14px;
  }

  .modern-table thead th,
  .modern-table tbody td {
    padding: 12px 15px;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>