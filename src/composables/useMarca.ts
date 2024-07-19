import { storeToRefs } from 'pinia'
import { useUnidadStore } from '@/store/unidad'
import { handleError } from '@/helpers/messages'
import type { Marca } from '@/interfaces/marca.model'
import { useToast } from 'primevue/usetoast'
import { router } from '@/router'
import timbradoApi from '@/api/timbrado-api'

export const useMarca = () => {
  const unidadStore = useUnidadStore()

  const { marca, marcas } = storeToRefs(unidadStore)
  const toast = useToast()

  const getMarcas = async (tipo: string) => {
    try {
      const { data } = await timbradoApi.get(`/marcas/${tipo}`)
      unidadStore.setMarcas(data)
    } catch (error) {
      handleError(error)
    }
  }

  const postMarca = async (payload: Marca) => {
    try {
      await timbradoApi.post('/marcas', payload)
      toast.add({
        severity: 'success',
        summary: 'Patio',
        detail: 'Marca agregada correctamente',
        life: 3000
      })
      router.go(-1)
      getMarcas(marca.value.tipo)
    } catch (error) {
      handleError(error)
    }
  }

  const deleteMarca = async (id: number) => {
    try {
      await timbradoApi.delete(`/marcas/${id}`)
      toast.add({
        severity: 'success',
        summary: 'Patio',
        detail: 'Marca eliminada correctamente',
        life: 3000
      })
    } catch (error) {
      handleError(error)
    }
  }

  const resetMarcaForm = () => {
    unidadStore.setMarca({} as Marca)
  }

  return { marca, marcas, getMarcas, postMarca, deleteMarca, resetMarcaForm }
}
