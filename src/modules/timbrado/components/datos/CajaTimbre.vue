<script setup lang="ts">
import type { Caja } from '@/modules/cajas/interfaces/caja';

interface Props {
  caja: Caja | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Caja">
    <p>Numero economico: {{ caja?.numero_economico }}</p>
    <p>Matricula: {{ caja?.matricula }}</p>
    <p>Subtipo remolque: {{ caja?.configuracion }}</p>
  </Fieldset>
</template>

<style scoped></style>