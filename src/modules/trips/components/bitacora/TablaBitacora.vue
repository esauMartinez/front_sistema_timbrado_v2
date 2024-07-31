<script setup lang="ts">
import { useBitacora } from '@/modules/trips/composables/bitacora/useBitacora'
import { router } from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const { bitacora, isLoading } = useBitacora(+route.params.id)

const visible = ref(true)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Bitacora"
    :style="{ width: '50vw' }"
    :class="[{ 'p-datatable-sm': true }]"
    :loading="isLoading"
    v-on:after-hide="router.push({ path: '/trips' })"
  >
    <DataTable :value="bitacora" showGridlines stripedRows>
      <Column field="evento" header="Evento"></Column>
      <Column header="Usuario">
        <template #body="{ data }">
          <span :class="{ 'text-red-500': data.usuario === null }">
            {{ data.usuario === null ? 'No hay registro de usuario' : data.usuario }}
          </span>
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>

<style scoped></style>
