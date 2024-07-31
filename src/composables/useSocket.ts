import { reactive } from 'vue'
import { useTrip } from './useTrip'
import { Socket, io } from 'socket.io-client'
import { useToast } from 'primevue/usetoast'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
  socket: null
})

export const useSocket = () => {
  const { getTrips } = useTrip()
  const toast = useToast()

  const connect = (namespace, usuario) => {
    state.socket = io(`http://localhost:3200/${namespace}`)

    state.socket.on('connect', () => {
      state.connected = true
      state.socket.emit('setuser', { usuario, socket: state.socket.id })
    })

    state.socket.on('trip', (data) => {
      toast.add({
        severity: 'success',
        summary: 'Trip',
        detail: data,
        life: 5000
      })
      // getTrips();
    })

    state.socket.on('take trip', (data) => {
      if (data) {
        toast.add({
          severity: 'success',
          summary: 'Trip',
          detail: data,
          life: 5000
        })
      }
      // getTrips();
    })
  }

  const disconnect = () => {
    state.socket.close()
    state.connected = false
  }

  return {
    connect,
    disconnect
  }
}
