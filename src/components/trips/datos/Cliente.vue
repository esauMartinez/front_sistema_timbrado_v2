<script lang="ts" setup>
import { ref } from "vue";
import Tabla from "@/modules/clientes/components/TablaClientes.vue";
import { router } from "@/router";

const visible = ref(true);
</script>

<template>
  <Dialog
    v-model:visible="visible"
    header=" "
    modal
    :style="{ width: '95vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Tabla :isModule="false" />
  </Dialog>
</template>
