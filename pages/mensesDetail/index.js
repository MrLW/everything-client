import {
	onMounted,
	reactive,
	ref
} from 'vue';
import {
	addEvent,
	getMensesList
} from '../../api/event';
import {
	diffDays
} from '../../utils';

export const rules = {
	startTime: {
		rules: [{
			required: true,
			errorMessage: ' '
		}]
	},
	type: {
		rules: [{
			required: true,
			errorMessage: ' '
		}]
	}
}

export const eventItem = ref({
	type: 'menses'
})

export const mensesList = reactive([])

export const getAllMenses = () => {
	getMensesList().then(data => {
		mensesList.splice(0, mensesList.length, ...data);
	})
}

export const submit = async (form) => {
	form.validate().then(async data => {
		const item = eventItem.value;
		if (mensesList[0] && diffDays(mensesList[0].startTime, item.startTime) <= 15) {
			return uni.showToast({
				icon: 'none',
				title: '距离您上次来姨妈不超过15天~',
			})
		}
		await addEvent(item)
		getAllMenses()

		// 重置
		this.reset();
		// 关闭弹窗
		this.$refs.popup.close()
	})
}

export const reset = () => {
	eventItem.value.startTime = null;
	eventItem.value.remark = ''
}