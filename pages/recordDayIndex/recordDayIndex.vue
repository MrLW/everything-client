<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true">
			<view class="item" v-for="event in eventCategoryList" @click="goDetail(event)" :key="event.id">
				<text class="iconfont" :class="event.className"></text>
				<view class="eventInfo">
					<text>{{ event.name }}</text>
					<view class="detail">
						<text
							v-if="event.startTime">{{ event.type == 'menses' ? `最近 ${event.startTime}` : `始于${event.startTime}` }}
						</text>
						<text v-else> {{ event.type == 'love' ? '您还未开始恋爱，请继续加油哦~': '您未设置改项'}}</text>
						<text v-if="event.startTime">距今已有{{ event.diffDays }}天啦！</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		addEvent,
		deleteEvent,
		getEventList
	} from '../../api/event';
	import {
		getRecordDayCategoryList
	} from '../../api/recordDayCategory';
	import {
		classNameMap,
		diffDays,
		eventTypeMap,
		toast
	} from '../../utils';

	export default {
		data() {
			return {
				eventCategoryList: [],
			}
		},
		async mounted() {
			const recordDayCategoryList = await getRecordDayCategoryList();

			// 为前端附加个字段
			recordDayCategoryList.forEach(item => item.value = item.type)

			recordDayCategoryList.forEach(item => item.text = item.name);
			this.eventCategoryList.splice(0, 0, ...recordDayCategoryList)
		},
		methods: {
			goDetail(event) {
				if (event.type == 'menses') {
					uni.navigateTo({
						url: "/pages/mensesDetail/mensesDetail"
					})
				} else if (event.type == 'love') {
					uni.navigateTo({
						url: "/pages/loveDetail/loveDetail"
					})
				} else if (event.type == 'marry') {
					uni.navigateTo({
						url: "/pages/marryDetail/marryDetail"
					})
				} else if (event.type == 'birthday') {
					if (!event.startTime) {
						return toast("您还未设置生日");
					}
					uni.navigateTo({
						url: "/pages/birthdayDetail/birthdayDetail?startTime=" + event.startTime
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;

		.list {
			width: 80%;
			// background-color: yellow;
			margin: 0 auto;

			.item {
				height: 120rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.iconfont {
					font-size: 50rpx;
					color: red;
					flex: 1
				}

				.eventInfo {
					flex: 5;
					display: flex;
					flex-direction: column;
				}

				border-bottom: 1rpx solid;

				.detail {
					display: flex;
					font-size: 20rpx;
					color: darkgrey;
				}
			}
		}

		.empty {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-style: italic;
		}

		.popup-content {
			background-color: white;
			margin: 0 auto;
			padding: 14rpx;
			border-radius: 10rpx;

			.formItem {
				border-bottom: 1rpx solid;
				padding-bottom: 10rpx;
			}

			.btn {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				button {
					background-color: #f16c61;
				}
			}
		}
	}
</style>