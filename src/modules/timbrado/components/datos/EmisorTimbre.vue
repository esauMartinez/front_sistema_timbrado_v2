<script setup lang="ts">
import type { Empresa } from '@/interfaces/empresa.model'

interface Props {
  emisor: Empresa | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Emisor">
    <p>Razon social: {{ emisor?.razon_social }}</p>
    <p>RFC: {{ emisor?.rfc }}</p>
    <p>Regimen fiscal: {{ emisor?.clave_regimen_fiscal }}</p>
    <p>Calle: {{ emisor?.calle }}</p>
    <p>Colonia: {{ emisor?.colonia }}</p>
    <p>Municipio: {{ emisor?.municipio }}</p>
    <p>Estado: {{ emisor?.estado }}</p>
    <p>Pais: {{ emisor?.pais }}</p>
    <p>Tipo figura: {{ '01' }}</p>
  </Fieldset>
</template>

<style scoped></style>
