import {
	computed,
	onMounted,
	reactive,
	ref
} from 'vue'
import {
	onShow
} from "@dcloudio/uni-app"
import {
	createComment,
	getRecordDayLoveMoment,
	loveRecordDayLoveMoment,
	momentDetail,
	starRecordDayLoveMoment,
	getCommentList,
} from '../../api/recordDay'
import {
	user
} from '../personCenter/index.js'
import * as storage from '../../utils/storage.js'
import {
	toast
} from '../../utils'
export var pageSize = 8;
/**
 *  恋爱瞬间列表
 */
export const momentList = reactive([])

export const currentMoment = ref({})

export const commentText = ref('')

export const commentList = reactive([]);
/**
 *  进入到瞬间详情
 */
export const getMomentDetailPage = (id) => {
	uni.navigateTo({
		url: "/pages/loveDetail/momentDetail/momentDetail?id=" + id
	})
}

/**
 *  进入到发布瞬间的页面
 */
export const goCreateMomentPage = () => {
	uni.navigateTo({
		url: "/pages/loveDetail/createMoment/createMoment"
	})
}

/**
 *  点赞
 */

/**
 *  点赞第二个版本
 * @param {Object} momentItem 瞬间对象, 注意需要是代理对象
 */
export function reallove(momentItem) {
	let incre = momentItem.loved ? -1 : 1;
	momentItem.loves += incre;
	momentItem.loved = !momentItem.loved;
	user.value.loves += incre;
	return loveRecordDayLoveMoment(momentItem.id, incre);
}

/**
 *  收藏
 */
export function realstar(moment) {
	const incre = moment.stared ? -1 : 1
	moment.stars += incre
	moment.stared = !moment.stared;
	user.value.collects += incre;
	return starRecordDayLoveMoment(moment.id, incre)
}

/**
 *  根据id 获取瞬间详情
 */
export const getMomentById = async id => {
	const res = await momentDetail(id)
	currentMoment.value = res;
	return res;
}

/**
 *  添加评论
 */
export const addComment = async (momentId) => {
	createComment({
		content: commentText.value,
		momentId: ~~momentId
	}).then(() => {
		getCommentListById(momentId)
	}).then(() => {
		commentText.value = ''
	})
}
/**
 *  获取评价列表
 */
export const getCommentListById = async momentId => {
	const res = await getCommentList(momentId)
	commentList.splice(0, 100000, ...res);
}
/**
 *  评价数量
 */
export const commentCount = computed(() => commentList.length)

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