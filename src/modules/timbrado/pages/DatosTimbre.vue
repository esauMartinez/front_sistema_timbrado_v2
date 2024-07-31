<script setup lang="ts">
import { useTrip } from '@/modules/trips/composables/useTrip'
import { router } from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import EmisorTimbre from '@/modules/timbrado/components/datos/EmisorTimbre.vue'
import ReceptorTimbre from '@/modules/timbrado/components/datos/ReceptorTimbre.vue'
import CabeceraTimbre from '../components/datos/CabeceraTimbre.vue'
import TipoViaje from '../components/datos/TipoViaje.vue'
import OperadorTimbre from '../components/datos/OperadorTimbre.vue'
import TractorTimbre from '../components/datos/TractorTimbre.vue'
import CajaTimbre from '../components/datos/CajaTimbre.vue'
import PermisoTimbre from '../components/datos/PermisoTimbre.vue'
import TablaConceptos from '../components/conceptos/TablaConceptos.vue'
import TablaMercancias from '../components/mercancias/TablaMercancias.vue'
import MovimientosTimbre from '../components/MovimientosTimbre.vue'
import { useTimbrar } from '../composables/useTimbrar'
import { useTimbradoStore } from '@/stores/timbrado'
import { question } from '@/helpers/messages'
import TablaRegimenAduanero from '../components/regimen/TablaRegimenAduanero.vue'
// import { storeToRefs } from 'pinia'

const visible = ref(true)
const route = useRoute()
const timbradoStore = useTimbradoStore()
// const { errors } = storeToRefs(timbradoStore)
const { trip } = useTrip(+route.params.id)
const { isLoading, refetchTimbrar } = useTimbrar()
timbradoStore.resetErrors()

const timbrarTrip = async () => {
  const response = await question('Se timbrara el trip', 'Si')
  if (response.isConfirmed) {
    refetchTimbrar()
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="`Datos para el timbrado del trip ${trip.numero_trip}`"
    :style="{ width: '80vw' }"
    v-on:after-hide="router.push({ path: '/timbrado' })"
  >
    <div class="grid">
      <div class="col-12">
        <CabeceraTimbre :trip="trip" />
      </div>
      <div class="col-6">
        <EmisorTimbre :emisor="trip.empresa" />
      </div>
      <div class="col-6">
        <ReceptorTimbre :receptor="trip.cliente" />
      </div>
      <div class="col-4">
        <OperadorTimbre :operador="trip.operador" />
      </div>
      <div class="col-4">
        <TractorTimbre :tractor="trip.tractor" />
      </div>
      <div class="col-4">
        <CajaTimbre :caja="trip.caja" />
      </div>
      <div class="col-12">
        <PermisoTimbre :trip="trip" :empresa="trip.empresa" :tractor="trip.tractor" />
      </div>
      <div class="col-12">
        <TipoViaje :trip="trip" />
      </div>
      <div class="col-12">
        <TablaRegimenAduanero :regimenes="trip.regimen_aduaneros" />
      </div>
      <div class="col-12">
        <MovimientosTimbre :trip="trip" :movimientos="trip.movimientos" />
      </div>
      <div class="col-12">
        <TablaConceptos :conceptos="trip.conceptos" />
      </div>
      <div class="col-12">
        <TablaMercancias :mercancias="trip.mercancias" />
      </div>
    </div>
    <template #footer>
      <!-- <span class="p-error text-xl" v-if="errors.timbrado !== undefined">
        {{ errors.timbrado }}
      </span> -->
      <Button
        :label="'Timbrar'"
        icon="pi pi-bell"
        type="submit"
        form="formulario"
        class="text-right"
        severity="success"
        @click="timbrarTrip"
        :loading="isLoading"
      />
    </template>
  </Dialog>

  <router-view></router-view>
</template>

<style scoped></style>
