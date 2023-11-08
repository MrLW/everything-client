<template>
	<view class="container">
		<view class="avtarUrl" @click="chooseAvatarUrl">
			<image :src="user.avatarUrl" mode=""></image>
			<view class="iconfontView">
				<text class="iconfont icon-xiangji"></text>
			</view>
		</view>
		<view class="userinfo">
			<view class="useritem">
				<view class="label">姓名</view>
				<view @click="showEditUsernamePage">{{ user.username }}</view>
				<text class="iconfont icon-xiangyoujiantou1" @click="showEditUsernamePage"></text>
			</view>
			<view class="useritem">
				<view class="label">EID</view>
				<view @click="showEditEidPage">{{ user.eid }}</view>
				<text class="iconfont icon-xiangyoujiantou1" @click="showEditEidPage"></text>
			</view>
			<view class="useritem">
				<view class="label">性别</view>
				<view>
					<picker :range="sexList" @change="updateUserSex">
						<view class="uni-input">{{ sexList[user.sex]  }}</view>
					</picker>
				</view>
				<text class="iconfont icon-xiangyoujiantou1"></text>
			</view>
			<view class="useritem">
				<view class="label">生日</view>
				<view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="user.birthday" :start="getDate('start')" :end="getDate('end')"
							@change="updateUserBirthday" fields="day">
							<view class="uni-input">
								{{ user.birthday || `${new Date().getFullYear()}-01-01`}}
							</view>
						</picker>
					</view>
				</view>
				<text class="iconfont icon-xiangyoujiantou1"></text>
			</view>
			<view class="useritem">
				<view class="label">简介</view>
				<!-- single-ellipsis -->
				<view class="desc single-ellipsis" @click="showEditDescPage">{{ user.desc }}</view>
				<text class="iconfont icon-xiangyoujiantou1" @click="showEditDescPage"></text>
			</view>
			<view class="useritem">
				<view class="label">地区</view>
				<view>
					<uni-data-picker :localdata="provinceList" popup-title="请选择班级" @change="updateUserArea"
						@nodeclick="onnodeclick" v-model="user.district" :clear-icon="false"></uni-data-picker>
				</view>
				<text class="iconfont icon-xiangyoujiantou1"></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
	} from "vue";
	import {
		provinceList
	} from "../../index/index.js";
	import {
		user,
		chooseAvatarUrl,
		updateUserArea,
	} from '../index.js'
	import {
		showEditDescPage,
		showEditUsernamePage,
		showEditEidPage,
		sexList,
		updateUserSex,
		updateUserBirthday,
	} from '.'
	import {
		updateBirthday
	} from "../../../api/user.js";

	const onnodeclick = () => {}

	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
</script>

<style lang="scss">
	.container {
		padding: 0 16rpx;

		.avtarUrl {
			width: 200rpx;
			height: 200rpx;
			margin: 0 auto;
			margin-top: 30rpx;

			image {
				border-radius: 50%;
				width: 100%;
				height: 100%;
			}

			position: relative;

			.iconfontView {
				background-color: black;
				width: 45rpx;
				height: 45rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				position: absolute;
				right: 0;
				bottom: 0;
				font-size: 40rpx;
				color: white;
			}
		}


		.userinfo {

			.useritem {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;

				.label {
					flex-grow: 1;
				}

				.iconfont {
					margin-left: 10rpx;
				}

				.desc {
					width: 400rpx;
					text-align: right;
				}

				padding: 36rpx 0;
				border-bottom: 1rpx solid darkgrey;
			}
		}
	}
</style>