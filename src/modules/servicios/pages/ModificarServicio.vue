<script lang="ts" setup>
import { ref } from 'vue'
import { router } from '@/router'
import { useServicioStore } from '@/stores/servicio'
import { useModificar } from '@/modules/servicios/composables/useModificar'
import { useServicio } from '../composables/useServicio'
import { useRoute } from 'vue-router'
import Formulario from '@/modules/servicios/components/FormularioServicio.vue'
import { watch } from 'vue'

const route = useRoute()
const servicioStore = useServicioStore()
const { servicio } = useServicio(+route.params.id)
const { isPending, isSuccess, updateMutation } = useModificar()
const visible = ref(true)

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
    header="modificar servicio"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.go(-1)"
    :loading="isPending"
  >
    <Formulario @submit.prevent="updateMutation.mutate(servicio)" id="formulario" />

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
