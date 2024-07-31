<script setup lang="ts">
import type { Tractor } from '@/modules/tractores/interfaces/tractor'

interface Props {
  tractor: Tractor | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Tractor">
    <p>Modelo: {{ tractor?.modelo }}</p>
    <p>Matricula: {{ tractor?.matricula }}</p>
    <p>Configuracion vehicular: {{ tractor?.configuracion }}</p>
  </Fieldset>
</template>

<style scoped></style>
