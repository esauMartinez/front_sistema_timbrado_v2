<script setup lang="ts">
import TablaBitacora from "@/modules/clientes/components/TablaBitacora.vue";
import useBitacora from "@/modules/clientes/composables/useBitacora";
import { router } from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { isLoading, bitacora } = useBitacora(+route.params.id);

const visible = ref(true);
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Bitacora de cliente"
    :style="{ width: '70%' }"
    v-on:after-hide="router.push({ path: '/clientes' })"
    :position="'top'"
    pt:mask:class="backdrop-blur-sm"
  >
    <TablaBitacora :bitacora="bitacora" :isLoading="isLoading" />
  </Dialog>
</template>

<style scoped></style>
