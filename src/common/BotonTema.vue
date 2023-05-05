<script lang="ts" setup>
import { useAuth } from "../composables/useAuth";

const { darkMode, setDarkMode } = useAuth()
</script>

<template>
	<li class="btn-dark-mode">
		<font-awesome-icon class="menu__icon" :icon="'sun'" v-if="!darkMode" />
		<font-awesome-icon class="menu__icon" :icon="'moon'" v-if="darkMode" />
		<InputSwitch
			v-model="darkMode"
			class="switch-dark-mode"
			@change="setDarkMode(darkMode)"
		/>
	</li>
</template>
