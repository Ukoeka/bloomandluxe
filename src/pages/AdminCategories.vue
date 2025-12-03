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
              <div v-if="loadingCategories" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Loading categories...</p>
              </div>
              <ul v-else class="list-group">
                <li v-for="category in sortedCategories" :key="category.id" class="list-group-item d-flex justify-content-between align-items-center"
                    :style="{ 'padding-left': getCategoryIndent(category) + 'px' }">
                  <span>
                    <span v-if="category.parent_id" class="text-muted">└─ </span>
                    {{ category.name }}
                    <small v-if="category.parent" class="text-muted">({{ category.parent.name }})</small>
                  </span>
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
               <h5>Category Statistics</h5>
             </div>
             <div class="card-body">
               <p>Total Categories: {{ categories.length }}</p>
               <p>Main Categories: {{ categories.filter(c => !c.parent_id).length }}</p>
               <p>Subcategories: {{ categories.filter(c => c.parent_id).length }}</p>
               <p>Active Categories: {{ categories.filter(c => c.is_active).length }}</p>
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
                <div class="mb-3">
                  <label for="parentCategory" class="form-label">Parent Category (Optional)</label>
                  <select v-model="categoryForm.parent_id" class="form-control" id="parentCategory" :disabled="loadingCategories">
                    <option :value="null">
                      {{ loadingCategories ? 'Loading categories...' : 'None (Main Category)' }}
                    </option>
                    <option v-for="cat in mainCategories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
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
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import { useApiStore } from '../stores/api'

export default {
  name: 'AdminCategories',
  components: {
    AdminLayout
  },
  setup() {
    const categories = ref([])
    const showAddCategoryModal = ref(false)
    const editingCategory = ref(null)
    const loading = ref(false)
    const loadingCategories = ref(false)
    const apiStore = useApiStore()
    const categoryForm = ref({ name: '', parent_id: null })

    const mainCategories = computed(() => {
      return categories.value.filter(cat => !cat.parent_id)
    })

    const sortedCategories = computed(() => {
      if (!categories.value || !Array.isArray(categories.value)) {
        return []
      }

      const result = []
      const categoryMap = new Map()

      // Create a map for quick lookup
      categories.value.forEach(cat => {
        categoryMap.set(cat.id, { ...cat, children: [] })
      })

      // Build the hierarchy
      categories.value.forEach(cat => {
        if (cat.parent_id) {
          const parent = categoryMap.get(cat.parent_id)
          if (parent) {
            parent.children.push(categoryMap.get(cat.id))
          }
        }
      })

      // Flatten the hierarchy with proper ordering
      const addCategory = (cat, level = 0) => {
        result.push({ ...cat, level })
        if (cat.children && Array.isArray(cat.children)) {
          cat.children.forEach(child => addCategory(child, level + 1))
        }
      }

      const mainCategories = categories.value.filter(cat => !cat.parent_id)
      mainCategories.forEach(cat => addCategory(categoryMap.get(cat.id)))

      return result
    })

    const getCategoryIndent = (category) => {
      return category.level * 20 // 20px indent per level
    }

    const fetchCategories = async () => {
      loadingCategories.value = true
      try {
        const response = await apiStore.get('/admin/categories')
        categories.value = response.data || []
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        loadingCategories.value = false
      }
    }

    const saveCategory = async () => {
      loading.value = true
      try {
        if (editingCategory.value) {
          await apiStore.put(`/admin/categories/${editingCategory.value.id}`, categoryForm.value)
        } else {
          await apiStore.post('/admin/categories', categoryForm.value)
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
          await apiStore.delete(`/admin/categories/${id}`)
          await fetchCategories()
        } catch (error) {
          console.error('Failed to delete category:', error)
        }
      }
    }


    const closeModal = () => {
      showAddCategoryModal.value = false
      editingCategory.value = null
      categoryForm.value = { name: '', parent_id: null }
    }

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      showAddCategoryModal,
      editingCategory,
      loading,
      loadingCategories,
      categoryForm,
      mainCategories,
      sortedCategories,
      getCategoryIndent,
      saveCategory,
      editCategory,
      deleteCategory,
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