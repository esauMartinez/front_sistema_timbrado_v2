<script setup lang="ts">
import useOperadoresByName from '@/modules/operadores/composables/useOperadoresByName'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import { useOperadorStore } from '@/stores/operador'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import type { AutoCompleteItemSelectEvent } from 'primevue/autocomplete'

const tripStore = useTripStore()
const { trip, errors } = storeToRefs(tripStore)

const operadorStore = useOperadorStore()

const { operador, operadores, refetchOperadores } = useOperadoresByName()

const verificarEstatus = (e: AutoCompleteItemSelectEvent) => {
  if (!e.value.estatus) {
    operadorStore.setOperador({} as Operador)
  } else {
    trip.value.operador_id = e.value.id
  }
}
</script>

<template>
  <div class="mb-3">
    <label>Operador</label>
    <div class="p-inputgroup flex-1">
      <AutoComplete
        v-model="operador.nombre"
        :suggestions="operadores"
        optionLabel="nombre"
        placeholder="Operador"
        name="nombre"
        class="w-full focus:border-primary mt-2"
        @item-select="verificarEstatus"
        @complete="refetchOperadores()"
      >
        <template #option="slotProps">
          <div class="flex justify-content-between">
            {{ slotProps.option.nombre }}
            {{ slotProps.option.materno }}
            {{ slotProps.option.paterno }}
            <Tag
              :severity="slotProps.option.estatus ? 'success' : 'danger'"
              :value="slotProps.option.estatus ? 'Activo' : 'Desactivado'"
            ></Tag>
          </div>
        </template>
      </AutoComplete>
      <!-- :disabled="trip.estatus !== 'CREADO'" -->
      <!-- <Button icon="pi pi-plus" @click="agregar('operador')" v-if="trip.estatus === 'CREADO'" /> -->
    </div>
    <small class="p-error" v-if="errors.operador_id">
      {{ errors.operador_id }}
    </small>
  </div>
</template>

<style scoped></style>
