<script lang="ts" setup>
import { useEmpresa } from '@/composables/useEmpresa'

const { certificado, key, postCertificados, passwordCertificado } = useEmpresa()
</script>

<template>
  <form @submit.prevent="postCertificados">
    <div class="grid">
      <div class="col-6">
        <FileUpload
          mode="basic"
          name="demo[]"
          class="w-full"
          chooseLabel="Certificado(.cer)"
          customUpload
          accept=".cer"
          @select="certificado"
        />
      </div>
      <div class="col-6">
        <FileUpload
          mode="basic"
          name="demo[]"
          class="w-full"
          chooseLabel="Key(.key)"
          customUpload
          accept=".key"
          @select="key"
        />
      </div>
      <div class="col-12">
        <InputText required="true" v-model="passwordCertificado" class="w-full" />
      </div>
      <div class="col-4 col-offset-8">
        <Button type="submit" class="w-full" icon="fa fa-check" label="Guardar certificados" />
      </div>
    </div>
  </form>
</template>
