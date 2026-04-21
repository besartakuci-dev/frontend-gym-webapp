<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import { useGymClassesStore, type GymClass } from '@/stores/gymClassesStore'
import GymClassForm from '@/components/GymClassForm.vue'

const route = useRoute()
const router = useRouter()
const store = useGymClassesStore()

// Local state
const showDialog = ref(false)
const editingClass = ref<GymClass | null>(null)
const loading = ref(false)

// Get category from route query
const category = computed(() => (route.query.category as string) || '')

// Filter classes by category
const filteredClasses = computed(() => {
  if (!category.value) return store.classes
  return store.getClassesByCategory(category.value)
})

// Fetch classes on mount
onMounted(() => {
  console.log('GymClassesPage mounted, category:', category.value)
  store.fetchClasses().then(() => {
    console.log('Classes fetched, now filtering...')
    store.debugClasses() // Show all classes and categories
    console.log('Initial filtered classes:', filteredClasses.value)
    console.log('Looking for category:', category.value)
  })
})

// Open create dialog
const openCreateDialog = () => {
  editingClass.value = null
  showDialog.value = true
}

// Open edit dialog
const openEditDialog = (gymClass: GymClass) => {
  editingClass.value = { ...gymClass }
  showDialog.value = true
}

// Handle form submit
const handleFormSubmit = async (formData: GymClass) => {
  loading.value = true
  try {
    if (editingClass.value?.id) {
      // Update
      await store.updateClass(editingClass.value.id, formData)
    } else {
      // Create
      await store.createClass(formData)
    }
    showDialog.value = false
    editingClass.value = null
  } catch (error) {
    console.error('Error saving class:', error)
  } finally {
    loading.value = false
  }
}

// Delete class
const deleteClass = async (gymClass: GymClass) => {
  if (confirm(`Delete class "${gymClass.name}"?`)) {
    try {
      if (gymClass.id) {
        await store.deleteClass(gymClass.id)
      }
    } catch (error) {
      console.error('Error deleting class:', error)
    }
  }
}

// Go back
const goBack = () => {
  router.push({ name: 'Home' })
}

// Get difficulty color
const getDifficultyColor = (level: string) => {
  return store.getDifficultyColor(level)
}

// Get capacity percentage
const getCapacityPercentage = (enrolled: number = 0, max: number = 1) => {
  return (enrolled / max) * 100
}
</script>

<template>
  <div class="classes-container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <Button icon="pi pi-arrow-left" severity="secondary" @click="goBack" text />
        <h1>{{ category ? category + ' Classes' : 'All Classes' }}</h1>
        <span class="class-count">({{ filteredClasses.length }} classes)</span>
      </div>
      <Button label="Create Class" icon="pi pi-plus" @click="openCreateDialog" />
    </div>

    <!-- Error message -->
    <div v-if="store.errorMessage" class="error-alert">
      <div class="error-header">
        <i class="pi pi-exclamation-circle"></i>
        <strong>Connection Error</strong>
      </div>
      <div class="error-content">
        <p>{{ store.errorMessage }}</p>
        <div class="error-help">
          <p><strong>To fix this:</strong></p>
          <ul>
            <li>Make sure your backend API is running on <code>https://localhost:7130</code></li>
            <li>
              Check that CORS is configured to allow requests from
              <code>http://localhost:5173</code>
            </li>
            <li>Verify the endpoint <code>/api/GymClasses/</code> exists</li>
            <li>If using self-signed certificate, your backend should handle it</li>
          </ul>
        </div>
        <Button
          label="Retry"
          icon="pi pi-refresh"
          @click="store.fetchClasses"
          severity="warning"
          size="small"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!store.loading && filteredClasses.length === 0 && !store.errorMessage"
      class="empty-state"
    >
      <i class="pi pi-inbox"></i>
      <h3>No Classes Found</h3>
      <p>{{ category ? `No ${category} classes available` : 'No classes available' }}</p>
      <Button label="Create First Class" icon="pi pi-plus" @click="openCreateDialog" />
    </div>

    <!-- DataTable -->
    <div v-if="filteredClasses.length > 0" class="table-wrapper">
      <DataTable
        :value="filteredClasses"
        :loading="store.loading"
        paginator
        :rows="10"
        :total-records="filteredClasses.length"
        table-style="min-width: 50rem"
        striped-rows
      >
        <!-- Name Column -->
        <Column field="name" header="Class Name" :sortable="true" />

        <!-- Instructor Column -->
        <Column field="instructorName" header="Instructor" :sortable="true" />

        <!-- Difficulty Column -->
        <Column field="difficultyLevel" header="Difficulty" :sortable="true">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.difficultyLevel"
              :severity="getDifficultyColor(slotProps.data.difficultyLevel)"
            />
          </template>
        </Column>

        <!-- Schedule Column -->
        <Column field="schedule" header="Schedule" :sortable="true" />

        <!-- Capacity Column -->
        <Column field="maxCapacity" header="Capacity" :sortable="true">
          <template #body="slotProps">
            <div class="capacity-info">
              <ProgressBar
                :value="
                  getCapacityPercentage(slotProps.data.enrolledCount, slotProps.data.maxCapacity)
                "
                :show-value="true"
              />
              <small
                >{{ slotProps.data.enrolledCount || 0 }}/{{ slotProps.data.maxCapacity }}</small
              >
            </div>
          </template>
        </Column>

        <!-- Duration Column -->
        <Column field="durationMinutes" header="Duration" :sortable="true">
          <template #body="slotProps"> {{ slotProps.data.durationMinutes }} min </template>
        </Column>

        <!-- Actions Column -->
        <Column header="Actions" :sortable="false">
          <template #body="slotProps">
            <div class="action-buttons">
              <Button
                icon="pi pi-pencil"
                severity="info"
                @click="openEditDialog(slotProps.data)"
                text
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="deleteClass(slotProps.data)"
                text
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Create/Edit Dialog -->
    <Dialog
      v-model:visible="showDialog"
      :header="editingClass?.id ? 'Edit Class' : 'Create New Class'"
      :modal="true"
      :style="{ width: '50vw' }"
    >
      <GymClassForm
        :initial-data="editingClass || undefined"
        @submit="handleFormSubmit"
        @cancel="() => (showDialog = false)"
      />
    </Dialog>
  </div>
