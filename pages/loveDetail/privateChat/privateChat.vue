<template>
	<view class="container">
		<lee-searchuser :getdata="getdata" :subscribe="subscribe" @startSearch="startSearch"
			@endSearch="endSearch"></lee-searchuser>
		<view class="userlist" :style="{display: userListDisaply}">
			<view class="useritem" v-for="item in user.chatContactList" :key="item.id"
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
		ref
	} from 'vue'
	import {
		useUserStore
	} from '../../../store/user';
	import {
		storeToRefs
	} from 'pinia';
	import {
		goFriendChat
	} from '../../../utils/page';

	const useStore = useUserStore()
	const {
		getChatContacts,
		subscribe
	} = useStore;
	const {
		user
	} = storeToRefs(useStore)


	getChatContacts();

	const userListDisaply = ref('block');
	const userList = ref([])

	function getdata(keyword) {
		return userApi.searchUsers(keyword)
	}

	function startSearch() {
		userListDisaply.value = 'none';
	}

	function endSearch() {
		userListDisaply.value = 'block';
		// 重新获取用户列表
		getChatContacts()
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