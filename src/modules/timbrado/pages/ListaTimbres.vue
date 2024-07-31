<script setup lang="ts">
import TablaTimbres from '@/modules/timbrado/components/timbres/TablaTimbres.vue'
import { router } from '@/router'
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="`Timbres`"
    :style="{ width: '60vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <TablaTimbres />
  </Dialog>

  <RouterView />
</template>

<style scoped></style>
