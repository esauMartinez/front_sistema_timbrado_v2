import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

export interface Comentario {
  id: number
  comentarios: string
  trip_id: number
  createdAt: string
  isMine: boolean
  usuario: Usuario
}
