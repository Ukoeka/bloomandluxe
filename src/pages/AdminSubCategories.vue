<template>
  <AdminLayout>
    <div class="admin-subcategories">
      <h2 class="mb-4">Subcategories for "{{ categoryName }}"</h2>
      <div class="mb-3">
        <button class="btn btn-secondary" @click="$router.go(-1)">← Back to Categories</button>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h5>Subcategories</h5>
              <button class="btn btn-sm btn-success" @click="showAddCategoryModal = true">Add Subcategory</button>
            </div>
            <div class="card-body">
              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Loading subcategories...</p>
              </div>
              <div v-else-if="subcategories.length === 0" class="text-center py-4">
                <p class="text-muted">No subcategories found for this category.</p>
              </div>
              <ul v-else class="list-group">
                <li v-for="subcategory in subcategories" :key="subcategory.id" class="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    {{ subcategory.name }}
                  </span>
                  <AdminTableActions
                    :item="subcategory"
                    @edit="editCategory"
                    @delete="deleteCategory($event.id)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5>Statistics</h5>
            </div>
            <div class="card-body">
              <p>Total Subcategories: {{ subcategories.length }}</p>
              <p>Active Subcategories: {{ subcategories.filter(c => c.is_active).length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Subcategory Modal -->
      <div v-if="showAddCategoryModal || editingCategory" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ editingCategory ? 'Edit Subcategory' : 'Add New Subcategory' }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveCategory">
                <div class="mb-3">
                  <label for="categoryName" class="form-label">Subcategory Name</label>
                  <input v-model="categoryForm.name" type="text" class="form-control" id="categoryName" required>
                </div>
                <div class="mb-3">
                  <label for="categoryImage" class="form-label">Subcategory Image</label>
                  <input type="file" class="form-control" id="categoryImage" accept="image/*" @change="handleImageUpload">
                  <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Subcategory preview" class="img-fluid" style="max-height: 200px;">
                  </div>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AdminTableActions from '../components/AdminTableActions.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminSubCategories',
  components: {
    AdminLayout,
    AdminTableActions
  },
  setup() {
    const route = useRoute()
    const categoryId = route.params.id
    const categoryName = ref('')
    const subcategories = ref([])
    const showAddCategoryModal = ref(false)
    const editingCategory = ref(null)
    const saving = ref(false)
    const loading = ref(false)
    const apiStore = useApiStore()
    const categoryForm = ref({ name: '', parent_id: categoryId, image: null })
    const imagePreview = ref('')

    const fetchCategory = async () => {
      try {
        const response = await apiStore.get(`/admin/categories/${categoryId}`)
        categoryName.value = response.data.name
      } catch (error) {
        console.error('Failed to fetch category:', error)
      }
    }

    const fetchSubcategories = async () => {
      loading.value = true
      try {
        const response = await apiStore.get(`/admin/categories/${categoryId}/subcategories`)
        subcategories.value = response.data || []
      } catch (error) {
        console.error('Failed to fetch subcategories:', error)
      } finally {
        loading.value = false
      }
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        categoryForm.value.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        imagePreview.value = ''
        categoryForm.value.image = null
      }
    }

    const saveCategory = async () => {
      saving.value = true
      try {
        const formData = new FormData()
        formData.append('name', categoryForm.value.name)
        formData.append('parent_id', categoryForm.value.parent_id)
        formData.append('is_active', '1')

        if (categoryForm.value.image) {
          formData.append('image', categoryForm.value.image)
        }

        if (editingCategory.value) {
          await apiStore.put(`/admin/categories/${editingCategory.value.id}`, formData)
        } else {
          await apiStore.post('/admin/categories', formData)
        }
        await fetchSubcategories()
        closeModal()
      } catch (error) {
        console.error('Failed to save subcategory:', error)
      } finally {
        saving.value = false
      }
    }

    const editCategory = (category) => {
      editingCategory.value = category
      categoryForm.value = { ...category }
      showAddCategoryModal.value = false
    }

    const deleteCategory = async (id) => {
      if (confirm('Are you sure you want to delete this subcategory?')) {
        try {
          await apiStore.delete(`/admin/categories/${id}`)
          await fetchSubcategories()
        } catch (error) {
          console.error('Failed to delete subcategory:', error)
        }
      }
    }

    const closeModal = () => {
      showAddCategoryModal.value = false
      editingCategory.value = null
      categoryForm.value = { name: '', parent_id: categoryId, image: null }
      imagePreview.value = ''
    }

    onMounted(() => {
      fetchCategory()
      fetchSubcategories()
    })

    return {
      categoryName,
      subcategories,
      showAddCategoryModal,
      editingCategory,
      saving,
      loading,
      categoryForm,
      imagePreview,
      saveCategory,
      editCategory,
      deleteCategory,
      closeModal,
      handleImageUpload
    }
  }
}
</script>

<style scoped>
.admin-subcategories {
  padding: 20px 0;
}
.modal {
  z-index: 1050;
}

.admin-subcategories .btn-success {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-subcategories .btn-success:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-subcategories .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-subcategories .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-subcategories .btn-outline-primary {
  color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-subcategories .btn-outline-primary:hover {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-subcategories .btn-outline-danger {
  color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}

.admin-subcategories .btn-outline-danger:hover {
  background-color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}
</style>