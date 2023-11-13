<template>
	<view class="container">
		<lee-grid ref="grid" @goItemDetail="getMomentDetailPage" :height="height" @loadmore="loadmore" @love="reallove"
			:list="momentList"></lee-grid>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useMomentStore
	} from '../../store/moment';
	import {
		storeToRefs
	} from 'pinia';
	import {
		getMomentDetailPage
	} from '../../utils/page.js';
	const momentStore = useMomentStore()
	const {
		reallove,
		getMomentList,
		getNextPageMomentList,
	} = momentStore;
	const {
		momentList
	} = storeToRefs(momentStore)

	const grid = ref();
	const res = uni.getSystemInfoSync()
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 80 - 100)) //将px 转换rpx

	getMomentList()

	/**
	 *  下拉加载更多
	 */
	function loadmore() {
		getNextPageMomentList().then(() => {
			grid.value.loadmoreDone()
		})
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