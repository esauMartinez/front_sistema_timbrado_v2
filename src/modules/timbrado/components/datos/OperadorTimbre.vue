<script setup lang="ts">
import type { Operador } from '@/modules/operadores/interfaces/operador';

interface Props {
  operador: Operador | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Operador">
    <p>Nombre: {{ operador?.nombre }}</p>
    <p>RFC: {{ operador?.rfc }}</p>
    <p>Licencia: {{ operador?.licencia }}</p>
  </Fieldset>
</template>

<style scoped></style>