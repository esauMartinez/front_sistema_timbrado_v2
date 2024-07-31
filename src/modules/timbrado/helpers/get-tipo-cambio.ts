import timbradoApi from '@/api/timbrado-api'

export const getTipoCambio = async () => {
  const { data } = await timbradoApi.get(`/tipo-cambio`)

  return data
}
