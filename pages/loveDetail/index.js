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

export const getNewMomentList = async () => {
	const res = await getRecordDayLoveMoment();
	momentList.splice(0, 10000, ...res);
}
/**
 *  点赞
 */
export const love = (id, event) => {
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