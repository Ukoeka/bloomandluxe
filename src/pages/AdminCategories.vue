<template>
  <AdminLayout>
    <div class="admin-categories">
      <h2 class="mb-4">Manage Categories</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Categories</h5>
              <button class="btn btn-sm btn-success" @click="showAddCategoryModal = true">Add Category</button>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li v-for="category in categories" :key="category.id" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ category.name }}
                  <div>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editCategory(category)">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteCategory(category.id)">Delete</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Sub-Categories</h5>
              <button class="btn btn-sm btn-success" @click="showAddSubCategoryModal = true" :disabled="!selectedCategory">Add Sub-Category</button>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <select v-model="selectedCategory" class="form-select" @change="loadSubCategories">
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category">{{ category.name }}</option>
                </select>
              </div>
              <ul class="list-group" v-if="selectedCategory">
                <li v-for="subCategory in subCategories" :key="subCategory.id" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ subCategory.name }}
                  <div>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editSubCategory(subCategory)">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteSubCategory(subCategory.id)">Delete</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Category Modal -->
      <div v-if="showAddCategoryModal || editingCategory" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveCategory">
                <div class="mb-3">
                  <label for="categoryName" class="form-label">Category Name</label>
                  <input v-model="categoryForm.name" type="text" class="form-control" id="categoryName" required>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Sub-Category Modal -->
      <div v-if="showAddSubCategoryModal || editingSubCategory" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ editingSubCategory ? 'Edit Sub-Category' : 'Add New Sub-Category' }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveSubCategory">
                <div class="mb-3">
                  <label for="subCategoryName" class="form-label">Sub-Category Name</label>
                  <input v-model="subCategoryForm.name" type="text" class="form-control" id="subCategoryName" required>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
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
import AdminLayout from '../components/AdminLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminCategories',
  components: {
    AdminLayout
  },
  setup() {
    const categories = ref([])
    const subCategories = ref([])
    const selectedCategory = ref(null)
    const showAddCategoryModal = ref(false)
    const showAddSubCategoryModal = ref(false)
    const editingCategory = ref(null)
    const editingSubCategory = ref(null)
    const loading = ref(false)
    const apiStore = useApiStore()
    const categoryForm = ref({ name: '' })
    const subCategoryForm = ref({ name: '' })

    const fetchCategories = async () => {
      try {
        const data = await apiStore.get('/api/admin/categories')
        categories.value = data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    const saveCategory = async () => {
      loading.value = true
      try {
        if (editingCategory.value) {
          await apiStore.put(`/api/admin/categories/${editingCategory.value.id}`, categoryForm.value)
        } else {
          await apiStore.post('/api/admin/categories', categoryForm.value)
        }
        await fetchCategories()
        closeModal()
      } catch (error) {
        console.error('Failed to save category:', error)
      } finally {
        loading.value = false
      }
    }

    const editCategory = (category) => {
      editingCategory.value = category
      categoryForm.value = { ...category }
      showAddCategoryModal.value = false
    }

    const deleteCategory = async (id) => {
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await apiStore.delete(`/api/admin/categories/${id}`)
          await fetchCategories()
        } catch (error) {
          console.error('Failed to delete category:', error)
        }
      }
    }

    const loadSubCategories = async () => {
      if (selectedCategory.value) {
        try {
          const data = await apiStore.get(`/api/admin/categories/${selectedCategory.value.id}/subcategories`)
          subCategories.value = data
        } catch (error) {
          console.error('Failed to fetch sub-categories:', error)
        }
      } else {
        subCategories.value = []
      }
    }

    const saveSubCategory = async () => {
      loading.value = true
      try {
        if (editingSubCategory.value) {
          await apiStore.put(`/api/admin/subcategories/${editingSubCategory.value.id}`, subCategoryForm.value)
        } else {
          await apiStore.post(`/api/admin/categories/${selectedCategory.value.id}/subcategories`, subCategoryForm.value)
        }
        await loadSubCategories()
        closeModal()
      } catch (error) {
        console.error('Failed to save sub-category:', error)
      } finally {
        loading.value = false
      }
    }

    const editSubCategory = (subCategory) => {
      editingSubCategory.value = subCategory
      subCategoryForm.value = { ...subCategory }
      showAddSubCategoryModal.value = false
    }

    const deleteSubCategory = async (id) => {
      if (confirm('Are you sure you want to delete this sub-category?')) {
        try {
          await apiStore.delete(`/api/admin/subcategories/${id}`)
          await loadSubCategories()
        } catch (error) {
          console.error('Failed to delete sub-category:', error)
        }
      }
    }

    const closeModal = () => {
      showAddCategoryModal.value = false
      showAddSubCategoryModal.value = false
      editingCategory.value = null
      editingSubCategory.value = null
      categoryForm.value = { name: '' }
      subCategoryForm.value = { name: '' }
    }

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      subCategories,
      selectedCategory,
      showAddCategoryModal,
      showAddSubCategoryModal,
      editingCategory,
      editingSubCategory,
      loading,
      categoryForm,
      subCategoryForm,
      saveCategory,
      editCategory,
      deleteCategory,
      loadSubCategories,
      saveSubCategory,
      editSubCategory,
      deleteSubCategory,
      closeModal
    }
  }
}
</script>

<style scoped>
.admin-categories {
  padding: 20px 0;
}
.modal {
  z-index: 1050;
}

.admin-categories .btn-success {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-categories .btn-success:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-categories .btn-primary {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-categories .btn-primary:hover {
  background-color: var(--header, #010F1C);
  border-color: var(--header, #010F1C);
}

.admin-categories .btn-outline-primary {
  color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-categories .btn-outline-primary:hover {
  background-color: var(--theme, #6B8F71);
  border-color: var(--theme, #6B8F71);
}

.admin-categories .btn-outline-danger {
  color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}

.admin-categories .btn-outline-danger:hover {
  background-color: var(--theme-2, #EF6CC2);
  border-color: var(--theme-2, #EF6CC2);
}
</style>