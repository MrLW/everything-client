<template>
	<view class="container">
		<view class="momentDetail">
			<swiper class="swipeList" indicator-color="white" indicator-dots>
				<swiper-item class="swipeItem" v-for="(image, index) in moment.images" :key="index">
					<image :src="image" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view class="title">{{moment.title}}</view>
			<view class="content">{{moment.content}}</view>
		</view>
		<scroll-view class="commentList" scroll-y>
			<view class="commentItem" v-for="comment in commentList" :key="comment.id">
				<view class="portrait">
					<image :src="comment.et_user.avatarUrl" mode=""></image>
				</view>
				<view class="content">
					<text class="nickname">{{ comment.et_user.username }}</text>
					<view class="text">{{comment.content}}</view>
				</view>
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
				<view class="funcItem" @click="love(id, $event)">
					<uni-icons :type="moment.loved ? 'heart-filled': 'heart' " :color="moment.loved ? 'red': 'darkgray'"
						size="30"></uni-icons><text>{{moment.loves}}</text>
				</view>
				<view class="funcItem" @click="star(id)">
					<uni-icons :type="moment.stared ? 'star-filled': 'star' "
						:color="moment.stared ? 'gold': 'darkgray'" class="icons"
						size="30"></uni-icons><text>{{moment.stars}}</text>
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
		reactive,
		ref
	} from 'vue';
	import {
		commentText,
		commentList,
		getMomentById,
		star,
		addComment,
		getCommentListById,
		commentCount,
		reallove,
	} from '../index.js';
	const props = defineProps(["id"]);
	const commentTextRef = ref();
	const moment = reactive({})

	onMounted(async () => {
		getMomentById(props.id).then(res => {
			for (let key in res) {
				moment[key] = res[key]
			}
		})
		getCommentListById(props.id);
	})
	const goChat = () => {
		commentTextRef.value.$el.focus();
	}

	function love() {
		reallove(moment)
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
				height: 800rpx;

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
			margin-top: 30rpx;

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
					justify-content: space-around;
					margin-left: 20rpx;

					.nickname {
						font-size: 26rpx;
						color: darkgray;
					}

					.text {
						font-size: 26rpx;
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