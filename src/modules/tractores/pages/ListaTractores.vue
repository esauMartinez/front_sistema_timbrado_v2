<script setup lang="ts">
import TablaTractores from '@/modules/tractores/components/TablaTactores.vue'
</script>

<template>
  <TablaTractores :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
