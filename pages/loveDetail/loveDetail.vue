<template>
	<view class="container">
		<lee-tabbar ref="tabbar">
			<template v-slot:tab1>
				<home></home>
			</template>
			<template v-slot:tab2>
				<subscribe></subscribe>
			</template>
			<template v-slot:tab3>
				<create-moment @goHome="goHome"></create-moment>
			</template>
			<template v-slot:tab4>
				<private-chat></private-chat>
			</template>
			<template v-slot:tab5>
				<my></my>
			</template>
		</lee-tabbar>
	</view>
</template>

<script setup>
	import home from './home.vue';
	import createMoment from './createMoment/createMoment.vue';
	import privateChat from './privateChat/privateChat.vue';
	import my from './my/my.vue'
	import subscribe from './subscribe/index.vue'
	import {
		ref
	} from 'vue'
	const tabbar = ref()

	function goHome() {
		tabbar.value.choose(0)
	}
</script>

<style lang="scss">
	.container {
		height: calc(100vh - 170rpx);
	}
</style>