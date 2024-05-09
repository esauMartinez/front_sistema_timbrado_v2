<script lang="ts" setup>
import FormularioCertificados from '../components/ajustes/FormularioCertificados.vue';
import FormularioDatosEmpresa from '../components/ajustes/FormularioDatosEmpresa.vue';
import FormularioLogotipo from '../components/ajustes/FormularioLogo.vue';
import { useEmpresa } from '../composables/useEmpresa';

const { empresa, putEmpresa } = useEmpresa();
</script>

<template>
	<div class="m-margin-top">
		<Card>
			<template #content>
				<Panel header="Datos de la empresa">
					<FormularioDatosEmpresa
						@submit.prevent="putEmpresa(empresa)"
						id="formulario-datos-empresa"
					/>
				</Panel>
			</template>
		</Card>

		<Card class="mt-3">
			<template #content>
				<Panel header="Certificados">
					<FormularioCertificados />
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
