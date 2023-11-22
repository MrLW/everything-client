<template>
	<view class="item">
		<view class="label">
			{{ label }}
		</view>
		<input class="input" type="text" placeholder="请输入TODO标题">
	</view>
</template>

<script setup>
	const props = defineProps(['label'])
	console.log("#props:", props);
</script>

<style lang="scss">
	.item {
		display: flex;
		align-items: center;
		margin: 10rpx 20rpx;

		.input {
			border: 1rpx solid black;
			width: 80%;
			margin: 0 auto;
			border-radius: 10rpx;
			padding: 10rpx;
		}
	}
</style>