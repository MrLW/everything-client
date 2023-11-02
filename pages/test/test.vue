<template>
	<view>

		<!-- <view class="box1" @click.capture="test1">
			<view class="box2" @click="test2"></view>
		</view> -->

		<!-- <mybutton id="test" name="123" :test="123"></mybutton> -->
		<!-- <button open-type="getUserInfo" @getuserinfo="getuserinfo">getuserinfo</button> -->

		<scrollview></scrollview>
	</view>
</template>

<script setup>
	import mybutton from './mybutton.vue'
	import scrollview from './scrollview.vue'
	const getuserinfo = (res) => {
		console.log("getuserinfo", res);
	}

	function test1() {
		console.log('#parent');
	}

	function test2() {
		console.log('#child');
	}
</script>

<style lang="scss">
	.box1 {
		width: 100px;
		height: 100px;
		background-color: yellow;

		.box2 {
			width: 50px;
			height: 50px;
			background-color: yellowgreen;
		}
	}
</style>