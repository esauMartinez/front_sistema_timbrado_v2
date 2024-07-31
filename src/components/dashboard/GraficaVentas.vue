<script lang="ts" setup>
import useEstadisticas from '@/modules/trips/composables/estadisticas/useEstaditicas'
import { useTrips } from '@/modules/trips/composables/useTrips'
import * as _ from 'lodash'
import { watch } from 'vue'
import moment from 'moment'

const { trips, estatus, fromDate, toDate, fetchTrips } = useTrips()
const { date, labels, dataChar, chartData, chartOptions, setChartData, setChartOptions } =
  useEstadisticas()

chartData.value = setChartData()
chartOptions.value = setChartOptions()

const monthChanged = () => {
  const days = moment(date.value).daysInMonth()
  estatus.value.value = 'TODOS'
  fromDate.value = moment(date.value).format('YYYY-MM-DD')
  toDate.value = moment(date.value).add(days, 'days').format('YYYY-MM-DD')

  fetchTrips()
}

watch(trips, (payload) => {
  if (payload) {
    const dateFormated = payload.map((x) => {
      x.dia_grafica = moment(x.createdAt).format('YYYY-MM-DD')
      return x
    })
    const ordered = _.orderBy(dateFormated, 'dia_grafica')
    const tripsGrouped = _.groupBy(ordered, 'dia_grafica')

    labels.value = []
    dataChar.value = []
    for (const key in tripsGrouped) {
      labels.value.push(key)
      dataChar.value.push(tripsGrouped[key].length)
    }

    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  }
})
</script>

<template>
  <Card>
    <template #title>Grafica de ventas</template>
    <template #content>
      <div class="flex justify-content-center mb-3">
        <Calendar v-model="date" view="month" dateFormat="mm/yy" @date-select="monthChanged" />
      </div>
      <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
    </template>
  </Card>
</template>
