<script lang="ts" setup>
import { ref } from 'vue';
import { useCliente } from '@/composables/useCliente';
import { onMounted } from 'vue';

const { contacto, postContacto, resetFormContacto } = useCliente();

const turnos = ref([{ item: 'Dia' }, { item: 'Tarde' }, { item: 'Noche' }]);

onMounted(() => {
	resetFormContacto();
});
</script>

<template>
	<form @submit.prevent="postContacto(contacto)">
		<div class="col-12 mt-3 mb-3">
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>
				<InputText
					v-model="contacto.nombre"
					placeholder="Nombre contacto"
					required
				/>
			</InputGroup>
		</div>
		<div class="col-12 mb-3">
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-phone"></i>
				</InputGroupAddon>
				<InputNumber
					v-model="contacto.telefono"
					:useGrouping="false"
					placeholder="Numero de telefono"
					required
				/>
			</InputGroup>
		</div>
		<div class="col-12 mb-3">
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-at"></i>
				</InputGroupAddon>
				<InputText v-model="contacto.email" placeholder="Email" required />
			</InputGroup>
		</div>
		<div class="col-12 mb-3">
			<InputGroup>
				<InputGroupAddon>
					<i class="fa fa-lightbulb"></i>
				</InputGroupAddon>
				<Dropdown
					v-model="contacto.turno"
					:options="turnos"
					optionLabel="item"
					optionValue="item"
					placeholder="Turno"
					required
				/>
			</InputGroup>
		</div>
		<div class="col-3 col-offset-9">
			<Button type="submit" icon="pi pi-check" class="w-full" label="Guardar" />
		</div>
	</form>
</template>
