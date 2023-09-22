import {  onMounted, reactive, ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import { getRecordDayLoveMoment, loveRecordDayLoveMoment } from '../../api/recordDay'
/**
 *  恋爱瞬间列表
 */
export const momentList = reactive([])

/**
 *  进入到瞬间详情
 */
export const getMomentDetailPage = ()=>{
	uni.navigateTo({
		url:"/pages/loveDetail/momentDetail/momentDetail"
	})
}

/**
 *  进入到发布瞬间的页面
 */
export const goCreateMomentPage = () =>{
	uni.navigateTo({
		url:"/pages/loveDetail/createMoment/createMoment"
	})
}

export const getNewMomentList = async () => {
	const res = await getRecordDayLoveMoment();
	momentList.splice(0,10000, ...res);
}

export const love = (id) => {
	loveRecordDayLoveMoment(id).then(() => getNewMomentList())
}