<script setup lang="ts">
import { router } from '@/router'
import { ref } from 'vue'
import { usePdf } from '@/modules/timbrado/composables/usePdf'
import { useRoute } from 'vue-router'

const visible = ref(true)
const route = useRoute()

const { pdf } = usePdf(+route.params.id)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="PDF Trip"
    :style="{ width: '60vw' }"
    v-on:after-hide="router.push('/timbrado')"
  >
    <iframe :src="pdf" class="pdf"></iframe>
  </Dialog>
</template>

<style scoped>
.pdf {
  width: 100%;
  height: 80vh;
}
</style>
