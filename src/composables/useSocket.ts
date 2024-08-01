import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { useToast } from 'primevue/usetoast'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
  socket: null
})

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3200'

export const useSocket = () => {
  const toast = useToast()

  const connect = (namespace: string) => {
    const socket = io(`${URL}/${namespace}`)
    
    socket.on('connect', () => {
      state.connected = true
    })

    socket.on('trip', (nombre_usuario: string) => {
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: `Un nuevo trip ha sido generado por el usuario ${nombre_usuario}`,
        life: 3000
      })
    })
  }

  const disconnect = () => {
    state.connected = false
  }

  return {
    state,
    connect,
    disconnect
  }
}
