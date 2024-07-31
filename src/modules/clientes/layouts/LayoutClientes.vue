<script setup lang="ts">
import NavBar from '@/common/layout/NavBar.vue'
import { useFiscales } from '../composables/useFiscales'

useFiscales()
</script>
<template>
  <NavBar :modulo="'Clientes'" />

  <Card class="col-10 col-offset-1 mt-4">
    <template #content>
      <router-view></router-view>
    </template>
  </Card>
</template>

<style scoped></style>
