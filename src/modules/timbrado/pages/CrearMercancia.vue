<script lang="ts" setup>
import { ref } from 'vue'
import { router } from '@/router'
import Formulario from '@/modules/timbrado/components/mercancias/FormularioMercancia.vue'
import { useCrear } from '@/modules/trips/composables/mercancias/useCrear'
import { watch } from 'vue'
import { useTripStore } from '@/stores/trip'
import type { Mercancia } from '@/modules/trips/interfaces/mercancia'

const visible = ref(true)
const { mercancia, trip, isPending, isSuccess, crearMutation } = useCrear()
const tripStore = useTripStore()

tripStore.setMercancia({} as Mercancia)
tripStore.resetErrorsMercancia()

const guardarMercancia = () => {
  mercancia.value.trip_id = trip.value.id
  crearMutation.mutate(mercancia.value)
}

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
    header="Agregar mercancia"
    :style="{ width: '40vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Formulario @submit.prevent="guardarMercancia" id="formulario" />
    <template #footer>
      <Button
        label="Guardar"
        icon="pi pi-check"
        type="submit"
        form="formulario"
        severity="primary"
        :loading="isPending"
      />
    </template>
  </Dialog>
</template>
