<script setup lang="ts">
import NavBar from '@/common/layout/NavBar.vue'
</script>

<template>
  <NavBar :modulo="'Cajas'" />

  <div class="col-8 col-offset-2 mt-4">
    <Card>
      <template #content>
        <router-view></router-view>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
