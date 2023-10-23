<template>
	<view class="container">
		<view class="empty" v-if="isShowEmpty">
			您还未添加任何节日
		</view>
		<scroll-view class="list" v-if="!isShowEmpty" scroll-y="true">
			<view class="item" v-for="event in eventList" @longpress="showDialogMenu(event.id)" @click="goDetail(event)"
				:key="event.id">
				<text class="iconfont" :class="event.className"></text>
				<view class="eventInfo">
					<text>{{ event.name }}</text>
					<view class="detail">
						<text>{{ event.type == 'menses' ? '最近' : '始于' }} {{ event.startTime }}, </text>
						<text>距今已有{{ event.diffDays }}天啦！</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup">
			<view class="popup-content">
				<uni-forms ref="form" :rules="rules" :modelValue="eventItem">
					<uni-forms-item label="类型" required class="formItem" name="type">
						<uni-data-select :localdata="eventCategoryList" @change="changeEventType"
							v-model="eventItem.type"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="老公" class="formItem" v-if="eventItem.type == 'marry'" name="husband"
						required>
						<uni-easyinput placeholder="最多4个字" v-model="eventItem.husband" maxlength="4"
							:clearable="false" />
					</uni-forms-item>
					<uni-forms-item label="老婆" class="formItem" v-if="eventItem.type == 'marry'" name="wife" required>
						<uni-easyinput placeholder="最多4个字" v-model="eventItem.wife" maxlength="4" :clearable="false" />
					</uni-forms-item>
					<uni-forms-item label="男友" class="formItem" v-if="eventItem.type == 'love'" name="bf" required>
						<uni-easyinput placeholder="最多4个字" v-model="eventItem.bf" maxlength="4" :clearable="false" />
					</uni-forms-item>
					<uni-forms-item label="女友" class="formItem" v-if="eventItem.type == 'love'" name="gf" required>
						<uni-easyinput placeholder="最多4个字" v-model="eventItem.gf" maxlength="4" :clearable="false" />
					</uni-forms-item>
					<uni-forms-item label="始于" required class="formItem" name="startTime">
						<uni-datetime-picker type="date" return-type="string" v-model="eventItem.startTime" />
					</uni-forms-item>
					<uni-forms-item label="备注" class="formItem" name="remark">
						<uni-easyinput placeholder="最多10个字" v-model="eventItem.remark" maxlength="10"
							:clearable="false" />
					</uni-forms-item>
					<view class="btn">
						<button type="default" size="mini" @click="submit">提交</button>
						<button type="default" size="mini" @click="reset">重置</button>
					</view>

				</uni-forms>
			</view>
		</uni-popup>
		<!-- 悬浮按钮 -->
		<uni-fab ref="fab" :pattern="pattern" horizontal="right" @fabClick="showModePage('center')"></uni-fab>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="warn" cancelText="取消" confirmText="确认" title="删除通知" content="您确认删除本条记录吗?"
					@confirm="deleteEvent"></uni-popup-dialog>
			</uni-popup>
		</view>
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
		eventTypeMap
	} from '../../utils';

	export default {
		data() {
			return {
				pattern: {
					buttonColor: "#f16c61"
				},
				eventItem: {},
				eventCategoryList: [],
				eventList: [],
				rules: {
					type: {
						rules: [{
							required: true,
							errorMessage: ' '
						}]
					},
					startTime: {
						rules: [{
							required: true,
							errorMessage: ' '
						}]
					}
				},
				deleteId: 0,
			}
		},
		computed: {
			isShowEmpty() {
				return this.eventList.length == 0;
			}
		},
		async mounted() {
			const recordDayCategoryList = await getRecordDayCategoryList();

			// 为前端附加个字段
			recordDayCategoryList.forEach(item => item.value = item.type)

			recordDayCategoryList.forEach(item => item.text = item.name);
			this.eventCategoryList.splice(0, 0, ...recordDayCategoryList)
			this.getAllEvent()
		},
		methods: {
			showModePage(type) {
				this.$refs.popup.open(type);
			},
			changeEventType() {
				// 根据不同事件类型, 设置不同的校验规则
				if (this.eventItem.type == 'marry') {
					this.rules.username = this.rules.bf = this.rules.gf = null;
					this.rules.wife = this.rules.husband = {
						rules: [{
							required: true,
							errorMessage: ' '
						}]
					}
				} else if (this.eventItem.type == 'birthday') {
					this.rules.wife = this.rules.husband = this.rules.bf = this.rules.gf = null;
					this.rules.username = {
						rules: [{
							required: true,
							errorMessage: ' '
						}]
					}
				} else if (this.eventItem.type == 'love') {
					this.rules.username = this.rules.wife = this.rules.husband = null;
					this.rules.bf = this.rules.gf = {
						rules: [{
							required: true,
							errorMessage: ' '
						}]
					}
				} else if (this.eventItem.type == 'menses') {
					delete this.rules.username;
					delete this.rules.bf;
					delete this.rules.gf;
					delete this.rules.wife;
					delete this.rules.husband;
				}
				this.$refs.form.setRules(this.rules);

			},
			reset() {
				this.eventItem.remark = '';
				this.eventItem.husband = '';
				this.eventItem.wife = '';
				this.eventItem.type = null;
				this.eventItem.username = '';
				this.eventItem.bf = '';
				this.eventItem.gf = '';
				this.eventItem.startTime = null;
			},
			async submit() {
				console.log("#submit:", this.$refs)
				this.$refs.form.validate().then(async data => {
					const item = JSON.parse(JSON.stringify(this.eventItem))
					const menses = this.eventList.find(item => item.type == 'menses');
					if (item.type == 'menses' && menses && diffDays(menses.startTime, item.startTime) <=
						15) {
						return uni.showToast({
							icon: 'none',
							title: '距离您上次来姨妈不超过15天~',
						})
					}
					await addEvent(item)
					this.getAllEvent();
					// 重置
					this.reset();
					// 关闭弹窗
					this.$refs.popup.close()
				}).catch(err => {
					console.error("#validate 验证失败", err);
				})
			},
			showDialogMenu(id) {
				this.deleteId = id;
				this.$refs.alertDialog.open();
			},
			deleteEvent() {
				deleteEvent(this.deleteId).then(() => {
					// 从新获取
					this.getAllEvent()
				})
			},
			async getAllEvent() {
				const res = await getEventList();
				this.eventList = res
			},
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