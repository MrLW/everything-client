<template>
	<view class="container">
		<input class="eid" type="text" name="eid" placeholder="最长16个字符" maxlength="16" v-model="user.eid">
		<view class="menuBtn">
			<view class="confirm" @click="saveEid">保存</view>
		</view>
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	
	import { useUserStore } from '../../../../store/user';

	const userStore = useUserStore()
	const { saveEid } =  userStore
	const { user } = storeToRefs(userStore)

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

		.eid {
			background-color: white;
			margin: 0 40rpx;
			margin-top: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
		}
	}
</style>