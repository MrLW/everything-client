<template>
	<view class="container">
		<input class="input" type="text" placeholder="请输入用户EID" v-model="search" @blur="goSearch">
		<view class="userlist">
			<view class="useritem" v-for="item in userList" @click="selectOne(item.id)">
				<image class="image" :src="item.avatarUrl"></image>
				<text>{{item.username}} ({{ item.eid }})</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	var search = ref();
	var userList = ref([])
	const props = defineProps(['getdata', 'select'])

	function goSearch() {
		props.getdata(search.value).then(res => {
			userList.value.splice(0, userList.value.length, ...res)
		})
	}

	function selectOne(param) {
		const user = userList.value.find(item => item.id == param);
		if (user) search.value = user.eid;
		props.select(param);
	}
</script>

<style lang="scss">
	.container {

		height: 100%;

		.input {
			height: 80rpx;
			border: 1rpx solid darkgrey;
			margin-top: 10rpx;
			border-radius: 30rpx;
			padding: 8rpx 16rpx;
			background-image: url('icon/search.png');
			background-repeat: no-repeat;
			background-position: right;
			background-size: 30px 30px;
		}

		.userlist {
			background-color: #f6f6f6;

			.useritem {
				height: 120rpx;
				display: flex;
				align-items: center;
				padding: 10rpx;
				box-sizing: border-box;

				.image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				&:hover {
					background-color: darkgrey;
				}

			}


		}
	}
</style>