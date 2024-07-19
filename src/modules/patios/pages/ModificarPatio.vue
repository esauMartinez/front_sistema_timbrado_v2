<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/patios/components/FormularioPatio.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePatioStore } from '@/stores/patio'
import { usePatio } from '@/modules/patios/composables/usePatio'
import { useModificar } from '@/modules/patios/composables/useModifiar'

const route = useRoute()
const visible = ref(true)

const patioStore = usePatioStore()
const { patio } = usePatio(+route.params.id)

const { updateMutation, isPending, isSuccess } = useModificar()
patioStore.resetErrors()

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
    header="Modificar patio"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/patios' })"
  >
    <Formulario id="formulario" @submit.prevent="updateMutation.mutate(patio)" />
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
