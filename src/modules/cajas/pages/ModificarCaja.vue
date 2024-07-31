<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/cajas/components/FormularioCaja.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useModificar } from '@/modules/cajas/composables/useModificar'
import { useCajaStore } from '@/stores/caja'
import { useCaja } from '@/modules/cajas/composables/useCaja'

const route = useRoute()
const visible = ref(true)

const cajaStore = useCajaStore()
const { caja } = useCaja(+route.params.id)

const { updateMutation, isPending, isSuccess } = useModificar()
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
    header="Modificar caja"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/cajas' })"
  >
    <Formulario id="formulario" @submit.prevent="updateMutation.mutate(caja)" />
    <template #footer>
      <Button
        label="Guardar"
        icon="pi pi-check"
        type="submit"
        form="formulario"
        severity="success"
        :loading="isPending"
      />
    </template>
  </Dialog>
</template>
