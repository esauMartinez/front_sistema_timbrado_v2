<script lang="ts" setup>
import { useTrip } from '@/composables/useTrip';
import { router } from '@/router';

const {
	trip,
	movimientos,
	vaciarMovimientos,
	eliminarMovimiento,
	patioTimbre,
	localizacionCaja,
} = useTrip();

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
			<ButtonGroup>
				<Button label="Agregar movimiento" @click="agregarMovimiento" />
				<Button
					label="Vaciar movimienos"
					severity="danger"
					@click="vaciarMovimientos(trip.id)"
				/>
			</ButtonGroup>
		</div>
		<div class="mt-5" style="overflow: auto">
			<Timeline :value="movimientos" align="alternate">
				<template #content="slotProps">
					<p>
						{{ slotProps.item.patio.nombre }}
					</p>
					<ButtonGroup>
						<Button
							size="small"
							v-tooltip="{
								value: 'Ver la informacion del patio',
								showDelay: 300,
								hideDelay: 300,
							}"
							@click="infoPatio(slotProps.item.patio.id)"
						>
							<font-awesome-icon :icon="['fas', 'map']" />
						</Button>
						<Button
							size="small"
							@click="localizacionCaja(slotProps.item.id)"
							:severity="slotProps.item.localizacion_caja ? 'warning' : ''"
							v-tooltip="{
								value: 'Poner la caja como localizable en este patio',
								showDelay: 300,
								hideDelay: 300,
							}"
							v-if="trip.estatus === 'CREADO'"
						>
							<font-awesome-icon :icon="['fas', 'location-dot']" />
						</Button>
						<Button
							size="small"
							@click="
								patioTimbre(slotProps.item.id, slotProps.item.patio_timbre)
							"
							:severity="slotProps.item.patio_timbre ? 'info' : ''"
							v-tooltip="{
								value: 'Agregar patio para timbrado',
								showDelay: 300,
								hideDelay: 300,
							}"
							v-if="trip.estatus === 'CREADO'"
						>
							<font-awesome-icon :icon="['fas', 'crosshairs']" />
						</Button>
						<Button
							size="small"
							@click="eliminarMovimiento(slotProps.item.id)"
							v-tooltip="{
								value: 'Eliminar movimiento',
								showDelay: 300,
								hideDelay: 300,
							}"
							severity="danger"
							v-if="trip.estatus === 'CREADO'"
						>
							<font-awesome-icon :icon="['fas', 'times']" />
						</Button>
					</ButtonGroup>
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
