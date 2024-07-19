import type { ErrorResponse } from '@/interfaces/errors/error'
import type { FormErrorUsuario } from '@/modules/usuarios/interfaces/errors/form-error-usuario'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuarioStore = defineStore('usuarios', () => {
  const usuario = ref<Usuario>({} as Usuario)
  const usuarios = ref<Usuario[]>([])
  const errors = ref({} as FormErrorUsuario)

  return {
    //state
    usuario,
    usuarios,
    errors,

    // actions
    setUsuario(payload: Usuario) {
      usuario.value = payload
    },
    setUsuarios(payload: Usuario[]) {
      usuarios.value = payload
    },
    resetErrors() {
      errors.value = {} as FormErrorUsuario
    },
    setErrors(payload: ErrorResponse[]) {
      console.log(payload)
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorUsuario] = x.message
      })
    }
  }
})
