<template>
	<view class="container">
		<view v-if="activeIndex == 0" class="content">
			<slot name="tab1"> </slot>
		</view>
		<view v-if="activeIndex == 1" class="content">
			<slot name="tab2"> </slot>
		</view>
		<view v-if="activeIndex == 2" class="content">
			<slot name="tab3"> </slot>
		</view>
		<view v-if="activeIndex == 3" class="content">
			<slot name="tab4"></slot>
		</view>
		<view v-if="activeIndex == 4" class="content">
			<slot name="tab5"> </slot>
		</view>
		<view class="btnList">
			<view @click="choose(0)" :class="{ active: activeIndex ==  0 }">首页</view>
			<view @click="choose(1)" :class="{ active: activeIndex ==  1 }">关注</view>
			<view class="center" @click="choose(2)">+</view>
			<view @click="choose(3)" :class="{ active: activeIndex ==  3 }">私聊</view>
			<view @click="choose(4)" :class="{ active: activeIndex ==  4 }">我的</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue'
	// 默认值
	const activeIndex = ref(4);
	const props = defineProps(['choose'])
	const choose = (index) => {
		activeIndex.value = index;
		props.choose && props.choose instanceof Function && props.choose();
	}
	/**
	 *  对外暴漏方法
	 */
	defineExpose({
		choose
	})
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;

		.content {
			// 内容区撑满全屏
			height: 100%;
		}

		.btnList {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			height: 100rpx;
			align-items: center;
			justify-content: space-around;
			background-color: #f6f6f6;
			font-size: 30rpx;

			.center {
				font-size: 40rpx;
				background-color: #f16c61;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				color: white;
				text-align: center;
				line-height: 90rpx;
			}
		}

		.active {
			color: #f16c61;
		}
	}
</style>