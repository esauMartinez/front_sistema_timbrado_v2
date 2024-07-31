<script lang="ts" setup>
import useTipoCambio from '@/modules/timbrado/composables/useTipoCambio'
import CardInfo from './CardInfo.vue'
import { useQuery } from '@tanstack/vue-query'
import timbradoApi from '@/api/timbrado-api'

const { tipo_cambio, isLoading } = useTipoCambio()

interface Balance {
  expirationDate: string
  idUser: string
  idUserBalance: string
  isUnlimited: string
  stampsAssigned: string
  stampsBalance: string
  stampsUsed: string
}

const queryBalance = useQuery({
  queryKey: ['balance'],
  queryFn: async () => {
    const { data } = await timbradoApi.get<Balance>(`/balance-timbres`)
    return data
  }
})
</script>

<template>
  <div class="grid">
    <div class="col-3">
       <CardInfo
        class="p-3"
        title="Tipo de cambio"
        :balance="tipo_cambio"
        color="text-blue-300"
        :isLoading="isLoading"
      />
    </div>
    <div class="col-3">
      <CardInfo
        class="p-3"
        title="Timbres Usados"
        :balance="queryBalance.data.value?.stampsUsed?.toString()"
        color="text-blue-300"
        :isLoading="queryBalance.isLoading.value"
      />
    </div>
    <div class="col-3">
      <CardInfo
        class="p-3"
        title="Timbres Asignados"
        :balance="queryBalance.data.value?.stampsAssigned?.toString()"
        color="text-blue-300"
        :isLoading="queryBalance.isLoading.value"
      />
    </div>
    <div class="col-3">
      <CardInfo
        class="p-3"
        title="Timbres Restantes"
        :balance="queryBalance.data.value?.stampsBalance?.toString()"
        color="text-blue-300"
        :isLoading="queryBalance.isLoading.value"
      />
    </div>
    
  </div>
</template>
