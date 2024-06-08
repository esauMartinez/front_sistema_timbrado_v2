<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCliente } from '@/composables/useCliente';
import { useError } from '@/composables/useError';

const { setErrores } = useError();

const {
	cliente,
	usoCfdi,
	metodosPago,
	formasPago,
	regimenFiscal,
	getUsoCfdi,
	getMetodosPago,
	getFormasPago,
	getRegimenFiscal,
} = useCliente();

onMounted(() => {
	getUsoCfdi();
	getMetodosPago();
	getFormasPago();
	getRegimenFiscal();
	setErrores([]);
});

const origenes = ref([
	{ id: 1, clave: 'nacional', nombre: 'Nacional' },
	{ id: 2, clave: 'extranjero', nombre: 'Extranjero' },
]);

const estados = ref([
	{ item: 'AGUASCALIENTES' },
	{ item: 'BAJA CALIFORNIA' },
	{ item: 'BAJA CALIFORNIA SUR' },
	{ item: 'CAMPECHE' },
	{ item: 'COAHUILA' },
	{ item: 'COLIMA' },
	{ item: 'CHIAPAS' },
	{ item: 'CHIHUAHUA' },
	{ item: 'CIUDAD DE MEXICO' },
	{ item: 'DURANGO' },
	{ item: 'GUANAJUATO' },
	{ item: 'GUERRERO' },
	{ item: 'HIDALGO' },
	{ item: 'JALISCO' },
	{ item: 'MEXICO' },
	{ item: 'MICHOACAN' },
	{ item: 'MORELOS' },
	{ item: 'NAYARIT' },
	{ item: 'NUEVO LEON' },
	{ item: 'OAXACA' },
	{ item: 'PUEBLA' },
	{ item: 'QUERETARO' },
	{ item: 'QUINTANA ROO' },
	{ item: 'SAN LUIS POTOSI' },
	{ item: 'SINALOA' },
	{ item: 'SONORA' },
	{ item: 'TABASCO' },
	{ item: 'TAMAULIPAS' },
	{ item: 'TLAXCALA' },
	{ item: 'VERACRUZ' },
	{ item: 'YUCATAN' },
	{ item: 'ZACATECAS' },
	{ item: 'ESTADO DE MEXICO' },
	{ item: 'DISTRITO FEDERAL' },
]);

const paises = ref([
	{ item: 'MEXICO' },
	{ item: 'ESTADOS UNIDOS' },
	{ item: 'CANADA' },
]);
</script>

