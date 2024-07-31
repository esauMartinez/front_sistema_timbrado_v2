import { getXmlAcuse } from '@/modules/timbrado/helpers/get-xml-acuse'

export const useXmlAcuse = () => {
  const getXmlAcuseQuery = async (id: number) => {
    const data = await getXmlAcuse(id)

    const a = document.createElement('a')
    const archivo = new Blob([data.acuse!], { type: 'text/plain' })
    const url = URL.createObjectURL(archivo)
    a.href = url
    a.download = `XML-ACUSE-${id}.xml`
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    getXmlAcuseQuery
  }
}
