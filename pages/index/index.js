import {
	reactive,
	ref,
} from 'vue'
import {
	getAreaInfo
} from '../../api/area';
export const title = ref("Everhthing");
export const provinceList = reactive([])
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
/**
 *  获取china所有的省市区
 */
export function getAllArea() {
	if (provinceList.length != 0) {
		return;
	}
	getAreaInfo().then(res => {
		provinceList.splice(0, provinceList.length, ...res)
	})
}