<script lang="ts" setup>
import { ref } from 'vue'
import { router } from '@/router'
import { useRolStore } from '@/stores/rol'
import type { Rol } from '@/modules/roles/interfaces/rol'
import Formulario from '@/modules/roles/components/FormularioRol.vue'
import { useCrear } from '@/modules/roles/composables/useCrear'
import { watch } from 'vue'

const rolStore = useRolStore()
rolStore.resetErrors()
rolStore.setRol({} as Rol)
const visible = ref(true)

const { rol, isPending, isSuccess, crearMutation } = useCrear()

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
    <Formulario @submit.prevent="crearMutation.mutate(rol)" id="formulario" />
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
