<script lang="ts" setup>
import { useTrip } from '../../composables/useTrip';
import Piernas from './datos/piernas/Piernas.vue';
import TipoDeViaje from './datos/TipoDeViaje.vue';
import Operador from './datos/Operador.vue';
import Caja from './datos/Caja.vue';
import Tractor from './datos/Tractor.vue';
import Servicios from './datos/servicios/Servicios.vue';
import { router } from '../../router';

const {
	nombre_cliente,
	nombre_operador,
	numero_economico_caja,
	numero_economico_tractor,
} = useTrip();

const agregar = (tipo: string) => {
	if (tipo === 'cliente') {
		router.push({ name: 'AgregarClienteTrip' });
	} else if (tipo === 'operador') {
		router.push({ name: 'AgregarOperadorTrip' });
	} else if (tipo === 'caja') {
		router.push({ name: 'AgregarCajaTrip' });
	} else {
		router.push({ name: 'AgregarTractorTrip' });
	}
};
</script>

<template>
	<form>
		<div class="row">
			<div class="col-lg-12">
				<TipoDeViaje />
			</div>

			<!-- <div class="col-lg-6 mt-3">
				<Panel header="Cliente">
					<div class="row p-2">
						<div class="col-lg-10">
							<InputText
								class="w-100"
								autocomplete="off"
								required
								name="cliente_id"
								disabled
								v-model="nombre_cliente"
							/>
							<small class="p-error" name="cliente_id"></small>
						</div>
						<div class="col-lg-2">
							<Button
								class="w-100"
								icon="pi pi-plus"
								@click="agregar('cliente')"
							/>
						</div>
					</div>
				</Panel>
			</div>
			<div class="col-lg-6 mt-3">
				<Panel header="Operador">
					<div class="row p-2">
						<div class="col-lg-10">
							<InputText
								class="w-100"
								autocomplete="off"
								required
								name="operador_id"
								disabled
								v-model="nombre_operador"
							/>
							<small class="p-error" name="operador_id"></small>
						</div>
						<div class="col-lg-2">
							<Button
								class="w-100"
								icon="pi pi-plus"
								@click="agregar('operador')"
							/>
						</div>
					</div>
				</Panel>
			</div>
			<div class="col-lg-6 mt-3">
				<Panel header="Remolque">
					<div class="row p-2">
						<div class="col-lg-10">
							<InputText
								class="w-100"
								autocomplete="off"
								required
								name="caja_id"
								disabled
								v-model="numero_economico_caja"
							/>
							<small class="p-error" name="caja_id"></small>
						</div>
						<div class="col-lg-2">
							<Button
								class="w-100"
								icon="pi pi-plus"
								@click="agregar('caja')"
							/>
						</div>
					</div>
				</Panel>
			</div>
			<div class="col-lg-6 mt-3">
				<Panel header="Tractor">
					<div class="row p-2">
						<div class="col-lg-10">
							<InputText
								class="w-100"
								autocomplete="off"
								required
								name="tractor_id"
								disabled
								v-model="numero_economico_tractor"
							/>
							<small class="p-error" name="tractor_id"></small>
						</div>
						<div class="col-lg-2">
							<Button
								class="w-100"
								icon="pi pi-plus"
								@click="agregar('tractor')"
							/>
						</div>
					</div>
				</Panel>
			</div> -->
			<div class="col-lg-12">
				<Piernas class="mt-3" />
			</div>
			<div class="col-lg-12">
				<Servicios class="mt-3" />
			</div>
		</div>
	</form>
</template>
