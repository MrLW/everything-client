<template>
	<view class="container">
		<view class="list" v-if="mensesList.length > 0">
			<view class="item" v-for="item in mensesList" :key="item.id">
				<image :src="item.avatarUrl" class="avatarUrl"></image>
				<view class="time">
					<text class="startTime">{{ item.startTime}}</text>
					<text class="diffDays"> {{item.diffDays ? "距离上次来姨妈有" + item.diffDays + "天啦": "您的第一次记录姨妈"}} ~</text>
				</view>
			</view>
		</view>
		<view v-else class="empty">
			<text class="iconfont icon-meiyoushuju"></text>
		</view>
		<uni-popup ref="popup">
			<view class="popup-content">
				<uni-forms ref="form" :rules="rules" :modelValue="eventItem">
					<uni-forms-item label="时间" required class="formItem" name="startTime">
						<uni-datetime-picker type="date" return-type="string" v-model="eventItem.startTime" />
					</uni-forms-item>
					<uni-forms-item label="备注" class="formItem" name="remark">
						<uni-easyinput placeholder="最多10个字" v-model="eventItem.remark" maxlength="10"
							:clearable="false" />
					</uni-forms-item>
					<view class="btn">
						<button type="default" size="mini" @click="submit(form)">提交</button>
						<button type="default" size="mini" @click="reset">重置</button>
					</view>
				</uni-forms>
			</view>
		</uni-popup>
		<!-- 悬浮按钮 -->
		<uni-fab ref="fab" :pattern="FAB_PATTERN" horizontal="right" @fabClick="showModePage('center')"></uni-fab>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		FAB_PATTERN
	} from '../../utils/constant.js';
	import {
		user
	} from '../personCenter/index.js'
	import {
		getAllMenses,
		mensesList,
		submit,
		rules,
		reset,
		eventItem
	} from './index'
	const popup = ref();
	const form = ref();

	function showModePage(type) {
		popup.value.open(type);
	}
	getAllMenses()
</script>

<style lang="scss">
	.container {
		height: 100%;

		.list {
			padding: 10rpx;

			.item {
				width: 100%;
				height: 100rpx;
				margin-bottom: 10rpx;
				font-size: 30rpx;
				border-bottom: 1rpx solid darkgray;
				display: flex;
				padding: 20rpx;
				align-items: center;

				.avatarUrl {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.time {
					// background-color: red;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.startTime {
						font-size: 30rpx;
					}

					.diffDays {
						font-size: 22rpx;
					}
				}

			}
		}

		.empty {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 400rpx;

			.iconfont {
				font-size: 100rpx;
			}
		}

		.popup-content {
			background-color: white;
			margin: 0 auto;
			padding: 14rpx;
			border-radius: 10rpx;

			.formItem {
				border-bottom: 1rpx solid;
				padding-bottom: 10rpx;
			}

			.btn {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				button {
					background-color: #f16c61;
				}
			}
		}
	}
</style>