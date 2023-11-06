<template>
	<view class="container">
		<lee-grid ref="grid" @goItemDetail="getMomentDetailPage" :height="height"></lee-grid>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'

	import {
		getMomentDetailPage,
		goCreateMomentPage,
		getNewMomentList,
		love,
		scrolltolower,
	} from './index.js'
	const days = ref(100)
	const grid = ref();
	getNewMomentList().then(res => {
		syncData(res);
	})
	const res = uni.getSystemInfoSync()
	console.info("res.screenHeight: ", res.screenHeight)
	console.info("res.windowHeight: ", res.windowHeight)
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 80 - 100)) //将px 转换rpx


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