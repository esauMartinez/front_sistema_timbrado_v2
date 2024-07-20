<script lang="ts" setup>
import { ref } from 'vue'
import { severity } from '@/pipes/severity'
import { FilterMatchMode } from 'primevue/api'
import { useTrip } from '@/composables/useTrip'
import { useOperadores } from '@/modules/operadores/composables/useOperadores'
import { useEliminar } from '@/modules/operadores/composables/useEliminar'
import { question } from '@/helpers/messages'
import { useAuth } from '@/auth/composables/useAuth'
import { useModificar } from '@/modules/operadores/composables/useModifiar'
import type { Operador } from '../interfaces/operador'

const { verificarPermiso } = useAuth()
const { selectOperador } = useTrip()

const { operadores, isLoading } = useOperadores()
const { eliminarMutation } = useEliminar()
const { updateMutation } = useModificar()

const deleteOperador = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    eliminarMutation.mutate(id)
  }
}

const updateOperador = (operador: Operador) => {
  operador.estatus = operador.estatus ? false : true
  const formData = new FormData()
  formData.append('operador', JSON.stringify(operador))
  updateMutation.mutate(formData)
}

interface Props {
  isModule: boolean
}

defineProps<Props>()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  paterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  meterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  estado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  licencia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  vencimiento_licencia: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="operadores"
    showGridlines
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="[
      'nombre',
      'paterno',
      'materno',
      'rfc',
      'estado',
      'licencia',
      'vencimiento_licencia'
    ]"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/operadores/lista-operadores/crear-operador' }">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Nuevo"
            outlined
            v-if="isModule && !verificarPermiso('MODULO_OPERADORES_CREAR')"
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
    <Column field="nombre" header="Nombre" sortable>
      <template #body="{ data }">
        {{ data.nombre }} {{ data.paterno }} {{ data.materno }}
      </template>
    </Column>
    <Column field="rfc" header="RFC" sortable />
    <Column field="estado" header="Estado" sortable />
    <Column field="licencia" header="Licencia" sortable />
    <Column header="Vencimineto de la licencia">
      <template #body="{ data }">
        {{ data.descripcion_vencimiento }}
      </template>
    </Column>
    <Column v-if="isModule">
      <template #body="{ data }">
        <InputSwitch
          v-model="data.estatus"
          @click="updateOperador(data)"
          v-if="!verificarPermiso('MODULO_OPERADORES_MODIFICAR')"
        />
      </template>
    </Column>
    <Column header="Estatus">
      <template #body="{ data }">
        <Tag :severity="severity(data.estatus)" :value="data.estatus ? 'Activo' : 'Inactivo'"></Tag>
      </template>
    </Column>
    <Column header="Acciones">
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: `modificar-operador`, params: { id: data.id } }"
            v-if="isModule && !verificarPermiso('MODULO_OPERADORES_MODIFICAR')"
          >
            <Button icon="pi pi-pencil" severity="warning" class="mr-2" />
          </router-link>

          <Button
            icon="pi pi-trash"
            severity="danger "
            @click="deleteOperador(data.id)"
            class="mr-2"
            v-if="isModule && !verificarPermiso('MODULO_OPERADORES_ELIMINAR')"
          />

          <Button
            icon="pi pi-plus"
            v-if="!isModule && data.estatus"
            @click="selectOperador(data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
