<script setup lang="ts">
import NavBar from '@/common/layout/NavBar.vue'
</script>

<template>
  <NavBar :modulo="'Timbrado'" />

  <Card class="col-12 mt-4">
    <template #content>
      <router-view></router-view>
    </template>
  </Card>
</template>

<style scoped></style>