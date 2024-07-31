<script setup lang="ts">
import { useServicios } from '@/modules/servicios/composables/useServicios'
import { useCrear } from '@/modules/trips/composables/conceptos/useCrear'
import { ref } from 'vue'

const { servicios } = useServicios()
const { concepto } = useCrear()

const iva = ref<boolean>(false)
const retencion = ref<boolean>(false)

const calcularIva = () => {
  if (iva.value) {
    concepto.value.iva = concepto.value.monto * (16 / 100)
  } else {
    concepto.value.iva = 0
  }
}

const calcularRetencion = () => {
  if (retencion.value) {
    concepto.value.retencion = concepto.value.monto * (4 / 100)
  } else {
    concepto.value.retencion = 0
  }
}

const calcular = () => {
  if (iva.value) {
    concepto.value.iva = concepto.value.monto * (16 / 100)
  }

  if (retencion.value) {
    concepto.value.retencion = concepto.value.monto * (4 / 100)
  }
}
</script>

<template>
  <form>
    <div class="mb-3">
      <Dropdown
        name="nombre"
        class="w-full focus:border-primary mt-2"
        :options="servicios"
        v-model="concepto.clave"
        placeholder="Selecciona un concepto"
        filter
        optionLabel="descripcion"
      />
    </div>
    <div class="mb-3">
      <InputNumber
        name="monto"
        class="w-full focus:border-primary mt-2"
        :useGrouping="false"
        placeholder="Monto"
        v-model="concepto.monto"
        @update:modelValue="calcular"
      />
    </div>
    <div class="mb-3">
      <div class="card flex flex-wrap justify-content-left gap-3">
        <div class="flex align-items-center">
          <input
            type="checkbox"
            v-model="iva"
            @change="calcularIva"
            :disabled="
              concepto.monto === undefined || concepto.monto === null || concepto.monto === 0
            "
          />
          <label for="iva" class="ml-2"> Iva </label>
        </div>
        <div class="flex align-items-center">
          <input
            type="checkbox"
            v-model="retencion"
            @change="calcularRetencion"
            :disabled="
              concepto.monto === undefined || concepto.monto === null || concepto.monto === 0
            "
          />
          <label for="retencion" class="ml-2"> Retencion </label>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
