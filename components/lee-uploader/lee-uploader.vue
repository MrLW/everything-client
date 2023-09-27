<template>
	<view class="container">
		<view class="image" @click="chooseFile">
			<text class="iconfont icon-camera"></text>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['success'])
	const chooseFile = () => {
		uni.chooseImage({
			count: 1,
			success(res) {
				props.success && props.success(res)
			},
			fail(err) {
				props.fail && props.fail(err)
			}
		})
	};
</script>

<style lang="scss">
	.container {
		.image {
			width: 150rpx;
			height: 150rpx;
			background-color: #f7f8fa;
			display: flex;
			align-items: center;
			justify-content: center;

			.iconfont {
				font-size: 60rpx;
				color: darkgray;
			}
		}
	}
</style>