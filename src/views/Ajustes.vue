<script lang="ts" setup>
import FormularioDatosEmpresa from '../components/ajustes/FormularioDatosEmpresa.vue';
import FormularioLogotipo from '../components/ajustes/FormularioLogo.vue';
import { useEmpresa } from '../composables/useEmpresa';

const { empresa, saveChanges } = useEmpresa();
</script>

<template>
	<div class="container m-margin-top">
		<Card>
			<template #content>
				<Panel header="Datos de la empresa">
					<FormularioDatosEmpresa
						@submit.prevent="saveChanges(empresa)"
						id="formulario-datos-empresa"
					/>
					<div class="row p-2">
						<div class="col-lg-2">
							<Button
								type="submit"
								label="Modificar datos"
								form="formulario-datos-empresa"
							/>
						</div>
					</div>
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
