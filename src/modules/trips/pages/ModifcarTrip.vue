<script lang="ts" setup>
import { router } from '@/router'
import Formulario from '@/modules/trips/components/FormularioTrip.vue'
import { ref, watch } from 'vue'
import { useTrip } from '@/modules/trips/composables/useTrip'
import { useRoute } from 'vue-router'
import { useModificar } from '@/modules/trips/composables/useModificar'
import { useAuth } from '@/auth/composables/useAuth'
import { useTripStore } from '@/stores/trip'

const { verificarPermiso } = useAuth()
const route = useRoute()
const visible = ref(true)
const { trip } = useTrip(+route.params.id)
const tripStore = useTripStore()
const { isPending, isSuccess, updateMutation } = useModificar()
tripStore.resetErrors()
const icon = ref('check')
const textButton = ref('')
const headerTripEstatus = ref<string>('')

watch(
  trip,
  (payload) => {
    switch (payload.estatus) {
      case 'CREADO':
        textButton.value = 'Programar'
        icon.value = 'warehouse'
        break
      case 'PROGRAMADO':
        textButton.value = 'Transito'
        icon.value = 'truck-fast'
        break
      case 'TRANSITO':
        textButton.value = 'Terminar'
        icon.value = 'angle-double-right'
        break
    }
    headerTripEstatus.value = payload.estatus
  },
  { immediate: true }
)

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
    :header="`Modificar trip No. ${trip.numero_trip} en estatus ${headerTripEstatus?.toLowerCase()}`"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/trips' })"
  >
    <Formulario id="formulario" @submit.prevent="updateMutation.mutate(trip)" />
    <template #footer>
      <div class="pr-3 pl-3">
        <ButtonGroup>
          <!-- boton para cancelar el trip -->
          <Button
            icon="pi pi-times"
            label="Cancelar Trip"
            severity="danger"
            v-if="
              trip.estatus !== 'CANCELADO' &&
              trip.estatus !== 'TERMINADO' &&
              !verificarPermiso('MODULO_TRIPS_CANCELAR')
            "
          />
          <!-- boton para generar el pdf del trip -->
          <!-- <Button
            icon="pi pi-file-pdf"
            label="PDF"
            severity="info"
            v-if="trip.estatus !== 'CREADO' && trip.estatus !== 'CANCELADO'"
          /> -->

          <!-- boton para guardar los cambios que se le hacen al trip -->
          <Button
            type="submit"
            form="formulario"
            severity="primary"
            v-if="trip.estatus !== 'TERMINADO' && trip.estatus !== 'CANCELADO'"
            :loading="isPending"
          >
            <i :class="['fa', 'mr-3', `fa-${icon}`]"></i>
            {{ textButton }}
          </Button>
        </ButtonGroup>
      </div>
    </template>
  </Dialog>
</template>
