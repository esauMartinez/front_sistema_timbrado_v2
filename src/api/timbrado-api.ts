import axios from 'axios'

const timbradoApi = axios.create({
  baseURL: import.meta.env.VITE_TIMBRADO_API_URL_PRODUTION
})


export default timbradoApi
