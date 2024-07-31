<script setup lang="ts">
import type { RegimenAduanero } from '@/modules/trips/interfaces/regimenAduanero'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useCrear } from '@/modules/trips/composables/regimen/useCrear'
import { useEliminar } from '@/modules/trips/composables/regimen/useEliminar'

interface Props {
  regimenes: RegimenAduanero[] | undefined
}

defineProps<Props>()

const tripStore = useTripStore()
const { trip } = storeToRefs(tripStore)

const regimenAduanero = ref([
  { descripcion: 'IMD', value: 'IMD' },
  { descripcion: 'EXD', value: 'EXD' },
  { descripcion: 'ITR', value: 'ITR' },
  { descripcion: 'ITE', value: 'ITE' },
  { descripcion: 'ETR', value: 'ETR' },
  { descripcion: 'ETE', value: 'ETE' },
  { descripcion: 'DFI', value: 'DFI' },
  { descripcion: 'RFE', value: 'RFE' },
  { descripcion: 'RFS', value: 'RFS' },
  { descripcion: 'TRS', value: 'TRS' }
])

const { regimen, errorRegimen, createRegimen } = useCrear()
const { deleteMutation } = useEliminar()

const agregarRegimen = () => {
  regimen.value.trip_id = trip.value.id
  createRegimen.mutate(regimen.value)
}
</script>

<template>
  <Fieldset legend="Regimen Aduanero">
    <Dropdown
      v-model="regimen.regimen"
      :options="regimenAduanero"
      class="w-full focus:border-primary"
      placeholder="Regimen aduanero"
      optionLabel="descripcion"
      filter
      name="descripcion"
      optionValue="value"
      @change="agregarRegimen"
      :invalid="errorRegimen.regimen !== undefined"
    >
      <template #option="slotProps">
        {{ slotProps.option.value }}
      </template>
    </Dropdown>
    <small class="p-error" v-if="errorRegimen.regimen">
      {{ errorRegimen.regimen }}
    </small>

    <DataTable :value="regimenes" showGridlines class="mt-3">
      <Column field="regimen" header="Regimen aduanero"></Column>
      <Column>
        <template #body="{ data }">
          <div class="flex justify-content-center">
            <Button icon="pi pi-times" severity="danger" @click="deleteMutation.mutate(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Fieldset>
</template>
