<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import { GymClass } from '@/stores/gymClassesStore'

const props = defineProps<{
  initialData?: Partial<GymClass>
}>()

const emit = defineEmits<{
  submit: [data: GymClass]
  cancel: []
}>()

// Form state
const form = ref<Partial<GymClass>>({
  name: '',
  description: '',
  instructorName: '',
  maxCapacity: 20,
  schedule: '',
  difficultyLevel: 'Beginner',
  durationMinutes: 60,
  price: 0,
  isActive: true,
  category: '',
  ...props.initialData,
})

// Difficulty levels
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced']

// Categories
const categoryOptions = ['Yoga', 'Fitness', 'Pilates', 'CrossFit']

// Validation
const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.instructorName &&
    form.value.maxCapacity &&
    form.value.schedule &&
    form.value.category
  )
})

// Category mapping to backend enum
const categoryToNumber: Record<string, number> = {
  Yoga: 0,
  Fitness: 1,
  Pilates: 2,
  CrossFit: 3,
}

// Submit
const handleSubmit = () => {
  if (!isFormValid.value) return

  // Keep both string category name and numeric value
  const dataToSubmit = {
    ...form.value,
    categoryName: form.value.category, // Keep string name for reference
    category: categoryToNumber[form.value.category as string], // Send numeric value to backend
  } as any

  emit('submit', dataToSubmit)
}

// Cancel
const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="form-container">
    <div class="form-group">
      <label>Class Name *</label>
      <InputText v-model="form.name" placeholder="Enter class name" />
    </div>

    <div class="form-group">
      <label>Category *</label>
      <Dropdown v-model="form.category" :options="categoryOptions" placeholder="Select category" />
    </div>

    <div class="form-group">
      <label>Instructor Name *</label>
      <InputText v-model="form.instructorName" placeholder="Enter instructor name" />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Max Capacity *</label>
        <InputNumber v-model="form.maxCapacity" placeholder="Enter max capacity" :min="1" />
      </div>

      <div class="form-group">
        <label>Duration (Minutes)</label>
        <InputNumber v-model="form.durationMinutes" placeholder="Enter duration" :min="1" />
      </div>
    </div>

    <div class="form-group">
      <label>Schedule *</label>
      <InputText v-model="form.schedule" placeholder="e.g., Mon, Wed, Fri - 10:00 AM" />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Difficulty Level *</label>
        <Dropdown
          v-model="form.difficultyLevel"
          :options="difficultyLevels"
          placeholder="Select difficulty"
        />
      </div>

      <div class="form-group">
        <label>Price</label>
        <InputNumber v-model="form.price" placeholder="Enter price" :min="0" />
      </div>
    </div>

    <div class="form-group">
      <label>Description</label>
      <InputText v-model="form.description" placeholder="Enter class description" />
    </div>

    <div class="form-actions">
      <Button label="Submit" @click="handleSubmit" :disabled="!isFormValid" />
      <Button label="Cancel" severity="secondary" @click="handleCancel" />
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 700;
  color: #ff8c00;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

:deep(.p-inputtext),
:deep(.p-inputnumber),
:deep(.p-dropdown) {
  width: 100%;
  padding: 0.75rem;
  background: #1a1a1a !important;
  border: 2px solid #ff8c00 !important;
  border-radius: 6px;
  color: #ffffff !important;
  font-family: inherit !important;
}

:deep(.p-inputtext::placeholder),
:deep(.p-inputnumber::placeholder) {
  color: #999999 !important;
}

:deep(.p-inputtext:focus),
:deep(.p-inputnumber:focus),
:deep(.p-dropdown:focus) {
  outline: none;
  border-color: #ffa500 !important;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.3) !important;
}

:deep(.p-dropdown-trigger) {
  background: #ff8c00 !important;
  border-left: 2px solid #ff8c00 !important;
}

:deep(.p-dropdown-panel) {
  background: #1a1a1a !important;
}

:deep(.p-dropdown-items .p-dropdown-item) {
  color: #e5e5e5 !important;
  background: transparent !important;
}

:deep(.p-dropdown-items .p-dropdown-item:hover) {
  background: rgba(255, 140, 0, 0.2) !important;
}

:deep(.p-dropdown-items .p-dropdown-item.p-highlight) {
  background: #ff8c00 !important;
  color: #0f0f0f !important;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

:deep(.p-button) {
  flex: 1;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

:deep(.p-button.p-button-warning) {
  background: #ff8c00 !important;
  border: 2px solid #ff8c00 !important;
  color: #0f0f0f !important;
}

:deep(.p-button.p-button-warning:hover) {
  background: #ffa500 !important;
  border-color: #ffa500 !important;
}
</style>
