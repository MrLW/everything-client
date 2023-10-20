<template>
	<view>
		<button class="btn" @click="trigger" :disabled="disabled">{{btnText}}</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const props = defineProps(['sendCode', 'limit']);
	const limit = props.limit || 30;
	let time = ref(limit);
	const btnText = ref('发送')
	const disabled = ref(false)
	let timerId;

	function trigger() {
		btnText.value = `${time.value}s`
		disabled.value = true;
		if (timerId) {
			return;
		}
		timerId = setInterval(function() {

			if (time.value > 0) {
				btnText.value = `${--time.value}s`
			} else {
				btnText.value = '发送'
				time.value = limit;
				disabled.value = false;
				clearInterval(timerId)
			}
		}, 1000)

		props.sendCode()

	}

	function sendCode() {
		console.info(`send code`)
	}
</script>

<style lang="scss">
	.btn {
		width: 120rpx;
		font-size: 30rpx;
	}
</style>