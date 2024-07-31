<script setup lang="ts">
import type { Empresa } from '@/interfaces/empresa.model'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import type { Trip } from '@/modules/trips/interfaces/trip'

interface Props {
  trip: Trip | undefined
  empresa: Empresa | undefined
  tractor: Tractor | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Permiso">
    <p>Permiso SCT: {{ empresa?.permiso_sct }}</p>
    <p>Numero permiso SCT: {{ empresa?.numero_permiso_sct }}</p>
    <p>Aseguradora: {{ tractor?.aseguradora }}</p>
    <p>Poliza: {{ tractor?.numero_poliza }}</p>
  </Fieldset>
</template>

<style scoped></style>
