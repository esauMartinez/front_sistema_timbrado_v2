<script setup lang="ts">
import { router } from '@/router'
import { ref } from 'vue'
import { useComentarios } from '@/modules/trips/composables/comentarios/useComentarios'
import { useRoute } from 'vue-router'
import { formatDateWithTime } from '@/pipes/formatDate'
import { useAuth } from '@/auth/composables/useAuth'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'
import { useCrear } from '@/modules/trips/composables/comentarios/useCrear'
import { useTrip } from '@/modules/trips/composables/useTrip'
import { watch } from 'vue'
import type { Comentario } from '@/modules/trips/interfaces/comentario'

const visible = ref(true)
const route = useRoute()
const tripStore = useTripStore()
const { comentario } = storeToRefs(tripStore)
const { comentarios } = useComentarios(+route.params.id)
const { trip } = useTrip(+route.params.id)
const { crearMutation, isSuccess } = useCrear()
const { verificarPermiso } = useAuth()

const agregarComentario = () => {
  comentario.value.trip_id = trip.value.id

  crearMutation.mutate(comentario.value)
}

comentario.value = {} as Comentario

watch(isSuccess, (payload) => {
  if (payload) {
    comentario.value = {} as Comentario
  }
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="'Comentarios Trip ' + trip.numero_trip"
    :style="{ width: '45vw' }"
    v-on:after-hide="router.push({ path: '/trips' })"
  >
    <div class="area-comentarios">
      <ul>
        <li
          v-for="comentario in comentarios"
          :key="comentario.id"
          :class="{
            'otros-comentarios': !comentario.isMine,
            'mis-comentarios': comentario.isMine
          }"
        >
          <div class="area-comentario">
            <p class="comentario">
              {{ comentario.comentarios }}
            </p>
            <p class="fecha">
              <strong>
                {{ comentario.usuario?.nombre! }}
                {{ comentario.usuario?.paterno! }}
                {{ comentario.usuario?.materno! }}
              </strong>
              {{ formatDateWithTime(new Date(comentario.createdAt)) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <template
      #footer
      v-if="trip.estatus !== 'CANCELADO' && !verificarPermiso('MODULO_TRIPS_COMENTARIOS_CREAR')"
    >
      <form @submit.prevent="agregarComentario" class="w-full">
        <InputGroup>
          <InputText v-model="comentario.comentarios" placeholder="Keyword" required />
          <Button type="submit" icon="fa fa-circle-right" class="p-3" severity="warning" />
        </InputGroup>
      </form>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.area-comentarios {
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  ul li {
    padding: 10px 0px;
    display: flex;
    width: 100%;
    .comentario {
      font-size: 1.2rem;
      color: #fff;
    }

    .fecha {
      color: #fff;
    }
  }
}

.area-comentario {
  background-color: var(--orange-400);
  border-radius: 12px;
  padding: 10px 20px;
  width: 80%;
}

.mis-comentarios {
  display: flex;
  justify-content: start;
  width: 50%;
  .area-comentario {
    background-color: var(--blue-400);
  }
}

.otros-comentarios {
  display: flex;
  justify-content: flex-end;
}

.mis-comentarios div p:nth-child(2),
.otros-comentarios div p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}
</style>
