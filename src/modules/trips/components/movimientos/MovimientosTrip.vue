<script lang="ts" setup>
import usePatiosByName from '@/modules/patios/composables/usePatiosByName'
import type { Patio } from '@/modules/patios/interfaces/patio'
import { usePatioStore } from '@/stores/patio'
import type { AutoCompleteItemSelectEvent } from 'primevue/autocomplete'
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/trip'

const tripStore = useTripStore()
const { trip, errors } = storeToRefs(tripStore)
const patioStore = usePatioStore()
const { patio, patios, refetchPatios } = usePatiosByName()

const verificarEstatus = (e: AutoCompleteItemSelectEvent) => {
  if (!e.value.estatus) {
    patioStore.setPatio({} as Patio)
  } else {
    tripStore.addMovimiento(e.value)
    patioStore.setPatios([])
    patioStore.setPatio({} as Patio)
  }
}
</script>

<template>
  <div class="grid mt-5">
    <div class="col-12 text-center">
      <small class="p-error text-lg mb-3" v-if="errors.ErrorMovimientos">
        {{ errors.ErrorMovimientos }}
      </small>
    </div>
    <div class="col-12">
      <label>Patio</label>
      <AutoComplete
        v-model="patio.nombre"
        :suggestions="patios"
        optionLabel="nombre"
        placeholder="Patio"
        name="nombre"
        class="w-full focus:border-primary"
        :minLength="2"
        @item-select="verificarEstatus"
        @complete="refetchPatios()"
        :disabled="trip.estatus === 'TERMINADO'"
      >
        <template #option="slotProps">
          <div class="flex justify-content-between">
            {{ slotProps.option.nombre }}
            <Tag
              :severity="slotProps.option.estatus ? 'success' : 'danger'"
              :value="slotProps.option.estatus ? 'Activo' : 'Desactivado'"
            ></Tag>
          </div>
        </template>
      </AutoComplete>
    </div>
  </div>
  <div class="mt-5" style="overflow: auto">
    <Timeline :value="trip.movimientos" align="alternate">
      <template #content="slotProps">
        <p>
          {{ slotProps.item.patio.nombre }}
        </p>
        <ButtonGroup>
          <Button
            size="small"
            :severity="slotProps.item.localizacion_caja ? 'warning' : ''"
            v-tooltip="{
              value: 'Poner la caja como localizable en este patio',
              showDelay: 300,
              hideDelay: 300
            }"
            @click="tripStore.setMovimientoLocalizacionCaja(slotProps.item.id)"
          >
            <font-awesome-icon :icon="['fas', 'location-dot']" />
          </Button>
          <Button
            size="small"
            :severity="slotProps.item.patio_timbre ? 'info' : ''"
            v-tooltip="{
              value: 'Agregar patio para timbrado',
              showDelay: 300,
              hideDelay: 300
            }"
            @click="tripStore.setMovimientoTimbre(slotProps.item.id)"
          >
            <font-awesome-icon :icon="['fas', 'crosshairs']" />
          </Button>
          <Button
            size="small"
            v-tooltip="{
              value: 'Eliminar movimiento',
              showDelay: 300,
              hideDelay: 300
            }"
            severity="danger"
            @click="tripStore.removeMovimiento(slotProps.item.id)"
            v-if="trip.estatus !== 'TERMINADO'"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </Button>
        </ButtonGroup>
      </template>
    </Timeline>
  </div>
</template>

<style scoped>
.p-card {
  background-color: #6366f1 !important;
  color: #fff;
}
</style>
