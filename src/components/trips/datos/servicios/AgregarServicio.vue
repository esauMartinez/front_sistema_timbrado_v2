<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../../../router';
import Tabla from '../../../servicios/Tabla.vue';
import { useTrip } from '../../../../composables/useTrip';
import { useServicio } from '../../../../composables/useServicio';

const { concepto, agregarIva, agregarRetencion, agregarConcepto, resetFormConcepto } = useTrip();
const { servicios, getServicios } = useServicio();

const visible = ref(true);

onMounted(async () => {
	await getServicios();
	resetFormConcepto();
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		:style="{ width: '55vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<form
			@submit.prevent="agregarConcepto(concepto)"
			id="formulario-servicio"
			class="mt-1 formulario"
		>
			<div class="row">
				<div class="col-lg-12 mb-3">
					<label>Concepto</label>
					<Dropdown
						name="nombre"
						class="w-100"
						:options="servicios"
						placeholder="Selecciona un rol"
						filter
						v-model="concepto.clave"
						optionLabel="descripcion"
						optionValue="clave"
					/>
					<small class="p-error" name="nombre"></small>
				</div>
				<div class="col-lg-12 mb-3">
					<label>Monto</label>
					<InputNumber
						name="monto"
						class="w-100"
						v-model="concepto.monto"
						placeholder="Monto"
					/>
					<small class="p-error" name="monto"></small>
				</div>
				<div class="col-lg-6 mt-3">
					<Button
						label="IVA"
						class="w-100"
						:icon="
							concepto.iva !== 0 && concepto.iva !== null ? 'pi pi-check' : ''
						"
						@click="agregarIva()"
					/>
				</div>
				<div class="col-lg-6 mt-3">
					<Button
						label="Retencion"
						class="w-100"
						:icon="
							concepto.retencion !== 0 && concepto.retencion !== null
								? 'pi pi-check'
								: ''
						"
						@click="agregarRetencion()"
					/>
				</div>
			</div>
		</form>
		<template #footer>
			<Button
				label="Cancelar"
				icon="pi pi-times"
				@click="visible = false"
				outlined
				severity="danger"
			/>
			<Button
				label="Guardar"
				icon="pi pi-check"
				type="submit"
				form="formulario-servicio"
				severity="success"
			/>
		</template>
		<!-- <Tabla :ismodule="false" /> -->
	</Dialog>
</template>
