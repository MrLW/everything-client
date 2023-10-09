import {
	jscode2session
} from '../../api/weixin';
import {
	loginByWx,
	updateUser,
	info,
	userLogout,
	updateAvatarUrl,
	updateArea,
} from '../../api/user.js'
import {
	ref
} from 'vue'
import {
	base64
} from '../../utils';
export const user = ref({
	username: '',
	avatarUrl: '',
	openid: '',
	sex: 0,
	exps: 0,
	subs: 0,
	loves: 0,
	district: ''
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

	// 将接口修改为base64
	base64(res.detail.avatarUrl, 'jpg').then((base64) => {

	})

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
/**
 *  跳转到用户编辑页面
 */
export function goEditUserPage() {
	uni.navigateTo({
		url: "/pages/personCenter/edit/edit",
	})
}

/**
 *  更新用户头像
 */
export function chooseAvatarUrl() {
	return new Promise((resolve) => {
		uni.chooseImage({
			count: 1,
			extension: ['jpeg', 'png', 'jpg'],
			async success(res) {
				const url = res['tempFilePaths'][0]
				const imgBase = await base64(url, 'jpg')
				// 调用更新头像接口
				const {
					avatarUrl
				} = await updateAvatarUrl(imgBase);
				user.value.avatarUrl = avatarUrl;
			}
		})
	})
}

/**
 *  更新用户的省市区
 * @param {Object} e 
 */
export function updateUserArea(e) {
	const codes = e.detail.value.map(item => item.value);
	updateArea(codes).then(() => {
		user.value.province = codes[0]
		user.value.city = codes[1]
		user.value.district = codes[2]
	})
}