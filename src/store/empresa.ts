import { defineStore } from 'pinia'
import type { Empresa } from '@/interfaces/empresa.model'

interface EmpresaStore {
  empresas: Empresa[]
  empresa: Empresa
}

export const useEmpresaStore = defineStore('empresa', {
  state: (): EmpresaStore => ({
    empresas: [],
    empresa: {} as Empresa
  }),
  actions: {
    setEmpresa(empresa: Empresa) {
      this.empresa = empresa
    },
    setEmpresas(empresas: Empresa[]) {
      this.empresas = empresas
    }
  }
})
