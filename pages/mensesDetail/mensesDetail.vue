<template>
	<view class="container">
		<view class="list">
			<view class="item" v-for="item in mensesList" :key="item.id">
				<image :src="item.avatarUrl" class="avatarUrl"></image>
				<view class="time">
					<text class="startTime">{{ item.startTime}}</text>
					<text class="diffDays"> {{item.diffDays ? "距离上次来姨妈有" + item.diffDays + "天啦": "您的第一次记录姨妈"}} ~</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		user
	} from '../personCenter/index.js'
	import {
		getAllMenses,
		mensesList,
	} from './index'
	getAllMenses()
</script>

<style lang="scss">
	.container {
		height: 100%;

		.list {
			padding: 10rpx;

			.item {
				width: 100%;
				height: 100rpx;
				margin-bottom: 10rpx;
				font-size: 30rpx;
				border-bottom: 1rpx solid darkgray;
				display: flex;
				padding: 20rpx;
				align-items: center;

				.avatarUrl {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.time {
					// background-color: red;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.startTime {
						font-size: 30rpx;
					}

					.diffDays {
						font-size: 22rpx;
					}
				}

			}
		}
	}
</style>