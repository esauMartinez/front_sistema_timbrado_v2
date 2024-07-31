<script lang="ts" setup>
interface Props {
  balance: string | undefined
  title: string | undefined
  color: string | undefined
  isLoading: boolean | undefined
}

defineProps<Props>()
</script>

<template>
  <Card>
    <template #content>
      <p :class="['text-xl', 'p-0 m-0']">
        {{ title }}
      </p>
      <ProgressSpinner
        v-if="isLoading"
        style="width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration="1s"
        aria-label="Custom ProgressSpinner"
      />
      <p :class="['text-2xl', 'p-0 m-0 mt-3', color]" v-else>
        {{ balance }}
      </p>
    </template>
  </Card>
</template>
