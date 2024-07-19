<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/cajas/components/FormularioCaja.vue'
import { ref, watch } from 'vue'
import { useCajaStore } from '@/stores/caja'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import { useCrear } from '@/modules/cajas/composables/useCrear'

const cajaStore = useCajaStore()
cajaStore.setCaja({} as Caja)
const visible = ref(true)

const { caja, crearMutation, isPending, isSuccess } = useCrear()

cajaStore.resetErrors()

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
    header="Crear caja"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/cajas' })"
  >
    <Formulario id="formulario" @submit.prevent="crearMutation.mutate(caja)" />
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
