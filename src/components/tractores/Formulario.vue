<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTractor } from '@/composables/useTractor';
import { useError } from '@/composables/useError';
import { useMarca } from '@/composables/useMarca';

const { unidad, configuraciones, getConfiguraciones } = useTractor();
const { marcas, getMarcas } = useMarca();
const { setErrores } = useError();

onMounted(() => {
	getMarcas('TRACTOR');
	getConfiguraciones();
	setErrores([]);
});

const fecha_minima = new Date();
</script>

<template>
	<form class="formulario p-2">
		<div class="mb-3">
			<label>Numero economico</label>
			<InputText
				id="numero_economico"
				name="numero_economico"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero economico"
				autocomplete="off"
				v-model="unidad.numero_economico"
			/>
			<small class="p-error" name="numero_economico"></small>
		</div>
		<div class="mb-3">
			<label>Matricula</label>
			<InputText
				id="matricula"
				name="matricula"
				class="w-full focus:border-primary mt-2"
				placeholder="Matricula"
				v-model="unidad.matricula"
			/>
			<small class="p-error" name="matricula"></small>
		</div>
		<div class="mb-3">
			<label>Numero de serie</label>
			<InputText
				id="numero_serie"
				name="numero_serie"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero de serie"
				v-model="unidad.numero_serie"
			/>
			<small class="p-error" name="numero_serie"></small>
		</div>
		<div class="mb-3">
			<label>Numero de poliza</label>
			<InputText
				id="numero_poliza"
				name="numero_poliza"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero de poliza"
				v-model="unidad.numero_poliza"
			/>
			<small class="p-error" name="numero_poliza"></small>
		</div>
		<div class="mb-3">
			<label>Vencimiento de poliza</label>
			<Calendar
				id="vencimiento_poliza"
				name="vencimiento_poliza"
				class="w-full focus:border-primary mt-2"
				placeholder="Vencimiento de la poliza"
				:numberOfMonths="1"
				showIcon
				:minDate="fecha_minima"
				v-model="unidad.vencimiento_poliza"
			/>
			<small class="p-error" name="vencimiento_poliza"></small>
		</div>
		<div class="mb-3">
			<label>Modelo</label>
			<InputText
				id="modelo"
				name="modelo"
				class="w-full focus:border-primary mt-2"
				placeholder="Modelo"
				v-model="unidad.modelo"
			/>
			<small class="p-error" name="modelo"></small>
		</div>
		<div class="mb-3">
			<label>Aseguradora</label>
			<InputText
				id="aseguradora"
				name="aseguradora"
				class="w-full focus:border-primary mt-2"
				placeholder="Aseguradora"
				v-model="unidad.aseguradora"
			/>
			<small class="p-error" name="aseguradora"></small>
		</div>
		<div class="mb-3">
			<label>Configuracion</label>
			<Dropdown
				id="configuracion"
				name="configuracion"
				class="w-full focus:border-primary mt-2"
				filter
				placeholder="Configuracion"
				optionLabel="nombre"
				:options="configuraciones"
				optionValue="clave"
				v-model="unidad.configuracion"
			>
				<template #option="slotProps">
					{{ slotProps.option.clave }} - {{ slotProps.option.nombre }}
				</template>
			</Dropdown>
			<small class="p-error" name="configuracion"></small>
		</div>

		<div class="mb-3">
			<label>Peso</label>
			<InputText
				id="peso"
				name="peso"
				class="w-full focus:border-primary mt-2"
				placeholder="Peso"
				v-model="unidad.peso"
			/>
			<small class="p-error" name="peso"></small>
		</div>
		<div class="grid">
			<div class="col-11 mb-3">
				<label>Marca</label>
				<Dropdown
					id="marca_id"
					name="marca_id"
					class="w-full focus:border-primary mt-2"
					placeholder="Marca"
					optionLabel="nombre"
					filter
					:options="marcas"
					optionValue="id"
					v-model="unidad.marca_id"
				/>
				<small class="p-error" name="marca_id"></small>
			</div>
			<div class="col-1 mt-4">
				<router-link to="/agregar-marca-tractor/tractor">
					<Button class="mt-1 w-full" icon="pi pi-plus" />
				</router-link>
			</div>
		</div>
		<router-view></router-view>
	</form>
</template>
