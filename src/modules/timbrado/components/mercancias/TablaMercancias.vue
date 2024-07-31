<script setup lang="ts">
import { useEliminar } from '@/modules/trips/composables/mercancias/useEliminar'
import type { Mercancia } from '@/modules/trips/interfaces/mercancia'

interface Props {
  mercancias: Mercancia[] | undefined
}

defineProps<Props>()

const { isPending, deleteMutation } = useEliminar()
</script>

<template>
  <Fieldset legend="Mercancias">
    <DataTable showGridlines :value="mercancias" stripedRows :class="[{ 'p-datatable-sm': true }]">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-end">
          <router-link :to="{ name: 'crear-mercancia' }">
            <Button icon="pi pi-plus" severity="success" label="Agregar mercancia" />
          </router-link>
        </div>
      </template>
      <Column header="Producto">
        <template #body="{ data }"> {{ data.clave_producto }} - {{ data.producto }} </template>
      </Column>
      <Column header="Unidad de medida">
        <template #body="{ data }"> {{ data.clave_unidad }} - {{ data.unidad_medida }} </template>
      </Column>
      <Column field="cantidad" header="Cantidad"></Column>
      <Column field="peso" header="Peso"></Column>
      <Column field="fraccion_arancelaria" header="F. Arancelaria"></Column>
      <Column field="pedimento" header="Pedimento"></Column>
      <Column field="embalaje" header="Embalaje"></Column>
      <Column field="tipo_documento" header="T. documento"></Column>
      <Column field="tipo_materia" header="T. materia"></Column>
      <Column field="descripcion_materia" header="D. materia"></Column>
      <Column field="identificador_documento_aduanero" header="I. aduanero"></Column>
      <Column field="rfc_importacion" header="RFC importacion"></Column>
      <Column>
        <template #body="{ data }">
          <div class="flex justify-content-center">
            <Button
              icon="pi pi-trash"
              severity="danger"
              :loading="isPending"
              @click="deleteMutation.mutate(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </Fieldset>

  <!-- <router-view></router-view> -->
</template>

<style scoped></style>
