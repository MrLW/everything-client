<template>
	<!-- 横向滚动时, 需要使用block 标签 -->
	<view class="container">
		<scroll-view class="scrollview" scroll-x="true" enable-flex>
			<block v-for="item in persons" :key="item.id">
				<view class="item">
					<image :src="item.avatarUrl" class="avatar"></image>
				</view>
			</block>
		</scroll-view>
		<lee-grid :height="height" ref="grid" @goItemDetail="goItemDetail" :list="public_momentList"></lee-grid>
	</view>

</template>
<script setup>
	import {
		ref
	} from 'vue'

	import {
		getContacts,
		getFriendMoments
	} from '../../../api/user';
	import {
		reactive
	} from 'vue'
	import {
		getMomentDetailPage
	} from '../../../utils/page';
	const persons = ref([]);
	const grid = ref()
	const public_momentList = reactive([]);
	// 获取联系人列表
	getContacts().then(res => {
		if (res.length == 0) return res;
		persons.value.splice(0, persons.value.length, ...res);
		getFriendMoments(res[0].id).then(res => {
			public_momentList.splice(0, public_momentList.length, ...formdata(res));
		})
	})
	const res = uni.getSystemInfoSync()
	const height = ref(((res.screenHeight * (750 / res.windowWidth)) - 80 - 100 - 150))


	function goItemDetail(id) {
		getMomentDetailPage(id)
	}
</script>
<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		.scrollview {
			white-space: nowrap;
			height: 150rpx;
			border-bottom: 1rpx solid darkgrey;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			.item {
				margin-top: 15rpx;
				display: inline-flex;
				box-sizing: border-box;
				background-color: darkgrey;
				border-radius: 50%;
				padding: 5rpx;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}

				margin-right: 15rpx;
			}
		}



	}
</style>