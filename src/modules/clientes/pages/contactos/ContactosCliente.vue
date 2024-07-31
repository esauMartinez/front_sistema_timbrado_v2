<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { router } from "@/router";
import TablaContactos from "@/modules/clientes/components/TablaContactos.vue";
import useContactos from "@/modules/clientes/composables/contactos/useContactos";

const route = useRoute();
const { id } = route.params;
const { contactos } = useContactos(+id);

const visible = ref(true);
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Contactos del cliente"
    :style="{ width: '60%' }"
    v-on:after-hide="router.push({ path: '/clientes' })"
    :position="'top'"
    pt:mask:class="backdrop-blur-sm"
  >
    <TablaContactos :contactos="contactos" />
  </Dialog>

  <router-view></router-view>
</template>

<style scoped></style>
