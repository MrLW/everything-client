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
			<lee-grid :height="height" ref="grid" :list="public_momentList" @goItemDetail="goItemDetail"
				@loadmore="loadmore" @love="love"></lee-grid>
		</lee-nav>
	</view>
</template>

<script setup>
	import {
		inject,
		onMounted,
		provide,
		reactive,
		ref
	} from 'vue'
	import {
		formdata,
		getMomentDetailPage,
		reallove,
	} from '..';
	import {
		getPublicMoments,
		getPrivateMoments,
		getStarMoments,
		getLoveMoments,
	} from '../../../api/user';
	import {
		currentSocket
	} from '../../../socket';
	import {
		toast
	} from '../../../utils';
	import {
		LOVE_MENUS,
		PAGE
	} from '../../../utils/constant';
	import {
		user,
		userinfo
	} from '../../personCenter';

	onMounted(function() {
		// 获取用户信息
		userinfo()
		publicMoments();
	})

	const res = uni.getSystemInfoSync()
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 170 - 400)) //将px 转换rpx
	const menus = LOVE_MENUS
	const grid = ref();
	const public_momentList = reactive([]);


	let pageNum = PAGE.NUM,
		pageSize = PAGE.SIZE;

	const currentIndex = ref(0);


	const UPDATA_DATA_TYPE = {
		APPEND: 'append',
		REPLACE: 'replace'
	}

	function goItemDetail(id) {
		getMomentDetailPage(id)
	}

	function publicMoments(pageNum, pageSize, type) {
		return getPublicMoments(pageNum, pageSize).then(res => {

			if (currentIndex.value != 0) {
				public_momentList.splice(0, public_momentList.length);
			}

			type == UPDATA_DATA_TYPE.APPEND ? public_momentList.splice(public_momentList.length, 0, ...formdata(
					res)) :
				public_momentList.splice(0, public_momentList.length, ...formdata(res));
			return res;
		})
	}

	function privateMoments(pageNum, pageSize, type) {
		return getPrivateMoments(pageNum, pageSize).then(res => {
			if (currentIndex.value != 1) {
				public_momentList.splice(0, public_momentList.length);
			}

			type == UPDATA_DATA_TYPE.APPEND ? public_momentList.splice(public_momentList.length, 0, ...formdata(
					res)) :
				public_momentList.splice(0, public_momentList.length, ...formdata(res));
			return res;
		})
	}

	function starMoments(pageNum, pageSize, type) {
		return getStarMoments(pageNum, pageSize).then(res => {
			if (currentIndex.value != 2) {
				public_momentList.splice(0, public_momentList.length);
			}
			type == UPDATA_DATA_TYPE.APPEND ? public_momentList.splice(public_momentList.length, 0, ...formdata(
					res)) :
				public_momentList.splice(0, public_momentList.length, ...formdata(res));
			return res;
		})
	}

	function loveMoments(pageNum, pageSize, type) {
		return getLoveMoments(pageNum).then(res => {
			if (currentIndex.value != 3) {
				public_momentList.splice(0, public_momentList.length);
			}
			type == UPDATA_DATA_TYPE.APPEND ? public_momentList.splice(public_momentList.length, 0, ...formdata(
					res)) :
				public_momentList.splice(0, public_momentList.length, ...formdata(res));
			return res;
		})
	}

	function choose(index) {
		// 根据不同的index 加载不同的内容区数据
		if (index == 0) publicMoments(pageNum, pageSize, 'replace');
		else if (index == 1) privateMoments(pageNum, pageSize, 'replace');
		else if (index == 2) starMoments(pageNum, pageSize, 'replace');
		else if (index == 3) loveMoments(pageNum, pageSize, 'replace');

		currentIndex.value = index;
	}
	/**
	 *  下拉加载更多
	 */
	function loadmore(e) {
		const index = currentIndex.value;
		// 根据不同的index 加载不同的内容区数据
		pageNum++;
		if (index == 0) publicMoments(pageNum, pageSize, 'append').then(res => res.length == 0 ? pageNum-- && toast(
				"没有更多数据!") : console
			.info("#publicMoments data: ", data))
		else if (index == 1) privateMoments(pageNum, pageSize, 'append').then(res => res.length == 0 ? pageNum-- && toast(
				"没有更多数据!") :
			console
			.info("#publicMoments data: ", data));
		else if (index == 2) starMoments(pageNum, pageSize, 'append').then(res => res.length == 0 ? pageNum-- && toast(
				"没有更多数据!") :
			console
			.info("#starMoments data: ", data));
		else if (index == 3) loveMoments(pageNum, pageSize, 'append').then(res => res.length == 0 ? pageNum-- && toast(
				"没有更多数据!") :
			console
			.info("#loveMoments data: ", data));

		// 告诉加载完毕
		setTimeout(function() {
			grid.value.loadmoreDone()
		}, 300)
	}

	function love(id) {
		const moment = public_momentList.find(item => item.id == id);
		moment && reallove(moment);
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

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


		.nav {
			// height: 500rpx;
		}
	}
</style>