<template>
	<Transition name="slide-fade">
		<view class="bgWord" v-if="show">2月</view>
	</Transition>
	<button @click="show=!show">toogle</button>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	var show = ref(true)
</script>

<style>
	/*
	  进入和离开动画可以使用不同
	  持续时间和速度曲线。
	*/
	.slide-fade-enter-active,
	.slide-fade-leave-active {
		transition: all 2s linear;
	}


	.slide-fade-enter-from,
	.slide-fade-leave-to {
		opacity: 0;
		width: 0;
		transform: translateX(100rpx);
	}

	.slide-fade-enter-to,
	.slide-fade-leave-from {
		opacity: .4;
		width: 500rpx;
	}


	.bgWord {
		width: 500rpx;
		height: 500rpx;
		background-color: yellowgreen;
	}
</style>