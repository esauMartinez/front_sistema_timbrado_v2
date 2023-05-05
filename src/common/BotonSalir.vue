<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { logout } = useAuth();
</script>

<template>
	<div class="btn-close-sidenav">
		<li :class="{ hide: false, 'li-link': true }">
			<a @click="logout()" class="logout-button">
				<font-awesome-icon class="menu__icon" :icon="'right-from-bracket'" />
				Salir
			</a>
		</li>
	</div>
</template>
