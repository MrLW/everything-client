<template>
	<view class="container">
		<input class="input" type="text" placeholder="请输入用户EID" v-model="search" @blur="goSearch">
		<view class="userlist" :style="{height: userlistHeight}" :class="{ modal: switchModal }" @click="removeModal">
			<view class="useritem" v-for="item in userList" @click.stop="selectOne(item.id)">
				<image class="image" :src="item.avatarUrl"></image>
				<text class="username">{{item.username}} ({{ item.eid }})</text>
				<text class="sub" @click.stop="subcribeUser(item)"
					:class="{hasSub: item.hasSub}">{{ item.hasSub ? '已': '' }}关注</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	var search = ref('');
	var userList = ref([])
	var userlistHeight = ref("0");
	const props = defineProps(['getdata', 'select', 'subscribe'])
	const emit = defineEmits(['startSearch', 'endSearch'])
	// 是否开启遮罩层
	let switchModal = ref(false);

	function goSearch() {
		if (search.value.trim() == '') return;

		// 获取焦点, 开启遮罩层
		switchModal.value = true;
		userlistHeight.value = '100%';
		// 向父组件发送事件
		emit('startSearch')

		props.getdata && props.getdata(search.value).then(res => {
			userList.value.splice(0, userList.value.length, ...res)
		})

	}

	function selectOne(param) {
		const user = userList.value.find(item => item.id == param);
		if (user) search.value = user.eid;
		props.select && props.select(param);
	}

	/**
	 *  关注用户
	 */
	function subcribeUser(user) {
		user.hasSub = true;
		props.subscribe && props.subscribe(user.id);
	}
	/**
	 *  删除用户列表遮罩层
	 */
	function removeModal(p) {
		// 关闭遮罩
		switchModal.value = false;
		search.value = ''
		userList.value.splice(0, userList.value.length)
		userlistHeight.value = '0';
		emit('endSearch')
	}
</script>

<style lang="scss">
	.container {
		// height: 100%;
		overflow: hidden;
		padding: 0 10rpx;

		.input {

			background-color: #f6f6f6;
			height: 80rpx;
			border: 1rpx solid darkgrey;
			margin-top: 20rpx;
			border-radius: 30rpx;
			padding: 8rpx 16rpx;
			background-image: url('icon/search.png');
			background-repeat: no-repeat;
			background-position: right;
			background-size: 30px 30px;
		}

		.userlist {
			// height: 100%;
			position: absolute;
			margin-top: 16rpx;
			width: 97%;
			border-radius: 10rpx;
			background: rgba(0, 0, 0, .4);

			.useritem {
				height: 120rpx;
				display: flex;
				align-items: center;
				padding: 10rpx;
				box-sizing: border-box;
				border-bottom: 1rpx black solid;


				.image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				&:hover {
					background-color: #f6f6f6;
				}

				.username {
					flex: 1;
				}

				.sub {
					width: 100rpx;
					height: 50rpx;
					padding: 5rpx 10rpx;
					background-color: #f16c61;
					text-align: center;
					line-height: 50rpx;
					border-radius: 20rpx;
					color: white;
				}

				.hasSub {
					background-color: darkolivegreen;
				}

			}


		}

		.modal {
			z-index: 999;
		}
	}
</style>