import { defineStore } from "pinia";
import { Error } from "@/interfaces/error";

interface ErroresStore {
  errores: Error[]
}

export const useErroresStore = defineStore('errores', {
  state: (): ErroresStore => ({
    errores: []
  }),
  actions: {
    setErrores(errores: Error[]) {
      this.errores = errores;
    }
  }
})