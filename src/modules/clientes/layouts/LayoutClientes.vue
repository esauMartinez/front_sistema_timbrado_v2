<script setup lang="ts">
import NavBar from '@/common/layout/NavBar.vue'
import { useFiscales } from '../composables/useFiscales'

useFiscales()
</script>
<template>
  <NavBar :modulo="'Clientes'" />

  <Card class="mt-4">
    <template #content>
      <router-view></router-view>
    </template>
  </Card>
</template>

<style scoped></style>
