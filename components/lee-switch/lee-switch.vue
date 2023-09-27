<template>
	<view>
		<text class="switch" @click="changeSwitch" :style="{'background-color': bgc}">
			<text class="inner" :style="{ 'margin-left': (isSwitch ? '60': '0') + 'rpx' }"></text>
		</text>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		useAttrs
	} from 'vue'
	const props = defineProps(['modelValue', 'color'])
	const emit = defineEmits(['change'])

	const isSwitch = ref(props.modelValue);

	const switchOnColor = props['color'],
		switchOffColor = 'darkgrey';
	const bgc = computed(() => isSwitch.value ? switchOnColor : switchOffColor);
	const changeSwitch = () => {
		isSwitch.value = !isSwitch.value;
		// update:modelValue 这个事件是v-model系统注册的, 不用手动注册
		emit('update:modelValue', isSwitch.value);
	}
</script>

<style lang="scss">
	.switch {
		display: block;
		width: 120rpx;
		height: 70rpx;
		border-radius: 60rpx;
		display: flex;
		align-items: center;
		transition: all .5s;

		.inner {
			width: 60rpx;
			height: 60rpx;
			background-color: white;
			display: block;
			border-radius: 50%;
			// 设置过渡
			transition: all .5s;
		}
	}

	.switch-on {}
</style>