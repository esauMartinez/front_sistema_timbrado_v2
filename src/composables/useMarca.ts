import { handleError } from '@/helpers/messages'
import type { Marca } from '@/interfaces/marca.model'
import { useToast } from 'primevue/usetoast'
import { router } from '@/router'
import timbradoApi from '@/api/timbrado-api'

export const useMarca = () => {
  // const { marca, marcas } = storeToRefs()
  const toast = useToast()

  const getMarcas = async (tipo: string) => {
    try {
      await timbradoApi.get(`/marcas/${tipo}`)
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

  return { getMarcas, postMarca, deleteMarca }
}
