import {
	onMounted,
	reactive,
	ref
} from 'vue'
import {
	onShow
} from "@dcloudio/uni-app"
import {
	getRecordDayLoveMoment,
	loveRecordDayLoveMoment,
	momentDetail,
	starRecordDayLoveMoment,
} from '../../api/recordDay'
import {
	stopPropagation
} from 'vant/lib/utils'
/**
 *  恋爱瞬间列表
 */
export const momentList = reactive([])

export let currentMoment = ref({})
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
	console.log("#######getNewMomentList");
	const res = await getRecordDayLoveMoment();
	momentList.splice(0, 10000, ...res);
}
/**
 *  点赞
 */
export const love = (id, event, type) => {
	console.log("###momentList.length: ", momentList.length, currentMoment);
	if (type == 'detail') {
		currentMoment.value.loves++;
		loveRecordDayLoveMoment(id);
	} else if (type == 'list') {
		loveRecordDayLoveMoment(id).then(() => getNewMomentList())
	}
	// 防止在列表冒泡
	event.stopPropagation()
}

/**
 *  收藏
 */
export const star = id => {
	currentMoment.value.stars++;
	starRecordDayLoveMoment(id)
}

/**
 *  根据id 获取瞬间详情
 */
export const getMomentById = async id => {
	return momentDetail(id)
}