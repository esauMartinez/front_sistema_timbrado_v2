<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useClienteStore } from "@/stores/cliente";
import { pais } from "@/data/pais";
import { origen } from "@/data/origen";
import { estado } from "@/data/estado";

const clienteStore = useClienteStore();
const {
  cliente,
  usoCfdi,
  metodoPago,
  formaPago,
  regimenFiscal,
  errorsCliente: errors,
} = storeToRefs(clienteStore);


clienteStore.resetErros();
</script>

<template>
  <form class="p-2">
    <div class="mb-3">
      <label>Razon social</label>
      <InputText
        id="razon_social"
        name="razon_social"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.razon_social! }]"
        placeholder="Razon social"
        autocomplete="off"
        v-model="cliente.razon_social"
        :invalid="errors.razon_social !== undefined"
      />
      <span class="p-error" v-if="errors.razon_social!">
        {{ errors.razon_social }}
      </span>
    </div>
    <div class="mb-3">
      <label>Origen</label>
      <Dropdown
        id="origen"
        name="origen"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.origen! }]"
        :options="origen"
        placeholder="Origen"
        optionLabel="nombre"
        optionValue="clave"
        v-model="cliente.origen"
        :invalid="errors.origen !== undefined"
      />
      <span class="p-error" v-if="errors.origen">
        {{ errors.origen }}
      </span>
    </div>
    <div class="mb-3">
      <label>Pais</label>
      <Dropdown
        id="pais"
        name="pais"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.pais! }]"
        :options="pais"
        placeholder="Pais"
        optionLabel="item"
        optionValue="item"
        v-model="cliente.pais"
        :invalid="errors.pais !== undefined"
      />
      <span class="p-error" v-if="errors.pais">
        {{ errors.pais }}
      </span>
    </div>
    <div class="mb-3">
      <label>Codigo Postal</label>
      <InputText
        id="codigo_postal"
        name="codigo_postal"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.codigo_postal! }]"
        placeholder="Codigo Postal"
        v-model="cliente.codigo_postal"
        :invalid="errors.codigo_postal !== undefined"
      />
      <span class="p-error" v-if="errors.codigo_postal!">
        {{ errors.codigo_postal }}
      </span>
    </div>
    <div class="mb-3">
      <label>Colonia</label>
      <InputText
        id="colonia"
        name="colonia"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.colonia! }]"
        placeholder="Colonia"
        v-model="cliente.colonia"
        :invalid="errors.colonia !== undefined"
      />
      <span class="p-error" v-if="errors.colonia!">
        {{ errors.colonia }}
      </span>
    </div>
    <div class="mb-3">
      <label>Municipio</label>
      <InputText
        id="municipio"
        name="municipio"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.municipio! }]"
        placeholder="Municipio"
        v-model="cliente.municipio"
        :invalid="errors.municipio !== undefined"
      />
      <span class="p-error" v-if="errors.municipio!">
        {{ errors.municipio }}
      </span>
    </div>
    <div class="mb-3" v-if="cliente.origen === 'extranjero'">
      <label>Estado</label>
      <InputText
        id="estado"
        name="estado"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.estado! }]"
        placeholder="Estado"
        v-model="cliente.estado"
        :invalid="errors.estado !== undefined"
      />
      <span class="p-error" v-if="errors.estado!">
        {{ errors.estado }}
      </span>
    </div>
    <div class="mb-3" v-if="cliente.origen !== 'extranjero'">
      <label>Estado</label>
      <Dropdown
        id="estado"
        name="estado"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.estado! }]"
        :options="estado"
        placeholder="Estado"
        optionLabel="item"
        optionValue="item"
        v-model="cliente.estado"
        :invalid="errors.estado !== undefined"
      />
      <span class="p-error" v-if="errors.estado!">
        {{ errors.estado }}
      </span>
    </div>
    <div class="mb-3">
      <label>Calle</label>
      <InputText
        id="calle"
        name="calle"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.calle! }]"
        placeholder="Calle"
        v-model="cliente.calle"
        :invalid="errors.calle !== undefined"
      />
      <span class="p-error" v-if="errors.calle!">
        {{ errors.calle }}
      </span>
    </div>
    <div class="mb-3">
      <label>Numero Exterior</label>
      <InputText
        id="numero_exterior"
        name="numero_exterior"
        :class="['w-full', 'focus:border-primary', 'mt-2']"
        placeholder="Numero Exterior"
        v-model="cliente.numero_exterior"
      />
    </div>
    <div class="mb-3">
      <label>Numero Interior</label>
      <InputText
        id="numero_interior"
        name="numero_interior"
        :class="['w-full', 'focus:border-primary', 'mt-2']"
        placeholder="Numero Interior"
        v-model="cliente.numero_interior"
      />
    </div>
    <div class="mb-3">
      <label>RFC</label>
      <InputText
        id="rfc"
        name="rfc"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.rfc! }]"
        placeholder="RFC"
        v-model="cliente.rfc"
        :invalid="errors.rfc !== undefined"
      />
      <span class="p-error" v-if="errors.rfc!">
        {{ errors.rfc }}
      </span>
    </div>
    <div class="mb-3">
      <label>Email</label>
      <InputText
        id="email"
        name="email"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.email! }]"
        placeholder="Email"
        v-model="cliente.email"
        :invalid="errors.email !== undefined"
      />
      <span class="p-error" v-if="errors.email!">
        {{ errors.email }}
      </span>
    </div>
    <div class="mb-3">
      <label>Uso de CFDI</label>
      <Dropdown
        id="uso_cfdi"
        name="uso_cfdi"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.uso_cfdi! }]"
        placeholder="Uso de CFDI"
        filter
        optionLabel="clave"
        :options="usoCfdi"
        optionValue="clave"
        v-model="cliente.uso_cfdi"
        :invalid="errors.uso_cfdi !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </Dropdown>
      <span class="p-error" v-if="errors.uso_cfdi!">
        {{ errors.uso_cfdi }}
      </span>
    </div>
    <div class="mb-3">
      <label>Metodo de Pago</label>
      <Dropdown
        id="metodo_pago"
        name="metodo_pago"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.metodo_pago! }]"
        placeholder="Metodo de Pago"
        optionLabel="clave"
        :options="metodoPago"
        optionValue="clave"
        v-model="cliente.metodo_pago"
        :invalid="errors.metodo_pago !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </Dropdown>
      <span class="p-error" v-if="errors.metodo_pago!">
        {{ errors.metodo_pago }}
      </span>
    </div>
    <div class="mb-3">
      <label>Forma de Pago</label>
      <Dropdown
        id="forma_pago"
        name="forma_pago"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.forma_pago! }]"
        placeholder="Forma de Pago"
        filter
        optionLabel="clave"
        :options="formaPago"
        optionValue="clave"
        v-model="cliente.forma_pago"
        :invalid="errors.forma_pago !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </Dropdown>
      <span class="p-error" v-if="errors.forma_pago!">
        {{ errors.forma_pago }}
      </span>
    </div>
    <div class="mb-3">
      <label>Regimen fiscal</label>

      <Dropdown
        id="regimen_fiscal"
        name="regimen_fiscal"
        :class="['w-full', 'focus:border-primary', 'mt-2', { 'i-error': errors.regimen_fiscal! }]"
        placeholder="Regimen fiscal"
        filter
        optionLabel="clave"
        :options="regimenFiscal"
        optionValue="clave"
        v-model="cliente.regimen_fiscal"
        :invalid="errors.regimen_fiscal !== undefined"
      >
        <template #option="slotProps">
          {{ slotProps.option.clave }} -
          {{ slotProps.option.descripcion }}
        </template>
      </Dropdown>
      <span class="p-error" v-if="errors.regimen_fiscal!">
        {{ errors.regimen_fiscal }}
      </span>
    </div>
  </form>
</template>

<style scoped></style>
