<script lang="ts" setup>
import { useRol } from '../../composables/useRol';

const { nodes, selectedKey } = useRol();
</script>
<template>
	<Tree
		v-model:selectionKeys="selectedKey"
		:value="nodes"
		selectionMode="checkbox"
		class="w-full md:w-30rem"
	></Tree>
</template>
