import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getTrips } from '@/modules/trips/helpers/get-trips'
import { useTripStore } from '@/stores/trip'
import moment from 'moment'

export const useTrips = () => {
  const tripStore = useTripStore()
  const { trips } = storeToRefs(tripStore)

  const estatus = ref({ label: 'Transito', value: 'TRANSITO' })

  const estatusOptions = ref([
    { label: 'Creado', value: 'CREADO' },
    { label: 'Programado', value: 'PROGRAMADO' },
    { label: 'Transito', value: 'TRANSITO' },
    { label: 'Terminado', value: 'TERMINADO' },
    { label: 'Cancelados', value: 'CANCELADO' },
    { label: 'Todos', value: 'TODOS' }
  ])

  const fromDate = ref()
  const toDate = ref()
  fromDate.value = moment().subtract(7, 'day').format('YYYY-MM-DD')
  toDate.value = moment().add(1, 'day').format('YYYY-MM-DD')

  const {
    isLoading,
    isSuccess,
    data,
    refetch: fetchTrips
  } = useQuery({
    queryKey: ['trips'],
    queryFn: () => getTrips(estatus.value.value, fromDate.value, toDate.value)
  })

  watch(
    data,
    (payload) => {
      if (payload) tripStore.setTrips(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    trips,
    fromDate,
    toDate,
    estatus,
    estatusOptions,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),

    fetchTrips
  }
}
