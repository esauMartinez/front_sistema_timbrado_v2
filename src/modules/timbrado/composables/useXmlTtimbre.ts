import { getXmlTimbre } from '@/modules/timbrado/helpers/get-xml-timbre'

export const useXmlTimbre = () => {
  const getXmlTimbreQuery = async (id: number) => {
    const data = await getXmlTimbre(id)

    const format_xml = data.replace(/'\/'/g, '')
    const a = document.createElement('a')
    const archivo = new Blob([format_xml], { type: 'text/plain' })
    const url = URL.createObjectURL(archivo)
    a.href = url
    a.download = `XML-TRIP-${id}.xml`
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    getXmlTimbreQuery
  }
}
