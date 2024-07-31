<script setup lang="ts">
import type { Movimiento } from '@/modules/trips/interfaces/movimiento'
import type { Trip } from '@/modules/trips/interfaces/trip'

interface Props {
  trip: Trip | undefined
  movimientos: Movimiento[] | undefined
}

defineProps<Props>()
</script>

<template>
  <Fieldset legend="Movimientos">
    <Timeline :value="trip?.movimientos" align="alternate">
      <template #content="slotProps">
        <p>
          {{ slotProps.item.patio.nombre }}
        </p>
        <ButtonGroup>
          <Button
            size="small"
            :severity="slotProps.item.localizacion_caja ? 'warning' : ''"
            v-tooltip="{
              value: 'Poner la caja como localizable en este patio',
              showDelay: 300,
              hideDelay: 300
            }"
          >
            <font-awesome-icon :icon="['fas', 'location-dot']" />
          </Button>
          <Button
            size="small"
            :severity="slotProps.item.patio_timbre ? 'info' : ''"
            v-tooltip="{
              value: 'Agregar patio para timbrado',
              showDelay: 300,
              hideDelay: 300
            }"
          >
            <font-awesome-icon :icon="['fas', 'crosshairs']" />
          </Button>
          <Button
            size="small"
            v-tooltip="{
              value: 'Eliminar movimiento',
              showDelay: 300,
              hideDelay: 300
            }"
            severity="danger"
            v-if="trip?.estatus !== 'TERMINADO'"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </Button>
        </ButtonGroup>
      </template>
    </Timeline>
  </Fieldset>
</template>

<style scoped></style>
