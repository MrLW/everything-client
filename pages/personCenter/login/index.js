import {
	ref
} from 'vue'
import {
	user
} from '..';
import {
	sendEmailCode,
	verifyEmailCode
} from '../../../api/user';
import {
	toast
} from '../../../utils'

export const email = ref('')
export const code = ref('')

export function sendEmail() {
	if (email.value.trim().length == 0) {
		return toast("邮箱不能为空");
	}
	sendEmailCode(email.value).then(() => toast("发送成功"))
}

export function verifyCode() {
	if (email.value.trim().length == 0 || code.value.trim().length == 0) {
		return toast("邮箱或验证码不能为空");
	}
	verifyEmailCode(email.value, code.value).then((res) => {
		uni.setStorageSync("token", res.token);
		uni.navigateBack().then(() => toast('验证成功'))
		user.value = res.user;
	})
}