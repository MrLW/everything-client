<template>
	<view>
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">getuserinfo</button>
	</view>
</template>

<script setup>
	const getuserinfo = (res) => {
		console.log("getuserinfo", res);
	}
</script>

<style>

</style>