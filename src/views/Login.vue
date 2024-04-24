<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { auth, authUser } = useAuth();
</script>

<template>
	<section class="login-section">
		<form class="login-form" @submit.prevent="authUser(auth)">
			<label class="label-form-login">Usuario</label>
			<input type="text" class="login-input" required v-model="auth.email" />
			<label class="label-form-login">Contraseña</label>
			<input type="text" class="login-input" required v-model="auth.password" />
			<button type="submit" class="login-button">Entrar</button>
		</form>
	</section>
</template>

<style lang="scss" scoped>
.login-section {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.login-form {
	display: flex;
	flex-direction: column;
	min-width: 350px;
	background-color: #626262;
	padding: 20px;
	border-radius: 8px;
	align-items: flex-start;
	justify-content: center;
}

.label-form-login {
	color: #ffffff;
}

.login-input {
	padding: 10px;
	border-radius: 4px;
	border: 1px solid rgb(151, 151, 151);
	margin-top: 5px;
	margin-bottom: 10px;
	width: 100%;
}

.login-button {
	padding: 10px;
	border: 0;
	border-radius: 4px;
	background-color: #78be20;
	color: #000;
	width: 100%;
}
</style>
