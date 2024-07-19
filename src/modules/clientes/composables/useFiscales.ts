import { watch } from 'vue'
import { getCdfi } from '@/modules/clientes/helpers/get-cfdi'
import { getMetodo } from '@/modules/clientes/helpers/get-metodos'
import { useQuery } from '@tanstack/vue-query'
import { getForma } from '@/modules/clientes/helpers/get-formas'
import { getRegimen } from '@/modules/clientes/helpers/get-regimen'
import { useClienteStore } from '@/stores/cliente'

export const useFiscales = () => {
  const clienteStore = useClienteStore()

  const { data: cfdi } = useQuery({
    queryKey: ['usoCfdi'],
    queryFn: getCdfi,
    refetchOnWindowFocus: false
  })

  watch(cfdi, (payload) => {
    if (payload) clienteStore.setUsoCfdi(payload)
  })

  const { data: metodo } = useQuery({
    queryKey: ['metodosPago'],
    queryFn: getMetodo,
    refetchOnWindowFocus: false
  })

  watch(metodo, (payload) => {
    if (payload) clienteStore.setMetodoPago(payload)
  })

  const { data: forma } = useQuery({
    queryKey: ['formaPago'],
    queryFn: getForma,
    refetchOnWindowFocus: false
  })

  watch(forma, (payload) => {
    if (payload) clienteStore.setFormaPago(payload)
  })

  const { data: regimen } = useQuery({
    queryKey: ['regimenFiscal'],
    queryFn: getRegimen,
    refetchOnWindowFocus: false
  })

  watch(regimen, (payload) => {
    if (payload) clienteStore.setRegimenFiscal(payload)
  })
}
