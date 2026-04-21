<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-black: #0f0f0f;
  --color-dark-gray: #1a1a1a;
  --color-orange: #ff8c00;
  --color-orange-light: #ffa500;
  --color-white: #ffffff;
  --color-gray: #e5e5e5;
}

body {
  background-color: var(--color-black);
  color: var(--color-white);
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
}

/* PrimeVue Dark Theme Overrides */
:deep(.p-button) {
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

:deep(.p-button-primary) {
  background-color: var(--color-orange) !important;
  border-color: var(--color-orange) !important;
  color: var(--color-black) !important;
}

:deep(.p-button-primary:hover) {
  background-color: var(--color-orange-light) !important;
  border-color: var(--color-orange-light) !important;
}

:deep(.p-inputtext),
:deep(.p-inputnumber),
:deep(.p-dropdown),
:deep(.p-dropdown-trigger) {
  background-color: var(--color-dark-gray) !important;
  border: 2px solid var(--color-orange) !important;
  color: var(--color-white) !important;
  border-radius: 6px !important;
}

:deep(.p-inputtext:focus),
:deep(.p-inputnumber:focus),
:deep(.p-dropdown:focus) {
  outline: none !important;
  border-color: var(--color-orange-light) !important;
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1) !important;
}

:deep(.p-datatable) {
  background-color: var(--color-dark-gray) !important;
  color: var(--color-white) !important;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: var(--color-black) !important;
  color: var(--color-orange) !important;
  border-color: var(--color-orange) !important;
  font-weight: 700;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  border-color: var(--color-orange) !important;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: rgba(255, 140, 0, 0.1) !important;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border-color: var(--color-orange) !important;
  color: var(--color-white) !important;
}

:deep(.p-card) {
  background-color: var(--color-dark-gray) !important;
  border: 2px solid var(--color-orange) !important;
  border-radius: 8px !important;
}

:deep(.p-dialog .p-dialog-header) {
  background-color: var(--color-black) !important;
  border-color: var(--color-orange) !important;
}

:deep(.p-dialog .p-dialog-header .p-dialog-title) {
  color: var(--color-orange) !important;
  font-weight: 700;
}

:deep(.p-dialog .p-dialog-content) {
  background-color: var(--color-dark-gray) !important;
  color: var(--color-white) !important;
}

:deep(.p-progressbar) {
  background-color: rgba(255, 140, 0, 0.2) !important;
}

:deep(.p-progressbar .p-progressbar-value) {
  background-color: var(--color-orange) !important;
}

:deep(.p-tag) {
  border-radius: 100px !important;
  font-weight: 600;
  font-size: 0.85rem;
}

:deep(.p-tag.p-tag-success) {
  background-color: rgba(34, 197, 94, 0.9) !important;
}

:deep(.p-tag.p-tag-warning) {
  background-color: rgba(255, 140, 0, 0.9) !important;
}

:deep(.p-tag.p-tag-danger) {
  background-color: rgba(239, 68, 68, 0.9) !important;
}

:deep(.p-paginator) {
  background-color: var(--color-dark-gray) !important;
  border-color: var(--color-orange) !important;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background-color: var(--color-orange) !important;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
  background-color: rgba(255, 140, 0, 0.2) !important;
  color: var(--color-orange) !important;
}
</style>
