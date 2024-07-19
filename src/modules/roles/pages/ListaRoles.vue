<script setup lang="ts">
import TablaRoles from '@/modules/roles/components/TablaRoles.vue'
</script>

<template>
  <TablaRoles :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
