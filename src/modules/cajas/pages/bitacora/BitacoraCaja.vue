<script setup lang="ts">
import { router } from '@/router'
import { ref } from 'vue'
import BitacoraCaja from '@/modules/cajas/components/BitacoraCaja.vue'
import { useBitacora } from '@/modules/cajas/composables/useBitacora'
import { useRoute } from 'vue-router'

const route = useRoute()
const visible = ref(true)

useBitacora(route.params.id.toString())
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Bitacora de caja"
    :style="{ width: '70%' }"
    v-on:after-hide="router.push({ path: '/cajas' })"
    :position="'top'"
    pt:mask:class="backdrop-blur-sm"
  >
    <BitacoraCaja />
  </Dialog>
</template>

<style scoped></style>
