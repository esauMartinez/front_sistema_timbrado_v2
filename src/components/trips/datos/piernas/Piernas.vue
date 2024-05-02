<script lang="ts" setup>
import { useTrip } from '../../../../composables/useTrip';
import { router } from '../../../../router';

const { trip, movimientos, vaciarMovimientos, eliminarMovimiento } = useTrip();

const agregarMovimiento = () => {
	router.push({ name: 'AgregarMovimiento' });
};

const infoPatio = (id) => {
	router.push({ path: `/informacion-patio/${id}/info` });
};
</script>

<template>
	<Panel>
		<div class="flex justify-content-center" v-if="trip.estatus === 'CREADO'">
			<Button label="Agregar movimiento" @click="agregarMovimiento" />
			<Button
				label="Vaciar movimienos"
				severity="danger"
				class="ms-2"
				@click="vaciarMovimientos(trip.id)"
			/>
		</div>
		<div class="mt-5" style="overflow: auto">
			<Timeline :value="movimientos" align="alternate">
				<template #content="slotProps">
					{{ slotProps.item.patio.nombre }}
					<!-- <div>
							<Button
								size="small"
								@click="infoPatio(slotProps.item.patio.id)"
								class="me-2"
							>
								<font-awesome-icon :icon="['fas', 'circle-info']" />
							</Button>
							<Button
								size="small"
								@click="eliminarMovimiento(slotProps.item.id)"
								severity="danger"
								v-if="trip.estatus === 'CREADO'"
							>
								<font-awesome-icon :icon="['fas', 'times']" />
							</Button>
						</div> -->
				</template>
			</Timeline>
		</div>
	</Panel>
</template>

<style scoped>
.p-card {
	background-color: #6366f1 !important;
	color: #fff;
}
</style>
