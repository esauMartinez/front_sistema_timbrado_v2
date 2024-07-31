<script lang="ts" setup>
import { useRoles } from '@/modules/roles/composables/useRoles'
import { useUsuarioStore } from '@/stores/usuario'
import { storeToRefs } from 'pinia'

const { roles } = useRoles()

const usuarioStore = useUsuarioStore()

const { usuario, errors } = storeToRefs(usuarioStore)
</script>

<template>
  <form>
    <div class="mb-3">
      <label>Nombre usuario</label>
      <InputText
        name="nombre"
        class="w-full focus:border-primary mt-2"
        placeholder="Nombre"
        v-model="usuario.nombre"
        autocomplete="off"
        :invalid="errors.nombre !== undefined"
      />
      <small class="p-error" v-if="errors.nombre">
        {{ errors.nombre }}
      </small>
    </div>
    <div class="mb-3">
      <label>Apellido paterno</label>
      <InputText
        name="paterno"
        class="w-full focus:border-primary mt-2"
        placeholder="Apellido paterno"
        v-model="usuario.paterno"
        :invalid="errors.paterno !== undefined"
      />
      <small class="p-error" v-if="errors.paterno">
        {{ errors.paterno }}
      </small>
    </div>
    <div class="mb-3">
      <label>Apellido materno</label>
      <InputText
        name="materno"
        class="w-full focus:border-primary mt-2"
        placeholder="Apellido materno"
        v-model="usuario.materno"
        :invalid="errors.materno !== undefined"
      />
      <small class="p-error" v-if="errors.materno">
        {{ errors.materno }}
      </small>
    </div>
    <div class="mb-3">
      <label>Email</label>
      <InputText
        name="email"
        class="w-full focus:border-primary mt-2"
        placeholder="Email"
        v-model="usuario.email"
        :invalid="errors.email !== undefined"
      />
      <small class="p-error" v-if="errors.email">
        {{ errors.email }}
      </small>
    </div>
    <div class="mb-3">
      <label>Password</label>
      <InputText
        name="password"
        class="w-full focus:border-primary mt-2"
        placeholder="Password"
        v-model="usuario.password"
        :invalid="errors.password !== undefined"
      />
      <small class="p-error" v-if="errors.password">
        {{ errors.password }}
      </small>
    </div>
    <div class="mb-3">
      <label>Rol de usuario</label>
      <Dropdown
        name="rol_id"
        class="w-full focus:border-primary mt-2"
        placeholder="Selecciona un rol"
        :options="roles"
        filter
        optionLabel="nombre"
        optionValue="id"
        v-model="usuario.rol_id"
        :invalid="errors.rol_id !== undefined"
      />
      <small class="p-error" v-if="errors.rol_id">
        {{ errors.rol_id }}
      </small>
    </div>
    <!-- <div class="mb-3" v-if="usuario.isCliente">
      <label>Cliente</label>
      <Dropdown
        name="cliente_id"
        :class="['w-100']"
        placeholder="Cliente"
        :options="clientes"
        filter
        optionLabel="razon_social"
        optionValue="id"
        v-model="usuario.cliente_id"
        :invalid="errors.cliente_id !== undefined"
      />
      <small class="p-error" v-if="errors.cliente_id">
        {{ errors.cliente_id }}
      </small>
    </div> -->
  </form>
</template>
