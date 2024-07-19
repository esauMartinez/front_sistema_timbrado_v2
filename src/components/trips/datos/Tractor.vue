<script lang="ts" setup>
import { ref } from 'vue'
import Tabla from '@/modules/tractores/components/TablaTactores.vue'
import { router } from '@/router'

const visible = ref(true)
</script>

<template>
  <Panel header="Tractor">
    <Dialog
      v-model:visible="visible"
      header=" "
      modal
      :style="{ width: '95vw' }"
      v-on:after-hide="router.go(-1)"
    >
      <Tabla :isModule="false" />
    </Dialog>
  </Panel>
</template>
