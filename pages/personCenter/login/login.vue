<template>
	<view class="container">
		<view class="emailView">
			<input class="email" type="text" placeholder="请输入您的邮箱" v-model="email">
			<lee-countdown :sendCode="sendEmail" :a="1"></lee-countdown>
		</view>
		<view class="verifyView">
			<input class="code" type="text" placeholder="请输入您的验证码" maxlength="4" v-model="code">
		</view>
		<button class="verify" @click="verifyCode">验证</button>
	</view>
</template>
<script setup>
	import {
		email,
		code,
		sendEmail,
		verifyCode
	} from './index.js';
</script>
<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.emailView {
			margin-top: 300rpx;
			display: flex;

			.email {
				height: 60rpx;
				padding: 10rpx 30rpx;
				font-size: 40rpx;
				margin: 0 10rpx;
				border-radius: 10rpx;
				width: 70%;
				border: 1rpx solid darkgrey;
			}


		}

		.verifyView {
			.code {
				height: 60rpx;
				padding: 10rpx 30rpx;
				font-size: 40rpx;
				margin: 0 10rpx;
				border-radius: 10rpx;
				width: 70%;
				border: 1rpx solid darkgrey;
			}
		}

		.verify {
			margin: 20rpx 10rpx;
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