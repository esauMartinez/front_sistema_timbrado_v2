<script lang="ts" setup>
import FormularioDatosEmpresa from '../components/ajustes/FormularioDatosEmpresa.vue';
import FormularioLogotipo from '../components/ajustes/FormularioLogo.vue'
import { instance } from '../helpers/axiosInstance';


</script>
<template>
	<div class="container mt-5">
		<Card>
			<template #content>
				<Panel header="Datos de la empresa">
					<FormularioDatosEmpresa />
				</Panel>
			</template>
		</Card>

		<Card class="mt-3">
			<template #content>
				<Panel header="Logotipo de la empresa">
					<FormularioLogotipo />
				</Panel>
			</template>
		</Card>
	</div>
</template>
