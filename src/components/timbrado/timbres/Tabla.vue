<script lang="ts" setup>
import { useTimbrado } from '@/composables/useTimbrado';
import { Timbre } from '@/interfaces/timbre.model';
import { formatDateWithTime } from '@/pipes/formatDate';
import { router } from '@/router';

const { timbres, xmlAcuse } = useTimbrado();
interface propsTrip {
	trip: number;
}
const props = withDefaults(defineProps<propsTrip>(), {
	trip: 0,
});

const severityEstatus = (data: Timbre) => {
	return data.estatus === 'CANCELADO' ? 'danger' : 'success';
};

const cancelar = (id: number) => {
	router.push({ path: `/cancelar-timbre/${props.trip}/${id}` });
};
</script>

<template>
	<DataTable :value="timbres">
		<Column header="Fecha">
			<template #body="{ data }">
				{{ formatDateWithTime(data.fecha_timbrado) }}
			</template>
		</Column>
		<Column field="uuid" header="UUID"></Column>
		<Column field="estatus" header="Estatus" headerStyle="width:4rem">
			<template #body="{ data }">
				<Tag :severity="severityEstatus(data)" :value="data.estatus"></Tag>
			</template>
		</Column>
		<Column header="Codigo estatus cancelacion" headerStyle="width:450px">
			<template #body="{ data }">
				<Tag
					severity="info"
					:value="`${data.acuse.codigo_estatus}: ${data.acuse.descripcion_estatus}`"
					v-if="data.acuse"
				></Tag>
			</template>
		</Column>
		<Column headerStyle="width:100px">
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-download"
							severity="info"
							@click="xmlAcuse(data.id)"
							v-if="data.estatus === 'CANCELADO'"
						/>
						<Button
							icon="pi pi-times"
							severity="danger"
							@click="cancelar(data.id)"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>
