<script setup lang="ts">
import { useCajaStore } from '@/stores/caja'
import { storeToRefs } from 'pinia'

const cajaStore = useCajaStore()
const { bitacora } = storeToRefs(cajaStore)
</script>

<template>
  <div v-if="bitacora.length == 0">
    <h2 class="text-center">No hay historial de esta caja</h2>
  </div>
  <DataTable :value="bitacora" showGridlines stripedRows v-else>
    <Column field="numero_trip" header="Trip"></Column>
    <Column field="patio" header="Patio"></Column>
    <Column field="numero_economico" header="Numero economico"></Column>
  </DataTable>
</template>

