<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useServicios } from '@/modules/servicios/composables/useServicios'
import { router } from '@/router'
import { useTimbrado } from '@/composables/useTimbrado'

const { concepto, agregarIva, agregarRetencion, postConcepto, resetFormConcepto } = useTimbrado()
const { servicios } = useServicios()

const visible = ref(true)

onMounted(async () => {
  resetFormConcepto()
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '55vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <form @submit.prevent="postConcepto(concepto)" id="formulario-servicio" class="mt-1 formulario">
      <div class="grid">
        <div class="col-12 mb-3">
          <label>Concepto</label>
          <Dropdown
            name="nombre"
            class="w-full focus:border-primary mt-2"
            :options="servicios"
            placeholder="Selecciona un rol"
            filter
            v-model="concepto.clave"
            optionLabel="descripcion"
          />
          <small class="p-error" name="nombre"></small>
        </div>
        <div class="col-8 mb-3">
          <label>Monto</label>
          <InputNumber
            name="monto"
            class="w-full focus:border-primary mt-2"
            v-model="concepto.monto"
            :useGrouping="false"
            placeholder="Monto"
          />
          <small class="p-error" name="monto"></small>
        </div>
        <div class="col-2 mt-4">
          <Button
            label="IVA"
            class="w-full mt-1"
            severity="info"
            :outlined="concepto.iva == 0 && true"
            @click="agregarIva()"
          />
        </div>
        <div class="col-2 mt-4">
          <Button
            label="Retencion"
            class="w-full mt-1"
            severity="danger"
            :outlined="concepto.retencion == 0 && true"
            @click="agregarRetencion()"
          />
        </div>
      </div>
    </form>
    <template #footer>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        @click="visible = false"
        outlined
        severity="danger"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        type="submit"
        form="formulario-servicio"
        severity="success"
      />
    </template>
    <!-- <Tabla :ismodule="false" /> -->
  </Dialog>
</template>
