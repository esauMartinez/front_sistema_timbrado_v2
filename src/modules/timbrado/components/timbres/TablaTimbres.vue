<script lang="ts" setup>
import { formatDateWithTime } from '@/pipes/formatDate'
import { useTimbres } from '@/modules/timbrado/composables/useTimbres'
import { useRoute } from 'vue-router'
import type { Timbre } from '@/modules/trips/interfaces/timbre'
import { useXmlAcuse } from '@/modules/timbrado/composables/useXmlAcuse'

const route = useRoute()
const { timbres } = useTimbres(+route.params.id)
const { getXmlAcuseQuery } = useXmlAcuse()
const severityEstatus = (timbre: Timbre) => {
  return timbre.estatus === 'CANCELADO' ? 'danger' : 'success'
}
</script>

<template>
  <DataTable :value="timbres" showGridlines>
    <Column header="Fecha">
      <template #body="{ data }">
        {{ formatDateWithTime(data.fecha_timbrado) }}
      </template>
    </Column>
    <Column field="uuid" header="UUID"></Column>
    <Column field="estatus" header="Estatus">
      <template #body="{ data }">
        <Tag
          :severity="severityEstatus(data)"
          :value="data.estatus === 'CREADO' ? 'VIGENTE' : data.estatus"
        ></Tag>
      </template>
    </Column>
    <Column header="Codigo estatus cancelacion">
      <template #body="{ data }">
        <Tag
          severity="info"
          :value="`${data.acuse.codigo_estatus}: ${data.acuse.descripcion_estatus}`"
          v-if="data.acuse"
        ></Tag>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link :to="{ name: 'cancelar-timbre', params: { id_cancelacion: data.id } }">
            <Button icon="pi pi-times" severity="danger" />
          </router-link>
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <Button
            icon="pi pi-download"
            severity="info"
            v-if="data.estatus === 'CANCELADO'"
            @click="getXmlAcuseQuery(data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
