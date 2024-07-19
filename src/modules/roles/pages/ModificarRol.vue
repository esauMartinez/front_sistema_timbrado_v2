<script lang="ts" setup>
import { ref } from 'vue'
import Formulario from '@/modules/roles/components/FormularioRol.vue'
import { router } from '@/router'
import { useRoute } from 'vue-router'
import { useRol } from '@/modules/roles/composables/useRol'

import { useModificar } from '@/modules/roles/composables/useModifiar'
import { watch } from 'vue'

const visible = ref(true)
const route = useRoute()
const { rol } = useRol(+route.params.id)
const { modulos, isPending, isSuccess, updateMutation } = useModificar()

const updateRol = () => {
  const obj: any = {
    id: rol.value.id,
    nombre: rol.value.nombre,
    permisos: modulos.value
  }

  updateMutation.mutate(obj)
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
    header="Agregar Rol"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Formulario @submit.prevent="updateRol" id="formulario" />
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

<style scoped>
.div-formulario {
  position: sticky;
  top: 0;
  z-index: 1001;
}
</style>
