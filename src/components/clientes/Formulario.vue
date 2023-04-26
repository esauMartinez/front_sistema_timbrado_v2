<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCliente } from "../../composables/useCliente";

const { cliente, usoCfdi, metodosPago, formasPago, getUsoCfdi, getMetodosPago, getFormasPago } = useCliente();

const origen = ref([
  { id: 1, clave: 'nacional', nombre: "Nacional" },
  { id: 2, clave: 'extranjero', nombre: "Extranjero" },
]);

onMounted(() => {
  getUsoCfdi();
  getMetodosPago();
  getFormasPago();
});
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Razon social"
					name="nombre"
					autocomplete="off"
					required
          v-model="cliente.razon_social"
				/>
			</div>
			<div class="col-lg-12 mb-3">
        <Dropdown
					class="w-100"
					placeholder="Origen"
					optionLabel="nombre"
          :options="origen"
					optionValue="clave"
          v-model="cliente.origen"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Codigo Postal"
					required
          v-model="cliente.codigo_postal"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Colonia"
					required
          v-model="cliente.colonia"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Municipio"
					required
          v-model="cliente.municipio"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Estado"
					required
          v-model="cliente.estado"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Pais"
					required
          v-model="cliente.pais"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Calle"
					required
          v-model="cliente.calle"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero Exterior"
					required
          v-model="cliente.numero_exterior"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero Interior"
					required
          v-model="cliente.numero_interior"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="RFC"
					required
          v-model="cliente.rfc"
				/>
			</div>
			<div class="col-lg-12 mb-3" v-if="cliente.origen !== 'nacional'">
				<InputText
					class="w-100"
					placeholder="TAX ID"
					required
          v-model="cliente.tax_id"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Email"
					required
          v-model="cliente.email"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Uso de CFDI"
					filter
					optionLabel="descripcion"
          :options="usoCfdi"
					optionValue="clave"
          v-model="cliente.uso_cfdi"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Metodo de Pago"
					optionLabel="descripcion"
          :options="metodosPago"
					optionValue="clave"
          v-model="cliente.metodo_pago"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Forma de Pago"
					filter
					optionLabel="descripcion"
          :options="formasPago"
					optionValue="clave"
          v-model="cliente.forma_pago"
				/>
			</div>
		</div>
	</form>
</template>