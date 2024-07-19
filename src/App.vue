<script setup lang="ts">
import SideNav from '@/common/layout/SideNav.vue'
import CardLoad from '@/components/CardLoad.vue'
import { useSessionStore } from './stores/session'
import { storeToRefs } from 'pinia'

const sessionStore = useSessionStore()
const { isUserAuthenticated } = storeToRefs(sessionStore)

// const data = JSON.parse(localStorage.getItem('usuario'));
// const rol = localStorage.getItem('rol');
// if (data !== null && rol !== 'USER_SUPER_ADMIN') {
// 	connect(`empresa_${data.empresa.id}`, data.id);
// }
// import { state, useSocket } from './composables/useSocket';
// const { connect } = useSocket();
</script>

<template>
  <SideNav v-if="isUserAuthenticated" />

  <router-view></router-view>

  <CardLoad />
  <Toast position="top-right" />
</template>
