<template>
	<view class="container">
		<view class="logout" @click="logout">退出登录</view>
	</view>
</template>

<script setup>
	import {
		useUserStore
	} from '../../../store/user';
	const {
		logout
	} = useUserStore()
</script>

<style lang="scss">
	.container {
		background-color: darkgrey;
		height: calc(100vh - 88rpx);
		overflow: hidden;

		.logout {
			margin-top: 40rpx;
			height: 100rpx;
			background-color: white;
			width: 100%;
			text-align: center;
			line-height: 100rpx;
			border-radius: 10rpx;
		}
	}
</style>