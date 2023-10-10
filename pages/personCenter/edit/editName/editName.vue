<template>
	<view class="container">
		<input class="username" type="text" name="username" v-model="user.username" placeholder="最长10个字符">
		<view class="menuBtn">
			<view class="confirm" @click="saveUsername()">保存</view>
		</view>
	</view>
</template>

<script setup>
	import {
		saveUsername
	} from '.';
	import {
		user
	} from '../..';
</script>

<style lang="scss">
	.container {
		height: 100%;
		background-color: #f6f6f6;
		overflow: hidden;

		.menuBtn {
			margin: 0 40rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: right;

			.cancel {
				color: rgba(0, 0, 0, .5);
			}

			.confirm {
				color: rgba(255, 0, 0, .5);
			}
		}

		.username {
			background-color: white;
			margin: 0 40rpx;
			margin-top: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
		}
	}
</style>