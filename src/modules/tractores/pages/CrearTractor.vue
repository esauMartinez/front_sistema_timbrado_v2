<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/tractores/components/FormularioTractor.vue'
import { ref, watch } from 'vue'
import { useTractorStore } from '@/stores/tractor'
import { useCrear } from '@/modules/tractores/composables/useCrear'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'

const tractorStore = useTractorStore()
const visible = ref(true)

const { tractor, crearMutation, isPending, isSuccess } = useCrear()

tractorStore.setTractor({} as Tractor)
tractorStore.resetErrors()

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false
  }
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Crear tractor"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/tractores' })"
  >
    <Formulario id="formulario" @submit.prevent="crearMutation.mutate(tractor)" />
    <template #footer>
      <ButtonGroup>
        <Button
          label="Guardar"
          icon="pi pi-check"
          type="submit"
          form="formulario"
          severity="success"
          :loading="isPending"
        />
      </ButtonGroup>
    </template>
  </Dialog>
</template>