<template>
	<form class="formulario p-2">
		<div class="mb-3">
			<label>Razon social</label>
			<InputText
				id="razon_social"
				name="razon_social"
				class="w-full focus:border-primary mt-2"
				placeholder="Razon social"
				autocomplete="off"
				v-model="cliente.razon_social"
			/>
			<small class="p-error" name="razon_social"></small>
		</div>
		<div class="mb-3">
			<label>Origen</label>
			<Dropdown
				id="origen"
				name="origen"
				class="w-full focus:border-primary mt-2"
				:options="origenes"
				placeholder="Origen"
				optionLabel="nombre"
				optionValue="clave"
				v-model="cliente.origen"
			/>
			<small class="p-error" name="origen"></small>
		</div>
		<div class="mb-3">
			<label>Codigo Postal</label>
			<InputText
				id="codigo_postal"
				name="codigo_postal"
				class="w-full focus:border-primary mt-2"
				placeholder="Codigo Postal"
				v-model="cliente.codigo_postal"
			/>
			<small class="p-error" name="codigo_postal"></small>
		</div>
		<div class="mb-3">
			<label>Colonia</label>
			<InputText
				id="colonia"
				name="colonia"
				class="w-full focus:border-primary mt-2"
				placeholder="Colonia"
				v-model="cliente.colonia"
			/>
			<small class="p-error" name="colonia"></small>
		</div>
		<div class="mb-3">
			<label>Municipio</label>
			<InputText
				id="municipio"
				name="municipio"
				class="w-full focus:border-primary mt-2"
				placeholder="Municipio"
				v-model="cliente.municipio"
			/>
			<small class="p-error" name="municipio"></small>
		</div>
		<div class="mb-3" v-if="cliente.origen === 'extranjero'">
			<label>Estado</label>
			<InputText
				id="estado"
				name="estado"
				class="w-full focus:border-primary mt-2"
				placeholder="Estado"
				v-model="cliente.estado"
			/>
			<small class="p-error" name="estado"></small>
		</div>
		<div class="mb-3" v-if="cliente.origen !== 'extranjero'">
			<label>Estado</label>
			<Dropdown
				id="estado"
				name="estado"
				class="w-full focus:border-primary mt-2"
				:options="estados"
				placeholder="Estado"
				optionLabel="item"
				optionValue="item"
				v-model="cliente.estado"
			/>
			<small class="p-error" name="estado"></small>
		</div>
		<div class="mb-3">
			<label>Pais</label>
			<Dropdown
				id="pais"
				name="pais"
				class="w-full focus:border-primary mt-2"
				:options="paises"
				placeholder="Pais"
				optionLabel="item"
				optionValue="item"
				v-model="cliente.pais"
			/>
			<small class="p-error" name="pais"></small>
		</div>
		<div class="mb-3">
			<label>Calle</label>
			<InputText
				id="calle"
				name="calle"
				class="w-full focus:border-primary mt-2"
				placeholder="Calle"
				v-model="cliente.calle"
			/>
			<small class="p-error" name="calle"></small>
		</div>
		<div class="mb-3">
			<label>Numero Exterior</label>
			<InputText
				id="numero_exterior"
				name="numero_exterior"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero Exterior"
				v-model="cliente.numero_exterior"
			/>
			<small class="p-error" name="numero_exterior"></small>
		</div>
		<div class="mb-3">
			<label>Numero Interior</label>
			<InputText
				id="numero_interior"
				name="numero_interior"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero Interior"
				v-model="cliente.numero_interior"
			/>
			<small class="p-error" name="numero_interior"></small>
		</div>
		<div class="mb-3">
			<label>RFC</label>
			<InputText
				id="rfc"
				name="rfc"
				class="w-full focus:border-primary mt-2"
				placeholder="RFC"
				v-model="cliente.rfc"
			/>
			<small class="p-error" name="rfc"></small>
		</div>
		<div class="mb-3">
			<label>Email</label>
			<InputText
				id="email"
				name="email"
				class="w-full focus:border-primary mt-2"
				placeholder="Email"
				v-model="cliente.email"
			/>
			<small class="p-error" name="email"></small>
		</div>
		<div class="mb-3">
			<label>Uso de CFDI</label>
			<Dropdown
				id="uso_cfdi"
				name="uso_cfdi"
				class="w-full focus:border-primary mt-2"
				placeholder="Uso de CFDI"
				filter
				optionLabel="clave"
				:options="usoCfdi"
				optionValue="clave"
				v-model="cliente.uso_cfdi"
			>
				<template #option="slotProps">
					{{ slotProps.option.clave }} -
					{{ slotProps.option.descripcion }}
				</template>
			</Dropdown>
			<small class="p-error" name="uso_cfdi"></small>
		</div>
		<div class="mb-3">
			<label>Metodo de Pago</label>
			<Dropdown
				id="metodo_pago"
				name="metodo_pago"
				class="w-full focus:border-primary mt-2"
				placeholder="Metodo de Pago"
				optionLabel="clave"
				:options="metodosPago"
				optionValue="clave"
				v-model="cliente.metodo_pago"
			>
				<template #option="slotProps">
					{{ slotProps.option.clave }} -
					{{ slotProps.option.descripcion }}
				</template>
			</Dropdown>
			<small class="p-error" name="metodo_pago"></small>
		</div>
		<div class="mb-3">
			<label>Forma de Pago</label>
			<Dropdown
				id="forma_pago"
				name="forma_pago"
				class="w-full focus:border-primary mt-2"
				placeholder="Forma de Pago"
				filter
				optionLabel="clave"
				:options="formasPago"
				optionValue="clave"
				v-model="cliente.forma_pago"
			>
				<template #option="slotProps">
					{{ slotProps.option.clave }} -
					{{ slotProps.option.descripcion }}
				</template>
			</Dropdown>
			<small class="p-error" name="forma_pago"></small>
		</div>
		<div class="col-lg-12">
			<label>Regimen fiscal</label>

			<Dropdown
				id="regimen_fiscal"
				name="regimen_fiscal"
				class="w-full focus:border-primary mt-2"
				placeholder="Regimen fiscal"
				filter
				optionLabel="clave"
				:options="regimenFiscal"
				optionValue="clave"
				v-model="cliente.regimen_fiscal"
			>
				<template #option="slotProps">
					{{ slotProps.option.clave }} -
					{{ slotProps.option.descripcion }}
				</template>
			</Dropdown>
			<small class="p-error" name="regimen_fiscal"></small>
		</div>
	</form>
</template>
