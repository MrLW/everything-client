<template>
	<view class="container">
		<lee-grid ref="grid" @goItemDetail="getMomentDetailPage" :height="height" @loadmore="loadmore" @love="love"
			:list="public_momentList"></lee-grid>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {
		getRecordDayLoveMoment
	} from '../../api/recordDay.js';
	import {
		toast
	} from '../../utils/index.js';

	import {
		getMomentDetailPage,
		goCreateMomentPage,
		formdata,
		reallove
	} from './index.js'

	const grid = ref();
	let pageNum = 1,
		pageSize = 8;
	const public_momentList = reactive([]);
	const res = uni.getSystemInfoSync()
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 80 - 100)) //将px 转换rpx

	onMounted(function() {
		getMomentList()
	})

	/**
	 *  下拉加载更多
	 */
	const loadmore = (e) => {
		pageNum++;
		getRecordDayLoveMoment(pageNum, pageSize).then(res => {
			grid.value.loadmoreDone()
			if (res.length == 0) {
				return toast("没有更多数据了")
			}
			public_momentList.splice(public_momentList.length, 0, ...formdata(res))
		})
	}

	/**
	 *  获取瞬间列表
	 */
	function getMomentList() {
		getRecordDayLoveMoment(pageNum, pageSize).then(res => {
			public_momentList.splice(0, 0, ...formdata(res))
		})
	}

	function love(id) {
		const moment = public_momentList.find(item => item.id == id);
		moment && reallove(moment);
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.main {
			height: 1500rpx;

			.cardList {
				display: flex;
				flex-wrap: wrap;
				justify-content: left;

				.cardItem {
					// 最大为375, 否则会换行
					width: 375rpx;

					image {
						width: 100%;
						height: 240rpx;
						border-radius: 4rpx;
					}

					.title {
						border-bottom: 1rpx solid darkgray;
						padding-bottom: 12rpx;
						// 单行文本省略号固定写法
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}

					.userInfo {
						margin-top: 10rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 60rpx;

						.info {
							display: flex;
							align-items: center;
							justify-content: space-around;

							image {
								width: 40rpx;
								height: 40rpx;
								border-radius: 50%;
							}

							.nickname {
								font-size: 20rpx;
								margin-left: 10rpx;
							}
						}

						.love {
							display: flex;
							align-items: center;
						}
					}
				}
			}


		}
	}
</style>