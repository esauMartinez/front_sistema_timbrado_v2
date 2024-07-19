<script setup lang="ts">
import NavBar from "@/common/layout/NavBar.vue";
</script>

<template>
  <NavBar :modulo="'Trips'" />

  <Card class="mt-4">
    <template #content>
      <router-view></router-view>
    </template>
  </Card>
</template>

<style scoped></style>
