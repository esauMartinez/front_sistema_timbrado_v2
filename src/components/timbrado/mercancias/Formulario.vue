<script lang="ts" setup>
import { ref } from 'vue'
import { useTimbrado } from '@/composables/useTimbrado'
import type { MercanciasSat } from '@/interfaces/sat.model'
import type { AutoCompleteChangeEvent } from 'primevue/autocomplete'

const {
  trip,
  mercancia,
  mercanciasSat,
  unidadesPeso,
  peligrosos,
  obtenerMercacias,
  obtenerUnidadesPeso,
  obtenerMaterialesPeligrosos
} = useTimbrado()

const tipo_materia = ref([
  { item: '01' },
  { item: '02' },
  { item: '03' },
  { item: '04' },
  { item: '05' }
])

const tipo_documento = ref([
  { item: '01' },
  { item: '02' },
  { item: '03' },
  { item: '04' },
  { item: '05' },
  { item: '06' },
  { item: '07' },
  { item: '08' },
  { item: '09' },
  { item: '10' },
  { item: '11' },
  { item: '12' },
  { item: '13' },
  { item: '14' },
  { item: '15' },
  { item: '16' },
  { item: '17' },
  { item: '18' },
  { item: '19' },
  { item: '20' }
])

const producto = ref<MercanciasSat>({
  id: null,
  clave: null,
  descripcion: null,
  material_peligroso: null
})

const verificarTipoProducto = (e: AutoCompleteChangeEvent) => {
  producto.value = e.value
  mercancia.value.material_peligroso = e.value.material_peligroso
}
</script>

<template>
  <form class="p-2">
    <div class="mb-3">
      <label>Producto</label>
      <AutoComplete
        v-model="mercancia.producto"
        :suggestions="mercanciasSat"
        optionLabel="descripcion"
        placeholder="Producto"
        name="producto"
        @change="verificarTipoProducto"
        @complete="obtenerMercacias(mercancia.producto)"
        class="w-full focus:border-primary mt-2"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </AutoComplete>
      <small class="p-error" name="producto"></small>
    </div>
    <div class="mb-3">
      <label>Unidad de medida</label>
      <AutoComplete
        v-model="mercancia.unidad_medida"
        :suggestions="unidadesPeso"
        optionLabel="nombre"
        placeholder="Unidad de medida"
        name="unidad_medida"
        @complete="obtenerUnidadesPeso(mercancia.unidad_medida)"
        class="w-full focus:border-primary mt-2"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.nombre }}
        </template>
      </AutoComplete>
      <small class="p-error" name="unidad_medida"></small>
    </div>
    <div class="mb-3">
      <label>Cantidad</label>
      <InputNumber
        type="number"
        class="w-full focus:border-primary mt-2"
        name="cantaidad"
        placeholder="Cantidad"
        autocomplete="off"
        required
        v-model="mercancia.cantidad"
      />
      <small class="p-error" name="cantidad"></small>
    </div>
    <div class="mb-3">
      <label>Peso en kilogramos</label>
      <InputNumber
        class="w-full focus:border-primary mt-2"
        name="peso"
        placeholder="Peso"
        autocomplete="off"
        required
        v-model="mercancia.peso"
      />
      <small class="p-error" name="peso"></small>
    </div>

    <div class="mb-3" v-if="trip.tipo_viaje !== 'NACIONAL'">
      <label>Tipo materia</label>
      <Dropdown
        id="tipo_materia"
        name="tipo_materia"
        class="w-full focus:border-primary mt-2"
        filter
        placeholder="Tipo materia"
        optionLabel="item"
        :options="tipo_materia"
        v-model="mercancia.tipo_materia"
        optionValue="item"
      />
      <small class="p-error" name="tipo_materia"></small>
    </div>

    <div class="mb-3" v-if="mercancia.tipo_materia === '05'">
      <label>Descripcion materia</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="descripcion_materia"
        placeholder="Descripcion materia"
        autocomplete="off"
        required
        v-model="mercancia.descripcion_materia"
      />
      <small class="p-error" name="descripcion_materia"></small>
    </div>
    <div class="mb-3" v-if="trip.tipo_viaje !== 'NACIONAL'">
      <label>Tipo documento</label>
      <Dropdown
        id="tipo_documento"
        name="tipo_documento"
        class="w-full focus:border-primary mt-2"
        filter
        placeholder="Tipo documento"
        optionLabel="item"
        :options="tipo_documento"
        optionValue="item"
        v-model="mercancia.tipo_documento"
      />
      <small class="p-error" name="tipo_documento"></small>
    </div>

    <div class="mb-3" v-if="mercancia.tipo_documento === '01' && trip.tipo_viaje !== 'NACIONAL'">
      <label>Pedimento</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="pedimento"
        placeholder="Pedimento"
        autocomplete="off"
        required
        v-model="mercancia.pedimento"
      />
      <small class="p-error" name="pedimento"></small>
    </div>
    <div class="mb-3" v-if="mercancia.tipo_documento === '01' && trip.tipo_viaje !== 'NACIONAL'">
      <label>RFC importacion</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="rfc_importacion"
        placeholder="RFC importacion"
        autocomplete="off"
        required
        v-model="mercancia.rfc_importacion"
      />
      <small class="p-error" name="rfc_importacion"></small>
    </div>
    <div class="mb-3" v-if="trip.tipo_viaje !== 'NACIONAL'">
      <label>Fraccion arancelaria</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="fraccion_arancelaria"
        placeholder="Fraccion arancelaria"
        autocomplete="off"
        v-model="mercancia.fraccion_arancelaria"
      />
      <small class="p-error" name="fraccion_arancelaria"></small>
    </div>
    <div class="mb-3" v-if="trip.tipo_viaje !== 'NACIONAL' && mercancia.tipo_documento !== '01'">
      <label>Identificador documento aduanero</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="identificador_documento_aduanero"
        placeholder="Identificador documento aduanero"
        autocomplete="off"
        v-model="mercancia.identificador_documento_aduanero"
      />
      <small class="p-error" name="identificador_documento_aduanero"></small>
    </div>
    <div class="mb-3" v-if="producto.material_peligroso === '1'">
      <label>Clave material peligroso</label>
      <AutoComplete
        v-model="mercancia.clave_material_peligroso"
        :suggestions="peligrosos"
        optionLabel="descripcion"
        placeholder="Material peligroso"
        @complete="obtenerMaterialesPeligrosos(mercancia.clave_material_peligroso)"
        class="w-full focus:border-primary mt-2"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </AutoComplete>
      <small class="p-error" name="clave_material_peligroso"></small>
    </div>
    <div class="mb-3" v-if="producto.material_peligroso === '1'">
      <label>Tipo de embalaje</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="embalaje"
        placeholder="Tipo de embalaje"
        autocomplete="off"
        v-model="mercancia.embalaje"
      />
      <small class="p-error" name="embalaje"></small>
    </div>
  </form>
</template>
