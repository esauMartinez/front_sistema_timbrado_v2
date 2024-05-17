<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { auth, authUser } = useAuth();
</script>

<template>
	<section class="login-section">
		<form class="form-login" @submit.prevent="authUser(auth)">
			<div class="w-full">
				<h1 class="text-center">PORTAL PRUEBAS</h1>
			</div>

			<div class="mt-2 w-full">
				<!-- <label class="text-lg">Usuario</label>
				<IconField iconPosition="right" class="w-full mt-2">
					<InputIcon class="pi pi-user"> </InputIcon>
					<InputText v-model="auth.email" class="w-full" />
				</IconField> -->

				<FloatLabel>
					<InputText class="w-full" v-model="auth.email" />
					<label for="username">Usuario</label>
				</FloatLabel>
			</div>

			<div class="mt-5 w-full">
				<FloatLabel>
					<Password
						v-model="auth.password"
						class="w-full"
						:feedback="false"
						:inputStyle="{ width: '100%' }"
						toggleMask
					/>
					<label for="password">Contraseña</label>
				</FloatLabel>
			</div>

			<Button
				type="submit"
				severity="contrast"
				label="Entrar"
				class="w-full mt-4 p-2"
			/>
		</form>
		<div class="img-login"></div>
	</section>
</template>

<style lang="scss" scoped>
.login-section {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
}

.form-login {
	width: 30%;
	background-color: #fff;
	padding: 30px 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.img-login {
	width: 70%;
	background-image: url('/public/23486.jpg');
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
