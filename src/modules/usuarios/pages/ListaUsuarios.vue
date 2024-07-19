<script setup lang="ts">
import TablaUsuarios from '@/modules/usuarios/components/TablaUsuarios.vue'
</script>

<template>
  <TablaUsuarios :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
