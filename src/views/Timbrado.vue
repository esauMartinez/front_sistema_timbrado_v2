<script lang="ts" setup>
import NavBar from "@/common/layout/NavBar.vue";
import Tabla from "@/components/timbrado/Tabla.vue";
</script>

<template>
  <NavBar :modulo="'Timbrado'" />
  <div class="m-margin-top">
    <Card>
      <template #content>
        <Tabla />
      </template>
    </Card>
    <RouterView />
  </div>
</template>
