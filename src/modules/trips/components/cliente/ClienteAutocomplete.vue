<script setup lang="ts">
import useClientesByName from '@/modules/clientes/composables/clientes/useClientesByName'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import { useClienteStore } from '@/stores/cliente'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import type { AutoCompleteItemSelectEvent } from 'primevue/autocomplete'

const tripStore = useTripStore()
const { trip, errors } = storeToRefs(tripStore)

const clienteStore = useClienteStore()
const { cliente, clientes, refetchClientes } = useClientesByName()

const verificarEstatus = (e: AutoCompleteItemSelectEvent) => {
  if (!e.value.estatus) {
    clienteStore.setCliente({} as Cliente)
  } else {
    trip.value.cliente_id = e.value.id
  }
}
</script>

<template>
  <div class="mb-3">
    <label>Cliente</label>
    <div class="p-inputgroup flex-1">
      <AutoComplete
        v-model="cliente.razon_social"
        :suggestions="clientes"
        optionLabel="razon_social"
        placeholder="Cliente"
        name="razon_social"
        class="w-full focus:border-primary mt-2"
        @item-select="verificarEstatus"
        @complete="refetchClientes()"
      >
        <template #option="slotProps">
          <div class="flex justify-content-between">
            {{ slotProps.option.razon_social }}
            <Tag
              :severity="slotProps.option.estatus ? 'success' : 'danger'"
              :value="slotProps.option.estatus ? 'Activo' : 'Desactivado'"
            ></Tag>
          </div>
        </template>
      </AutoComplete>
      <!-- :disabled="trip.estatus !== 'CREADO'" -->
      <!-- <Button icon="pi pi-plus" @click="agregar('cliente')" v-if="trip.estatus === 'CREADO'" /> -->
    </div>
    <small class="p-error" v-if="errors.cliente_id">
      {{ errors.cliente_id }}
    </small>
  </div>
</template>

<style scoped></style>
