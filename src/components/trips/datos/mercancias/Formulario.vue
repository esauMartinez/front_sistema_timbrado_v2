<script lang="ts" setup>
import { ref } from 'vue';
import { useTrip } from '../../../../composables/useTrip';

const {
  trip,
  mercancia,
  mercanciasSat,
  unidadesPeso,
  obtenerMercacias,
  obtenerUnidadesPeso,
  obtenerMaterialesPeligrosos,
} = useTrip();

const producto = (data) => {
  console.log(data);
};
</script>

<template>
  <form>
    <div class="row p-2">
      <!-- <div class="col-lg-12 mb-3">
        <label>Producto</label>
        <InputText
          class="w-100"
          name="producto"
          placeholder="Producto"
          autocomplete="off"
          required
          @keyup="obtenerMercacias(mercancia.producto)"
          v-model="mercancia.producto"
        />
        <small class="p-error" name="producto"></small>
      </div> -->
      <div class="col-lg-12 mb-3">
        <label>Producto</label>
        <AutoComplete
          v-model="mercancia.producto"
          :suggestions="mercanciasSat"
          optionLabel="descripcion"
          @complete="obtenerMercacias(mercancia.producto)"
          class="w-100"
        >
          <template #option="slotProps">
            <div class="flex align-options-center">
              <div>
                {{ slotProps.option.clave }} -
                {{ slotProps.option.descripcion }}
              </div>
            </div>
          </template>
        </AutoComplete>
        <small class="p-error" name="producto"></small>
      </div>
      <div class="col-lg-12 mb-3">
        <!-- <label>Unidad de Medida</label>
        <InputText
          class="w-100"
          name="unidad_medida"
          placeholder="Unidad de medida"
          autocomplete="off"
          required
          @keyup="obtenerUnidadesPeso(mercancia.unidad_medida)"
          v-model="mercancia.unidad_medida"
        />
        <small class="p-error" name="unidad_medida"></small> -->

        <label>Producto</label>
        <AutoComplete
          v-model="mercancia.unidad_medida"
          :suggestions="unidadesPeso"
          optionLabel="nombre"
          @complete="obtenerUnidadesPeso(mercancia.unidad_medida)"
          class="w-100"
        >
          <template #option="slotProps">
            <div class="flex align-options-center">
              <div>
                {{ slotProps.option.clave }} -
                {{ slotProps.option.nombre }}
              </div>
            </div>
          </template>
        </AutoComplete>
        <small class="p-error" name="producto"></small>
      </div>
      <div class="col-lg-12 mb-3">
        <label>Cantidad</label>
        <InputNumber
          type="number"
          class="w-100"
          name="cantaidad"
          placeholder="Cantidad"
          autocomplete="off"
          required
          v-model="mercancia.cantidad"
        />
        <small class="p-error" name="cantidad"></small>
      </div>
      <div class="col-lg-12 mb-3">
        <label>Peso en kilogramos</label>
        <InputNumber
          class="w-100"
          name="peso"
          placeholder="Peso"
          autocomplete="off"
          required
          v-model="mercancia.peso"
        />
        <small class="p-error" name="peso"></small>
      </div>
      <div
        class="col-lg-12 mb-3"
        v-if="
          trip.tipo_viaje === 'IMPORTACION' || trip.tipo_viaje === 'EXPORTACION'
        "
      >
        <label>Fraccion arancelaria</label>
        <InputText
          class="w-100"
          name="fraccion_arancelaria"
          placeholder="Fraccion arancelaria"
          autocomplete="off"
          required
          v-model="mercancia.fraccion_arancelaria"
        />
        <small class="p-error" name="fraccion_arancelaria"></small>
      </div>
      <div class="col-lg-12 mb-3" v-if="trip.tipo_viaje === 'EXPORTACION'">
        <label>Pedimento</label>
        <InputText
          class="w-100"
          name="pedimento"
          placeholder="Pedimento"
          autocomplete="off"
          required
          v-model="mercancia.pedimento"
        />
        <small class="p-error" name="pedimento"></small>
      </div>
      <div class="col-lg-12 mb-3">
        <label>Clave material peligroso</label>
        <InputText
          class="w-100"
          name="clave_material_peligroso"
          placeholder="Clave material peligroso"
          autocomplete="off"
          required
          @keyup="
            obtenerMaterialesPeligrosos(mercancia.clave_material_peligroso)
          "
          v-model="mercancia.clave_material_peligroso"
        />
        <small class="p-error" name="clave_material_peligroso"></small>
      </div>
      <div class="col-lg-12 mb-3">
        <label>Tipo de embalaje</label>
        <InputText
          class="w-100"
          name="embalaje"
          placeholder="Tipo de embalaje"
          autocomplete="off"
          required
          v-model="mercancia.embalaje"
        />
        <small class="p-error" name="embalaje"></small>
      </div>
    </div>
  </form>
</template>