</template>

<style scoped>
.classes-container {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(15, 15, 15, 0.9) 100%);
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #ff8c00;
  box-shadow: 0 8px 32px rgba(255, 140, 0, 0.2);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header h1 {
  font-size: 1.8rem;
  color: #ff8c00;
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.class-count {
  font-size: 0.9rem;
  color: #e5e5e5;
  font-weight: 500;
}

.error-message {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.15);
  border-left: 4px solid #ff6b6b;
  border-radius: 6px;
  color: #ff9999;
  margin-bottom: 1.5rem;
}

.error-alert {
  background: rgba(255, 59, 48, 0.1);
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: #ff9999;
}

.error-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff8c00;
}

.error-header i {
  font-size: 1.3rem;
}

.error-content p {
  margin: 0.5rem 0;
  color: #e5e5e5;
}

.error-help {
  background: rgba(255, 140, 0, 0.1);
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.error-help p {
  margin: 0 0 0.5rem 0;
  color: #ff8c00;
  font-weight: 600;
}

.error-help ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.error-help li {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  color: #e5e5e5;
}

.error-help code {
  background: rgba(255, 140, 0, 0.2);
  color: #ffa500;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}

.empty-state {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(15, 15, 15, 0.9) 100%);
  border: 2px solid #ff8c00;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 140, 0, 0.2);
}

.empty-state i {
  font-size: 3rem;
  color: #ff8c00;
  display: block;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #ffa500;
  font-size: 1.3rem;
  margin: 0.5rem 0;
  font-weight: 700;
}

.empty-state p {
  color: #e5e5e5;
  margin-bottom: 1.5rem;
}

.table-wrapper {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%);
  border: 2px solid #ff8c00;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(255, 140, 0, 0.2);
  overflow: hidden;
}

:deep(.p-datatable) {
  border: none !important;
  background: transparent !important;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #ff8c00 !important;
  color: #0f0f0f !important;
  font-weight: 700 !important;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 140, 0, 0.2) !important;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  color: #e5e5e5 !important;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: rgba(255, 140, 0, 0.1) !important;
}

.capacity-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.capacity-info small {
  font-size: 0.75rem;
  color: #ff8c00;
  text-align: center;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

:deep(.p-dialog) {
  border-radius: 8px;
  background: #1a1a1a !important;
}

:deep(.p-dialog .p-dialog-header) {
  background: #ff8c00 !important;
  border-radius: 8px 8px 0 0 !important;
}

:deep(.p-dialog .p-dialog-header .p-dialog-title) {
  color: #0f0f0f !important;
  font-weight: 700 !important;
}

:deep(.p-dialog .p-dialog-content) {
  background: #1a1a1a !important;
  color: #e5e5e5 !important;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  :deep(.p-dialog) {
    width: 90vw !important;
  }
}
</style>
