<template>
	<view class="container">
		<view class="momentDetail">
			<van-swipe class="swipeList" indicator-color="white">
				<van-swipe-item class="swipeItem" v-for="image in  currentMoment.images">
					<image :src="image" mode="aspectFit"></image>
				</van-swipe-item>
			</van-swipe>
			<view class="title">{{currentMoment.title}}</view>
			<view class="content">{{currentMoment.content}}</view>
		</view>

		<view class="commentList">

		</view>

		<view class="commentInfo">
			<view class="comment">
				<van-field v-model="value" placeholder="留下你的想法..." class="commentText" />
			</view>
			<view class="funcs">
				<view class="funcItem" @click="love(id, $event, 'detail')">
					<uni-icons :type="currentMoment.loves >= 10 ? 'heart-filled': 'heart' "
						:color="currentMoment.loves >= 10 ? 'red': 'darkgray'"
						size="30"></uni-icons><text>{{currentMoment.loves}}</text>
				</view>
				<view class="funcItem" @click="star(id)">
					<uni-icons class="icons" type="star" size="30"></uni-icons><text>{{currentMoment.stars}}</text>
				</view>
				<view class="funcItem">
					<uni-icons class="icons" type="chat" size="30"></uni-icons><text>111</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted
	} from 'vue';
	import {
		getMomentById,
		currentMoment,
		love,
		star,
	} from '../index.js';
	const props = defineProps(["id"]);

	onMounted(async () => {
		const res = await getMomentById(props.id);
		currentMoment.value = res;
	})
</script>

<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.momentDetail {
			.swipeList {
				.swipeItem {
					image {
						width: 100%;
						height: 800rpx;
					}
				}
			}

			.title {
				font-size: 50rpx;
				margin: 20rpx;
			}

			.content {
				font-size: 30rpx;
				margin: 0 20rpx;
			}
		}


		.commentInfo {
			margin: 0 20rpx;
			margin-bottom: 50rpx;
			display: flex;
			justify-content: space-between;

			.funcs {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 50%;

				.funcItem {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
				}

				// .icons {
				// 	margin: 0 10rpx;
				// 	font-size: 10000rpx;
				// }
			}

			.comment {
				width: 50%;

				.commentText {
					background-color: #f6f6f6;
					border-radius: 40rpx;
				}
			}
		}
	}
</style>