<script lang="ts" setup>
import { ref, watch } from 'vue'
import { router } from '@/router'
import Formulario from '@/modules/usuarios/components/FormularioUsuario.vue'
import { useRoute } from 'vue-router'
import { useUsuario } from '@/modules/usuarios/composables/useUsuario'
import { useModificar } from '@/modules/usuarios/composables/useModificar'
import { useUsuarioStore } from '@/stores/usuario'

const route = useRoute()
const visible = ref(true)
const { usuario } = useUsuario(+route.params.id)
const { isPending, isSuccess, updateMutation } = useModificar()
const usuarioStore = useUsuarioStore()
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
    <Formulario @submit.prevent="updateMutation.mutate(usuario)" id="formulario" />
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
