<script lang="ts" setup>
import { onMounted } from 'vue'
import { useTimbrado } from '@/composables/useTimbrado'
import CardBalance from './CardBalance.vue'

const { balance, getBalanceTimbres } = useTimbrado()

onMounted(async () => {
  await getBalanceTimbres()
})
</script>

<template>
  <div class="grid">
    <div class="col-4">
      <CardBalance
        class="p-3"
        title="Timbres Usados"
        :balance="balance.stampsUsed?.toString()"
        color="text-green-300"
      />
    </div>
    <div class="col-4">
      <CardBalance
        class="p-3"
        title="Timbres Asignados"
        :balance="balance.stampsAssigned?.toString()"
        color="text-blue-300"
      />
    </div>
    <div class="col-4">
      <CardBalance
        class="p-3"
        title="Timbres Restantes"
        :balance="balance.stampsBalance?.toString()"
        color="text-yellow-300"
      />
    </div>
  </div>
</template>
