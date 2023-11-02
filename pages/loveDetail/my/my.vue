<template>
	<view class="container">
		<view class="userinfo">
			<image class="avatar" :src="user.avatarUrl" mode=""></image>
			<view class="settingContainer">
				<view class="funset">
					<view class="funitem exps">
						<text>{{ 0 }}</text>
						<text>经验</text>
					</view>
					<view class="funitem subs">
						<text>{{ 0 }}</text>
						<text>关注</text>
					</view>
					<view class="funitem loves">
						<text>{{ 0 }}</text>
						<text>收藏</text>
					</view>
				</view>
			</view>
		</view>
		<lee-nav :menus="menus" class="nav" @choose="choose">
			<lee-grid ref="grid" :list="list" @goItemDetail="goItemDetail"></lee-grid>
		</lee-nav>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		getMomentDetailPage
	} from '..';
	import {
		LOVE_MENUS
	} from '../../../utils/constant';
	import {
		user
	} from '../../personCenter';
	const menus = LOVE_MENUS
	const grid = ref();
	const list = [{
		id: 24,
		title: '0',
		cover: 'http://192.168.20.221:3000/moment/1695608393971.jpg',
		loves: 123,
		loved: true
	}]

	function goItemDetail(id) {
		getMomentDetailPage(id)
	}

	function choose(index) {
		list[0].title = ~~index
		grid.value.updateData(list)
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
			background-color: darkgrey;
			margin: 0 auto;
			width: 100%;
			align-items: center;
			padding: 20rpx 0;


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


		.nav {}
	}
</style>