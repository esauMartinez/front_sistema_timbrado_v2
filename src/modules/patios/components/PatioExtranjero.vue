<script lang="ts" setup>
import { ref } from 'vue'
import type { AutoCompleteChangeEvent } from 'primevue/autocomplete'
import { usePatioStore } from '@/stores/patio'
import { storeToRefs } from 'pinia'

const patioStore = usePatioStore()
const { patio, errors } = storeToRefs(patioStore)

const estados = ref([
  { nombre: 'ALABAMA', desc: 'AL' },
  { nombre: 'ALASKA', desc: 'AK' },
  { nombre: 'ARIZONA', desc: 'AZ' },
  { nombre: 'ARKANSAS', desc: 'AR' },
  { nombre: 'CALIFORNIA', desc: 'CA' },
  { nombre: 'CAROLINA DEL NORTE', desc: 'NC' },
  { nombre: 'CAROLINA DEL SUR', desc: 'SC' },
  { nombre: 'COLORADO', desc: 'CO' },
  { nombre: 'CONNECTICUT', desc: 'CT' },
  { nombre: 'DAKOTA DEL NORTE', desc: 'ND' },
  { nombre: 'DAKOTA DEL SUR', desc: 'SD' },
  { nombre: 'DELAWARE', desc: 'DE' },
  { nombre: 'FLORIDA', desc: 'FL' },
  { nombre: 'GEORGIA', desc: 'GA' },
  { nombre: 'HAWAI', desc: 'HI' },
  { nombre: 'IDAHO', desc: 'ID' },
  { nombre: 'ILLINOIS', desc: 'IL' },
  { nombre: 'INDIANA', desc: 'IN' },
  { nombre: 'IOWA', desc: 'IA' },
  { nombre: 'KANSAS', desc: 'KS' },
  { nombre: 'KENTUCKY', desc: 'KY' },
  { nombre: 'LUISIANA', desc: 'LA' },
  { nombre: 'MAINE', desc: 'ME' },
  { nombre: 'MARYLAND', desc: 'MD' },
  { nombre: 'MASSACHUSETTS', desc: 'MA' },
  { nombre: 'MICHIGAN', desc: 'MI' },
  { nombre: 'MINNESOTA', desc: 'MN' },
  { nombre: 'MISISIPI', desc: 'MS' },
  { nombre: 'MISURI', desc: 'MO' },
  { nombre: 'MONTANA', desc: 'MT' },
  { nombre: 'NEBRASKA', desc: 'NE' },
  { nombre: 'NEVADA', desc: 'NV' },
  { nombre: 'NUEVA JERSEY', desc: 'NJ' },
  { nombre: 'NUEVA YORK', desc: 'NY' },
  { nombre: 'NUEVO HAMPSHIRE', desc: 'NH' },
  { nombre: 'NUEVO MEXICO', desc: 'NM' },
  { nombre: 'OHIO', desc: 'OH' },
  { nombre: 'OKLAHOMA', desc: 'OK' },
  { nombre: 'OREGON', desc: 'OR' },
  { nombre: 'PENSILVANIA', desc: 'PA' },
  { nombre: 'RHODE ISLAND', desc: 'RI' },
  { nombre: 'TENNESSEE', desc: 'TN' },
  { nombre: 'TEXAS', desc: 'TX' },
  { nombre: 'UTAH', desc: 'UT' },
  { nombre: 'VERMONT', desc: 'VT' },
  { nombre: 'VIRGINIA', desc: 'VA' },
  { nombre: 'VIRGINIA OCCIDENTAL', desc: 'WV' },
  { nombre: 'WASHINGTON', desc: 'WA' },
  { nombre: 'WISCONSIN', desc: 'WI' },
  { nombre: 'WYOMING', desc: 'WY' }
])

const verificarEstado = (e: AutoCompleteChangeEvent) => {
  const estado: any = estados.value.find((x) => x.nombre === e.value)
  patio.value.c_estado = estado.desc
}
</script>
<template>
  <div class="grid">
    <div class="col-12 mb-3">
      <label>Codigo postal</label>
      <InputText
        id="codigo_postal"
        name="codigo_postal"
        class="w-full focus:border-primary mt-2"
        placeholder="Codigo postal"
        autocomplete="off"
        :disabled="patio.c_pais === 'MEX'"
        v-model="patio.codigo_postal"
        :invalid="errors.codigo_postal !== undefined"
      />
      <small class="p-error" v-if="errors.codigo_postal">
        {{ errors.codigo_postal }}
      </small>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 mb-3">
      <label>Numero regimen ID tributario</label>
      <InputText
        id="colonia"
        name="colonia"
        class="w-full focus:border-primary mt-2"
        placeholder="Numero regimen ID tributario"
        autocomplete="off"
        v-model="patio.numero_regimen_id_tributario"
        :invalid="errors.numero_regimen_id_tributario !== undefined"
      />
      <small class="p-error" v-if="errors.numero_regimen_id_tributario">
        {{ errors.numero_regimen_id_tributario }}
      </small>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 mb-3">
      <label>Colonia</label>
      <InputText
        id="colonia"
        name="colonia"
        class="w-full focus:border-primary mt-2"
        placeholder="Colonia"
        autocomplete="off"
        v-model="patio.colonia"
        :invalid="errors.colonia !== undefined"
      />
      <small class="p-error" v-if="errors.colonia">
        {{ errors.colonia }}
      </small>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 mb-3">
      <label>Municipio</label>
      <InputText
        id="municipio"
        name="municipio"
        class="w-full focus:border-primary mt-2"
        placeholder="Municipio"
        autocomplete="off"
        v-model="patio.municipio"
        :invalid="errors.municipio !== undefined"
      />
      <small class="p-error" v-if="errors.municipio">
        {{ errors.municipio }}
      </small>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 mb-3">
      <label>Estado</label>
      <Dropdown
        class="w-full focus:border-primary mt-2"
        placeholder="Estado"
        optionLabel="nombre"
        filter
        name="estado"
        :options="estados"
        optionValue="nombre"
        @change="verificarEstado"
        v-model="patio.estado"
        :invalid="errors.estado !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.desc }} -
          {{ slotProps.option.nombre }}
        </template>
      </Dropdown>
      <small class="p-error" v-if="errors.estado">
        {{ errors.estado }}
      </small>
    </div>
  </div>
</template>
