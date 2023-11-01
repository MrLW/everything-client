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
export let pageSize = 8;
export let pageNum = 1
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
 *  初始化瞬间列表
 */
export const getNewMomentList = async () => {
	pageNum = 1;
	const res = await getRecordDayLoveMoment(pageNum, pageSize);
	momentList.splice(0, momentList.length, ...res);
}
/**
 *  点赞
 */
export const love = id => {
	if (id == currentMoment.value.id) {
		let incre = currentMoment.value.loved ? -1 : 1;
		currentMoment.value.loves += incre;
		currentMoment.value.loved = !currentMoment.value.loved;
		user.value.loves += incre;
	}
	const cur = momentList.find(moment => moment.id == id);
	let incre = cur.loved ? -1 : 1;
	cur.loves += incre;
	cur.loved = !cur.loved;
	user.value.loves += incre;
	loveRecordDayLoveMoment(id, incre);

}

/**
 *  收藏
 */
export const star = id => {

	const incre = currentMoment.value.stared ? -1 : 1
	currentMoment.value.stars += incre;
	user.value.stars += incre;

	currentMoment.value.stared = !currentMoment.value.stared;
	starRecordDayLoveMoment(id, incre)
}

/**
 *  根据id 获取瞬间详情
 */
export const getMomentById = async id => {
	const res = await momentDetail(id)
	currentMoment.value = res;
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
 *  下拉加载更多
 */
export const scrolltolower = (e) => {
	pageNum++;
	getRecordDayLoveMoment(pageNum, pageSize).then(res => {
		if (res.length == 0) {
			return toast("没有更多数据了")
		}
		momentList.splice(momentList.length, 0, ...res)
	})

}