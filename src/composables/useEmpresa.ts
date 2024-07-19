import { storeToRefs } from 'pinia'
import { useEmpresaStore } from '@/store/empresa'
import { handleError } from '@/helpers/messages'
import type { Empresa } from '@/interfaces/empresa.model'
import { useToast } from 'primevue/usetoast'
import { useUsuarioStore } from '@/stores/usuario'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'
import { router } from '@/router'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import { ref } from 'vue'
import { useLoadStore } from '@/store/load'
import timbradoApi from '@/api/timbrado-api'

export const useEmpresa = () => {
  const empresaStore = useEmpresaStore()
  const usuarioStore = useUsuarioStore()
  const { empresa, empresas } = storeToRefs(empresaStore)
  const toast = useToast()
  const loadStore = useLoadStore()

  const getEmpresas = async () => {
    try {
      const { data } = await timbradoApi.get(`/empresas`)
      empresaStore.setEmpresas(data)
    } catch (error) {
      handleError(error)
    }
  }

  const getEmpresa = async () => {
    try {
      const { data } = await timbradoApi.get(`/empresa`)
      empresaStore.setEmpresa(data)
    } catch (error) {
      handleError(error)
    }
  }

  const postEmpresa = async (payload: Empresa) => {
    try {
      const { data } = await timbradoApi.post(`/empresas`, payload)
      console.log(data)
    } catch (error) {
      handleError(error)
    }
  }

  const uploadLogo = async (e: FileUploadSelectEvent) => {
    try {
      loadStore.setLoading(true)
      const formData = new FormData()
      formData.append('logo', e.files[0])

      timbradoApi.defaults.headers.common['Content-Type'] = `multipart/form-data`

      await timbradoApi.post('/empresas/upload/logo', formData)

      toast.add({
        severity: 'success',
        summary: 'Logotipo',
        detail: 'Logotipo subido correctamente',
        life: 3000
      })
      loadStore.setLoading(false)
    } catch (error) {
      loadStore.setLoading(false)
      handleError(error)
    }
  }

  const putEmpresa = async (empresa: Empresa) => {
    try {
      timbradoApi.defaults.headers.common['Content-Type'] = `multipart/form-data`
      const { data } = await timbradoApi.put(`/empresa`, empresa)
      toast.add({
        severity: 'success',
        summary: 'Logotipo',
        detail: data.data,
        life: 3000
      })
      getEmpresa()
    } catch (error) {
      handleError(error)
    }
  }

  const getUsuariosEmpresa = async (id: number) => {
    try {
      const { data } = await timbradoApi.get(`/empresas/usuarios/${id}`)
      empresa.value.id = id
      usuarioStore.setUsuarios(data)
    } catch (error) {
      handleError(error)
    }
  }

  const postUsuarioEmpresa = async (payload: Usuario) => {
    try {
      const { data } = await timbradoApi.post(`/empresas/alta/usuario`, payload)
      toast.add({
        severity: 'success',
        summary: 'Usuario',
        detail: 'Usuario creado correctamente',
        life: 3000
      })
      getUsuariosEmpresa(payload.empresa_id)
      router.go(-1)
      return data
    } catch (error) {
      handleError(error)
    }
  }

  const formCertificados = new FormData()
  const passwordCertificado = ref(null)

  const certificado = (e: FileUploadSelectEvent) => {
    formCertificados.append('cer', e.files[0])
  }

  const key = (e: FileUploadSelectEvent) => {
    formCertificados.append('key', e.files[0])
  }

  const postCertificados = async () => {
    try {
      loadStore.setLoading(true)
      formCertificados.append('password', passwordCertificado.value!)
      const { data } = await timbradoApi.post(`/cargar/certificados`, formCertificados)
      toast.add({
        severity: 'success',
        summary: 'Usuario',
        detail: data.data,
        life: 3000
      })
      loadStore.setLoading(false)
      return data
    } catch (error) {
      loadStore.setLoading(false)
      handleError(error)
    }
  }

  return {
    empresa,
    empresas,
    certificado,
    key,
    passwordCertificado,
    getEmpresa,
    getEmpresas,
    postEmpresa,
    putEmpresa,
    uploadLogo,
    postCertificados,
    getUsuariosEmpresa,
    postUsuarioEmpresa
  }
}
