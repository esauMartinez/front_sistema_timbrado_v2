<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { auth, authUser } = useAuth();
</script>

<template>
	<section class="login-section">
		<form class="login-form" @submit.prevent="authUser(auth)">
			<label class="label-form-login">Usuario</label>
			<InputText
				type="text"
				class="w-full mt-2"
				required
				v-model="auth.email"
			/>
			<label class="label-form-login">Contraseña</label>
			<InputText
				type="text"
				class="w-full mt-2"
				required
				v-model="auth.password"
			/>
			<Button type="submit" label="Entrar" class="w-full mt-2" />
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
	background-color: #393e4a;
	padding: 20px;
	border-radius: 8px;
	align-items: flex-start;
	justify-content: center;
}

.label-form-login {
	color: #ffffff;
}
</style>
