<script lang="ts" setup>
import { usePatio } from '../../../../composables/usePatio';
import { useTrip } from '../../../../composables/useTrip';

const { patio, patios, buscarPatiosPorNombre } = usePatio();
const { selectPatio } = useTrip();
</script>

<template>
	<form>
		<div class="row mt-3">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Nombre"
					autocomplete="off"
					required
					v-model="patio.nombre"
					@keyup="buscarPatiosPorNombre(patio.nombre)"
				/>
				<div class="list-container" v-if="patios.length !== 0">
					<ul class="list">
						<li v-for="item in patios" @click="selectPatio(item)">
							{{ item.nombre }}
						</li>
					</ul>
				</div>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Codigo Postal"
					autocomplete="off"
					required
					v-model="patio.codigo_postal"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Colonia"
					autocomplete="off"
					required
					v-model="patio.colonia"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Municipio"
					autocomplete="off"
					required
					v-model="patio.municipio"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Estado"
					autocomplete="off"
					required
					v-model="patio.estado"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Pais"
					autocomplete="off"
					required
					v-model="patio.pais"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Calle"
					autocomplete="off"
					required
					v-model="patio.calle"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero exterior"
					autocomplete="off"
					required
					v-model="patio.numero_exterior"
          :disabled="true"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero interior"
					autocomplete="off"
					required
					v-model="patio.numero_interior"
          :disabled="true"
				/>
			</div>
		</div>
	</form>
</template>
