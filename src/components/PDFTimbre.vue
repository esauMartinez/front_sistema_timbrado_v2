<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { usePDFTimbre } from '../composables/usePDFTimbre';
import { useRoute } from 'vue-router';
import { router } from '../router';

const { pdf, pdfTimbre } = usePDFTimbre();
const route = useRoute();
const visible = ref(true);

onMounted(async () => {
	await pdfTimbre(+route.params.id);
});
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
