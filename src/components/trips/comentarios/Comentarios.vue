<script lang="ts" setup>
import { ref } from 'vue';
import { router } from '../../../router';
import { useTrip } from '../../../composables/useTrip';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateWithTime } from '../../../pipes/formatDate';

const {
	trip,
	comentario,
	comentarios,
	getTrip,
	getComentarios,
	postComentario,
} = useTrip();
const route = useRoute();
const visible = ref(true);

onMounted(async () => {
	const id = +route.params.id;
	await getTrip(id);
	await getComentarios(id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Comentarios"
		:style="{ width: '45vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<div class="area-comentarios">
			<ul>
				<li
					v-for="comentario in comentarios"
					:key="comentario.id"
					:class="{
						'otros-comentarios': !comentario.isMine,
						'mis-comentarios': comentario.isMine,
					}"
				>
					<div class="area-comentario">
						<p class="comentario">
							{{ comentario.comentarios }}
						</p>
						<p class="fecha">
							<strong>
								{{ comentario.usuario.nombre }}
								{{ comentario.usuario.paterno }}
								{{ comentario.usuario.materno }}
							</strong>
							{{ formatDateWithTime(new Date(comentario.createdAt)) }}
						</p>
					</div>
				</li>
			</ul>
		</div>
		<template #footer v-if="trip.estatus !== 'CANCELADO'">
			<form @submit.prevent="postComentario(comentario)" class="w-full">
				<InputGroup>
					<InputText
						v-model="comentario.comentarios"
						placeholder="Keyword"
						required
					/>
					<Button
						type="submit"
						icon="fa fa-circle-right"
						class="p-3"
						severity="warning"
					/>
				</InputGroup>
			</form>
		</template>
	</Dialog>
</template>

<style scoped>
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
	background-color: #fb923c;
	border-radius: 12px;
	padding: 10px 20px;
	width: 80%;
}

.mis-comentarios {
	display: flex;
	justify-content: start;
	width: 50%;
	.area-comentario {
		background-color: #22c55e;
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
