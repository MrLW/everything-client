<template>
	<view>
		<view class="navlist">
			<view @click="choose(index)" class="navitem" v-for="(item, index) in menus"
				:class="{ active: activeIndex == index }" :key="item.id">
				{{ item.name }}
			</view>
		</view>
		<view class="content">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const {
		menus
	} = defineProps(['menus'])
	const activeIndex = ref(0);
	const emit = defineEmits(['choose'])

	function choose(index) {
		if (index >= menus.length) throw new Error('index 不可以 大于menus的长度');
		activeIndex.value = index;
		emit('choose', index);
	}
</script>

<style lang="scss">
	.navlist {
		display: flex;
		font-size: 40rpx;
		justify-content: space-evenly;

		.navitem {
			width: 25%;
			text-align: center;
			padding: 8rpx 0;
		}

		.active {
			border-bottom: 3rpx solid black;
		}
	}
</style>