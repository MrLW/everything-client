<template>
	<view class="container">
		<scroll-view class="main" scroll-y :style="{height: height + 'rpx'}">
			<view class="cardList" v-if="data.length > 0">
				<view class="cardItem" v-for="item in data" @click="goItemDetail(item.id)" :key="item.id">
					<uni-card is-shadow>
						<image class="cover" :src="item.cover" model="widthFix"></image>
						<view class="title">
							{{item.title}}
						</view>
						<view class="userInfo">
							<view class="info">
								<image :src="item.user.avatarUrl" />
								<view class="nickname">{{ item.user.username}}</view>
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
			<view v-if="data.length == 0" class="nodata">
				<text class="iconfont icon-meiyoushuju"></text>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {
		serialize
	} from '../../utils';
	const {
		height
	} = defineProps(['height']);
	const data = ref([])
	const emit = defineEmits(['goItemDetail'])

	function goItemDetail(id) {
		emit('goItemDetail', id)
	}

	/**
	 * 更新内容区数据
	 * @param {Object} items
	 */
	function updateData(items) {
		data.value.splice(0, data.value.length, ...items);
	}
	defineExpose({
		updateData
	})
</script>

<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.main {
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


			.nodata {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.iconfont {
					font-size: 100rpx;
				}
			}
		}
	}
</style>