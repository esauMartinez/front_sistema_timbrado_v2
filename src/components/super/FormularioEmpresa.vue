<script lang="ts" setup>
import { useEmpresa } from '../../composables/useEmpresa';

const { empresa } = useEmpresa();
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<label>Nombre/Razon social</label>
				<InputText
					class="w-100"
					placeholder="Nombre/Razon social"
					autocomplete="off"
					required
					v-model="empresa.razon_social"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<label>RFC</label>
				<InputText
					class="w-100"
					placeholder="RFC"
					autocomplete="off"
					required
					v-model="empresa.rfc"
				/>
			</div>

			<div class="col-lg-12 mb-3">
				<label>Timbres</label>
				<InputNumber
					type="number"
					class="w-100"
					placeholder="Timbres"
					autocomplete="off"
					required
					v-model="empresa.timbres"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Email</label>
				<InputText
					class="w-100"
					placeholder="Email"
					autocomplete="off"
					required
					v-model="empresa.email"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Password</label>
				<InputText
					class="w-100"
					placeholder="Password"
					autocomplete="off"
					required
					v-model="empresa.password"
				/>
			</div>
		</div>
	</form>
</template>
