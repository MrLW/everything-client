<template>
	<view ref="parent">
		<view class="child" ref="child">
			
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
	const parent = ref()
	const child = ref()
	console.log("parent: ", parent);
	console.log("child: ", child);
</script>

<style>

</style>
