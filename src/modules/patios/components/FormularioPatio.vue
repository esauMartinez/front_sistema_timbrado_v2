<script lang="ts" setup>
import { ref } from 'vue'
import { pais } from '@/data/pais'
import { usePatioStore } from '@/stores/patio'
import { storeToRefs } from 'pinia'
import PatioNacional from './PatioNacional.vue'
import PatioExtranjero from './PatioExtranjero.vue'

const patioStore = usePatioStore()
const { patio, errors } = storeToRefs(patioStore)

const tipo_patio = ref([{ tipo: 'nacional' }, { tipo: 'extranjero' }])

const selectPais = (pais: string) => {
  patio.value.c_pais = pais
}
</script>

<template>
  <form class="formulario">
    <div class="mb-3">
      <label>Nombre patio</label>
      <InputText
        name="nombre"
        class="w-full focus:border-primary mt-2"
        placeholder="Nombre"
        autocomplete="off"
        v-model="patio.nombre"
        :invalid="errors.nombre !== undefined"
      />
      <small class="p-error" v-if="errors.nombre">
        {{ errors.nombre }}
      </small>
    </div>
    <div class="mb-3">
      <label>Tipo de patio</label>
      <Dropdown
        name="tipo"
        class="w-full focus:border-primary mt-2"
        filter
        placeholder="Tipo"
        optionLabel="tipo"
        optionValue="tipo"
        :options="tipo_patio"
        v-model="patio.tipo"
        :invalid="errors.tipo !== undefined"
      />
      <small class="p-error" v-if="errors.tipo">
        {{ errors.tipo }}
      </small>
    </div>
    <div class="grid">
      <div class="col-9 mb-3">
        <label>Pais</label>
        <Dropdown
          name="pais"
          class="w-full focus:border-primary mt-2"
          placeholder="Pais"
          optionLabel="item"
          filter
          :options="pais"
          optionValue="item"
          @change="selectPais(patio.pais)"
          v-model="patio.pais"
          :invalid="errors.pais !== undefined"
        />
        <small class="p-error" v-if="errors.pais">
          {{ errors.pais }}
        </small>
      </div>
      <div class="col-3 mb-3">
        <label>Codigo</label>
        <InputText
          name="c_pais"
          class="w-full focus:border-primary mt-2"
          placeholder="Codigo pais"
          autocomplete="off"
          disabled
          v-model="patio.c_pais"
          :invalid="errors.c_pais !== undefined"
        />
        <small class="p-error" v-if="errors.c_pais">
          {{ errors.c_pais }}
        </small>
      </div>
    </div>

    <PatioNacional v-if="patio.tipo === 'nacional'" />

    <PatioExtranjero v-if="patio.tipo == 'extranjero'" />

    <div class="mb-3">
      <label>Calle</label>
      <InputText
        name="calle"
        class="w-full focus:border-primary mt-2"
        placeholder="Calle"
        autocomplete="off"
        v-model="patio.calle"
        :invalid="errors.calle !== undefined"
      />
      <small class="p-error" v-if="errors.calle">
        {{ errors.calle }}
      </small>
    </div>
    <div class="mb-3">
      <label>Numero exterior</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        placeholder="Numero exterior"
        v-model="patio.numero_exterior"
      />
    </div>
    <div class="mb-3">
      <label>Numero interior</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        placeholder="Numero interior"
        autocomplete="off"
        v-model="patio.numero_interior"
      />
    </div>
    <div class="mb-3">
      <label>Referencia</label>
      <InputText
        name="referencia"
        class="w-full focus:border-primary mt-2"
        placeholder="Referencia"
        autocomplete="off"
        v-model="patio.referencia"
        :invalid="errors.referencia !== undefined"
      />
      <small class="p-error" v-if="errors.referencia">
        {{ errors.referencia }}
      </small>
    </div>
    <div class="mb-3">
      <label>RFC</label>
      <InputText
        name="rfc"
        class="w-full focus:border-primary mt-2"
        placeholder="RFC"
        autocomplete="off"
        v-model="patio.rfc"
        :invalid="errors.rfc !== undefined"
      />
      <small class="p-error" v-if="errors.rfc">
        {{ errors.rfc }}
      </small>
    </div>
  </form>
</template>
