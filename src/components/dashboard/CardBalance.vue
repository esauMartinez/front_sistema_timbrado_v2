<script lang="ts" setup>
interface PropsCardBalance {
	balance: string | undefined;
	title: string | undefined;
	color: string | undefined;
}

const props = withDefaults(defineProps<PropsCardBalance>(), {
	balance: null,
	title: null,
	color: null,
});
</script>

<template>
	<Card>
		<template #content>
			<p :class="['text-xl', 'p-0 m-0']">
				{{ props.title }}
			</p>
			<ProgressSpinner
				v-if="props?.balance === null"
				style="width: 50px; height: 50px"
				strokeWidth="8"
				animationDuration="1s"
				aria-label="Custom ProgressSpinner"
			/>
			<p :class="['text-lg', 'p-0 m-0', color]" v-else>
				{{ props?.balance }}
			</p>
		</template>
	</Card>
</template>
