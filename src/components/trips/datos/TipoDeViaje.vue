<script lang="ts" setup>
import { useTrip } from '../../../composables/useTrip';
import { ref } from 'vue';
import { router } from '../../../router';

const {
	trip,
	nombre_cliente,
	nombre_operador,
	numero_economico_caja,
	numero_economico_tractor,
} = useTrip();

const tipos_de_viajes = ref([
	{ clave: 'NACIONAL' },
	{ clave: 'IMPORTACION' },
	{ clave: 'EXPORTACION' },
]);

const moneda = ref([
	{ clave: 'MXN', descripcion: 'Peso Mexicano' },
	{ clave: 'USD', descripcion: 'Dólar americano' },
]);

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
	<Panel>
		<div class="p-2">
			<div class="mb-3">
				<label>Tipo de viaje</label>
				<Dropdown
					class="w-full focus:border-primary mt-2"
					placeholder="Tipo de viaje"
					optionLabel="clave"
					filter
					name="tipo_viaje"
					:options="tipos_de_viajes"
					optionValue="clave"
					v-model="trip.tipo_viaje"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<small class="p-error" name="tipo_viaje"></small>
			</div>
			<div class="mb-3">
				<label>Moneda</label>
				<Dropdown
					class="w-full focus:border-primary mt-2"
					placeholder="Moneda"
					optionLabel="descripcion"
					filter
					name="moneda"
					:options="moneda"
					optionValue="clave"
					v-model="trip.moneda"
					:disabled="trip.estatus !== 'CREADO'"
				>
					<template #option="slotProps">
						{{ slotProps.option.clave }} -
						{{ slotProps.option.descripcion }}
					</template>
				</Dropdown>
				<small class="p-error" name="moneda"></small>
			</div>
			<div class="mb-3">
				<label>Referencia</label>
				<InputText
					name="referencia"
					v-model="trip.referencia"
					class="w-full focus:border-primary mt-2"
					placeholder="Referencia"
					autocomplete="off"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<small class="p-error" name="referencia"></small>
			</div>
			<div class="mb-3">
				<label>Observaciones</label>
				<Textarea
					name="observaciones"
					v-model="trip.observaciones"
					class="w-full focus:border-primary mt-2"
					placeholder="Observaciones"
					rows="10"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<small class="p-error" name="observaciones"></small>
			</div>
			<div class="mb-3">
				<label>Cliente</label>
				<div class="p-inputgroup flex-1">
					<InputText
						placeholder="Cliente"
						name="cliente_id"
						v-model="nombre_cliente"
						disabled
					/>
					<Button
						icon="pi pi-plus"
						@click="agregar('cliente')"
						v-if="trip.estatus === 'CREADO'"
					/>
				</div>
				<small class="p-error" name="cliente_id"></small>
			</div>
			<div
				:class="{
					'col-lg-12': true,
					'mb-3': true,
				}"
			>
				<label>Operador</label>
				<div class="p-inputgroup flex-1">
					<InputText
						placeholder="Operador"
						name="operador_id"
						v-model="nombre_operador"
						disabled
					/>
					<Button
						icon="pi pi-plus"
						@click="agregar('operador')"
						v-if="trip.estatus === 'CREADO'"
					/>
				</div>
				<small class="p-error" name="operador_id"></small>
			</div>
			<div
				:class="{
					'col-lg-12': true,
					'mb-3': true,
				}"
			>
				<label>Caja</label>
				<div class="p-inputgroup flex-1">
					<InputText
						placeholder="Caja"
						name="caja_id"
						v-model="numero_economico_caja"
						disabled
					/>
					<Button
						icon="pi pi-plus"
						@click="agregar('caja')"
						v-if="trip.estatus === 'CREADO'"
					/>
				</div>
				<small class="p-error" name="caja_id"></small>
			</div>
			<div
				:class="{
					'col-lg-12': true,
					'mb-3': true,
				}"
			>
				<label>Tractor</label>
				<div class="p-inputgroup flex-1">
					<InputText
						placeholder="Tractor"
						name="tractor_id"
						v-model="numero_economico_tractor"
						disabled
					/>
					<Button
						icon="pi pi-plus"
						@click="agregar('tractor')"
						v-if="trip.estatus === 'CREADO'"
					/>
				</div>
				<small class="p-error" name="tractor_id"></small>
			</div>
			<div class="mb-3">
				<label>Ventana de carga</label>
				<Calendar
					name="ventana_carga"
					v-model="trip.ventana_carga"
					class="w-full focus:border-primary mt-2"
					showIcon
					:showOnFocus="false"
					:disabled="trip.estatus !== 'CREADO'"
					showTime
					hourFormat="24"
				/>
				<small class="p-error" name="ventana_carga"></small>
			</div>
			<div class="mb-3">
				<label>Ventana de entrega</label>
				<Calendar
					name="ventana_entrega"
					v-model="trip.ventana_entrega"
					class="w-full focus:border-primary mt-2"
					showIcon
					:showOnFocus="false"
					:disabled="trip.estatus !== 'CREADO'"
					showTime
					hourFormat="24"
				/>
				<small class="p-error" name="ventana_entrega"></small>
			</div>
			<div class="mb-3">
				<label>Kilometros</label>
				<InputText
					name="kilometros"
					v-model="trip.kilometros"
					class="w-full focus:border-primary mt-2"
					placeholder="Kilometros"
					autocomplete="off"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<!-- <small class="p-error" name="kilometros"></small> -->
			</div>
			<div class="mb-3">
				<label>Combustible</label>
				<InputText
					name="combustible"
					v-model="trip.combustible"
					class="w-full focus:border-primary mt-2"
					placeholder="combustible"
					autocomplete="off"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<!-- <small class="p-error" name="combustible"></small> -->
			</div>
			<div class="mb-3">
				<label>Viaticos</label>
				<InputText
					name="viaticos"
					v-model="trip.viaticos"
					class="w-full focus:border-primary mt-2"
					placeholder="viaticos"
					autocomplete="off"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<!-- <small class="p-error" name="viaticos"></small> -->
			</div>
			<div class="mb-3">
				<label>Casetas</label>
				<InputText
					name="casetas"
					v-model="trip.casetas"
					class="w-full focus:border-primary mt-2"
					placeholder="casetas"
					autocomplete="off"
					:disabled="trip.estatus !== 'CREADO'"
				/>
				<!-- <small class="p-error" name="casetas"></small> -->
			</div>
		</div>
	</Panel>
</template>
