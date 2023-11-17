<template>
	<view class="container" v-if="isShow">
		<view class="background">
		</view>
		<view class="bgWord">{{ month }}月</view>
		<view class="calendar" @touchstart="startMove" @touchmove="moving" @touchend="endMove">
			<view class="header">
				<view class="day" v-for="(header, index) in headers">{{ header }}</view>
			</view>
			<view class="data">
				<view class="currentDaysV2">
					<view class="col" v-for="row in daysv2"
						:style="{ transform: `translateX(${ position - totalWidth }rpx)`,transition: `${distanceTransition}` }">
						<view class="day" v-for="day in row" :class="{disable: !day.enable, active: day.isActive }"
							@click="selectDay(day.year, day.month, day.day)">
							<view class="dayDetail">
								<view class="yang">
									{{ day.day }}
								</view>
								<view class="ying">
									{{ day.lunar }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		ref
	} from 'vue'
	import {
		Lunar,
	} from 'lunar-javascript'
	const emit = defineEmits(['selectDay'])
	const isShow = ref(true);
	const headers = ref(['一', '二', '三', '四', '五', '六', '日'])
	const daysv2 = ref([])

	const distanceTransition = ref('');
	const year = ref(2023);
	const month = ref(7);
	const day = 14;

	// 每列的宽度
	const cellWidth = 80;
	// 日历的总宽度
	const totalWidth = cellWidth * 7;

	/**
	 * 获取某个月的在日历上展示的所有日子
	 * @param {Object} year 年
	 * @param {Object} month 月
	 */
	function getDaysByMonth(year, month) {
		const res = []
		const date = new Date(year, month, 0);
		const maxDays = date.getDate();
		for (let i = 1; i <= maxDays; i++) {
			const d = new Date(`${year}-${month > 9 ? month: `0${month}`}-${i > 9 ? i : `0${i}`}`);
			res.push({
				year: year,
				month: month,
				day: i,
				weekday: d.getDay(),
				lunar: Lunar.fromDate(d).getDayInChinese(),
				enable: true,
				isActive: i == day,
			})

		}
		// 2. 获取当前月份应该会显示上个月月底的几个日子
		let preMonth = month - 1,
			preYear = year;
		if (month <= 1) {
			preYear = year - 1;
			preMonth = 12;
		}
		const preNums = (res[0].weekday || 7) - 1;

		const preDate = new Date(preYear, preMonth, 0)
		const preMaxDays = preDate.getDate();
		for (let i = preMaxDays; preNums >= 1 && i > preMaxDays - preNums; i--) {
			const d = new Date(`${year}-${preMonth > 9 ? preMonth: `0${preMonth}`}-${i > 9 ? i : `0${i}`}`);
			res.unshift({
				year: preYear,
				month: preMonth,
				day: i,
				weekday: d.getDay(),
				lunar: Lunar.fromDate(d).getDayInChinese(),
				enable: false,
				isActive: false,
			})
		}
		// 3. 获取当前月份应该会显示下个月月初的几个日子
		let nextMonth, nextYear = year;
		if (month < 12) {
			nextMonth = month + 1;
		} else {
			nextYear = year + 1;
			nextMonth = 1;
		}
		const nextNums = res[res.length - 1].weekday > 0 ? 7 - res[res.length - 1].weekday : 0;
		for (let i = 1; i <= nextNums; i++) {
			const d = new Date(`${year}-${nextMonth > 9 ? nextMonth: `0${nextMonth}`}-${i > 9 ? i : `0${i}`}`);
			res.push({
				year: nextYear,
				month: nextMonth,
				day: i,
				weekday: new Date(`${year}-${nextMonth}-${i}`).getDay(),
				lunar: Lunar.fromDate(d).getDayInChinese(),
				enable: false,
				isActive: false,
			})
		}

		// 4. 将数据格式化成2维数组
		let result = [
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		]
		for (let i = 1; i <= res.length; i++) {
			result[(i - 1) % 7].push(res[i - 1]);
		}
		return result;
	}

	/**
	 * 选中具体的日期
	 * @param {Object} year
	 * @param {Object} month
	 * @param {Object} day
	 */
	function selectDay(year, month, day) {
		daysv2.value.forEach(weekdays => weekdays.forEach(dayItem => dayItem.isActive = dayItem.year == year && month ==
			dayItem.month && dayItem.day == day))
		emit && emit('selectDay', {
			year,
			month,
			day
		})

		isShow.value = false;
	}

	function getDaysByMonthV2(year, month) {
		const res = [
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		]
		return getDaysByMonth(year, month);

		// return res;
	}

	daysv2.value = getDaysByMonthV2(year.value, month.value);

	// 开始移动时手指的位置
	let startX = 0;
	let distance = ref(0); // 手指滑动的距离
	// 日历移动的距离, 默认为: totalWidth(因为在style中会 减去 totalWidth ), 即在原点处
	let position = ref(totalWidth);

	function startMove(e) {
		// 先判断当前数据一共是几个月的数据
		if (daysv2.value.length == 21) {
			daysv2.value.splice(0, 7);
			daysv2.value.splice(7, 7);
		}
		distanceTransition.value = ''
		startX = e.changedTouches[0].clientX;
		// 在开始移动时, 左右两边加上：上/下 两个月份, 同时设置 偏移量为 -width
		const y = year.value;
		const m = month.value;
		// 1. 添加上个月 的数据
		const preRes = m != 1 ? getDaysByMonth(y, m - 1) : getDaysByMonth(y - 1, 12)
		daysv2.value.splice(0, 0, ...preRes);

		// 2. 添加下个月的数据
		const nextRes = m != 12 ? getDaysByMonth(y, m + 1) : getDaysByMonth(y + 1, 1);

		daysv2.value.splice(daysv2.value.length, 0, ...nextRes);

		position.value = 0;
	}

	function moving(e) {
		let d = e.changedTouches[0].clientX - startX;
		const res = uni.getSystemInfoSync()
		position.value = distance.value = (d * (750 / res.windowWidth)) //将px 转换rpx
	}

	function nextMonth() {

		position.value = -totalWidth;

		if (month.value == 12) {
			month.value = 1;
			year.value++;
			uni.showToast({
				title: `${year.value}年`,
				icon: 'none'
			})
		} else {
			month.value++;
		}

		setTimeout(function() {
			distanceTransition.value = ''
			daysv2.value.splice(0, 14);
			position.value = totalWidth;
		}, 400)
	}

	function preMonth() {
		// 计算当前查看的月份和现在月份的差值
		if (month.value > 1) {
			month.value--;
		} else {
			month.value = 12;
			year.value--;
			uni.showToast({
				title: `${year.value}年`,
				icon: 'none'
			})
		}
		position.value = totalWidth;
		setTimeout(function() {
			daysv2.value.splice(7, 14);
		}, 400)
	}

	function endMove() {
		// 增加过渡效果
		distanceTransition.value = 'transform .4s linear';

		if (distance.value > cellWidth * 2) {
			preMonth()
		} else if (distance.value < -cellWidth * 2) {
			nextMonth()
		} else {
			position.value = 0;
		}
		// 重置 
		distance.value = 0;
	}

	function switchShow() {
		isShow.value = !isShow.value
	}

	defineExpose({
		switchShow,
		nextMonth,
		preMonth,
	})
