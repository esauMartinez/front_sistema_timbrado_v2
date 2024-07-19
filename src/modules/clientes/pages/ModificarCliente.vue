<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import FormularioCliente from "@/modules/clientes/components/FormularioCliente.vue";
import useCliente from "@/modules/clientes/composables/clientes/useCliente";
import { router } from "@/router";
import useModificar from "@/modules/clientes/composables/clientes/useModificar";
import { watch } from "vue";

const visible = ref(true);
const route = useRoute();
const { cliente } = useCliente(+route.params.id);
const { isLoading, isCreated, modificar } = useModificar();

watch(isCreated, () => {
  visible.value = false;
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Datos del cliente"
    :style="{ width: '50%' }"
    v-on:after-hide="router.push({ path: '/clientes' })"
    :position="'top'"
    pt:mask:class="backdrop-blur-sm"
  >
    <FormularioCliente id="form" @submit.prevent="modificar(cliente, true)" />

    <template #footer>
      <Button
        type="submit"
        form="form"
        :loading="isLoading"
        label="Guardar cliente"
      />
    </template>
  </Dialog>
</template>

<style scoped></style>
