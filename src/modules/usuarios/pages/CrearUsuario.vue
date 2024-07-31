<script lang="ts" setup>
import { ref, watch } from 'vue'
import { router } from '@/router'
import Formulario from '@/modules/usuarios/components/FormularioUsuario.vue'
import { useCrear } from '@/modules/usuarios/composables/useCrear'
import { useUsuarioStore } from '@/stores/usuario'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

const usuarioStore = useUsuarioStore()
const { usuario, isPending, isSuccess, crearMutation } = useCrear()
const visible = ref(true)

usuarioStore.setUsuario({} as Usuario)
usuarioStore.resetErrors()

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
    header="Modificar usuario"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Formulario @submit.prevent="crearMutation.mutate(usuario)" id="formulario" />
    <template #footer>
      <Button
        label="Modificar"
        icon="pi pi-pencil"
        type="submit"
        form="formulario"
        severity="warning"
        :loading="isPending"
      />
    </template>
  </Dialog>
</template>
