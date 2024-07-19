<script setup lang="ts">
import Column from "primevue/column";
import type { Bitacora } from "../interfaces/bitacora";
import moment from "moment";

interface Props {
  bitacora: Bitacora[];
  isLoading: boolean;
}

defineProps<Props>();

const verificarEvento = (evento: string) => {
  if (evento === "ACTIVACION") {
    return "success";
  } else if (evento === "DESACTIVACION") {
    return "danger";
  } else {
    return "warning";
  }
};
</script>

<template>
  <DataTable
    :value="bitacora"
    showGridlines
    :size="'small'"
    paginator
    :rows="10"
    tableStyle="min-width: 50rem"
    :loading="isLoading"
    rowHover
  >
    <Column field="evento" header="Evento">
      <template #body="{ data }">
        <Tag
          :value="data.evento"
          :severity="verificarEvento(data.evento)"
        ></Tag>
      </template>
    </Column>
    <Column field="comentarios" header="Comentarios"></Column>
    <Column header="Fecha">
      <template #body="{ data }">
        {{ moment(data.createdAt).format("YYYY/MM/DD hh:mm:ss") }}
      </template>
    </Column>
    <Column header="Usuario">
      <template #body="{ data }">
        {{ data.usuario.nombre }} {{ data.usuario.paterno }}
        {{ data.usuario.materno }}
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
