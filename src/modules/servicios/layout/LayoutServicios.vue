<script setup lang="ts">
import NavBar from "@/common/layout/NavBar.vue";
</script>

<template>
  <NavBar :modulo="'Cajas'" />

  <Card class="col-8 col-offset-2 mt-4">
    <template #content>
      <router-view></router-view>
    </template>
  </Card>
</template>

<style scoped></style>
