<script lang="ts" setup>
import { ref, watch } from "vue";
import { router } from "@/router";
import { useRoute } from "vue-router";
import { useOperador } from "@/modules/operadores/composables/useOperador";
import Formulario from "@/modules/operadores/components/FormularioOperador.vue";
import { useModificar } from "@/modules/operadores/composables/useModifiar";

const visible = ref(true);
const route = useRoute();

const { operador, gafete } = useOperador(+route.params.id);

const { isPending, isSuccess, updateMutation } = useModificar();

const updateOperador = () => {
  const formData = new FormData();
  formData.append("gafete", gafete.value);
  formData.append("operador", JSON.stringify(operador.value));
  updateMutation.mutate(formData);
};

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false;
  }
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Modificar operador"
    :style="{ width: '50vw' }"
    v-on:after-hide="router.push({ path: '/operadores' })"
  >
    <Formulario @submit.prevent="updateOperador" id="formulario" />
    <template #footer>
      <ButtonGroup>
        <Button
          label="Modificar"
          icon="pi pi-pencil"
          type="submit"
          form="formulario"
          severity="warning"
          :loading="isPending"
        />
      </ButtonGroup>
    </template>
  </Dialog>
</template>
