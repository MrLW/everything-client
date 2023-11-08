<template>
	<view class="container">
		<scroll-view @scrolltolower="scrolltolower" class="main" scroll-y :style="{height: height + 'rpx'}">

			<view class="cardList" v-if="list.length > 0" :style="{height: height + 'rpx'}">
				<view class="cardItem" v-for="item in list" @click="goItemDetail(item.id)" :key="item.id">
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
							<view class="love" @click.stop="love(item)">
								<uni-icons :type="item.loved ? 'heart-filled': 'heart' " size="20"
									:color="item.loved ? 'red': 'darkgray'"></uni-icons>
								<text>{{ item.loves}}</text>
							</view>
						</view>
					</uni-card>
				</view>

				<view class="cardItem" v-if="list.length % 2 == 1"></view>
				<view class="iconfont icon-jiazaizhong" v-if="loading"></view>
			</view>


			<view v-if="list.length == 0" class="nodata">
				<text class="iconfont icon-meiyoushuju"></text>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		inject,
		nextTick,
		onMounted,
		provide,
		reactive,
		ref
	} from 'vue'
	import {
		serialize,
		toast
	} from '../../utils';
	const {
		height
	} = defineProps(['height', 'list']);
	const data = ref([])
	const emit = defineEmits(['goItemDetail', 'loadmore', 'love'])
	const loading = ref(false);
	const UPDATA_DATA_TYPE = {
		APPEND: 'append',
		REPLACE: 'replace'
	}

	function goItemDetail(id) {
		emit('goItemDetail', id)
	}

	function love(item) {
		emit('love', item.id);
	}

	function loadmore() {
		if (loading.value) return;
		loading.value = true;
		emit('loadmore')
	}

	function loadmoreDone() {
		loading.value = false;
	}

	function scrolltolower() {
		loadmore()
	}


	/**
	 * 更新内容区数据
	 * @param {Object} items
	 * param {Object} type append: 追加(默认值)； replace: 替换
	 */
	function updateData(items, type = 'append') {
		if (type == UPDATA_DATA_TYPE.APPEND) {
			data.value.splice(data.value.length, 0, ...items)
		} else if (type == UPDATA_DATA_TYPE.REPLACE) {
			data.value.splice(0, data.value.length, ...items);
		} else {
			throw new Error(`error param : type, only support append or replace`);
		}
	}

	// 处理数据并同步数据到grid 组件
	function syncData(res, type) {
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
		updateData(data, type)
		if (res.length == 0) {
			console.log("#lee-grid.syncData", 'no more data');
			return;
		}
	}


	defineExpose({
		updateData,
		syncData,
		loadmoreDone
	})
</script>

<style lang="scss">
	.container {
		// height: 100%;
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
						box-sizing: border-box;
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

				.icon-jiazaizhong {
					font-size: 50rpx;
					margin: 0 auto;
					width: 50rpx;
					height: 50rpx;
					animation: spin 1s linear infinite;
					box-sizing: border-box;
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



	// 定义关键帧
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>