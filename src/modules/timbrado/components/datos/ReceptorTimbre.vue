<script setup lang="ts">
import type { Cliente } from '@/modules/clientes/interfaces/cliente';

interface Props {
  receptor: Cliente | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Receptor">
    <p>Razon social: {{ receptor?.razon_social }}</p>
    <p>RFC: {{ receptor?.rfc }}</p>
    <p>Regimen fiscal: {{ receptor?.regimen_fiscal }}</p>
    <p>Calle: {{ receptor?.calle }}</p>
    <p>Colonia: {{ receptor?.colonia }}</p>
    <p>Municipio: {{ receptor?.municipio }}</p>
    <p>Estado: {{ receptor?.estado }}</p>
    <p>Pais: {{ receptor?.pais }}</p>
    <p>Tipo figura: {{ '01' }}</p>
  </Fieldset>
</template>

<style scoped></style>
