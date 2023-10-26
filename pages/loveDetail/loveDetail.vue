<template>
	<view>
		<lee-tabbar ref="tabbar">
			<template v-slot:tab1>
				<view>
					<home></home>
				</view>
			</template>
			<template v-slot:tab2>
				<view>关注</view>
			</template>
			<template v-slot:tab3>
				<view>
					<create-moment @goHome="goHome"></create-moment>
				</view>
			</template>
			<template v-slot:tab4>
				<view>私聊</view>
			</template>
			<template v-slot:tab5>
				<view>wo
				</view>
			</template>
		</lee-tabbar>
	</view>
</template>

<script setup>
	import home from './home.vue';
	import createMoment from './createMoment/createMoment.vue';
	import {
		ref
	} from 'vue'
	const tabbar = ref()

	function goHome() {
		console.log("####goHome")
		tabbar.value.choose(0)
	}
</script>

<style>

</style>