<script lang="ts" setup>
import { ref } from 'vue'
import { severity } from '@/pipes/severity'
import { FilterMatchMode } from 'primevue/api'
import { useCajas } from '@/modules/cajas/composables/useCajas'
import { useTrip } from '@/composables/useTrip'
import { question } from '@/helpers/messages'
import { useEliminar } from '../composables/useEliminar'
import { useAuth } from '@/auth/composables/useAuth'

const { verificarPermiso } = useAuth()
const { selectCaja } = useTrip()
const { cajas, isLoading } = useCajas()
const { deleteMutation } = useEliminar()

interface Props {
  isModule: Boolean
}

defineProps<Props>()

const deleteCaja = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  numero_economico: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  matricula: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  numero_poliza: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  vencimiento_poliza: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="cajas"
    showGridlines
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="['numero_economico', 'matricula', 'numero_poliza', 'vencimiento_poliza']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/cajas/lista-cajas/crear-caja' }">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Nuevo"
            outlined
            v-if="isModule && !verificarPermiso('MODULO_CAJAS_CREAR')"
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

    <Column header="Tipo de unidad">
      <template #body>
        <div class="d-flex justify-content-center align-items-center">
          <Avatar image="/remolque.png" size="large" />
        </div>
      </template>
    </Column>
    <Column field="numero_economico" header="Numero economico" sortable></Column>
    <Column field="matricula" header="Matricula" sortable></Column>
    <Column field="numero_poliza" header="Numero de poliza" sortable></Column>
    <Column header="Vencimineto de la poliza">
      <template #body="{ data }">
        {{ data.descripcion_vencimiento }}
      </template>
    </Column>

    <Column v-if="isModule">
      <template #body="{ data }">
        <InputSwitch v-model="data.estatus" v-if="!verificarPermiso('MODULO_CAJAS_MODIFICAR')" />
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
            :to="{ name: `bitacora-caja`, params: { id: data.numero_economico } }"
            v-if="isModule && !verificarPermiso('MODULO_CAJAS_VER')"
          >
            <Button icon="pi pi-book" severity="info" class="mr-2" />
          </router-link>

          <router-link
            :to="{ name: `modificar-caja`, params: { id: data.id } }"
            v-if="isModule && !verificarPermiso('MODULO_CAJAS_MODIFICAR')"
          >
            <Button icon="pi pi-pencil" severity="warning" class="mr-2" />
          </router-link>

          <Button
            icon="pi pi-trash"
            severity="danger "
            class="mr-2"
            v-if="isModule && !verificarPermiso('MODULO_CAJAS_ELIMINAR')"
            @click="deleteCaja(data.id)"
          />

          <Button icon="pi pi-plus" v-if="!isModule && data.estatus" @click="selectCaja(data)" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
