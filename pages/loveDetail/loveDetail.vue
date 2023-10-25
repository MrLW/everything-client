<template>
	<view>
		<lee-tabbar>
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
					<create-moment></create-moment>
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

	const choose = () => {
		console.log("~~~")
	}
</script>

<style>

</style>