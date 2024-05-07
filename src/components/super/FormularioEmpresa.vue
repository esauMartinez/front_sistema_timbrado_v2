<script lang="ts" setup>
import { useEmpresa } from '../../composables/useEmpresa';

const { empresa } = useEmpresa();
</script>

<template>
	<form class="p-2">
		<div class="mb-3">
			<label>Nombre/Razon social</label>
			<InputText
				class="w-full focus:border-primary mt-2"
				placeholder="Nombre/Razon social"
				autocomplete="off"
				required
				v-model="empresa.razon_social"
			/>
		</div>
		<div class="mb-3">
			<label>RFC</label>
			<InputText
				class="w-full focus:border-primary mt-2"
				placeholder="RFC"
				autocomplete="off"
				required
				v-model="empresa.rfc"
			/>
		</div>

		<div class="mb-3">
			<label>Timbres</label>
			<InputNumber
				type="number"
				class="w-full focus:border-primary mt-2"
				placeholder="Timbres"
				autocomplete="off"
				required
				v-model="empresa.timbres"
			/>
		</div>
		<div class="mb-3">
			<label>Email</label>
			<InputText
				class="w-full focus:border-primary mt-2"
				placeholder="Email"
				autocomplete="off"
				required
				v-model="empresa.email"
			/>
		</div>
		<div class="mb-3">
			<label>Password</label>
			<InputText
				class="w-full focus:border-primary mt-2"
				placeholder="Password"
				autocomplete="off"
				required
				v-model="empresa.password"
			/>
		</div>
	</form>
</template>
