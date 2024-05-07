<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTimbrado } from '../../composables/useTimbrado';
import CardBalance from './CardBalance.vue';

const { balance, getBalanceTimbres } = useTimbrado();

onMounted(() => {
	getBalanceTimbres();
});
</script>

<template>
	<div class="grid">
		<div class="col-4">
			<CardBalance
				class="p-3"
				title="Timbres Usados"
				:balance="+balance.stampsUsed"
				color="text-green-300"
			/>
		</div>
		<div class="col-4">
			<CardBalance
				class="p-3"
				title="Timbres Asignados"
				:balance="+balance.stampsAssigned"
				color="text-blue-300"
			/>
		</div>
		<div class="col-4">
			<CardBalance
				class="p-3"
				title="Timbres Restantes"
				:balance="+balance.stampsBalance"
				color="text-yellow-300"
			/>
		</div>
	</div>
</template>
