import { useUsuarioStore } from "@/stores/usuario"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { storeToRefs } from "pinia"
import { useToast } from "primevue/usetoast"
import { postUsuario } from '@/modules/usuarios/helpers/post-usuario'
import { computed, watch } from "vue"

export const useCrear = () => {
  const queryClient = useQueryClient()
  const usuarioStore = useUsuarioStore()
  const { usuario } = storeToRefs(usuarioStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postUsuario,
    onMutate: () => {
      usuarioStore.resetErrors()
    },
    onError: (error: any) => {
      usuarioStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['usuarios']
      })
    }
  })

  watch(crearMutation.isError, (isError) => {
    if (isError) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en campos',
        life: 3000
      })
    }
  })

  return {
    usuario,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}
