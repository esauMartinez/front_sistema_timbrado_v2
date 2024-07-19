<script setup lang="ts">
import TablaClientes from "@/modules/clientes/components/TablaClientes.vue";
</script>
<template>
  <TablaClientes :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
