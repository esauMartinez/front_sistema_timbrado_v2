<script setup lang="ts">
import useContacto from "@/modules/clientes/composables/contactos/useContacto";
import { useClienteStore } from "@/stores/cliente";
import { storeToRefs } from "pinia";

const clienteStore = useClienteStore();
const { contacto } = useContacto();
const { errorsContacto: errors } = storeToRefs(clienteStore);
clienteStore.resetErros();
</script>

<template>
  <form>
    <div class="mb-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText
          :class="['w-full', 'focus:border-primary', { 'i-error': errors.nombre! }]"
          v-model="contacto.nombre"
          placeholder="Nombre contacto"
          :invalid="errors.nombre !== undefined"
        />
      </InputGroup>
      <span class="p-error" v-if="errors.nombre!">
        {{ errors.nombre }}
      </span>
    </div>
    <div class="mb-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-phone"></i>
        </InputGroupAddon>
        <InputNumber
          :class="['w-full', 'focus:border-primary', { 'i-error': errors.telefono! }]"
          v-model="contacto.telefono"
          :useGrouping="false"
          placeholder="Numero de telefono"
          :invalid="errors.telefono !== undefined"
        />
      </InputGroup>
      <span class="p-error" v-if="errors.telefono!">
        {{ errors.telefono }}
      </span>
    </div>
    <div class="mb-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-at"></i>
        </InputGroupAddon>
        <InputText
          :class="['w-full', 'focus:border-primary', { 'i-error': errors.email! }]"
          v-model="contacto.email"
          placeholder="Email"
          :invalid="errors.email !== undefined"
        />
      </InputGroup>
      <span class="p-error" v-if="errors.email!">
        {{ errors.email }}
      </span>
    </div>
    <div class="mb-3">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-lightbulb"></i>
        </InputGroupAddon>
        <Dropdown
          :class="['w-full', 'focus:border-primary', { 'i-error': errors.turno! }]"
          v-model="contacto.turno"
          :options="[{ item: 'noche' }]"
          optionLabel="item"
          optionValue="item"
          placeholder="Turno"
          :invalid="errors.turno !== undefined"
        />
      </InputGroup>
      <span class="p-error" v-if="errors.turno!">
        {{ errors.turno }}
      </span>
    </div>
  </form>
</template>

<style scoped></style>
