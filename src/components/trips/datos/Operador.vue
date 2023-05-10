<script lang="ts" setup>
import { useTrip } from '../../../composables/useTrip';
import { ref } from 'vue';
import Tabla from '../../operadores/Tabla.vue';

const { nombre_operador } = useTrip();
const visible = ref(false);
</script>

<template>
	<Panel header="Operador">
		<!-- <template #icons>
			<button
				type="button"
				class="p-panel-header-icon p-link mr-2"
				@click="visible = true"
			>
				<span class="pi pi-plus"></span>
			</button>
		</template> -->
		<div class="row p-2">
			<div class="col-lg-10">
				<InputText
					class="w-100"
					autocomplete="off"
					required
					disabled
					v-model="nombre_operador"
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
