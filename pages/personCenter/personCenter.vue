<template>
	<view class="contaienr">
		<view class="usercontainer">
			<view class="userinfo">
				<view class="avatarUrl" @click="goLogin">
					<view v-if="!user.avatarUrl" class="iconfont icon-morentouxiang1 chooseAvatar"></view>
					<image v-else mode="aspectFit" :src="user.avatarUrl"></image>
				</view>
				<view class="info">
					<text class="username">{{ user.username }}</text>
				</view>
			</view>
			<view class="settingContainer">
				<view class="funset" v-show="user.id">
					<view class="funitem exps">
						<text>{{ user.exps }}</text>
						<text>经验</text>
					</view>
					<view class="funitem subs">
						<text>{{ user.subs }}</text>
						<text>关注</text>
					</view>
					<view class="funitem loves">
						<text>{{ user.loves }}</text>
						<text>收藏</text>
					</view>
				</view>
				<view v-if="user.eid" class="editProfile" @click="goEditUserPage">编辑资料</view>
				<view v-if="user.eid" class="setting" @click="goSetting">
					<text class="iconfont icon-shezhi"></text>
				</view>
			</view>


		</view>
		<view class="servicecontainer">
			<view class="tip">我的服务</view>
			<view class="serviceList">
				<view class="serviceItem" @click="goMessagePage">
					<view class="iconfont icon-xiaoxi"></view>
					<text class="serviceName">我的消息</text>
				</view>
				<view class="serviceItem" @click="goAdvice">
					<view class="iconfont icon-jianyi"></view>
					<text class="serviceName">我的建议</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import '../../socket/index.js'
	import {
		useUserStore
	} from '../../store/user.js';
	import {
		storeToRefs
	} from 'pinia'
	import {
		useAreaStore
	} from '../../store/area.js';

	const userStore = useUserStore()
	const areaStore = useAreaStore()
	const {
		user
	} = storeToRefs(userStore)
	const {
		goLogin,
		goSetting,
		goEditUserPage,
		goAdvice,
		goMessagePage
	} = userStore

	userStore.getUserinfo();
	areaStore.getProvinceList()
</script>

<style lang="scss">
	.contaienr {
		height: 100%;
		padding: 0 20rpx;
		overflow: hidden;

		.usercontainer {
			margin-top: 20rpx;
			height: 300rpx;
			width: 100%;
			background-color: darkgrey;
			border-radius: 10rpx;

			.userinfo {
				margin-left: 30rpx;
				width: 280rpx;
				height: 200rpx;
				display: flex;
				align-items: center;

				.avatarUrl {
					display: flex;
					margin-right: 20rpx;

					.chooseAvatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 120rpx;
						font-size: 120rpx;
						padding: 0;

						.iconfont {
							font-size: 120rpx;
							width: 120rpx;
							height: 120rpx
						}
					}
				}


				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}

				.info {
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.username {
						font-size: 35rpx;
						color: white;
						font-weight: bold;
						color: rgba(255, 255, 255, .8);
					}

					.address {
						font-size: 18rpx;
						color: rgba(255, 255, 255, .8);
					}
				}

			}

			.settingContainer {
				display: flex;
				justify-content: right;
				align-items: center;

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

		.servicecontainer {
			margin-top: 60rpx;


			.serviceList {
				margin-top: 20rpx;

				.serviceItem {
					display: flex;
					height: 120rpx;
					align-items: center;

					.iconfont {
						font-size: 70rpx;
						margin-right: 20rpx;
					}

					.serviceName {
						width: 100%;
						height: 90rpx;
						border-bottom: 1rpx solid darkgrey;
						font-size: 30rpx;
						line-height: 90rpx;
					}

				}
			}
		}

	}
</style>