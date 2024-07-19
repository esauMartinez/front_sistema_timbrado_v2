import { defineStore } from 'pinia'
import type { Empresa } from '@/interfaces/empresa.model'
import type { Concepto } from '@/interfaces/concepto.model'
import type { Mercancia } from '@/interfaces/mercancia.model'
import type { MercanciasSat, Peligroso, UnidadPeso } from '@/interfaces/sat.model'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { Tractor } from '@/interfaces/tractor.model'
import type { Caja } from '@/interfaces/caja.model'
import type { Balance, Cancelacion, Timbre } from '@/interfaces/timbre.model'
import type { Patio } from '@/interfaces/patio.model'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'

interface TimbreStore {
  cliente: Cliente
  empresa: Empresa
  operador: Operador
  tractor: Tractor
  caja: Caja
  conceptos: Concepto[]
  mercancia: Mercancia
  mercancias: Mercancia[]
  concepto: Concepto
  mercanciasSat: MercanciasSat[]
  unidadesPeso: UnidadPeso[]
  peligrosos: Peligroso[]
  timbres: Timbre[]
  cancelacion: Cancelacion
  movimientos: Patio[]
  balance: Balance
  pdf: string | null
  isTimbrando: boolean
}

export const useTimbradoStore = defineStore('timbrado', {
  state: (): TimbreStore => ({
    cliente: {} as Cliente,
    empresa: {} as Empresa,
    operador: {} as Operador,
    tractor: {} as Tractor,
    caja: {} as Caja,
    conceptos: [],
    concepto: {} as Concepto,
    mercancias: [],
    mercancia: {} as Mercancia,
    mercanciasSat: [],
    unidadesPeso: [],
    peligrosos: [],
    movimientos: [],
    timbres: [],
    cancelacion: {} as Cancelacion,
    balance: {} as Balance,
    pdf: null,
    isTimbrando: false
  }),
  actions: {
    setDatosTimbre(timbre: TimbreStore) {
      this.cliente = timbre.cliente
      this.operador = timbre.operador
      this.tractor = timbre.tractor
      this.caja = timbre.caja
      this.empresa = timbre.empresa
      this.conceptos = timbre.conceptos
      this.mercancias = timbre.mercancias
      this.timbres = timbre.timbres
      this.movimientos = timbre.movimientos
    },
    setConceptos(conceptos: Concepto[]) {
      this.conceptos = conceptos
    },
    setConcepto(concepto: Concepto) {
      this.concepto = concepto
    },
    setMercancia(mercancia: Mercancia) {
      this.mercancia = mercancia
    },
    setMercanciasSat(mercanciasSat: MercanciasSat[]) {
      this.mercanciasSat = mercanciasSat
    },
    setUnidadesPesoSat(unidadesPeso: UnidadPeso[]) {
      this.unidadesPeso = unidadesPeso
    },
    setPeligrosos(peligrosos: Peligroso[]) {
      this.peligrosos = peligrosos
    },
    setPDF(pdf: string) {
      this.pdf = pdf
    },
    setBalance(balance: Balance) {
      this.balance = balance
    },
    setTimbres(timbres: Timbre[]) {
      this.timbres = timbres
    },
    setCancelacion(cancelacion: Cancelacion) {
      this.cancelacion = cancelacion
    }
  }
})
