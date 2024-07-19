<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/patios/components/FormularioPatio.vue'
import { ref, watch } from 'vue'
import { useCrear } from '@/modules/patios/composables/useCrear'
import { usePatioStore } from '@/stores/patio'
import type { Patio } from '@/modules/patios/interfaces/patio'

const patioStore = usePatioStore()
patioStore.setPatio({} as Patio)
const visible = ref(true)

const { patio, crearMutation, isPending, isSuccess } = useCrear()

patioStore.resetErrors()

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
    header="Crear patio"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/patios' })"
  >
    <Formulario id="formulario" @submit.prevent="crearMutation.mutate(patio)" />
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
