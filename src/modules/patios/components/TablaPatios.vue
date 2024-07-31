<script lang="ts" setup>
import { ref } from 'vue'
import { severity } from '@/pipes/severity'
import { FilterMatchMode } from 'primevue/api'
import { useAuth } from '@/auth/composables/useAuth'
import { usePatios } from '@/modules/patios/composables/usePatios'
import { question } from '@/helpers/messages'
import { useEliminar } from '@/modules/patios/composables/useEliminar'
import type { Patio } from '@/modules/patios/interfaces/patio'
import { useModificar } from '@/modules/patios/composables/useModifiar'
// import { useTrip } from '@/composables/useTrip'

const { verificarPermiso } = useAuth()
const { isLoading, patios } = usePatios()
const { deleteMutation } = useEliminar()
const { updateMutation } = useModificar()
// const { agregarMovimiento } = useTrip()

interface Props {
  isModule: Boolean
}

defineProps<Props>()

const modificar = async (caja: Patio) => {
  updateMutation.mutate(caja)
}

const deletePatio = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  codigo_postal: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  estado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  pais: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  tipo: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="patios"
    showGridlines
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="['nombre', 'codigo_postal', 'estado', 'pais', 'tipo']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/patios/lista-patios/crear-patio' }">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Nuevo"
            outlined
            v-if="isModule && !verificarPermiso('MODULO_PATIOS_CREAR')"
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
    <Column field="codigo_postal" header="Codigo postal" sortable />
    <Column field="estado" header="Estado" sortable />
    <Column field="pais" header="Pais" sortable />
    <Column field="tipo" header="Tipo" sortable />
    <Column v-if="isModule">
      <template #body="{ data }">
        <InputSwitch
          v-model="data.estatus"
          @change="modificar(data)"
          v-if="!verificarPermiso('MODULO_PATIOS_MODIFICAR')"
        />
      </template>
    </Column>
    <Column header="Estatus">
      <template #body="{ data }">
        <Tag :severity="severity(data.estatus)" :value="data.estatus ? 'Activo' : 'Inactivo'"></Tag>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: `modificar-patio`, params: { id: data.id } }"
            v-if="isModule && !verificarPermiso('MODULO_PATIOS_MODIFICAR')"
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
            severity="danger"
            v-if="isModule && !verificarPermiso('MODULO_PATIOS_ELIMINAR')"
            @click="deletePatio(data.id)"
          />
        </div>
      </template>
    </Column>
    <!-- <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <Button
            icon="pi pi-plus"
            v-if="!isModule && data.estatus"
            @click="agregarMovimiento(data)"
          />
        </div>
      </template>
    </Column> -->
  </DataTable>
</template>
