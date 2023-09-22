<template>
	<view class="container">

		<van-field v-model="goalAge" name="用户名" placeholder="请输入你想活到多少岁"
			:rules="[{ required: true, message: '请输入你想活到多少岁' }]" input-align="center" type="number" />

		<view class="startTime">
			你好，你在<text class="bigFont">{{startTime}}</text>这一天出生
		</view>

		<view class="birthday">在这个世界已经<text class="bigFont">{{days}}</text>天</view>
		<view class="birthday"> <text class="bigFont">{{ hours }}</text>小时了</view>
		<view class="remain">
			<view class="years100">如果你活到<text class="bigFont">{{ goalAge}}</text>岁,那么你距离死亡还有</view>
			<view class="">
				<text class="bigFont">{{days100}}</text>天，即<text class="bigFont">{{ hours100}}</text>小时
			</view>
		</view>

		<view class="countDown">
			<view class="">生命卡倒计时：</view>
			<van-count-down class="time bigFont" :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
		</view>
		<view class="warn">
			生命诚可贵, 请你珍惜你现在的时间!
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue'
	import {
		diffHours,
		diffDays
	} from '../../utils';

	let a = ref(0)
	let b = ref(a.value + 1)

	// 目标年龄
	const goalAge = ref(100);


	const props = defineProps(['startTime']);
	// 出生年龄
	let startTime = props.startTime;
	// 死亡年龄 
	let deathTime = computed(() => ~~new Date(startTime).getFullYear() + (~~goalAge.value));

	// 计算 已存在的天数和小时
	const days = ref(diffDays(props.startTime, new Date()));
	const hours = ref(diffHours(props.startTime, new Date()));
	// 计算还剩的天数和小时
	const days100 = computed(() => diffDays(new Date(), deathTime.value));
	const hours100 = computed(() => diffHours(new Date(), deathTime.value));

	let seconds = computed(() => hours100.value * 60 * 60);


	// 计算倒计时
	const time = computed(() => hours100.value * 60 * 60 * 1000);
</script>

<style lang="scss">
	.container {
		// background-color: yellowgreen;
		height: 100%;
		// 清除浮动
		overflow: hidden;
		
		.bigFont{
			font-size: 40rpx;
		}

		.startTime {
			height: 80rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 30rpx;
		}

		.birthday {
			font-size: 30rpx;
			text-align: center;
			margin-top: 40rpx;
		}

		.remain {
			display: flex;
			flex-direction: column;
			// background-color: yellow;
			height: 180rpx;
			justify-content: center;
			align-items: center;

			view {
				padding: 6rpx;
				font-size: 30rpx;
			}
		}

		.warn {
			height: 60rpx;
			font-size: 30rpx;
			padding: 10rpx;
			text-align: center;
		}

		.countDown {
			// background-color: skyblue;
			display: flex;
			height: 100rpx;
			justify-content: center;
			align-items: center;
			// background-color: red;
			font-size: 30rpx;

			.time {}
		}
	}
</style>