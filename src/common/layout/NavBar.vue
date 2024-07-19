<script setup lang="ts">
import { useMenu } from '@/auth/composables/useMenu'
import { useSessionStore } from '@/stores/session'

interface Props {
  modulo: string
}

const sessionStore = useSessionStore()

const { nombreEmpresa, isDarkMode, iconTheme } = useMenu()

const darkMode = () => {
  if (isDarkMode.value) {
    sessionStore.setDarkMode(false)
    iconTheme.value = 'fa fa-moon'
  } else {
    sessionStore.setDarkMode(true)
    iconTheme.value = 'fa fa-sun'
  }
}

defineProps<Props>()
</script>

<template>
  <Menubar>
    <template #start>
      <div class="flex align-items-center p-2">
        <span class="text-lg">{{ modulo }}</span>
      </div>
    </template>

    <template #end>
      <div class="flex align-items-center p-2">
        <span class="text-lg mr-3">{{ nombreEmpresa }}</span>
        <Button
          :icon="iconTheme"
          :severity="isDarkMode ? 'secondary' : 'contrast'"
          outlined
          @click="darkMode"
        />
      </div>
    </template>
  </Menubar>
</template>

<style scoped></style>
