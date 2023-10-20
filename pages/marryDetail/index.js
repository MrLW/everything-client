import {
	computed,
	ref
} from 'vue'
import {
	marryApply,
	marryInfo
} from '../../api/user';
import {
	toast
} from '../../utils';

export const marry = ref({
	id: 0,
	status: 'apply',
	avatarUrl: '',
	receEid: ''
})

export const receId = ref(0);

/**
 *  获取伴侣信息
 */
export async function getMarryInfo() {
	let res = await marryInfo()
	marry.value = res || {};
}

export function goChatPage(friendId) {
	if (marry.value.status != 'success') {
		return toast("您的伴侣还未建立成功");
	}

	uni.navigateTo({
		url: "/pages/marryDetail/chat/chat?friendId=" + friendId
	})
}

/**
 *  发送恋爱申请
 */
export async function createMarryApply() {
	if (!marry.value.receEid || marry.value.receEid.trim() == '') {
		return uni.showToast({
			icon: 'none',
			title: '伴侣的EID不能为空'
		})
	}
	const res = await marryApply(marry.value.receEid);
	marry.value = res;
	console.log("###########", marry.value)
}

export const statusText = computed(() => {
	if (!marry.value.status) {
		return '未发送申请';
	}
	if (marry.value.status == 'apply') {
		return '已发送申请,请等候对方同意~'
	}
	if (marry.value.status == 'success') {
		return '建立连接成功~'
	}
})