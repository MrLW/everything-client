<template>
	<view class="container">
		<view class="messageList">
			<view class="messageItem" v-for="item in messageList">
				<view class="avatarUrl">
					<image :src="item.et_user.avatarUrl" mode=""></image>
				</view>
				<view class="info">
					<view class="username">{{ item.title}}</view>
					<view class="tip">{{ item.content}}</view>
				</view>

				<view class="agree" :class="[item.status == 'complete' ? 'black': 'red' ]"
					@click="agree(item.id, item.status)">
					{{ item.status == 'complete' ? '去聊天' : '同意'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getMessageList,
		messageList,
		agree
	} from '.';
	getMessageList();
</script>

<style lang="scss">
	.container {
		height: 100%;
		background-color: #f6f6f6;

		.messageList {
			.messageItem {
				display: flex;
				padding: 10rpx 20rpx;
				border-bottom: 1rpx solid darkgray;

				.avatarUrl {
					width: 100rpx;
					height: 100rpx;

					image {
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}

					margin-right: 20rpx;
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.username {
						font-size: 30rpx;
					}

					.tip {
						font-size: 20rpx;
					}

					flex: 1;
				}

				.agree {
					width: 120rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border-radius: 20rpx;

				}

				.red {
					border: 1rpx solid red;
					color: red;
				}

				.black {
					border: 1rpx solid black;
					color: black;
				}
			}
		}
	}
</style>