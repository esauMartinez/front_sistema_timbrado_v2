<script setup lang="ts">
import SideNav from '@/common/layout/SideNav.vue'
import { useSessionStore } from './stores/session'
import { storeToRefs } from 'pinia'

const sessionStore = useSessionStore()
const { isUserAuthenticated } = storeToRefs(sessionStore)
</script>

<template>
  <SideNav v-if="isUserAuthenticated" />

  <router-view></router-view>

  <Toast position="top-right" />
</template>
