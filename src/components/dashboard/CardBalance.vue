<script lang="ts" setup>
interface PropsCardBalance {
	balance: number;
	title: string;
	color: string;
}

const props = withDefaults(defineProps<PropsCardBalance>(), {
	balance: 0,
	title: 'asd',
	color: 'asd',
});
</script>

<template>
	<Card>
		<template #content>
			<p :class="['text-xl', 'p-0 m-0']">
				{{ props.title }}
			</p>

			<ProgressSpinner
				v-if="!props.balance"
				style="width: 50px; height: 50px"
				strokeWidth="8"
				animationDuration="1s"
				aria-label="Custom ProgressSpinner"
			/>
			<p :class="['text-lg', 'p-0 m-0', color]" v-if="props.balance">
				{{ props.balance }}
			</p>
		</template>
	</Card>
</template>
