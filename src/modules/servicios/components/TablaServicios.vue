<script lang="ts" setup>
import { ref } from 'vue'
import { severity } from '@/pipes/severity'
import { FilterMatchMode } from 'primevue/api'
import { useAuth } from '@/auth/composables/useAuth'
import { useServicios } from '@/modules/servicios/composables/useServicios'
import { question } from '@/helpers/messages'
import { useEliminar } from '@/modules/servicios/composables/useEliminar'
import type { Servicio } from '@/modules/servicios/interfaces/servicio'
import { useModificar } from '@/modules/servicios/composables/useModificar'

const { verificarPermiso } = useAuth()
const { servicios, isLoading } = useServicios()
const { deleteMutation } = useEliminar()
const { updateMutation } = useModificar()

interface Props {
  isModule: boolean
}

defineProps<Props>()

const modificar = async (servicio: Servicio) => {
  updateMutation.mutate(servicio)
}

const deleteservicio = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  clave: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  descripcion: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="servicios"
    showGridlines
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="['clave', 'descripcion']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/servicios/lista-servicios/crear-servicio' }">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Nuevo"
            outlined
            v-if="isModule && !verificarPermiso('MODULO_SERVICIOS_CREAR')"
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
    <Column field="clave" header="Clave" sortable></Column>
    <Column field="descripcion" header="" sortable />
    <Column v-if="isModule">
      <template #body="{ data }">
        <InputSwitch
          v-model="data.estatus"
          @change="modificar(data)"
          v-if="!verificarPermiso('MODULO_SERVICIOS_MODIFICAR')"
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
            :to="{ name: `modificar-servicio`, params: { id: data.id } }"
            v-if="isModule && !verificarPermiso('MODULO_SERVICIOS_MODIFICAR')"
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
            v-if="isModule && !verificarPermiso('MODULO_SERVICIOS_ELIMINAR')"
            @click="deleteservicio(data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
