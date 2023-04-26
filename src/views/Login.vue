<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { auth, authUser } = useAuth();
</script>

<template>
	<div class="container">
		<div class="screen">
			<div class="screen__content">
				<form class="login" @submit.prevent="authUser(auth)">
					<div class="login__field">
						<i class="login__icon fas fa-user"></i>
						<input
							type="text"
							class="login__input"
							placeholder="Username / Email"
							required
							v-model="auth.email"
						/>
					</div>
					<div class="login__field">
						<i class="login__icon fas fa-lock"></i>
						<input
							type="password"
							class="login__input"
							placeholder="Password"
							required
							v-model="auth.password"
						/>
					</div>
					<button class="button login__submit">
						<span class="button__text">Entrar</span>
						<font-awesome-icon class="button__icon" icon="chevron-right" />
					</button>
				</form>
			</div>
			<div class="screen__background">
				<span
					class="screen__background__shape screen__background__shape4"
				></span>
				<span
					class="screen__background__shape screen__background__shape3"
				></span>
				<span
					class="screen__background__shape screen__background__shape2"
				></span>
				<span
					class="screen__background__shape screen__background__shape1"
				></span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	overflow: hidden;
}

.screen {
	background: linear-gradient(90deg, #87b0adb4, #0D9488) !important;
	position: relative;
	height: 600px;
	width: 360px;
	box-shadow: 0px 0px 24px #63ada7;
}

.screen__content {
	z-index: 1;
	position: relative;
	height: 100%;
}

.screen__background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #ffffff;
	top: -50px;
	right: 120px;
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #0D9488;
	top: -172px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #75bbb6, #0D9488);
	top: -24px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #0D9488;
	top: 420px;
	right: 50px;
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	padding-top: 156px;
}

.login__field {
	padding: 20px 0px;
	position: relative;
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #0D9488;
}

.login__input {
	border: none;
	border-bottom: 2px solid #d1d1d4;
	background: none;
	padding: 2px;
	padding-left: 5px;
	font-weight: 400;
	width: 95%;
	transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #0D9488;
}

.login__submit {
	background: #ffffff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #0D9488;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #0D9488;
	box-shadow: 0px 2px 2px #0D9488;
	cursor: pointer;
	transition: 0.2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #0D9488;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #0D9488;
}

.social-login {
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: #ffffff;
}

.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #0D9488;
	text-decoration: none;
	text-shadow: 0px 0px 8px #0D9488;
}

.social-login__icon:hover {
	transform: scale(1.5);
}
</style>
