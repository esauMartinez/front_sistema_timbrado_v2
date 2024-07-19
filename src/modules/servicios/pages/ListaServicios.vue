<script setup lang="ts">
import TablaServicios from '@/modules/servicios/components/TablaServicios.vue'
</script>

<template>
  <TablaServicios :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
