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
			<p :class="['text-lg', 'p-0 m-0', color]">
				{{ props.balance }}
			</p>
		</template>
	</Card>
</template>
