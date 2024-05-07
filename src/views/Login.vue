<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { auth, authUser } = useAuth();
</script>

<template>
	<section class="login-section">
		<form class="login-form pt-8 pb-8" @submit.prevent="authUser(auth)">
			<div class="w-full">
				<h1 class="text-center">PORTAL FREIGHT</h1>
			</div>

			<label class="label-form-login">Usuario</label>
			<IconField iconPosition="left" class="w-full mt-2">
				<InputIcon class="pi pi-user"> </InputIcon>
				<InputText v-model="auth.email" placeholder="Search" class="w-full" />
			</IconField>

			<label class="label-form-login mt-4">Contraseña</label>
			<IconField iconPosition="left" class="w-full mt-2">
				<InputIcon class="pi pi-eye"> </InputIcon>
				<InputText
					v-model="auth.password"
					type="password"
					placeholder="Search"
					class="w-full"
				/>
			</IconField>

			<Button
				type="submit"
				severity="help"
				label="Entrar"
				class="w-full mt-4"
			/>
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
	min-width: 450px;
	background-color: #ffffff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.2);
	align-items: flex-start;
	justify-content: center;
	// height: 60vh;
}

.label-form-login {
	color: #ffffff;
}
</style>
