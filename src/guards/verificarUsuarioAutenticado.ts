import timbradoApi from '@/api/timbrado-api'

export const verifyLocalStorageUser = () => {
  const data = JSON.parse(localStorage.getItem('usuario')!)

  if (data === null || data === undefined) {
    return false
  } else {
    timbradoApi.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    return true
  }
}
