<template>
	<view>
		<view class="chatItem" @click="goChatPage">
			<image class="avatar" src="../../static/logo.png"></image>
			<view class="userinfo">
				<view class="username">lw</view>
				<view class="chatContent">怎么没回复我消息</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		goChatPage
	} from '.';
</script>

<style lang="scss">
	.chatItem {
		width: 100%;
		height: 150rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid darkgrey;

		.userinfo {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			justify-content: space-between;

			.username {
				font-size: 40rpx;
			}

			.chatContent {
				font-size: 20rpx;
				color: darkgray;
			}
		}

		.avatar {
			width: 100rpx;
			height: 100rpx;
			margin-left: 20rpx;
			border-radius: 50%;
		}
	}
</style>