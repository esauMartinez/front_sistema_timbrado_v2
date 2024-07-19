<script setup lang="ts">
import useCajasByNumeroEconomico from '@/modules/cajas/composables/useCajasByNumeroEconomico'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import { useCajaStore } from '@/stores/caja'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import type { AutoCompleteItemSelectEvent } from 'primevue/autocomplete'

const tripStore = useTripStore()
const { trip, errors } = storeToRefs(tripStore)

const cajaStore = useCajaStore()
const { caja, cajas, refetchCajas } = useCajasByNumeroEconomico()

const verificarEstatus = (e: AutoCompleteItemSelectEvent) => {
  if (!e.value.estatus) {
    cajaStore.setCaja({} as Caja)
  } else {
    trip.value.caja_id = e.value.id
  }
}
</script>

<template>
  <div class="mb-3">
    <label>Caja</label>
    <div class="p-inputgroup flex-1">
      <AutoComplete
        v-model="caja.numero_economico"
        :suggestions="cajas"
        optionLabel="numero_economico"
        placeholder="Caja"
        name="numero_economico"
        class="w-full focus:border-primary mt-2"
        @item-select="verificarEstatus"
        @complete="refetchCajas()"
      >
        <template #option="slotProps">
          <div class="flex justify-content-between">
            {{ slotProps.option.numero_economico }}
            -
            {{ slotProps.option.matricula }}
            -
            {{ slotProps.option.numero_serie }}
            <Tag
              :severity="slotProps.option.estatus ? 'success' : 'danger'"
              :value="slotProps.option.estatus ? 'Activo' : 'Desactivado'"
            ></Tag>
          </div>
        </template>
      </AutoComplete>
      <!-- :disabled="trip.estatus !== 'CREADO'" -->
      <!-- <Button icon="pi pi-plus" @click="agregar('caja')" v-if="trip.estatus === 'CREADO'" /> -->
    </div>
    <small class="p-error" v-if="errors.caja_id">
      {{ errors.caja_id }}
    </small>
  </div>
</template>

<style scoped></style>
