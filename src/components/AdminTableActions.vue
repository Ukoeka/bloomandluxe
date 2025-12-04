<template>
  <div class="admin-table-actions">
    <button
      v-if="showEdit"
      class="btn btn-sm btn-outline-primary me-2"
      @click="$emit('edit', item)"
      :title="editTitle"
    >
      <i class="fas fa-edit" v-if="showIcons"></i>
      {{ editText }}
    </button>
    <button
      v-if="showDelete"
      class="btn btn-sm btn-outline-danger"
      @click="$emit('delete', item)"
      :title="deleteTitle"
    >
      <i class="fas fa-trash" v-if="showIcons"></i>
      {{ deleteText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AdminTableActions',
  props: {
    item: {
      type: Object,
      required: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showIcons: {
      type: Boolean,
      default: false
    },
    editText: {
      type: String,
      default: 'Edit'
    },
    deleteText: {
      type: String,
      default: 'Delete'
    },
    editTitle: {
      type: String,
      default: 'Edit item'
    },
    deleteTitle: {
      type: String,
      default: 'Delete item'
    }
  },
  emits: ['edit', 'delete']
}
</script>
<style scoped>
.admin-table-actions {
  display: flex;
  gap: 0.5rem;
}

.admin-table-actions .btn {
  white-space: nowrap;
}

.admin-table-actions .btn-outline-primary:hover {
  color: white;
}

.admin-table-actions .btn-outline-danger:hover {
  color: white;
}
</style>