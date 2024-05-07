<script lang="ts" setup>
import { ref } from 'vue';
import { usePDF } from '../composables/usePDF';
import { useRouter } from 'vue-router';

const { pdf } = usePDF();
const router = useRouter();
const visible = ref(true);
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="PDF"
		:style="{ width: '90vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<iframe :src="pdf" class="pdf"></iframe>
	</Dialog>
</template>

<style scoped>
.pdf {
	width: 100%;
	height: 80vh;
}
</style>
