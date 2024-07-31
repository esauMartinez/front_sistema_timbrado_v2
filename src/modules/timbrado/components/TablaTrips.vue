<script lang="ts" setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { formatDateWithTime } from '@/pipes/formatDate'
import { useAuth } from '@/auth/composables/useAuth'
import { useTrips } from '@/modules/trips/composables/useTrips'
import { useXmlTimbre } from '../composables/useXmlTtimbre'
import { router } from '@/router'

const { verificarPermiso } = useAuth()

const { getXmlTimbreQuery } = useXmlTimbre()

const severityTrip = (estatus: string) => {
  let severity = null
  switch (estatus) {
    case 'CREADO':
      severity = 'info'
      break
    case 'PROGRAMADO':
      severity = 'warning'
      break
    case 'TRANSITO':
      severity = 'success'
      break
    case 'CANCELADO':
      severity = 'danger'
      break
  }
  return severity
}

const { trips, estatus, estatusOptions, fromDate, toDate, isLoading, fetchTrips } = useTrips()
fetchTrips()

const numero_trip = ref(null)

const buscarTrip = (e: any) => {
  if (e.key === 'Enter') {
    router.push({ name: 'datos-timbre', params: { id: numero_trip.value } })
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  razon_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
  operador: { value: null, matchMode: FilterMatchMode.CONTAINS },
  paterno: { value: null, matchMode: FilterMatchMode.CONTAINS },
  materno: { value: null, matchMode: FilterMatchMode.CONTAINS },
  estatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
  tipo_viaje: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="trips"
    showGridlines
    paginator
    :rowHover="true"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="[
      'numero_trip',
      'cliente.razon_social',
      'operador.nombre',
      'operador.paterno',
      'operador.materno',
      'estatus',
      'tipo_viaje'
    ]"
  >
    <template #header>
      <div class="grid">
        <div class="col-2">
          <Calendar
            v-model="fromDate"
            :manualInput="false"
            class="w-full"
            @date-select="fetchTrips()"
          />
        </div>
        <div class="col-2">
          <Calendar
            v-model="toDate"
            :manualInput="false"
            class="w-full"
            @date-select="fetchTrips()"
          />
        </div>
        <div class="col-2">
          <Dropdown
            v-model="estatus"
            :options="estatusOptions"
            optionLabel="label"
            placeholder="Estatus"
            class="w-full"
            @change="fetchTrips()"
          />
        </div>
        <div class="col-3">
          <InputText
            v-model="numero_trip"
            class="w-full"
            placeholder="Buscar trip"
            @keyup="buscarTrip"
          />
        </div>
        <div class="col-3">
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="Buscar en tabla"
              class="w-full"
            />
          </IconField>
        </div>
      </div>
    </template>
    <Column field="numero_trip" header="Trip" sortable></Column>
    <Column field="createdAt" header="Fecha de creacion" sortable>
      <template #body="data">
        {{ formatDateWithTime(data.data.createdAt) }}
      </template>
    </Column>
    <Column field="tipo_viaje" header="Tipo de viaje" sortable></Column>
    <Column field="moneda" header="Moneda" sortable></Column>
    <Column field="cliente.razon_social" header="Cliente" sortable></Column>
    <Column field="operador.nombre" header="Operador" sortable>
      <template #body="{ data }">
        <div v-if="data.operador !== null">
          {{ data.operador.nombre }} {{ data.operador.paterno }}
          {{ data.operador.materno }}
        </div>
      </template>
    </Column>

    <Column field="tractor.numero_economico" header="Tractor" sortable></Column>
    <Column field="caja.numero_economico" header="Caja" sortable></Column>
    <Column field="isTimbrado" header="Etatus timbre" headerStyle="width:10rem" sortable>
      <template #body="{ data }">
        <Tag
          :severity="data.isTimbrado ? 'success' : 'danger'"
          :value="data.isTimbrado ? 'Trip timbrado' : 'Trip sin timbre'"
          class="w-full"
        ></Tag>
      </template>
    </Column>
    <Column field="estatus" header="Estatus" sortable>
      <template #body="{ data }">
        <Tag :severity="severityTrip(data.estatus)!" :value="data.estatus" class="w-full"></Tag>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: 'datos-timbre', params: { id: data.id } }"
            v-if="!verificarPermiso('MODULO_TIMBRADO_TIMBRAR')"
          >
            <Button icon="pi pi-bell" severity="success" />
          </router-link>
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: 'lista-timbres', params: { id: data.id } }"
            v-if="!verificarPermiso('MODULO_TIMBRADO_TIMBRAR')"
          >
            <Button icon="pi pi-bars" severity="info" />
          </router-link>
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <Button
            icon="pi pi-file"
            severity="primary"
            @click="getXmlTimbreQuery(data.id)"
            v-if="data.isTimbrado && !verificarPermiso('MODULO_TIMBRADO_TIMBRAR')"
          />
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: 'pdf-timbrado', params: { id: data.id } }"
            v-if="data.isTimbrado"
          >
            <Button icon="pi pi-file-pdf" severity="danger" />
          </router-link>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
