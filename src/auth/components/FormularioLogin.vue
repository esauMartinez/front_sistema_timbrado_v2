<script lang="ts" setup>
import { useAuth } from '@/auth/composables/useAuth'
import { router } from '@/router'
import { watch } from 'vue'

const { user, isUserAuthenticated, isLoading, isSuccess, isError, authMutation } = useAuth()

watch(isSuccess, (payload) => {
  if (payload && isUserAuthenticated.value) {
    router.push({ name: 'Home' })
  }
})
</script>

<template>
  <section class="login-section">
    <form class="form-login" @submit.prevent="authMutation.mutate(user)">
      <div class="w-full">
        <h1 class="text-center">PORTAL PRUEBAS</h1>
      </div>

      <div class="mt-2 w-full">
        <FloatLabel>
          <InputText class="w-full" v-model="user.email" />
          <label for="username">Usuario</label>
        </FloatLabel>
      </div>

      <div class="mt-5 w-full">
        <FloatLabel>
          <Password
            v-model="user.password"
            class="w-full"
            :feedback="false"
            :inputStyle="{ width: '100%' }"
            toggleMask
          />
          <label for="password">Contraseña</label>
        </FloatLabel>
      </div>

      <Message severity="error" v-if="isError" class="w-full"
        >Hubo un error al iniciar sesion</Message
      >

      <Button
        type="submit"
        severity="contrast"
        label="Entrar"
        :loading="isLoading"
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
