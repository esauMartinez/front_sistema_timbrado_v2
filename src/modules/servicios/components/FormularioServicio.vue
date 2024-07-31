<script lang="ts" setup>
import { useServicioStore } from '@/stores/servicio'
import { storeToRefs } from 'pinia'

const servicioStore = useServicioStore()

const { servicio, errors } = storeToRefs(servicioStore)
</script>

<template>
  <form>
    <div class="mb-3">
      <label>Clave del servicio</label>
      <InputText
        name="clave"
        class="w-full focus:border-primary mt-2"
        placeholder="Clave"
        autocomplete="off"
        v-model="servicio.clave"
        :invalid="errors.clave !== undefined"
      />
      <small class="p-error" v-if="errors.clave">
        {{ errors.clave }}
      </small>
    </div>
    <div class="mb-3">
      <label>Clave unidad</label>
      <InputText
        name="clave_unidad"
        class="w-full focus:border-primary mt-2"
        placeholder="Clave unidad"
        v-model="servicio.clave_unidad"
        :invalid="errors.clave_unidad !== undefined"
      />
      <small class="p-error" v-if="errors.clave_unidad">
        {{ errors.clave_unidad }}
      </small>
    </div>
    <div class="mb-3">
      <label>Descripcion del servicio</label>
      <InputText
        name="descripcion"
        class="w-full focus:border-primary mt-2"
        placeholder="Descripcion"
        v-model="servicio.descripcion"
        :invalid="errors.descripcion !== undefined"
      />
      <small class="p-error" v-if="errors.descripcion">
        {{ errors.descripcion }}
      </small>
    </div>
  </form>
</template>
