<script setup lang="ts">
import FormularioContacto from "@/modules/clientes/components/FormularioContacto.vue";
import useContacto from "@/modules/clientes/composables/contactos/useContacto";
import useCrear from "@/modules/clientes/composables/contactos/useCrear";
import { router } from "@/router";
import { ref } from "vue";
import { useClienteStore } from "@/stores/cliente";
import type { Contacto } from "@/modules/clientes/interfaces/contacto";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { contacto } = useContacto();
const { isLoading, isCreated, contactoMutation } = useCrear();
const clienteStore = useClienteStore();
const visible = ref(true);

clienteStore.setContacto({} as Contacto);
clienteStore.resetErros();
contacto.value.cliente_id = +route.params.id;

watch(isCreated, () => {
  visible.value = false;
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Nuevo contacto"
    :style="{ width: '40%' }"
    v-on:after-hide="
      router.push({
        name: 'contactos-cliente',
        params: { id: +route.params.id },
      })
    "
    :position="'top'"
    pt:mask:class="backdrop-blur-sm"
  >
    <FormularioContacto
      id="form"
      @submit.prevent="contactoMutation.mutate(contacto)"
    />

    <template #footer>
      <Button
        type="submit"
        form="form"
        :loading="isLoading"
        label="Guardar contacto"
      />
    </template>
  </Dialog>
</template>

<style scoped></style>
