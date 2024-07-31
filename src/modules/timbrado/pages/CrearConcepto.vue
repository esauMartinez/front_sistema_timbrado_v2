<script lang="ts" setup>
import { router } from '@/router'
import { ref, watch } from 'vue'
import FormularioConcepto from '../components/conceptos/FormularioConcepto.vue'
import { useCrear } from '@/modules/trips/composables/conceptos/useCrear'
import { useTripStore } from '@/stores/trip'
import type { Concepto } from '@/modules/trips/interfaces/concepto'

const visible = ref(true)
const tripStore = useTripStore()
const { concepto, trip, isPending, isSuccess, crearMutation } = useCrear()

tripStore.resetErrorsConcepto()
tripStore.setConcepto({} as Concepto)

const guardarConcepto = () => {
  concepto.value.trip_id = trip.value.id
  crearMutation.mutate(concepto.value)
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
    header="Agregar concepto"
    :style="{ width: '30vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <FormularioConcepto @submit.prevent="guardarConcepto" id="formulario" />
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
