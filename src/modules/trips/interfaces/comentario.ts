import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

export interface Comentario {
  id: number
  comentarios: string
  createdAt: string
  isMine: boolean
  usuario: Usuario
  trip_id: number
}
