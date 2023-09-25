<template>
	<view class="container">
		<view class="header" v-if="false">
			<text>张三 Love 李四 已经 </text>
			<van-rolling-text class="my-rolling-text" :height="54" :start-num="1" :target-num="days" />
			<text>天啦~</text>
		</view>
		<scroll-view class="main" scroll-y>
			<view class="cardList">
				<view class="cardItem" v-for="item in momentList" @click="getMomentDetailPage(item.id)">
					<uni-card is-shadow>
						<image slot='cover' :src="item.cover" model="widthFix">
						</image>
						<van-text-ellipsis :content="item.title"
							style="border-bottom: 1rpx solid darkgray;padding-bottom: 12rpx;" />
						<template v-slot:actions>
							<view class="card-actions">
								<view class="card-actions-item portrait">
									<van-image width="20" height="20" round
										src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
								</view>
								<view class="card-actions-item" @click="love(item.id, $event, 'list')">
									<!-- TODO 待处理 -->
									<uni-icons :type="item.loves >= 10 ? 'heart-filled': 'heart' " size="18"
										:color="item.loves >= 10 ? 'red': 'darkgray'"></uni-icons>
									<text>{{ item.loves}}</text>
								</view>
							</view>
						</template>
					</uni-card>
				</view>
			</view>
		</scroll-view>
		<view>
			<button class="plusBtn" @click="goCreateMomentPage">+</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {
		onShow,
	} from "@dcloudio/uni-app"
	import {
		getMomentDetailPage,
		goCreateMomentPage,
		momentList,
		getNewMomentList,
		love
	} from './index.js'
	const days = ref(100)

	onShow(() => {
		getNewMomentList()
	})
</script>

<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.header {
			background-color: rgb(15, 135, 233);
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 10rpx;
			font-size: 30rpx;
			font-weight: bold;
			/* background-color: yellow; */

			.my-rolling-text {
				--van-rolling-text-background: #f16c61;
				--van-rolling-text-color: white;
				--van-rolling-text-font-size: 24px;
				--van-rolling-text-gap: 6px;
				--van-rolling-text-item-border-radius: 5px;
				--van-rolling-text-item-width: 40px;
			}

			flex: 1;
		}

		.main {
			flex: 8;
			height: 100%;

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

					.card-actions {
						display: flex;
						height: 40rpx;
						justify-content: space-between;

						.card-actions-item {
							width: 100%;
							flex: 1;
							text-align: center;
							display: flex;
							justify-content: right;
							align-items: center;

							text {
								margin-left: 6rpx;
							}

							padding: 0 16rpx;
							padding-bottom: 10rpx;
						}

						.portrait {
							justify-content: left;
						}
					}
				}
			}


		}

		.plusBtn {
			position: fixed;
			bottom: 10rpx;
			left: 43%;
			background-color: #f16c61;
			border-radius: 50%;
			width: 100rpx;
			height: 100rpx;
			color: white;
			font-size: 50rpx;
			text-align: center;
			line-height: 100rpx;
			margin-bottom: 0rpx;
			flex: 1;
		}

	}
</style>