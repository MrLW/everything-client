<template>
	<view class="container">
		<van-steps class="stepList" :active="active" active-icon="success" active-color="#07c160" direction="vertical">
		  <van-step class="stepItem" v-for="item in mensesList">{{item.startTime}}</van-step>
		</van-steps>


	</view>
</template>

<script setup>
	import {
		getMensesList
	} from '@/api/event.js'
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	const mensesList = reactive([])
	getMensesList().then(data => {
		mensesList.splice(0,0,...data);
	})
</script>

<style lang="scss">
.container {
	height: 100%;
	// background-color: darkgray;
	.stepList {
		width: 60%;
		margin: 0 auto;
		.stepItem {
			font-size: 30rpx;
			padding: 30rpx 0;
			// background-color: yellow;
		}
	}
}
</style>