import {
	defineStore
} from 'pinia'
import {
	reactive,
	ref,
} from 'vue'

export const useModuleStore = defineStore('module', () => {
	const title = ref("Everhthing");
	const modules = reactive([{
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

	return {
		modules,
		title
	}
})