<script lang="ts" setup>
import { ref } from 'vue';
import { useTrip } from '../../../composables/useTrip';
import Tabla from '../../cajas/Tabla.vue';

const { numero_economico_caja } = useTrip();
const visible = ref(false);
</script>

<template>
	<Panel header="Remolque">
		<div class="row p-2">
			<div class="col-lg-10">
				<InputText
					class="w-100"
					autocomplete="off"
					required
					disabled
					v-model="numero_economico_caja"
				/>
			</div>
			<div class="col-lg-2">
				<Button class="w-100" icon="pi pi-plus" @click="visible = true" />
			</div>
		</div>

		<Dialog
			v-model:visible="visible"
			header=" "
			modal
			:style="{ width: '95vw' }"
		>
			<Tabla :isModule="false" />
		</Dialog>
	</Panel>
</template>
