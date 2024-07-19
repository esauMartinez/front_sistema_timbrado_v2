import { defineStore } from 'pinia'

interface LoadStore {
  isLoading: boolean
}

export const useLoadStore = defineStore('load', {
  state: (): LoadStore => ({
    isLoading: false
  }),
  actions: {
    setLoading(load: boolean) {
      this.isLoading = load
    }
  }
})
