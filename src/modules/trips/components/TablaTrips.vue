<script lang="ts" setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { formatDateWithTime } from '@/pipes/formatDate'
import { useAuth } from '@/auth/composables/useAuth'
import { useTrips } from '@/modules/trips/composables/useTrips'
import moment from 'moment'

const { verificarPermiso } = useAuth()

const { trips } = useTrips(
  'TODOS',
  moment().subtract(5, 'months').format('YYYY-MM-DD'),
  moment().format('YYYY-MM-DD')
)

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

const estatus = ref({ label: 'Todos', value: 'TODOS' })

const estatusOptions = ref([
  { label: 'Creado', value: 'CREADO' },
  { label: 'Programado', value: 'PROGRAMADO' },
  { label: 'Transito', value: 'TRANSITO' },
  { label: 'Terminado', value: 'TERMINADO' },
  { label: 'Cancelados', value: 'CANCELADO' },
  { label: 'Todos', value: 'TODOS' }
])

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
    :rows="20"
    :rowsPerPageOptions="[20, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="false"
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
        <div class="col-1">
          <router-link :to="{ name: 'crear-trip' }" v-if="!verificarPermiso('MODULO_TRIPS_CREAR')">
            <Button label="Nuevo trip" severity="success" outlined class="w-full" />
          </router-link>
        </div>
        <div class="col-3">
          <Calendar :manualInput="false" class="w-full" />
        </div>
        <div class="col-3">
          <Calendar :manualInput="false" class="w-full" />
        </div>
        <div class="col-2">
          <Dropdown
            v-model="estatus"
            :options="estatusOptions"
            optionLabel="label"
            placeholder="Estatus"
            class="w-full"
          />
        </div>
        <div class="col-3">
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar" class="w-full" />
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
    <Column header="Acciones" style="min-width: 200px">
      <!-- <template #body="{ data }">
        <div class="flex justify-content-center">
          <ButtonGroup>
            <Button
              icon="pi pi-book"
              severity="info"
              @click="bitacora(data.id)"
              v-if="data.usuario_toma_id === null && !verificarPermiso('MODULO_TRIPS_BITACORA')"
            />
            <Button
              icon="fa fa-comment"
              severity="success"
              @click="comentarios(data.id)"
              v-if="
                data.usuario_toma_id === null && !verificarPermiso('MODULO_TRIPS_COMENTARIOS_VER')
              "
            />
            <Button
              icon="pi pi-pencil"
              severity="warning"
              @click="modificar(data.id)"
              v-if="data.usuario_toma_id === null && !verificarPermiso('MODULO_TRIPS_MODIFICAR')"
            />
          </ButtonGroup>
        </div>
      </template> -->
    </Column>
  </DataTable>

  <!-- <Agregar /> -->
</template>
