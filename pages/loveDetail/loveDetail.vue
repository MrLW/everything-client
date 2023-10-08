<template>
	<view class="container">
		<scroll-view class="main" scroll-y>
			<view class="cardList">
				<view class="cardItem" v-for="item in momentList" @click="getMomentDetailPage(item.id)" :key="item.id">
					<uni-card is-shadow>
						<image class="cover" :src="item.cover" model="widthFix"></image>
						<view class="title">
							{{item.title}}
						</view>
						<view class="userInfo">
							<view class="info">
								<image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
								<view class="nickname">张三</view>
							</view>
							<view class="love" @click.stop="love(item.id, $event)">
								<uni-icons :type="item.loved ? 'heart-filled': 'heart' " size="20"
									:color="item.loved ? 'red': 'darkgray'"></uni-icons>
								<text>{{ item.loves}}</text>
							</view>
						</view>
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
		momentList,
		getMomentDetailPage,
		goCreateMomentPage,
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