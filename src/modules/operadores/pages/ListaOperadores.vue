<script setup lang="ts">
import TablaOperadores from "@/modules/operadores/components/TablaOperadores.vue";
</script>
<template>
  <TablaOperadores :is-module="true" />

  <RouterView />
</template>

<style scoped></style>
