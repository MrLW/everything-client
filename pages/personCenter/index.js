import {
	jscode2session
} from '../../api/weixin';
import {
	loginByWx,
	updateUser,
	info,
	userLogout
} from '../../api/user.js'
import {
	ref
} from 'vue'
export const user = ref({
	username: '',
	avatarUrl: '',
	openid: '',
	sex: 0,
	exps: 0,
	subs: 0,
	loves: 0
})
/**
 *  微信授权登录
 */
export const login = async () => {
	let openid = uni.getStorageSync("openid")
	if (openid) {
		const res = await loginByWx(openid)
		if (res.token) {
			uni.setStorageSync("token", res.token);
		}
	} else {
		uni.login({
			success: async (res) => {
				const {
					code
				} = res;
				const openRes = await jscode2session(code);
				openid = openRes.openid;
				uni.setStorageSync("openid", openid);

				const user = await loginByWx(openid)
				// 存储token
				if (user.token) {
					uni.setStorageSync("token", user.token);
				}
			}
		})
	}
}
/**
 *  获取用户信息
 */
export const userinfo = async () => {
	const res = await info();
	user.value = res;
}

/**
 *  跳转到登录页面
 */
export const goLogin = () => {
	uni.navigateTo({
		url: "/pages/personCenter/login/login",
	})
}

/**
 * 选择头像
 * @param {*} res 
 */
export const chooseavatar = (res) => {
	user.value.avatarUrl = res.detail.avatarUrl;
	// 更新用户头像
	updateUser(user.value.openid, {
		avatarUrl: res.detail.avatarUrl
	})
}

export async function submitNickname() {
	// 更新用户昵称
	await updateUser(user.value.openid, {
		nickname: user.nickname
	})
}
/**
 *  进入设置页面
 */
export function goSetting() {
	uni.navigateTo({
		url: "/pages/personCenter/setting/setting",
	})
}
/**
 *  退出登录
 */
export async function logout() {
	user.value = {};
	uni.removeStorageSync("openid")
	const token = await uni.getStorageInfoSync("token")
	userLogout(token);
	// 回到首页
	uni.navigateBack().then(() => {})
}

export function goAdvice() {
	uni.showToast({
		title: "待开发",
		icon: 'none'
	})

}