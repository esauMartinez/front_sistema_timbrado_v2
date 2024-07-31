<script setup lang="ts">
import { ref } from 'vue'
import FormularioCliente from '@/modules/clientes/components/FormularioCliente.vue'
import useCrear from '@/modules/clientes/composables/clientes/useCrear'
import { router } from '@/router'
import { watch } from 'vue'
import { useClienteStore } from '@/stores/cliente'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'

const clienteStore = useClienteStore()
const { cliente, isLoading, isCreated, crearMutation } = useCrear()
const visible = ref(true)

clienteStore.setCliente({} as Cliente)

watch(isCreated, () => {
  visible.value = false
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Datos del cliente"
    :style="{ width: '50%' }"
    v-on:after-hide="router.push({ path: '/clientes' })"
    :position="'top'"
    pt:mask:class="backdrop-blur-sm"
  >
    <FormularioCliente id="form" @submit.prevent="crearMutation.mutate(cliente)" />

    <template #footer>
      <div class="pr-3 pl-3">
        <Button type="submit" form="form" :loading="isLoading" label="Guardar cliente" />
      </div>
    </template>
  </Dialog>
</template>

<style scoped></style>
