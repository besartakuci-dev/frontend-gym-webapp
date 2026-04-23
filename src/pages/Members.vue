<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type Member = {
  id: number
  emri: string
  mbiemri: string
  telefoni: string
}

const members = ref<Member[]>([
  { id: 1, emri: 'Rona', mbiemri: 'Test', telefoni: '044123456' },
])

const showModal = ref(false)
const searchTerm = ref('')

const form = ref({
  emri: '',
  mbiemri: '',
  telefoni: '',
})

const filteredMembers = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()

  if (!term) return members.value

  return members.value.filter((member) =>
    `${member.emri} ${member.mbiemri} ${member.telefoni}`
      .toLowerCase()
      .includes(term),
  )
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.value = {
    emri: '',
    mbiemri: '',
    telefoni: '',
  }
}

const saveMember = () => {
  if (!form.value.emri || !form.value.mbiemri || !form.value.telefoni) return

  members.value.push({
    id: Date.now(),
    emri: form.value.emri,
    mbiemri: form.value.mbiemri,
    telefoni: form.value.telefoni,
  })

  closeModal()
}

const deleteMember = (id: number) => {
  members.value = members.value.filter((m) => m.id !== id)
}
</script>

<template>
  <div class="members-page">
    <div class="members-content">
      <div class="page-top">
        <div>
          <h1>Members</h1>
          <p class="subtitle">Manage gym members in a clean and simple way.</p>
        </div>

        <Button
          label="Add Member"
          icon="pi pi-plus"
          class="add-btn"
          @click="openModal"
        />
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-label">Total Members</span>
          <strong>{{ members.length }}</strong>
        </div>

        <div class="stat-card search-card">
          <span class="stat-label">Search</span>
          <InputText v-model="searchTerm" placeholder="Search by name or phone" />
        </div>
      </div>

      <div class="table-card">
        <DataTable :value="filteredMembers" responsiveLayout="scroll" class="members-table">
          <Column field="emri" header="Name"></Column>
          <Column field="mbiemri" header="Surname"></Column>
          <Column field="telefoni" header="Phone"></Column>

          <Column header="Actions" style="width: 120px">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                class="delete-btn"
                text
                rounded
                @click="deleteMember(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- CUSTOM MODAL -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-box" @click.stop>
        <div class="modal-header">
          <h2>Add Member</h2>
          <button class="close-x" @click="closeModal">×</button>
        </div>

        <div class="form">
          <div class="field">
            <label>Name</label>
            <InputText v-model="form.emri" placeholder="Enter name" />
          </div>

          <div class="field">
            <label>Surname</label>
            <InputText v-model="form.mbiemri" placeholder="Enter surname" />
          </div>

          <div class="field">
            <label>Phone</label>
            <InputText v-model="form.telefoni" placeholder="Enter phone number" />
          </div>

          <div class="dialog-actions">
            <Button label="Cancel" class="cancel-btn" @click="closeModal" />
            <Button label="Save" class="save-btn" @click="saveMember" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.members-page {
  min-height: 100vh;
  padding: 2rem;
  color: #ffffff;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.94), rgba(0, 0, 0, 0.98)),
    radial-gradient(circle at top left, rgba(249, 115, 22, 0.14), transparent 30%),
    #0a0a0a;
}

.members-content {
  max-width: 1200px;
  margin: 0 auto;
}

.page-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.page-top h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
}

.subtitle {
  margin: 0.5rem 0 0 0;
  color: #a1a1aa;
  font-size: 0.95rem;
}

.add-btn {
  background: #f97316 !important;
  border: 1px solid #f97316 !important;
  color: #111111 !important;
  font-weight: 700;
  border-radius: 14px !important;
  padding: 0.8rem 1.15rem !important;
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.22);
}

.add-btn:hover {
  background: #fb923c !important;
  border-color: #fb923c !important;
}

.stats-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.stat-card {
  background: #111111;
  border: 1px solid rgba(249, 115, 22, 0.65);
  border-radius: 20px;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 88px;
}

.stat-card strong {
  font-size: 1.8rem;
  color: #ffffff;
}

.stat-label {
  color: #f97316;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.45rem;
  letter-spacing: 0.04em;
}

.search-card :deep(.p-inputtext) {
  width: 100%;
  background: #0b0b0b !important;
  border: 1px solid rgba(249, 115, 22, 0.5) !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  padding: 0.8rem 0.9rem !important;
}

.table-card {
  background: #111111;
  border: 1px solid rgba(249, 115, 22, 0.7);
  border-radius: 24px;
  padding: 0.5rem 1rem 1rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
}

:deep(.members-table .p-datatable-table) {
  background: transparent;
}

:deep(.members-table .p-datatable-header) {
  background: transparent;
  border: none;
}

:deep(.members-table .p-datatable-thead > tr > th) {
  background: transparent !important;
  color: #f97316 !important;
  border-bottom: 1px solid rgba(249, 115, 22, 0.28) !important;
  font-weight: 700;
  padding: 1rem 0.9rem;
}

:deep(.members-table .p-datatable-tbody > tr) {
  background: transparent !important;
}

:deep(.members-table .p-datatable-tbody > tr > td) {
  background: transparent !important;
  color: #ffffff !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  padding: 1rem 0.9rem;
  vertical-align: middle;
}

:deep(.members-table .p-datatable-tbody > tr:hover > td) {
  background: rgba(249, 115, 22, 0.05) !important;
}

.delete-btn {
  color: #f97316 !important;
  width: 2.2rem !important;
  height: 2.2rem !important;
}

.delete-btn:hover {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #fb923c !important;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-box {
  width: 100%;
  max-width: 520px;
  background: #111111;
  border: 1.5px solid #f97316;
  border-radius: 22px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid rgba(249, 115, 22, 0.2);
}

.modal-header h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
}

.close-x {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field label {
  color: #f3f4f6;
  font-size: 0.95rem;
  font-weight: 600;
}

.field :deep(.p-inputtext) {
  width: 100%;
  background: #0b0b0b !important;
  border: 1px solid rgba(249, 115, 22, 0.45) !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  padding: 0.8rem 0.9rem !important;
}

.field :deep(.p-inputtext::placeholder) {
  color: #9ca3af !important;
}

.field :deep(.p-inputtext:enabled:focus) {
  box-shadow: 0 0 0 0.15rem rgba(249, 115, 22, 0.16) !important;
  border-color: #f97316 !important;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.cancel-btn {
  background: transparent !important;
  border: 1px solid #3f3f46 !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  padding: 0.7rem 1rem !important;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: #5b5b66 !important;
}

.save-btn {
  background: #f97316 !important;
  border: 1px solid #f97316 !important;
  color: #111111 !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  padding: 0.7rem 1.1rem !important;
}

.save-btn:hover {
  background: #fb923c !important;
  border-color: #fb923c !important;
}

@media (max-width: 768px) {
  .members-page {
    padding: 1rem;
  }

  .page-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .add-btn {
    width: 100%;
  }

  .modal-box {
    max-width: 100%;
  }
}
</style>
