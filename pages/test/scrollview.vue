<template>
	<view>
		<scroll-view scroll-x="true" scroll-with-animation="true" :scroll-into-view="toView">
			<view style="display: flex;">
				<view :id="item.id" class="item" v-for="(item, index) in list" :key="index" @click="handleClick(item)">
					{{ item.title }}
				</view>
			</view>
		</scroll-view>
		<button @click="reset">重置</button>
	</view>
</template>
<script setup>
	import {
		ref
	} from 'vue'
	var list = ref([]);
	var toView = ref('')
	for (let i = 1; i <= 120; i++) {
		list.value.push({
			title: 'v' + i,
			id: 'V' + i
		})
	}

	function handleClick(item) {
		console.log("#");
		toView.value = item.id
	}

	function reset() {
		toView.value = "V1"
	}
</script>
<style>
	.item {
		margin-left: 10upx;
		margin-right: 10upx;
		width: 100upx;
		height: 100upx;
	}
</style>