<template>
  <AdminLayout>
    <div class="admin-disputes">
      <h2 class="mb-4">Manage Disputes</h2>

      <!-- Status Filter -->
      <div class="mb-3">
        <select v-model="statusFilter" @change="fetchDisputes" class="form-select w-auto">
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_review">In Review</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="table table-striped">
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
            <tr v-for="dispute in disputes" :key="dispute.id">
              <td>{{ dispute.id }}</td>
              <td>{{ dispute.user?.name || 'N/A' }}</td>
              <td>{{ dispute.order?.id || 'N/A' }}</td>
              <td>{{ dispute.subject }}</td>
              <td>
                <select :value="dispute.status" @change="updateStatus(dispute.id, $event.target.value)" class="form-select form-select-sm">
                  <option value="open">Open</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>{{ new Date(dispute.created_at).toLocaleDateString() }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary" @click="viewDisputeDetails(dispute)">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
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
                  <p><strong>Name:</strong> {{ selectedDispute.user?.name }}</p>
                  <p><strong>Email:</strong> {{ selectedDispute.user?.email }}</p>
                </div>
                <div class="col-md-6">
                  <h6>Dispute Information</h6>
                  <p><strong>Order ID:</strong> {{ selectedDispute.order?.id }}</p>
                  <p><strong>Subject:</strong> {{ selectedDispute.subject }}</p>
                  <p><strong>Status:</strong> {{ selectedDispute.status }}</p>
                  <p><strong>Date:</strong> {{ new Date(selectedDispute.created_at).toLocaleString() }}</p>
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
                    <img :src="`/storage/${attachment}`" alt="Attachment" class="img-fluid" style="max-height: 100px; cursor: pointer;" @click="openImage(attachment)">
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
.modal {
  z-index: 1050;
}

.admin-disputes .btn-outline-primary {
  color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-disputes .btn-outline-primary:hover {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-disputes .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-disputes .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}
</style>