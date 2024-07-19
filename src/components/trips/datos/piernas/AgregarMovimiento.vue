<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { router } from "@/router";
import { usePatio } from "@/composables/usePatio";
import Tabla from "@/components/patios/Tabla.vue";

const { patios, resetPatioForm } = usePatio();
const visible = ref(true);

onMounted(() => {
  resetPatioForm();
  patios.value = [];
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header=" "
    :style="{ width: '95vw' }"
    v-on:after-hide="router.go(-1)"
  >
    <Tabla :isModule="false" />
  </Dialog>
</template>
