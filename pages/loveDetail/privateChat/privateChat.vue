<template>
	<view class="container">
		<lee-searchuser :getdata="getdata" :subscribe="subscribe" @startSearch="startSearch"
			@endSearch="endSearch"></lee-searchuser>
		<view class="userlist" :style="{display: userListDisaply}">
			<view class="useritem" v-for="item in userList" :key="item.id"
				@click="goFriendChat(item.id, item.username)">
				<image class="portrait" :src="item.avatarUrl"></image>
				<view>
					<view class="nickname">{{ item.username}}</view>
					<view class="chatcontent">我可以和你聊天啦</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import * as userApi from '../../../api/user';
	import {
		toast
	} from '../../../utils';
	import {
		ref
	} from 'vue'

	const userListDisaply = ref('block');
	const userList = ref([])
	// 获取好友列表
	friends()

	function getdata(keyword) {
		return userApi.searchUsers(keyword)
	}

	function subscribe(friendId) {
		userApi.subscribe(friendId).then(() => {
			toast("关注成功");
		}).catch(err => {
			toast('关注失败');
		})
	}


	function startSearch() {
		userListDisaply.value = 'none';
	}

	function endSearch() {
		userListDisaply.value = 'block';
	}
	// 获取好友列表
	function friends() {
		userApi.friends().then(res => {
			userList.value = res;
		})
	}
	// 进入聊天页面
	function goFriendChat(friendId, username) {
		uni.navigateTo({
			url: "/pages/loveDetail/chat/chat?friendId=" + friendId + '&title=' + username
		})
	}
</script>

<style lang="scss">
	.container {

		.userlist {
			margin: 30rpx 10rpx;

			.useritem {
				display: flex;
				padding-bottom: 8rpx;
				height: 120rpx;
				align-items: center;

				.portrait {
					width: 100rpx;
					height: 100rpx;
				}

				view {
					margin-left: 10rpx;

					.nickname {
						font-size: 36rpx;
					}

					.chatcontent {
						font-size: 24rpx;
						color: darkgrey;
						margin-top: 5rpx;
					}

				}

				border-bottom: 1rpx darkgrey solid;
			}
		}
	}
</style>