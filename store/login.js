import {
	defineStore,
	storeToRefs
} from 'pinia'
import {
	ref
} from 'vue'
import * as userApi from '../api/user'
import {
	toast
} from '../utils'
import {
	useUserStore
} from './user'

export const useLoginStore = defineStore('count', () => {

	const email = ref('');

	const code = ref('');

	function sendEmail() {
		if (email.value.trim().length == 0) {
			return toast("邮箱不能为空");
		}
		return userApi.sendEmailCode(email.value).then(() => toast("发送成功"))
	}

	function verifyCode() {
		if (email.value.trim().length == 0 || code.value.trim().length == 0) {
			return toast("邮箱或验证码不能为空");
		}
		const userStore = useUserStore();

		userApi.verifyEmailCode(email.value, code.value).then((res) => {
			uni.setStorageSync("token", res.token);
			uni.navigateBack().then(() => {
				toast('验证成功');
			})
			userStore.updateUser(res.user);
		})
	}
	return {
		email,
		code,
		sendEmail,
		verifyCode
	}
})