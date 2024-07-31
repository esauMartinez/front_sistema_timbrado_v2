import timbradoApi from '@/api/timbrado-api'

export const timbrarTrip = async (id: number) => {
  const { data } = await timbradoApi.get(`/timbrar/${id}`)
  return data
}
