import {
	defineStore
} from 'pinia'
import {
	computed,
	reactive,
	ref
} from 'vue'
import * as recordDayApi from '../api/recordDay'
import {
	toast
} from '../utils'
import {
	useUserStore
} from './user'

/**
 * 格式化从后端获取的瞬间列表数据
 * @param {Object} res 瞬间列表数据
 */
export function formdata(res) {
	const data = []
	for (let item of res) {
		data.push({
			id: item.id,
			title: item.title,
			loves: item.loves,
			loved: item.loved,
			user: item['et_user'],
			cover: item.cover,
		})
	}
	return data;
}

export const useMomentStore = defineStore('moment', () => {

	const momentList = reactive([]);
	const pageNum = ref(1),
		pageSize = ref(10)


	/**
	 * 点赞第二个版本
	 * @param {Object} id
	 */
	function reallove(id) {

		const momentItem = momentList.find(item => item.id == id);

		const {
			incrementUserLoves
		} = useUserStore();

		let incre = momentItem.loved ? -1 : 1;

		momentItem.loves += incre;

		momentItem.loved = !momentItem.loved;

		incrementUserLoves(incre)

		return recordDayApi.loveRecordDayLoveMoment(momentItem.id, incre);
	}


	/**
	 *  获取瞬间列表
	 */
	function getMomentList() {
		return recordDayApi.getRecordDayLoveMoment(pageNum.value, pageSize.value).then(res => momentList.splice(
			0, 0, ...formdata(res)))
	}

	/**
	 *  下拉加载更多
	 */
	function loadmore(e) {
		pageNum.value++;
		recordDayApi.getRecordDayLoveMoment(pageNum.value, pageSize.value).then(res => {
			if (res.length == 0) {
				return toast("没有更多数据了")
			}
			public_momentList.splice(public_momentList.length, 0, ...formdata(res))
		})
	}
	/**
	 *  获取下一页数据
	 */
	function getNextPageMomentList() {
		pageNum.value++;
		return recordDayApi.getRecordDayLoveMoment(pageNum.value, pageSize.value).then(res => {
			if (res.length == 0) {
				return toast("没有更多数据了")
			}
			momentList.splice(momentList.length, 0, ...formdata(res))
		})
	}


	return {
		momentList,
		reallove,
		getMomentList,
		getNextPageMomentList,
	}
})