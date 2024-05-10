<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTrip } from '../../composables/useTrip';

const { trips, getTrips, postTrip } = useTrip();

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
	return {
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		datasets: [
			{
				label: 'Sales',
				data: [trips.value.length],
				backgroundColor: [
					'rgba(249, 115, 22, 0.2)',
					'rgba(6, 182, 212, 0.2)',
					'rgb(107, 114, 128, 0.2)',
					'rgba(139, 92, 246 0.2)',
				],
				borderColor: [
					'rgb(249, 115, 22)',
					'rgb(6, 182, 212)',
					'rgb(107, 114, 128)',
					'rgb(139, 92, 246)',
				],
				borderWidth: 1,
			},
		],
	};
};

const setChartOptions = () => {
	const documentStyle = getComputedStyle(document.documentElement);
	const textColor = documentStyle.getPropertyValue('--text-color');
	const textColorSecondary = documentStyle.getPropertyValue(
		'--text-color-secondary'
	);
	const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

	return {
		plugins: {
			legend: {
				labels: {
					color: textColor,
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					color: surfaceBorder,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					color: surfaceBorder,
				},
			},
		},
	};
};

onMounted(async () => {
	chartData.value = setChartData();
	chartOptions.value = setChartOptions();
});
</script>

<template>
	<Card>
		<template #title>Grafica de movimientos</template>
		<template #content>
			<Chart type="bar" :data="chartData" :options="chartOptions" />
		</template>
	</Card>
</template>
