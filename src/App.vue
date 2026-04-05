<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const inputValue = ref('')
const message = ref('')

const handleClick = () => {
  message.value = `Hello, ${inputValue.value || 'World'}!`
}
</script>

<template>
  <div class="app-container">
    <h1>Welcome to PrimeVue!</h1>
    <div class="demo-section">
      <InputText v-model="inputValue" placeholder="Enter your name" class="input-field" />
      <Button label="Greet" @click="handleClick" icon="pi pi-check" />
    </div>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.app-container {
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

.demo-section {
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
