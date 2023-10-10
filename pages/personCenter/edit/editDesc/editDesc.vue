<template>
	<view class="container">
		<textarea class="desc" name="desc" id="" cols="30" rows="10" v-model="user.desc"></textarea>
		<view class="menuBtn">
			<view class="confirm" @click="saveDesc()">保存</view>
		</view>
	</view>
</template>

<script setup>
	import {
		saveDesc,
	} from '.';
	import {
		user,
	} from '../..';
</script>

<style lang="scss">
	.container {
		height: 100%;
		background-color: #f6f6f6;
		overflow: hidden;

		.menuBtn {
			margin: 0 40rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: right;

			.cancel {
				color: rgba(0, 0, 0, .5);
			}

			.confirm {
				color: rgba(255, 0, 0, .5);
			}
		}

		.desc {
			background-color: white;
			margin: 0 auto;
			margin-top: 20rpx;
			padding: 30rpx;
			border-radius: 20rpx;
		}
	}
</style>