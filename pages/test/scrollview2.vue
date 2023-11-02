<template>
	<view>
		<scroll-view class="list" scroll-y scroll-with-animation="true" scroll-into-view="V20" enable-flex>
			<view>
				<view :id="item.id" class="item" v-for="(item, index) in list" :key="index" @click="handleClick(item)">
					{{ item.title }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script setup>
	import {
		ref
	} from 'vue'
	const list = ref([]);
	const toView = ref('')
	for (let i = 1; i <= 20; i++) {
		list.value.push({
			title: 'v' + i,
			id: 'V' + i
		})
	}

	function handleClick(item) {
		console.log("#handleClick:", item)
		toView.value = item.id
		console.log("#handleClick:", toView)
	}
</script>
<style>
	.list {
		height: 3000px;
		display: flex;
		flex-direction: column;
	}

	.item {
		width: 100px;
		height: 100px;
	}
</style>