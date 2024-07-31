<script setup lang="ts">
import { tipo_documento } from '@/data/tipo_documento'
import { tipo_materia } from '@/data/tipo_materia'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { MercanciaSat } from '@/modules/timbrado/interfaces/mercancia-sat'
import type { AutoCompleteChangeEvent } from 'primevue/autocomplete'
import { useMercancias } from '@/modules/trips/composables/mercancias/useMercancias'
import { useUnidades } from '@/modules/trips/composables/mercancias/useUnidades'
import { usePeligrosos } from '@/modules/trips/composables/mercancias/usePeligrosos'

const tripStore = useTripStore()
const { trip, mercancia, errorsMercancia: errors } = storeToRefs(tripStore)

const { mercanciasSat, refetchMercancias } = useMercancias()
const { unidades, refetchUnidades } = useUnidades()
const { materialesPeligrososSat, refetchPeligrosos } = usePeligrosos()

const producto = ref<MercanciaSat>({} as MercanciaSat)

const verificarTipoProducto = (e: AutoCompleteChangeEvent) => {
  producto.value = e.value
  mercancia.value.material_peligroso = e.value.material_peligroso
}
</script>

<template>
  <form>
    <div class="mb-3">
      <label>Producto</label>
      <AutoComplete
        v-model="mercancia.producto"
        :suggestions="mercanciasSat"
        optionLabel="descripcion"
        placeholder="Producto"
        name="producto"
        @item-select="verificarTipoProducto"
        @complete="refetchMercancias()"
        class="w-full focus:border-primary mt-2"
        :invalid="errors.producto !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </AutoComplete>
      <small class="p-error" v-if="errors.producto">
        {{ errors.producto }}
      </small>
    </div>
    <div class="mb-3">
      <label>Unidad de medida</label>
      <AutoComplete
        v-model="mercancia.unidad_medida"
        :suggestions="unidades"
        optionLabel="nombre"
        placeholder="Unidad de medida"
        name="unidad_medida"
        class="w-full focus:border-primary mt-2"
        @complete="refetchUnidades()"
        :invalid="errors.unidad_medida !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.nombre }}
        </template>
      </AutoComplete>
      <small class="p-error" v-if="errors.unidad_medida">
        {{ errors.unidad_medida }}
      </small>
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
        :invalid="errors.cantidad !== undefined"
      />
      <small class="p-error" v-if="errors.cantidad">
        {{ errors.cantidad }}
      </small>
    </div>
    <div class="mb-3">
      <label>Peso en kilogramos</label>
      <InputNumber
        class="w-full focus:border-primary mt-2"
        name="peso"
        placeholder="Peso"
        autocomplete="off"
        :useGrouping="false"
        :minFractionDigits="2"
        :maxFractionDigits="2"
        required
        v-model="mercancia.peso"
        :invalid="errors.peso !== undefined"
      />
      <small class="p-error" v-if="errors.peso">
        {{ errors.peso }}
      </small>
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
        :invalid="errors.tipo_materia !== undefined"
      />
      <small class="p-error" v-if="errors.tipo_materia">
        {{ errors.tipo_materia }}
      </small>
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
        :invalid="errors.descripcion_materia !== undefined"
      />
      <small class="p-error" v-if="errors.descripcion_materia">
        {{ errors.descripcion_materia }}
      </small>
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
        :invalid="errors.tipo_documento !== undefined"
      />
      <small class="p-error" v-if="errors.tipo_documento">
        {{ errors.tipo_documento }}
      </small>
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
        :invalid="errors.pedimento !== undefined"
      />
      <small class="p-error" v-if="errors.pedimento">
        {{ errors.pedimento }}
      </small>
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
        :invalid="errors.rfc_importacion !== undefined"
      />
      <small class="p-error" v-if="errors.rfc_importacion">
        {{ errors.rfc_importacion }}
      </small>
    </div>
    <div class="mb-3" v-if="trip.tipo_viaje !== 'NACIONAL'">
      <label>Fraccion arancelaria</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="fraccion_arancelaria"
        placeholder="Fraccion arancelaria"
        autocomplete="off"
        v-model="mercancia.fraccion_arancelaria"
        :invalid="errors.fraccion_arancelaria !== undefined"
      />
      <small class="p-error" v-if="errors.fraccion_arancelaria">
        {{ errors.fraccion_arancelaria }}
      </small>
    </div>
    <div class="mb-3" v-if="trip.tipo_viaje !== 'NACIONAL' && mercancia.tipo_documento !== '01'">
      <label>Identificador documento aduanero</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="identificador_documento_aduanero"
        placeholder="Identificador documento aduanero"
        autocomplete="off"
        v-model="mercancia.identificador_documento_aduanero"
        :invalid="errors.identificador_documento_aduanero !== undefined"
      />
      <small class="p-error" v-if="errors.identificador_documento_aduanero">
        {{ errors.identificador_documento_aduanero }}
      </small>
    </div>
    <div class="mb-3" v-if="producto.material_peligroso === '1'">
      <label>Clave material peligroso</label>
      <AutoComplete
        v-model="mercancia.clave_material_peligroso"
        :suggestions="materialesPeligrososSat"
        optionLabel="descripcion"
        placeholder="Material peligroso"
        class="w-full focus:border-primary mt-2"
        @complete="refetchPeligrosos()"
        :invalid="errors.clave_material_peligroso !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </AutoComplete>
      <small class="p-error" v-if="errors.clave_material_peligroso">
        {{ errors.clave_material_peligroso }}
      </small>
    </div>
    <div class="mb-3" v-if="producto.material_peligroso === '1'">
      <label>Tipo de embalaje</label>
      <InputText
        class="w-full focus:border-primary mt-2"
        name="embalaje"
        placeholder="Tipo de embalaje"
        autocomplete="off"
        v-model="mercancia.embalaje"
        :invalid="errors.embalaje !== undefined"
      />
      <small class="p-error" v-if="errors.embalaje">
        {{ errors.embalaje }}
      </small>
    </div>
  </form>
</template>

<style scoped></style>
