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
		<van-divider />
		<scroll-view class="commentList" scroll-y>
			<view class="commentItem" v-for="comment in commentList">
				<view class="portrait">
					<image src="../../../static/logo.png" mode=""></image>
				</view>
				<view class="content">
					<text class="nickname">情感与理智</text>
					<view class="text">{{comment.content}}</view>
				</view>
				<van-divider />
			</view>
			<view class="end">
				- THE END -
			</view>
		</scroll-view>
		<view class="commentInfo">
			<view class="comment">
				<form action="#">
					<input type="text" class="commentText" placeholder="留下你的想法..." @keyup.enter="addComment(id)"
						ref="commentTextRef" confirm-type="send" @confirm="addComment(id)" v-model="commentText" />
				</form>
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
				<view class="funcItem" @click="goChat">
					<uni-icons class="icons" type="chat" size="30"></uni-icons><text>{{commentCount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		commentText,
		commentList,
		getMomentById,
		currentMoment,
		love,
		star,
		addComment,
		getCommentListById,
		commentCount,
	} from '../index.js';
	const props = defineProps(["id"]);
	const commentTextRef = ref();

	onMounted(async () => {
		getMomentById(props.id);
		getCommentListById(props.id);
	})
	const goChat = () => {
		console.log("#goChat");
		commentTextRef.value.$el.focus();
	}
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


		.commentList {
			// padding: 0 20rpx;

			.commentItem {
				display: flex;
				height: 90rpx;
				margin: 20rpx 20rpx;
				padding-bottom: 15rpx;
				border-bottom: 1rpx solid black;

				.portrait {
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

				}

				.content {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;

					.nickname {
						font-size: 30rpx;
						color: darkgray;
					}

					.text {
						font-size: 32rpx;
					}
				}
			}


			.end {
				height: 400rpx;
				text-align: center;
				font-size: 20rpx;
				color: darkgrey;
				margin-top: 20rpx
			}
		}



		.commentInfo {
			background-color: white;
			border-top: 1rpx solid black;
			bottom: 0;
			position: fixed;
			width: 90%;
			height: 70rpx;
			padding: 30rpx;

			display: flex;
			align-items: center;
			justify-content: space-between;

			.funcs {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 40%;

				.funcItem {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
				}
			}

			.comment {
				width: 60%;

				.commentText {
					height: 70rpx;
					background-color: #f6f6f6;
					border-radius: 30rpx;
					padding: 10rpx;
				}
			}
		}
	}
</style>