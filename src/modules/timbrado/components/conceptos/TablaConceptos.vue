<script setup lang="ts">
import { useEliminar } from '@/modules/trips/composables/conceptos/useEliminar'
import type { Concepto } from '@/modules/trips/interfaces/concepto'

interface Props {
  conceptos: Concepto[] | undefined
}

defineProps<Props>()

const { deleteMutation } = useEliminar()
</script>

<template>
  <Fieldset legend="Conceptos">
    <DataTable
      showGridlines
      :value="conceptos"
      stripedRows
      :class="[{ 'p-datatable-sm': true }]"
      dataKey="id"
    >
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-end">
          <router-link :to="{ name: 'crear-concepto' }">
            <Button icon="pi pi-plus" severity="success" label="Agregar concepto" />
          </router-link>
        </div>
      </template>
      <Column field="clave" header="Clave"></Column>
      <Column field="nombre" header="Descripcion"></Column>
      <Column field="monto" header="Monto"></Column>
      <Column field="iva" header="IVA"></Column>
      <Column field="retencion" header="Retencion"></Column>
      <Column>
        <template #body="{ data }">
          <div class="flex justify-content-center">
            <Button icon="pi pi-trash" severity="danger" @click="deleteMutation.mutate(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Fieldset>
</template>

<style scoped></style>
