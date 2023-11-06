<template>
	<view class="container">
		<view class="userinfo">
			<image class="avatar" :src="user.avatarUrl" mode=""></image>
			<view class="settingContainer">
				<view class="funset">
					<view class="funitem subs">
						<text>{{ user.subs }}</text>
						<text>关注</text>
					</view>
					<view class="funitem exps">
						<text>{{ user.loves }}</text>
						<text>喜欢</text>
					</view>
					<view class="funitem loves">
						<text>{{ user.collects }}</text>
						<text>收藏</text>
					</view>
				</view>
			</view>
		</view>
		<lee-nav :menus="menus" class="nav" @choose="choose">
			<lee-grid :height="height" ref="grid" :list="list" @goItemDetail="goItemDetail"></lee-grid>
		</lee-nav>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		getMomentDetailPage
	} from '..';
	import {
		getPublicMoments,
		getPrivateMoments,
		getStarMoments,
		getLoveMoments,
	} from '../../../api/user';
	import {
		LOVE_MENUS
	} from '../../../utils/constant';
	import {
		user,
		userinfo
	} from '../../personCenter';
	const res = uni.getSystemInfoSync()
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 170 - 300)) //将px 转换rpx
	const menus = LOVE_MENUS
	const grid = ref();
	const list = []

	onMounted(function() {
		// 获取用户信息
		userinfo()
		publicMoments();
	})



	function goItemDetail(id) {
		getMomentDetailPage(id)
	}

	function publicMoments() {
		getPublicMoments().then(res => syncData(res))
	}

	function privateMoments() {
		getPrivateMoments().then(res => syncData(res))
	}

	function starMoments() {
		getStarMoments().then(res => syncData(res))
	}

	function loveMoments() {
		getLoveMoments().then(res => syncData(res))
	}

	// 处理数据并同步数据到grid 组件
	function syncData(res) {
		const data = []
		for (let item of res) {
			data.push({
				id: item.id,
				title: item.title,
				loves: item.loves,
				loved: item.loved,
				user: item['et_user'],
				cover: item.cover,
			})
		}
		grid.value.updateData(data)
	}


	function choose(index) {
		// 根据不同的index 加载不同的内容区数据
		if (index == 0) publicMoments();
		else if (index == 1) privateMoments();
		else if (index == 2) starMoments();
		else if (index == 3) loveMoments();
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		.userinfo {
			height: 400rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 auto;
			width: 95%;
			align-items: center;
			padding: 20rpx 0;
			border-radius: 10rpx;
			background-image: linear-gradient(to right bottom, darkgrey, rgba(255, 0, 0, 1));

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}

			.settingContainer {
				display: flex;
				justify-content: right;
				align-items: center;
				margin-top: 10rpx;

				.editProfile {
					color: white;
					padding: 10rpx 20rpx;
					border-radius: 30rpx;
					border: 1rpx solid white;
					margin-right: 20rpx;
				}

				.setting {
					float: right;
					margin-right: 20rpx;
					width: 80rpx;
					border: 1rpx solid white;
					border-radius: 20rpx;
					color: white;

					.iconfont {
						font-size: 60rpx;
						margin-left: 10rpx;
					}
				}

				.funset {
					flex-grow: 1;
					display: flex;
					font-size: 20rpx;
					margin-left: 30rpx;

					.funitem {
						display: flex;
						flex-direction: column;
						margin-right: 15rpx;
						align-items: center;

					}
				}
			}
		}
	}
</style>