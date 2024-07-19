<script lang="ts" setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { severity } from '@/pipes/severity'
import { useAuth } from '@/auth/composables/useAuth'
import { useUsuarios } from '@/modules/usuarios/composables/useUsuarios'
import { question } from '@/helpers/messages'
import { useEliminar } from '@/modules/usuarios/composables/useEliminar'

const { verificarPermiso } = useAuth()
const { usuarios, isLoading } = useUsuarios()
const { deleteMutation } = useEliminar()

const deleteUsuario = async (id: number) => {
  const response = await question()
  if (response.isConfirmed) {
    deleteMutation.mutate(id)
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  paterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  meterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="usuarios"
    showGridlines
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 50, 100]"
    :class="[{ 'p-datatable-sm': true }]"
    dataKey="id"
    :loading="isLoading"
    :globalFilterFields="['nombre', 'paterno', 'materno']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <router-link :to="{ path: '/usuarios/lista-usuarios/crear-usuario' }">
          <Button
            type="button"
            icon="pi pi-plus"
            label="Nuevo"
            outlined
            v-if="!verificarPermiso('MODULO_USUARIOS_CREAR')"
          />
        </router-link>
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Buscar" />
        </IconField>
      </div>
    </template>
    <template #empty> No se encontraron datos. </template>
    <template #loading> Cargando usuarios, por favor espera. </template>
    <Column field="nombre" header="Nombre" :sortable="true">
      <template #body="{ data }">
        {{ data.nombre }} {{ data.paterno }} {{ data.materno }}
      </template>
    </Column>
    <Column field="email" header="Correo electrónico" sortable />
    <Column field="role.nombre" header="Rol"></Column>
    <Column>
      <template #body="{ data }">
        <div class="d-flex justify-content-center">
          <InputSwitch v-model="data.activo" />
        </div>
      </template>
    </Column>
    <Column header="Estatus">
      <template #body="{ data }">
        <Tag :severity="severity(data.activo)" :value="data.activo ? 'Activo' : 'Inactivo'"></Tag>
      </template>
    </Column>
    <Column header="Acciones">
      <template #body="{ data }">
        <div class="flex justify-content-center">
          <router-link
            :to="{ name: `modificar-usuario`, params: { id: data.id } }"
            v-if="!verificarPermiso('MODULO_USUARIOS_MODIFICAR')"
          >
            <Button icon="pi pi-pencil" severity="warning" class="mr-2" />
          </router-link>

          <Button
            icon="pi pi-trash"
            severity="danger "
            class="mr-2"
            v-if="!verificarPermiso('MODULO_USUARIOS_ELIMINAR')"
            @click="deleteUsuario(data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
