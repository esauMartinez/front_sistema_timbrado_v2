<script setup lang="ts">
import { moneda } from '@/data/moneda'
import { tipo_de_viaje } from '@/data/tipo_de_viaje'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import ClienteAutocomplete from '@/modules/trips/components/cliente/ClienteAutocomplete.vue'
import OperadorAutocomplete from './operador/OperadorAutocomplete.vue'
import CajaAutocomplete from './caja/CajaAutocomplete.vue'
import TractorAutocomplete from './tractor/TractorAutocomplete.vue'
import MovimentosTrip from './movimientos/MovimientosTrip.vue'
import { watch } from 'vue'
import { useClienteStore } from '@/stores/cliente'
import { useOperadorStore } from '@/stores/operador'
import { useCajaStore } from '@/stores/caja'
import { useTractorStore } from '@/stores/tractor'

const tripStore = useTripStore()
const clienteStore = useClienteStore()
const operadorStore = useOperadorStore()
const cajaStore = useCajaStore()
const tractorStore = useTractorStore()
const { trip, errors } = storeToRefs(tripStore)

watch(
  trip,
  (payload) => {
    clienteStore.setCliente({ ...payload.cliente })
    operadorStore.setOperador({ ...payload.operador })
    cajaStore.setCaja({ ...payload.caja })
    tractorStore.setTractor({ ...payload.tractor })
  },
  { immediate: true }
)
</script>

<template>
  <form>
    <div class="mb-3">
      <label>Tipo de viaje</label>
      <Dropdown
        class="w-full focus:border-primary mt-2"
        placeholder="Tipo de viaje"
        optionLabel="clave"
        filter
        name="tipo_viaje"
        :options="tipo_de_viaje"
        optionValue="clave"
        v-model="trip.tipo_viaje"
        :invalid="errors.tipo_viaje !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
      <small class="p-error" v-if="errors.tipo_viaje">
        {{ errors.tipo_viaje }}
      </small>
    </div>
    <div class="mb-3">
      <label>Moneda</label>
      <Dropdown
        class="w-full focus:border-primary mt-2"
        placeholder="Moneda"
        optionLabel="descripcion"
        filter
        name="moneda"
        :options="moneda"
        optionValue="clave"
        v-model="trip.moneda"
        :invalid="errors.moneda !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </Dropdown>
      <small class="p-error" v-if="errors.moneda">
        {{ errors.moneda }}
      </small>
    </div>
    <div class="mb-3">
      <label>Referencia</label>
      <InputText
        name="referencia"
        v-model="trip.referencia"
        class="w-full focus:border-primary mt-2"
        placeholder="Referencia"
        autocomplete="off"
        :invalid="errors.referencia !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
      <small class="p-error" v-if="errors.referencia">
        {{ errors.referencia }}
      </small>
    </div>
    <div class="mb-3">
      <label>Observaciones</label>
      <Textarea
        name="observaciones"
        v-model="trip.observaciones"
        class="w-full focus:border-primary mt-2"
        placeholder="Observaciones"
        rows="10"
        :invalid="errors.observaciones !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
      <small class="p-error" v-if="errors.observaciones">
        {{ errors.observaciones }}
      </small>
    </div>

    <ClienteAutocomplete />
    <OperadorAutocomplete />
    <CajaAutocomplete />
    <TractorAutocomplete />

    <div class="mb-3">
      <label>Ventana de carga</label>
      <Calendar
        name="ventana_carga"
        v-model="trip.ventana_carga"
        class="w-full focus:border-primary mt-2"
        showIcon
        :showOnFocus="false"
        showTime
        hourFormat="24"
        :invalid="errors.ventana_carga !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
      <small class="p-error" v-if="errors.ventana_carga">
        {{ errors.ventana_carga }}
      </small>
    </div>
    <div class="mb-3">
      <label>Ventana de entrega</label>
      <Calendar
        name="ventana_entrega"
        v-model="trip.ventana_entrega"
        class="w-full focus:border-primary mt-2"
        showIcon
        :showOnFocus="false"
        showTime
        hourFormat="24"
        :invalid="errors.ventana_entrega !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
      <small class="p-error" v-if="errors.ventana_entrega">
        {{ errors.ventana_entrega }}
      </small>
    </div>
    <div class="mb-3">
      <label>Kilometros</label>
      <InputNumber
        name="kilometros"
        v-model.number="trip.kilometros"
        type="number"
        class="w-full focus:border-primary mt-2"
        placeholder="Kilometros"
        autocomplete="off"
        :invalid="errors.kilometros !== undefined"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
      <small class="p-error" v-if="errors.kilometros">
        {{ errors.kilometros }}
      </small>
    </div>
    <div class="mb-3">
      <label>Combustible(lts)</label>
      <InputNumber
        name="combustible"
        v-model.number="trip.combustible"
        type="number"
        class="w-full focus:border-primary mt-2"
        placeholder="combustible"
        autocomplete="off"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
    </div>
    <div class="mb-3">
      <label>Viaticos($)</label>
      <InputNumber
        name="viaticos"
        v-model.number="trip.viaticos"
        type="number"
        class="w-full focus:border-primary mt-2"
        placeholder="viaticos"
        autocomplete="off"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
    </div>
    <div class="mb-3">
      <label>Casetas($)</label>
      <InputNumber
        name="casetas"
        v-model.number="trip.casetas"
        type="number"
        class="w-full focus:border-primary mt-2"
        placeholder="casetas"
        autocomplete="off"
        :disabled="trip.estatus === 'TERMINADO' || trip.estatus === 'CANCELADO'"
      />
    </div>
    <MovimentosTrip />
  </form>
</template>

<style scoped></style>
