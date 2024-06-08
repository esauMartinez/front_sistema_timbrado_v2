<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { useTrip } from '@/composables/useTrip';

const { postTrip } = useTrip();
const toast = useToast();

const onReject = () => {
	toast.removeGroup('bc');
};
</script>
<template>
	<Toast position="center" group="bc">
		<template #message="slotProps">
			<div class="flex flex-column align-items-center" style="flex: 1">
				<div class="text-center">
					<i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
					<div class="font-bold text-xl my-3">
						¿ Deseas generar un nuevo trip ?
					</div>
				</div>
				<div class="flex justify-content-center">
					<Button severity="success" label="Si" @click="postTrip()"></Button>
					<Button
						severity="danger"
						class="ml-3"
						label="No"
						@click="onReject()"
					></Button>
				</div>
			</div>
		</template>
	</Toast>
</template>
