import { storeToRefs } from 'pinia'
import { handleError, question } from '@/helpers/messages'
import { useTimbradoStore } from '@/store/timbrado'
import { useServicioStore } from '@/stores/servicio'
import type { Concepto } from '@/interfaces/concepto.model'
import { useToast } from 'primevue/usetoast'
import { router } from '@/router'
import type { Mercancia } from '@/interfaces/mercancia.model'
import { useTripStore } from '@/store/trip'
import type { Patio } from '@/modules/patios/interfaces/patio'
import type { Trip } from '@/interfaces/trip'
import { useTrip } from './useTrip'
import { useLoadStore } from '@/store/load'
import type { Cancelacion } from '@/interfaces/timbre.model'
import timbradoApi from '@/api/timbrado-api'
import type { Servicio } from '@/modules/servicios/interfaces/servicio'

export const useTimbrado = () => {
  const timbradoStore = useTimbradoStore()
  const servicioStore = useServicioStore()
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const { servicios } = storeToRefs(servicioStore)
  const {
    empresa,
    cliente,
    operador,
    tractor,
    caja,
    concepto,
    conceptos,
    mercancias,
    mercancia,
    timbres,
    cancelacion,
    mercanciasSat,
    unidadesPeso,
    peligrosos,
    balance,
    isTimbrando
  } = storeToRefs(timbradoStore)
  const toast = useToast()
  const { getTrips } = useTrip()
  const loadStore = useLoadStore()

  const getDatosTimbre = async (id: number) => {
    try {
      const { data } = await timbradoApi.get(`/getDatosTimbre/${id}`)
      const patios: Patio[] = []
      const index_origen = data.movimientos.findIndex((x: any) => x.patio_timbre)
      const index_destino = data.movimientos.findLastIndex((x: any) => x.patio_timbre)
      const origen = data.movimientos[index_origen].patio
      const destino = data.movimientos[index_destino].patio
      patios.push(origen)
      patios.push(destino)
      data.movimientos = patios
      timbradoStore.setDatosTimbre(data)
      tripStore.setTrip(data)
    } catch (error) {
      handleError(error)
    }
  }

  const postConcepto = async (concepto: Concepto) => {
    try {
      if (concepto.clave !== null) {
        const servicio: Servicio = servicios.value.find(
          (x: Servicio) => x.clave === concepto.clave
        )!
        concepto.nombre = servicio.descripcion
        concepto.trip_id = trip.value.id
      }
      const { data } = await timbradoApi.post(`/guardar-concepto-trip`, concepto)
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: data.data,
        life: 3000
      })
      router.go(-1)
      getDatosTimbre(trip.value.id)
    } catch (error) {
      handleError(error)
    }
  }

  const eliminarConcepto = async (id: number) => {
    try {
      const { data } = await timbradoApi.delete(`/eliminar-concepto-trip/${id}`)
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: data.data,
        life: 3000
      })
      getDatosTimbre(trip.value.id)
    } catch (error) {
      handleError(error)
    }
  }

  const agregarIva = () => {
    if (concepto.value.iva === 0) {
      concepto.value.iva = concepto.value.monto * 0.16
    } else {
      concepto.value.iva = 0
    }
  }

  const agregarRetencion = () => {
    const valor = empresa.value.tipo_empresa === 'PERSONA_MORAL' ? 0.04 : 0.0125
    if (concepto.value.retencion === 0) {
      concepto.value.retencion = concepto.value.monto * valor
    } else {
      concepto.value.retencion = 0
    }
  }

  const resetFormConcepto = () => {
    timbradoStore.setConcepto({} as Concepto)
  }

  const postMercancia = async (payload: Mercancia) => {
    mercancia.value.trip_id = trip.value.id
    try {
      const { data } = await timbradoApi.post(`/guardar-mercancia-trip`, payload)
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: data.data,
        life: 3000
      })
      router.go(-1)
      getDatosTimbre(trip.value.id)
    } catch (error) {
      handleError(error)
    }
  }

  const deleteMercancia = async (id: number) => {
    try {
      const { data } = await timbradoApi.delete(`/eliminar-mercancia-trip/${id}`)
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: data.data,
        life: 3000
      })
      getDatosTimbre(trip.value.id)
    } catch (error) {
      handleError(error)
    }
  }

  const obtenerMercacias = async (payload: string) => {
    if (payload !== '') {
      try {
        const { data } = await timbradoApi.get(`/sat-mercancias/${payload}`)
        timbradoStore.setMercanciasSat(data)
      } catch (error) {
        handleError(error)
      }
    }
  }

  const obtenerUnidadesPeso = async (payload: string) => {
    if (payload !== '') {
      try {
        const { data } = await timbradoApi.get(`/sat-unidades-peso/${payload}`)
        timbradoStore.setUnidadesPesoSat(data)
      } catch (error) {
        handleError(error)
      }
    }
  }

  const obtenerMaterialesPeligrosos = async (payload: string) => {
    if (payload !== '') {
      try {
        const { data } = await timbradoApi.get(`/sat-materiales-peligrosos/${payload}`)
        timbradoStore.setPeligrosos(data)
      } catch (error) {
        handleError(error)
      }
    }
  }

  const timbrar = async (trip_id: number) => {
    try {
      const response = await question('Se timbrara el trip', 'Si')
      if (response.isConfirmed) {
        loadStore.setLoading(true)
        const { data } = await timbradoApi.get(`/timbrar/${trip_id}`)
        toast.add({
          severity: 'success',
          summary: 'Timbrado',
          detail: data.data,
          life: 3000
        })
        getDatosTimbre(trip.value.id)
        loadStore.setLoading(false)
        // pdfTimbre(trip.value.id);
        getTrips('TODOS')
      }
    } catch (error) {
      loadStore.setLoading(false)
      handleError(error)
    }
  }

  const cancelarTimbre = async (payload: Cancelacion) => {
    try {
      const response = await question('Se cancelara el timbre', 'Si')
      if (response.isConfirmed) {
        loadStore.setLoading(true)
        const { data } = await timbradoApi.put(`/cancelar-timbre/${payload.id}`, payload)
        toast.add({
          severity: 'success',
          summary: 'Trip',
          detail: data.data,
          life: 3000
        })
        getTrips('TODOS')
        loadStore.setLoading(false)
        router.go(-1)
      }
    } catch (error) {
      loadStore.setLoading(false)
      handleError(error)
    }
  }

  const putRegimenAduanero = async (payload: Trip) => {
    try {
      const { data } = await timbradoApi.put(`/modificar-regimen-aduanero/${payload.id}`, payload)
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: data.data,
        life: 3000
      })
      getDatosTimbre(trip.value.id)
    } catch (error) {
      handleError(error)
    }
  }

  const getBalanceTimbres = async () => {
    try {
      const { data } = await timbradoApi.get(`/balance-timbres`)
      timbradoStore.setBalance(data)
    } catch (error) {
      handleError(error)
    }
  }

  const getAcuses = async (id: number) => {
    try {
      const { data } = await timbradoApi.get(`/acuses/${id}`)
      timbradoStore.setTimbres(data)
    } catch (error) {
      handleError(error)
    }
  }

  const xmlTimbre = async (trip_id: number) => {
    try {
      const { data } = await timbradoApi.get(`/get-xml/${trip_id}`)
      const format_xml = data.replace(/'\/'/g, '')
      const a = document.createElement('a')
      const archivo = new Blob([format_xml], { type: 'text/plain' })
      const url = URL.createObjectURL(archivo)
      a.href = url
      a.download = `XML-TRIP-${trip_id}.xml`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      handleError(error)
    }
  }

  const xmlAcuse = async (trip_id: number) => {
    try {
      const { data } = await timbradoApi.get(`/get-xml-acuse/${trip_id}`)
      const a = document.createElement('a')
      const archivo = new Blob([data.acuse], { type: 'text/plain' })
      const url = URL.createObjectURL(archivo)
      a.href = url
      a.download = `XML-ACUSE-${trip_id}.xml`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      handleError(error)
    }
  }

  const resetFormMercancia = () => {
    timbradoStore.setMercancia({} as Mercancia)
  }

  const resetFormCancelacion = (id: number) => {
    timbradoStore.setCancelacion({} as Cancelacion)
  }

  return {
    trip,
    concepto,
    empresa,
    cliente,
    operador,
    tractor,
    caja,
    conceptos,
    mercancias,
    mercancia,
    timbres,
    cancelacion,
    balance,
    isTimbrando,
    mercanciasSat,
    unidadesPeso,
    peligrosos,
    agregarIva,
    agregarRetencion,
    getDatosTimbre,
    postConcepto,
    eliminarConcepto,
    postMercancia,
    deleteMercancia,
    obtenerMaterialesPeligrosos,
    obtenerUnidadesPeso,
    obtenerMercacias,
    timbrar,
    cancelarTimbre,
    putRegimenAduanero,
    resetFormMercancia,
    getBalanceTimbres,
    getAcuses,
    xmlTimbre,
    xmlAcuse,
    resetFormConcepto,
    resetFormCancelacion
  }
}
