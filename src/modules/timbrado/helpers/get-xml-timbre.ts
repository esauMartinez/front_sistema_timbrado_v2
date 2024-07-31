import timbradoApi from '@/api/timbrado-api'

export const getXmlTimbre = async (id: number): Promise<string> => {
  const { data } = await timbradoApi.get<string>(`/get-xml/${id}`)

  return data
}
