import {
	ref
} from 'vue'
import {
	marryApply,
	marryInfo
} from '../../api/user';
import {
	toast
} from '../../utils';
export const statusText = ref('');
const statusMap = {
	success: '建立连接成功~',
	apply: '已发送申请,请等候对方同意~',
}

export const marry = ref({
	status: 'apply',
	avatarUrl: '',
	otherId: 0,
	receEid: ''
})

/**
 *  获取伴侣信息
 */
export async function getMarryInfo() {
	let res = await marryInfo()
	marry.value = res;
	statusText.value = statusMap[res.status] || '未发送申请';
}

export function goChatPage() {
	if (marry.value.status != 'success') {
		return toast("您的伴侣还未建立成功");
	}

	uni.navigateTo({
		url: "/pages/marryDetail/chat/chat"
	})
}

/**
 *  发送恋爱申请
 */
export function createMarryApply() {
	// console.log("#######", marry)
	if (!marry.value.receEid || marry.value.receEid.trim() == '') {
		return uni.showToast({
			icon: 'none',
			title: '伴侣的EID不能为空'
		})
	}
	return marryApply(marry.value.receEid);
}