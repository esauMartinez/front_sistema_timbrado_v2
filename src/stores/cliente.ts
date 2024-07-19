import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Bitacora } from '@/modules/clientes/interfaces/bitacora'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import type { Contacto } from '@/modules/clientes/interfaces/contacto'
import type { FormaPago } from '@/modules/clientes/interfaces/datosFiscales/formaPago'
import type { MetodoPago } from '@/modules/clientes/interfaces/datosFiscales/metodoPago'
import type { RegimenFiscal } from '@/modules/clientes/interfaces/datosFiscales/regimenFiscal'
import type { UsoCfdi } from '@/modules/clientes/interfaces/datosFiscales/usoCfdi'
import type { FormErrorCliente } from '@/modules/clientes/interfaces/errors/form-error-cliente'
import type { FormErrorContacto } from '@/modules/clientes/interfaces/errors/form-error-contacto'
import type { ErrorResponse } from '@/interfaces/errors/error'

export const useClienteStore = defineStore('clientes', () => {
  const cliente = ref({} as Cliente)
  const clientes = ref<Cliente[]>([])
  const contacto = ref({} as Contacto)
  const contactos = ref<Contacto[]>([])
  const bitacora = ref<Bitacora[]>([])
  const usoCfdi = ref<UsoCfdi[]>([])
  const metodoPago = ref<MetodoPago[]>([])
  const formaPago = ref<FormaPago[]>([])
  const regimenFiscal = ref<RegimenFiscal[]>([])
  const errorsCliente = ref({} as FormErrorCliente)
  const errorsContacto = ref({} as FormErrorContacto)

  return {
    // state properties
    cliente,
    clientes,
    contacto,
    contactos,
    bitacora,
    usoCfdi,
    metodoPago,
    formaPago,
    regimenFiscal,
    errorsCliente,
    errorsContacto,

    // getters
    // clientes: computed(() => {
    //   return clientes.value
    // }),

    //actions
    setCliente(payload: Cliente) {
      cliente.value = payload
    },
    setContacto(payload: Contacto) {
      contacto.value = payload
    },
    setClientes(payload: Cliente[]) {
      clientes.value = payload
    },
    setContactos(payload: Contacto[]) {
      contactos.value = payload
    },
    setBitacora(payload: Bitacora[]) {
      bitacora.value = payload
    },
    setUsoCfdi(payload: UsoCfdi[]) {
      usoCfdi.value = payload
    },
    setMetodoPago(payload: MetodoPago[]) {
      metodoPago.value = payload
    },
    setFormaPago(payload: FormaPago[]) {
      formaPago.value = payload
    },
    setRegimenFiscal(payload: RegimenFiscal[]) {
      regimenFiscal.value = payload
    },
    resetErros() {
      errorsCliente.value = {} as FormErrorCliente
      errorsContacto.value = {} as FormErrorContacto
    },
    setErrorsCliente(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errorsCliente.value[x.field as keyof FormErrorCliente] = x.message
      })
    },
    setErrorsContacto(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errorsContacto.value[x.field as keyof FormErrorContacto] = x.message
      })
    }
  }
})
