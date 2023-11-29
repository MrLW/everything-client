<template>
	<view>
		persons: {{ persons}}
	</view>
</template>

<script setup>
	const {
		persons
	} = defineProps(['persons'])
</script>

<style>
</style>