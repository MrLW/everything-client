<template>
	<view class="contaienr">
		<scroll-view class="chatList" scroll-y>
			<view class="chatItem" v-for="(item,index) in chatItemList" :key="item.id" :class="{isMe: item.isMe}">
				<image :src="item.avatarUrl"></image>
				<view class="content">{{ item.content }}</view>
			</view>
		</scroll-view>
		<view class="bottom">
			<view class="input">
				<input class="inputContent" type="text" v-model="content" placeholder="请输入您的聊天内容"
					@keyup.enter="addChatItem" confirm-type="send" @confirm="addChatItem">
				<text class="iconfont icon-fasongxiaoxi" @click="addChatItem"></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		content,
		chatItemList,
		addChatItem
	} from '.'
</script>

<style lang="scss">
	.contaienr {

		height: 100%;
		background-color: #f6f6f6;

		.chatList {
			height: calc(100vh - 100rpx);

			.chatItem {
				background-color: #f6f6f6;
				display: flex;
				height: 120rpx;
				align-items: center;
				padding: 10rpx;
				box-sizing: border-box;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin: 0 10rpx;
				}

				.content {
					background-color: white;
					border-radius: 10rpx;
					font-size: 30rpx;
					padding: 10rpx;
				}
			}

			.isMe {
				justify-content: right;
				flex-direction: row-reverse;
			}
		}


		.bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;

			.input {
				display: flex;
				align-items: center;

				justify-content: space-evenly;

				.inputContent {
					padding: 10rpx;
					margin-bottom: 10rpx;
					height: 60rpx;
					width: 90%;
					background-color: white;
					border-radius: 20rpx;
					margin-left: 10rpx;
				}

				.iconfont {
					font-size: 40rpx;
				}
			}
		}


	}
</style>