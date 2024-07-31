<script lang="ts" setup>
import { useMarcas } from '@/modules/marcas/composables/useMarcas'
import { storeToRefs } from 'pinia'
import { useConfiguracion } from '@/modules/cajas/composables/useConfiguracion'
import { useCajaStore } from '@/stores/caja'

const cajaStore = useCajaStore()
const { caja, errors } = storeToRefs(cajaStore)
const { marcas } = useMarcas('CAJA')
const { configuracion } = useConfiguracion()
</script>

<template>
  <form>
    <div class="mb-3">
      <label>Numero economico</label>
      <InputText
        id="numero_economico"
        name="numero_economico"
        class="w-full focus:border-primary mt-2"
        placeholder="Numero economico"
        v-model="caja.numero_economico"
        autocomplete="off"
        :invalid="errors.numero_economico !== undefined"
      />
      <small class="p-error" v-if="errors.numero_economico">
        {{ errors.numero_economico }}
      </small>
    </div>
    <div class="mb-3">
      <label>Matricula</label>
      <InputText
        id="matricula"
        name="matricula"
        class="w-full focus:border-primary mt-2"
        placeholder="Matricula"
        v-model="caja.matricula"
        :invalid="errors.matricula !== undefined"
      />
      <small class="p-error" v-if="errors.matricula">
        {{ errors.matricula }}
      </small>
    </div>
    <div class="mb-3">
      <label>Numero de serie</label>
      <InputText
        id="numero_serie"
        name="numero_serie"
        class="w-full focus:border-primary mt-2"
        placeholder="Numero de serie"
        v-model="caja.numero_serie"
        :invalid="errors.numero_serie !== undefined"
      />
      <small class="p-error" v-if="errors.numero_serie">
        {{ errors.numero_serie }}
      </small>
    </div>
    <!-- <div class="mb-3">
      <label>Numero de poliza</label>
      <InputText
        id="numero_poliza"
        name="numero_poliza"
        class="w-full focus:border-primary mt-2"
        placeholder="Numero de poliza"
        v-model="caja.numero_poliza"
        :invalid="errors.numero_poliza !== undefined"
      />
      <small class="p-error" v-if="errors.numero_poliza">
        {{ errors.numero_poliza }}
      </small>
    </div> -->
    <!-- <div class="mb-3">
      <label>Vencimiento de la poliza</label>
      <Calendar
        id="vencimiento_poliza"
        name="vencimiento_poliza"
        class="w-full focus:border-primary mt-2"
        placeholder="Vencimiento de la poliza"
        v-model="caja.vencimiento_poliza"
        :numberOfMonths="1"
        dateFormat="dd/mm/yy"
        showIcon
        :invalid="errors.vencimiento_poliza !== undefined"
      />
      <small class="p-error" v-if="errors.vencimiento_poliza">
        {{ errors.vencimiento_poliza }}
      </small>
    </div> -->
    <div class="mb-3">
      <label>Modelo</label>
      <InputText
        id="modelo"
        name="modelo"
        class="w-full focus:border-primary mt-2"
        placeholder="Modelo"
        v-model="caja.modelo"
        :invalid="errors.modelo !== undefined"
      />
      <small class="p-error" v-if="errors.modelo">
        {{ errors.modelo }}
      </small>
    </div>
    <!-- <div class="mb-3">
      <label>Aseguradora</label>
      <InputText
        id="aseguradora"
        name="aseguradora"
        class="w-full focus:border-primary mt-2"
        placeholder="Aseguradora"
        v-model="caja.aseguradora"
        :invalid="errors.aseguradora !== undefined"
      />
      <small class="p-error" v-if="errors.aseguradora">
        {{ errors.aseguradora }}
      </small>
    </div> -->
    <div class="mb-3">
      <label>Linea</label>
      <InputText
        id="linea"
        name="linea"
        class="w-full focus:border-primary mt-2"
        placeholder="Linea"
        v-model="caja.linea"
        :invalid="errors.linea !== undefined"
      />
      <small class="p-error" v-if="errors.linea">
        {{ errors.linea }}
      </small>
    </div>
    <div class="mb-3">
      <label>Configuracion</label>
      <Dropdown
        id="configuracion"
        name="configuracion"
        class="w-full focus:border-primary mt-2"
        filter
        placeholder="Configuracion"
        optionLabel="nombre"
        :options="configuracion"
        optionValue="clave"
        v-model="caja.configuracion"
        :invalid="errors.configuracion !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }}-{{ slotProps.option.nombre }}
        </template>
      </Dropdown>
      <small class="p-error" v-if="errors.configuracion">
        {{ errors.configuracion }}
      </small>
    </div>
    <div class="grid">
      <div class="col-11 mb-3">
        <label>Marca</label>
        <Dropdown
          id="marca_id"
          name="marca_id"
          class="w-full focus:border-primary mt-2"
          placeholder="Marca"
          optionLabel="nombre"
          filter
          :options="marcas"
          optionValue="id"
          v-model="caja.marca_id"
          :invalid="errors.marca_id !== undefined"
        >
          <template #option="slotProps">
            {{ slotProps.option.nombre }}
          </template>
        </Dropdown>
        <small class="p-error" v-if="errors.marca_id">
          {{ errors.marca_id }}
        </small>
      </div>
      <div class="col-1 mt-4">
        <router-link to="/agregar-marca-caja/caja">
          <Button class="mt-1 w-full" icon="pi pi-plus" />
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </form>
</template>
