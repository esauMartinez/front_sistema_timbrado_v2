<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';

const { getLogotipo, getNombreUsuario } = useAuth();
</script>

<template>
	<div :class="{ 'logo-and-name': true }">
		<Image
			:src="'https://recawi.mx/timbrado_v2_ftp/' + getLogotipo().logotipo"
			alt="Image"
			v-if="getLogotipo().find"
		/>

		<Image
			:src="'https://recawi.mx/timbrado_v2_ftp/default-image.png'"
			alt="Image"
			v-if="getLogotipo().find === false"
		/>
		<div>
			<h6 class="name-logo">{{ getNombreUsuario() }}</h6>
		</div>
	</div>
</template>
