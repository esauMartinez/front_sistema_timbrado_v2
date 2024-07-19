<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/trips/components/FormularioTrip.vue'
import { ref } from 'vue'
import { useCrear } from '@/modules/trips/composables/useCrear'

const { trip, crearMutation } = useCrear()

const visible = ref(true)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Nuevo trip"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/trips' })"
  >
    <Formulario id="formulario" />
    {{ trip }}
    <template #footer>
      <ButtonGroup>
        <Button
          label="Guardar"
          icon="pi pi-check"
          type="submit"
          form="formulario"
          severity="success"
        />
      </ButtonGroup>
    </template>
  </Dialog>
</template>