</script>

<style lang="scss">
	.container {
		width: 100%;

		// 设置一个背景板
		.background {
			position: absolute;
			width: 560rpx;
			background-color: rgba(255, 0, 0, .4);
			height: 560rpx;
			z-index: 999;
			border-radius: 15rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.bgWord {
			position: absolute;
			width: 560rpx;
			z-index: 999;
			border-radius: 15rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 110rpx;
			text-align: center;
			line-height: 500rpx;
			opacity: .4;
		}



		.calendar {

			position: absolute;
			width: 560rpx;
			height: 560rpx;
			background-color: transparent;
			height: 560rpx;
			z-index: 9999;
			border-radius: 15rpx;
			left: 50%;
			transform: translateX(-50%);


			.header {
				width: 560rpx;
				display: flex;
				align-items: center;
				height: 60rpx;
				border-radius: 15rpx;
				color: white;
				background-color: #f16c61;
				margin-bottom: 15rpx;

				.day {
					flex: 1;
					text-align: center;
				}
			}




			.currentDaysV2 {
				display: flex;
				overflow: hidden;

				.col {
					flex: 1;

					.day {
						text-align: center;
						height: 80rpx;
						width: 80rpx;

						.dayDetail {
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							align-items: center;

							.ying {
								font-size: 18rpx;
							}
						}
					}

					.disable {
						border-radius: 10rpx;
						opacity: .2;
					}

					.active {
						background-color: #f16c61;
						border-radius: 50%;
					}
				}
			}

		}
	}
</style>