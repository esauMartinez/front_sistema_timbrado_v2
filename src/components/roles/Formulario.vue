<script lang="ts" setup>
import { useRol } from '@/composables/useRol';
const { rol, modulos } = useRol();
</script>

<template>
	<form>
		<div class="grid">
			<div class="col-12">
				<InputText
					v-model="rol.nombre"
					placeholder="Nombre rol"
					class="w-full"
					required
				/>
			</div>
			<div class="col-12">
				<Panel
					toggleable
					collapsed
					class="mt-3"
					v-for="modulo in modulos"
					:key="modulo.id"
					:header="`${modulo.nombre}`"
				>
					<div v-for="permiso in modulo.permisos">
						<div class="flex justify-content-between alignt-item-center mt-2">
							<p class="text-lg" :id="permiso.nombre">
								{{ permiso.descripcion.toLocaleLowerCase() }}
							</p>
							<InputSwitch
								v-model="permiso.seleccionado"
								:aria-labelledby="permiso.nombre"
							/>
						</div>
					</div>
				</Panel>
			</div>
		</div>
	</form>
</template>
