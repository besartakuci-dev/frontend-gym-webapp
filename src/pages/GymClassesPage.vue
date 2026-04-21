<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { gymClassesAPI } from '@/api/gymClasses'

// Component state
const gymClassName = ref('')
const message = ref('')
const loading = ref(false)
const error = ref('')

// Create gym class
const createGymClass = async () => {
  // Validate input
  if (!gymClassName.value.trim()) {
    error.value = 'Please enter a class name'
    return
  }

  // Show loading state
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    // Prepare data
    const classData = {
      name: gymClassName.value,
      description: 'New gym class',
      instructorName: 'TBD',
      maxCapacity: 20,
      schedule: 'To be scheduled',
      difficultyLevel: 'Intermediate',
      durationMinutes: 60,
      price: 0,
      isActive: true,
    }

    // Call API
    await gymClassesAPI.createClass(classData)

    // Show success
    message.value = `✓ Class "${gymClassName.value}" created successfully!`
    gymClassName.value = ''
  } catch (err) {
    // Show error
    error.value = `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page-container">
    <h1>Gym Classes</h1>
    <div class="form-section">
      <InputText
        v-model="gymClassName"
        placeholder="Enter gym class name"
        class="input-field"
        :disabled="loading"
        @keyup.enter="createGymClass"
      />
      <Button
        label="Create"
        @click="createGymClass"
        icon="pi pi-plus"
        :loading="loading"
        :disabled="loading"
      />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.page-container {
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  margin: 0 0 2rem 0;
  font-size: 2rem;
  color: #1e293b;
  font-weight: 600;
}

.form-section {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
}

.input-field:hover {
  border-color: #94a3b8;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.message {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-left: 4px solid #0ea5e9;
  border-radius: 6px;
  color: #0c4a6e;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

.error {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-left: 4px solid #ef4444;
  border-radius: 6px;
  color: #7f1d1d;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
