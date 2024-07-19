import timbradoApi from '@/api/timbrado-api'
import type { Auth } from '@/auth/interfaces/auth'

const timer = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

export const auth = async (auth: Auth) => {
  await timer()
  const { data } = await timbradoApi.post('/login', auth)

  return data
}
