<script lang="ts" setup>
import { ref, watch } from 'vue'
import { router } from '@/router'
import Formulario from '@/modules/operadores/components/FormularioOperador.vue'
import { useCrear } from '@/modules/operadores/composables/useCrear'
import { useOperadorStore } from '@/stores/operador'
import type { Operador } from '@/modules/operadores/interfaces/operador'

const operadorStore = useOperadorStore()
const { operador, gafete, isPending, isSuccess, crearMutation } = useCrear()
const visible = ref(true)

operadorStore.setOperador({} as Operador)

const postOperador = () => {
  const formData = new FormData()
  formData.append('gafete', gafete.value)
  formData.append('operador', JSON.stringify(operador.value))
  crearMutation.mutate(formData)
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
    header="Agregar operador"
    :style="{ width: '60vw' }"
    v-on:after-hide="router.push({ path: '/operadores' })"
  >
    <Formulario @submit.prevent="postOperador" id="formulario" />
    <template #footer>
      <div class="pr-3 pl-3">
        <Button
          label="Guardar"
          icon="pi pi-check"
          type="submit"
          form="formulario"
          severity="primary"
          :loading="isPending"
        />
      </div>
    </template>
  </Dialog>
</template>
