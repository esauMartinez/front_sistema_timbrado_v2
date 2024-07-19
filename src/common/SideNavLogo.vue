<script lang="ts" setup>
import { useAuth } from '@/auth/composables/useAuth'

const { nombreUsuario, logotipo } = useAuth()
</script>

<template>
  <div :class="{ 'logo-and-name': true }">
    
    <Image
      :src="'https://recawi.mx/timbrado_v2_ftp/' + logotipo.logotipo"
      alt="Image"
      v-if="logotipo.find"
    />
    
    <Image
      :src="'https://recawi.mx/timbrado_v2_ftp/default-image.png'"
      alt="Image"
      v-if="logotipo.find === false"
    />
    <div>
      <h2 class="name-logo">{{ nombreUsuario }}</h2>
    </div>
  </div>
</template>
