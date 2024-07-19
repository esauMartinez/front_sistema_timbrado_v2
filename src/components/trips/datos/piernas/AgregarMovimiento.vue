<script lang="ts" setup>
import { ref } from 'vue'
import { router } from '@/router'
import Tabla from '@/modules/patios/components/TablaPatios.vue'
const visible = ref(true)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header=" "
    :style="{ width: '95vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Tabla :isModule="false" />
  </Dialog>
</template>
