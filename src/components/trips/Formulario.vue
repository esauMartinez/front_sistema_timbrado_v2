<script lang="ts" setup>
import Piernas from "@/components/trips/datos/piernas/Piernas.vue";
import Datos from "./datos/Datos.vue";
</script>

<template>
  <form>
    <div class="row">
      <div class="col-lg-12">
        <Datos />
      </div>
      <div class="col-lg-12">
        <Piernas class="mt-3" />
      </div>
    </div>
  </form>
</template>
