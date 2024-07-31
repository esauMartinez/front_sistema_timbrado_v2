<script setup lang="ts">
import type { Trip } from '@/modules/trips/interfaces/trip'

interface Props {
  trip: Trip | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Tipo de viaje">
    <p>Tipo de viaje: {{ trip?.tipo_viaje }}</p>
    <p>Ventana de carga: {{ trip?.ventana_carga }}</p>
    <p>Ventana de entrega: {{ trip?.ventana_entrega }}</p>
  </Fieldset>
</template>

<style scoped></style>