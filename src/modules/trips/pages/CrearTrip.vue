<script lang="ts" setup>
import { ref } from 'vue'
import { watch } from 'vue'
import { router } from '@/router'
import Formulario from '@/modules/trips/components/FormularioTrip.vue'
import { useCrear } from '@/modules/trips/composables/useCrear'
import { useTripStore } from '@/stores/trip'
import type { Trip } from '@/modules/trips/interfaces/trip'

const visible = ref(true)
const tripStore = useTripStore()
const { trip, isPending, isSuccess, crearMutation } = useCrear()
tripStore.resetErrors()
tripStore.setTrip({} as Trip)

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false
  }
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Nuevo trip"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/trips' })"
  >
    <Formulario id="formulario" @submit.prevent="crearMutation.mutate(trip)" />
    <template #footer>
      <div class="pr-3 pl-3">
        <Button
          label="Guardar"
          icon="pi pi-check"
          type="submit"
          form="formulario"
          severity="success"
          :loading="isPending"
        />
      </div>
    </template>
  </Dialog>
</template>
