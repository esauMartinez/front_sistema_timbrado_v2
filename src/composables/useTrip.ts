import { handleError, question } from '@/helpers/messages'
import { useToast } from 'primevue/usetoast'
import timbradoApi from '@/api/timbrado-api'
import type { Trip } from '@/modules/trips/interfaces/trip'

export const useTrip = () => {

  const toast = useToast()


  const cancelarTrip = async (payload: Trip) => {
    try {
      const response = await question('No podras revertir esto!', 'Si, cancelar!')
      if (response.isConfirmed) {
        const { data } = await timbradoApi.put(`/cancelar-trip/${payload.id}`)
        toast.add({
          severity: 'success',
          summary: 'Trip',
          detail: 'Trip cancelado correctamente',
          life: 3000
        })
        return data
      }
    } catch (error) {
      handleError(error)
    }
  }

  

  
  



 





 



  
 

  return {
    cancelarTrip,
  }
}
