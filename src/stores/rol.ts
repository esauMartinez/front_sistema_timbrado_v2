import type { Modulo } from '@/modules/roles/interfaces/modulo'
import type { ErrorResponse } from '@/interfaces/errors/error'
import type { FormErrorRolRol } from '@/modules/roles/interfaces/errors/form-error-rol'
import type { Rol } from '@/modules/roles/interfaces/rol'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRolStore = defineStore('roles', () => {
  const rol = ref<Rol>({} as Rol)
  const roles = ref<Rol[]>([])
  const modulos = ref<Modulo[]>([])
  const errors = ref({} as FormErrorRolRol)

  return {
    rol,
    roles,
    modulos,

    setRol(payload: Rol) {
      rol.value = payload
    },
    setRoles(payload: Rol[]) {
      roles.value = payload
    },
    setModulos(payload: Modulo[]) {
      modulos.value = payload
    },
    resetErrors() {
      errors.value = {} as FormErrorRolRol
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorRolRol] = x.message
      })
    }
  }
})
