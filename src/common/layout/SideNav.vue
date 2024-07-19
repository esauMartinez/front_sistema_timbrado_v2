<script lang="ts" setup>
import SideNavLogo from '../SideNavLogo.vue'
import { useMenu } from '@/auth/composables/useMenu'
import '../../../public/css/sidenav.scss'

const { menu, theme_sidenav, collapsedLogo, isDarkMode, onItemClick, onToggleCollapse } = useMenu()

if (isDarkMode.value) {
  theme_sidenav.value = null
}

onToggleCollapse(true)
</script>

<template>
  <sidebar-menu
    :menu="menu"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
    :theme="theme_sidenav"
    collapsed
    width="290px"
  >
    <template v-slot:header>
      <SideNavLogo v-if="!collapsedLogo" />
    </template>
  </sidebar-menu>
</template>

<style lang="scss" scoped></style>
