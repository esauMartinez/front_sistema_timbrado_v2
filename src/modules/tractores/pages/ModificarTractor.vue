<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/tractores/components/FormularioTractor.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTractor } from '@/modules/tractores/composables/useTractor'
import { useModificar } from '@/modules/tractores/composables/useModificar'
import { useTractorStore } from '@/stores/tractor'

const route = useRoute()
const visible = ref(true)

const tractorStore = useTractorStore()
const { tractor } = useTractor(+route.params.id)

const { updateMutation, isPending, isSuccess } = useModificar()
tractorStore.resetErrors()

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
    header="Modificar tractor"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/tractores' })"
  >
    <Formulario id="formulario" @submit.prevent="updateMutation.mutate(tractor)" />
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
