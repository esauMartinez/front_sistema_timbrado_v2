<script setup lang="ts">
import TablaCajas from '@/modules/cajas/components/TablaCajas.vue'
</script>

<template>
  <TablaCajas :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
