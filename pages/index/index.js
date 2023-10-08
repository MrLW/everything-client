import {
	reactive,
	ref,
} from 'vue'
export const title = ref("Everhthing");
// 功能模块
export const modules = reactive([{
		id: 3,
		name: '记日',
		className: 'icon-teshuriqi',
		path: '/pages/recordDayIndex/recordDayIndex',
	}, {
		id: 2,
		name: '记事',
		className: 'icon-jishiben'
	},
	{
		id: 1,
		name: '记账',
		className: 'icon-jizhangben'
	},

	{
		id: 4,
		name: '敬请期待',
		className: 'icon-jingqingqidai'
	},
])

export const goPage = function(moduleItem) {
	uni.navigateTo({
		url: moduleItem.path
	}).catch(() => uni.showToast({
		title: "开发中",
		icon: 'none'
	}))
}