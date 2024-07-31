<script setup lang="ts">
import type { Trip } from '@/modules/trips/interfaces/trip'

interface Props {
  trip: Trip | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Datos">
    <p>Version: 3.1</p>
    <p>Serie: CP</p>
    <p>Folio: {{ trip?.numero_trip }}</p>
    <p>Moneda: {{ trip?.moneda }}</p>
    <p>Tipo de cambio: {{ trip?.tipo_cambio }}</p>
    <p>Tipo de comprobante: I-ingreso</p>
    <p>Metodo de pago: {{ trip?.metodo_pago }}</p>
    <p>Lugar de expedicion: {{ trip?.empresa?.codigo_postal }}</p>
  </Fieldset>
</template>

<style scoped></style>
