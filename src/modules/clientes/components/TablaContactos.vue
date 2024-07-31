<script setup lang="ts">
import type { Contacto } from '@/modules/clientes/interfaces/contacto'
import useEliminar from '../composables/contactos/useEliminar'
import { question } from '@/helpers/messages'
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'

interface Props {
  contactos: Contacto[]
}

defineProps<Props>()

const { deleteMutation } = useEliminar()

const deleteContacto = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  telefono: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="contactos"
    showGridlines
    dataKey="id"
    :size="'small'"
    paginator
    :rows="10"
    tableStyle="min-width: 50rem"
    rowHover
    :globalFilterFields="['nombre', 'telefono', 'email']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ name: 'crear-contacto' }">
          <Button label="Nuevo" outlined icon="pi pi-plus" />
        </router-link>
        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
      </div>
    </template>
    <Column field="nombre" header="Nombre"></Column>
    <Column field="telefono" header="Numero de telefono"></Column>
    <Column field="email" header="Email"></Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <!-- <router-link
            to=""
            @click="deleteContacto(data.id)"
            class="no-underline text-red-500 hover:text-700"
          >
            ELIMINAR
          </router-link> -->
          <Button icon="pi pi-trash" severity="danger" @click="deleteContacto(data.id)" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
