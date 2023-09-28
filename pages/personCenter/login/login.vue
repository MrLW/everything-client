<template>
	<view class="container">
		<view class="icon">Everything</view>
		<view class="btnList">
			<image v-if="user.avatarUrl" class="avatarUrl" :src="user.avatarUrl" mode=""></image>
			<view v-else class="btnControll">
				<view class="iconfont icon-morentouxiang1">
				</view>
				<button class="chooseAvatar" open-type="chooseAvatar" @chooseavatar="chooseavatar" />
			</view>
			<input class="nickname" type="nickname" placeholder="输入你的昵称" lable="昵称" @blur="submitNickname"
				v-model="user.username">
		</view>
	</view>
</template>
<script setup>
	import {
		user,
		chooseavatar,
		submitNickname
	} from '../index.js'
</script>
<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.icon {
			height: 300rpx;
			text-align: center;
			line-height: 300rpx;
			color: darkgrey;
		}

		.btnList {
			height: 500rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatarUrl {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}

			.btnControll {
				position: relative;

				.chooseAvatar {
					width: 100rpx;
					height: 100rpx;
					position: absolute;
					border-radius: 50%;
					opacity: 0;
					top: 0rpx;
				}

				.iconfont {
					width: 100rpx;
					height: 100rpx;
					font-size: 100rpx;
				}
			}




			.nickname {
				height: 60rpx;
				padding: 10rpx;
				border-radius: 40rpx;
				border: 1rpx solid darkgrey;
				margin-top: 30rpx;
				text-align: center
			}

		}
	}
</style>