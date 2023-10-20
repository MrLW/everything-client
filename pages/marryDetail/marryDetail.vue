<template>

	<view class="container">
		<view class="eidSend">
			<input class="eid" type="text" placeholder="请输入您伴侣的EID" v-model="marry.receEid">
			<button class="btn" @click="createMarryApply">发送</button>
		</view>
		<view class="avatarList">
			<image :src="user.avatarUrl" mode=""></image>
			<view class="connect">
				<view>{{ statusText }}</view>
			</view>
			<image :src="marry.avatarUrl" mode="" @click="goChatPage(marry.id)"></image>
		</view>
	</view>


	<view style="display: none;">
		<view class="chatItem" @click="goChatPage">
			<image class="avatar" src=""></image>
			<view class="userinfo">
				<view class="username">lw</view>
				<view class="chatContent">怎么没回复我消息</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		statusText,
		marry,
		goChatPage,
		getMarryInfo,
		createMarryApply
	} from '.';
	import env from '../../utils/env';
	import {
		user
	} from '../personCenter';
	getMarryInfo()
</script>

<style lang="scss">
	.container {
		background-color: f6f6f6;
		height: 100%;
		display: flex;
		flex-direction: column;

		.eidSend {
			margin-top: 20rpx;
			display: flex;
			padding: 10rpx;

			.btn {
				text-align: center;
				display: flex;
				align-items: center;
			}

			.eid {
				height: 100rpx;
				border-radius: 20rpx;
				flex: 1;
				border: 1rpx solid darkgrey;
				padding: 5rpx 20rpx;
				margin-right: 10rpx;
			}
		}

		.avatarList {
			margin-top: 200rpx;
			display: flex;
			justify-content: space-evenly;
			width: 100%;

			.connect {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}
	}


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