<script lang="ts" setup>
import { ref } from 'vue'
import { router } from '@/router'
import { useServicioStore } from '@/stores/servicio'
import { useCrear } from '@/modules/servicios/composables/useCrear'
import { watch } from 'vue'
import Formulario from '@/modules/servicios/components/FormularioServicio.vue'
import type { Servicio } from '@/modules/servicios/interfaces/servicio'

const servicioStore = useServicioStore()
const { servicio, isPending, isSuccess, crearMutation } = useCrear()
const visible = ref(true)

servicioStore.setServicio({} as Servicio)
servicioStore.resetErrors()

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
    header="Agregar servicio"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Formulario @submit.prevent="crearMutation.mutate(servicio)" id="formulario" />

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
