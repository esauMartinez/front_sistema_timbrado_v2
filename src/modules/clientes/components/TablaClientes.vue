<script setup lang="ts">
import useEliminar from '@/modules/clientes/composables/clientes/useEliminar'
import useClientes from '@/modules/clientes/composables/clientes/useClientes'
import useModificar from '@/modules/clientes/composables/clientes/useModificar'
import { question } from '@/helpers/messages'
// import { useTrip } from '@/composables/useTrip'
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useAuth } from '@/auth/composables/useAuth'

const { verificarPermiso } = useAuth()
const { deleteMutation } = useEliminar()
const { isLoading, clientes } = useClientes()
const { modificar } = useModificar()
// const { selectCliente } = useTrip()

const deleteCliente = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

interface Props {
  isModule: boolean
}

defineProps<Props>()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  razon_social: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  pais: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  rfc: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="clientes"
    showGridlines
    :size="'small'"
    paginator
    :rows="10"
    tableStyle="min-width: 50rem"
    :loading="isLoading"
    rowHover
    :globalFilterFields="['razon_social', 'pais', 'rfc']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/clientes/lista-clientes/crear-cliente' }">
          <Button icon="pi pi-plus" label="Nuevo" outlined />
        </router-link>
        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
      </div>
    </template>
    <Column field="razon_social" header="Nombre"></Column>
    <Column field="pais" header="Pais"></Column>
    <Column field="rfc" header="RFC"></Column>
    <Column header="Estatus" v-if="isModule">
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <InputSwitch
            v-model="data.estatus"
            @change="modificar(data)"
            v-if="!verificarPermiso('MODULO_CLIENTES_MODIFICAR')"
          />
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link :to="{ name: 'contactos-cliente', params: { id: data.id } }" v-if="isModule">
            <Button icon="pi pi-phone" severity="info" />
          </router-link>
        </div>
      </template>
    </Column>
    <!-- boton para seleccionar el cliente cuando se muestran desde el trip -->
    <!-- <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <Button icon="pi pi-plus" v-if="!isModule && data.estatus" @click="selectCliente(data)" />
        </div>
      </template>
    </Column> -->
    <!-- boton para seleccionar el cliente cuando se muestran desde el trip -->
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link :to="{ name: 'bitacora-cliente', params: { id: data.id } }" v-if="isModule">
            <Button icon="pi pi-bars" severity="info" />
          </router-link>
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: 'modificar-cliente', params: { id: data.id } }"
            v-if="isModule && !verificarPermiso('MODULO_CLIENTES_MODIFICAR')"
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
            :value="data.id"
            @click="deleteCliente(data.id)"
            v-if="isModule && !verificarPermiso('MODULO_CLIENTES_ELIMINAR')"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
