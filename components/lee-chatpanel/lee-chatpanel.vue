<template>
	<view class="contaienr">
		<scroll-view class="chatList" scroll-y enable-flex scroll-anchoring :scroll-into-view="intoView">
			<view class="chatItem" v-for="(item,index) in chatItemList" :key="item.id" :class="{isMe: item.isMe}"
				:id="`et-`+item.id">
				<image :src="item.isMe ? item.avatarUrl : item.avatarUrl"></image>
				<view class="content">{{ item.content }}</view>
			</view>

		</scroll-view>


		<view class="bottom">
			<view class="input">
				<input class="inputContent" type="text" v-model="content" placeholder="请输入您的聊天内容"
					@keyup.enter="addChatItem" confirm-type="send" @confirm="createChat">
				<text class="iconfont icon-fasongxiaoxi" @click="createChat"></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		ref
	} from 'vue';
	import {
		content
	} from '../../pages/marryDetail/chat';
	const props = defineProps(['friendId', 'addChatItem', 'getChatList', 'chatItemList', 'title'])
	let intoView = ref('');
	props.getChatList(props.friendId)
		.then((res) => {
			const list = res.value;
			intoView.value = 'et-' + list[list.length - 1].id;
		})

	// 必须在获取数据之后来设置scrollTop
	uni.setNavigationBarTitle({
		title: props.title || '好友'
	})

	function createChat() {
		props.addChatItem().then(res => {
			intoView.value = 'et-' + res.id;
		})
	}
</script>

<style lang="scss">
	.contaienr {

		height: 100%;
		background-color: #f6f6f6;

		.chatList {

			height: calc(100vh - 180rpx);
			overflow: hidden;

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

			.input {
				margin: 0 10rpx;
				display: flex;
				align-items: center;

				justify-content: space-evenly;

				.inputContent {
					padding: 10rpx;
					margin-bottom: 10rpx;
					height: 60rpx;
					width: 90%;
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