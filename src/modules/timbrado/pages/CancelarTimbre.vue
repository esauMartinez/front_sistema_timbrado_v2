<script setup lang="ts">
import { router } from '@/router'
import { ref, watch } from 'vue'
import Formulario from '@/modules/timbrado/components/cancelar/FormularioCancelar.vue'
import { useCancelar } from '@/modules/timbrado/composables/useCancelar'
import { useRoute } from 'vue-router'

const route = useRoute()
const { cancelacion, isPending, isSuccess, cancelarTimbreMutation } = useCancelar()
const visible = ref(true)

const cancelar = () => {
  cancelacion.value.id = +route.params.id_cancelacion
  console.log(cancelacion.value)
  cancelarTimbreMutation.mutate(cancelacion.value)
}

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
    header="Cancelar timbre"
    :style="{ width: '40vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Formulario id="formulario-cancelacion" @submit.prevent="cancelar" />
    <template #footer>
      <Button
        label="Cancelar timbre"
        icon="pi pi-check"
        type="submit"
        form="formulario-cancelacion"
        severity="success"
        :loading="isPending"
      />
    </template>
  </Dialog>
</template>

<style scoped></style>
