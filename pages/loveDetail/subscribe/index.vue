<template>
	<scroll-view class="scrollview" scroll-x="true">
		<!-- 横向滚动时, 需要使用block 标签 -->
		<block v-for="item in persons" :key="item.id">
			<view class="item">
				<image :src="item.avatarUrl" class="avatar"></image>
			</view>
		</block>
	</scroll-view>

	<lee-grid :height="height" ref="grid" @goItemDetail="goItemDetail"></lee-grid>

</template>
<script setup>
	import {
		ref
	} from 'vue'
	import {
		getMomentDetailPage
	} from '..';
	import {
		getContacts,
		getFriendMoments
	} from '../../../api/user';
	const persons = ref([]);
	const grid = ref()
	// 获取联系人列表
	getContacts().then(res => {
		persons.value.splice(0, persons.value.length, ...res);
		getFriendMoments(res[0].id).then(res => {
			grid.value.syncData(res)
		})
	})
	const res = uni.getSystemInfoSync()
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 170 - 200))


	function goItemDetail(id) {
		getMomentDetailPage(id)
	}
</script>
<style lang="scss">
	.scrollview {
		white-space: nowrap;
		height: 200rpx;
		margin-top: 25rpx;
		border-bottom: 1rpx solid darkgrey;

		.item {
			width: 150rpx;
			height: 150rpx;
			display: inline-flex;

			.avatar {
				background-color: darkgrey;
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}

			margin-right: 15rpx;
		}
	}
</style>