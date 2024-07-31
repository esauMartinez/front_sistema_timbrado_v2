<script lang="ts" setup>
import NavBar from '@/common/layout/NavBar.vue'
import BalanceTimbres from '@/components/dashboard/BalanceTimbres.vue'
import GraficaVentas from "@/components/dashboard/GraficaVentas.vue";
</script>

<template>
  <NavBar :modulo="'Dashboard'" />
  <div class="container m-margin-top">
    <div class="grid">
      <div class="col-12">
        <BalanceTimbres />
      </div>
      <div class="col-12">
				<GraficaVentas />
			</div>
    </div>
  </div>
</template>
