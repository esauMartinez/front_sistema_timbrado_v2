<script setup lang="ts">
import NavBar from '@/common/layout/NavBar.vue'
</script>

<template>
  <NavBar :modulo="'Patios'" />

  <div class="col-10 col-offset-1 mt-4">
    <Card>
      <template #content>
        <router-view></router-view>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
