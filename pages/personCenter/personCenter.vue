<template>
	<view>
		<button @click="login">登录</button>
	</view>
</template>

<script setup>
	const success = (res) => {
		console.log("chooseImage~", res);
	}
	const fail = (err) => {
		console.log("#err: ", err)
	}

	const login = () => {
		uni.login({
			provider: 'weixin',
			success(res) {
				const {
					code
				} = res;

			},
			fail(err) {
				console.log('#err', err);
			}
		})
	}
</script>

<style>

</style>