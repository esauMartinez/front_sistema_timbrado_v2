<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '@/router';
import { usePDFTrip } from '@/composables/usePDFTrip';

const { pdf, pdfTrip } = usePDFTrip();
const route = useRoute();
const visible = ref(true);

onMounted(async () => {
	pdfTrip(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="PDF Trip"
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
