<script lang="ts" setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useAuth } from '@/auth/composables/useAuth'
import { useRoles } from '@/modules/roles/composables/useRoles'
import { useEliminar } from '@/modules/roles/composables/useEliminar'
import { question } from '@/helpers/messages'

const { verificarPermiso } = useAuth()
const { roles, isLoading } = useRoles()
const { deleteMutation } = useEliminar()

const deleteRol = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="roles"
    showGridlines
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="['nombre']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/roles/lista-roles/crear-rol' }">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Nuevo"
            outlined
            v-if="!verificarPermiso('MODULO_ROLES_CREAR')"
          />
        </router-link>
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Buscar" />
        </IconField>
      </div>
    </template>

    <Column field="nombre" header="Nombre" sortable></Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center gap-1">
          <router-link
            :to="{ name: `modificar-rol`, params: { id: data.id } }"
            v-if="!verificarPermiso('MODULO_ROLES_MODIFICAR')"
          >
            <Button icon="pi pi-pencil" severity="warning" />
          </router-link>
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <Button
            icon="pi pi-trash"
            severity="danger "
            v-if="!verificarPermiso('MODULO_ROLES_ELIMINAR')"
            @click="deleteRol(data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
