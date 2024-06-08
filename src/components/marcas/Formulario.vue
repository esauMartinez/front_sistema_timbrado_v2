<script lang="ts" setup>
import { useMarca } from '@/composables/useMarca';

interface PropTipo {
	tipo: string;
}
withDefaults(defineProps<PropTipo>(), {
	tipo: 'tractor',
});

const { marca } = useMarca();
</script>

<template>
	<form class="formulario p-2">
		<div class="mb-3">
			<label>Nombre marca {{ $props.tipo }}</label>
			<InputText
				name="nombre"
				class="w-full focus:border-primary mt-2"
				placeholder="Nombre marca"
				autocomplete="off"
				v-model="marca.nombre"
			/>
			<small class="p-error" name="nombre"></small>
		</div>
	</form>
</template>
