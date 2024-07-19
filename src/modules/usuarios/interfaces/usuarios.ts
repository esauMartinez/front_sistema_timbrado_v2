export interface Usuario {
  id: number
  nombre: string
  paterno: string
  materno: string
  email: string
  password: string
  activo: boolean
  isCliente: boolean
  cliente_id: number
  empresa_id: number
  rol_id: number
}
