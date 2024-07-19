<script setup lang="ts">
import useTractoresByNumeroEconomico from '@/modules/tractores/composables/useTractoresByNumeroEconomico'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import { useTractorStore } from '@/stores/tractor'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import type { AutoCompleteItemSelectEvent } from 'primevue/autocomplete'

const tripStore = useTripStore()
const { trip, errors } = storeToRefs(tripStore)

const tractorStore = useTractorStore()

const { tractor, tractores, refetchTractores } = useTractoresByNumeroEconomico()

const verificarEstatus = (e: AutoCompleteItemSelectEvent) => {
  if (!e.value.estatus) {
    tractorStore.setTractor({} as Tractor)
  } else {
    trip.value.tractor_id = e.value.id
  }
}
</script>

<template>
  <div class="mb-3">
    <label>Tractor</label>
    <div class="p-inputgroup flex-1">
      <AutoComplete
        v-model="tractor.numero_economico"
        :suggestions="tractores"
        optionLabel="numero_economico"
        placeholder="Tractor"
        name="numero_economico"
        class="w-full focus:border-primary mt-2"
        @item-select="verificarEstatus"
        @complete="refetchTractores()"
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
    <small class="p-error" v-if="errors.tractor_id">
      {{ errors.tractor_id }}
    </small>
  </div>
</template>

<style scoped></style>
