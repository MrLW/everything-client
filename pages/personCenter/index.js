import {
	jscode2session
} from '../../api/weixin';
import {
	findByOpenId,
	regist,
	updateUser
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
 *  获取用户信息
 */
export const getuserinfo = async () => {
	let openid = uni.getStorageSync("openid")
	if (openid) {
		const res = await findByOpenId(openid)
		user.value = res || {
			openid
		};
	} else {
		uni.login({
			success: async (res) => {
				const {
					code
				} = res;
				const openRes = await jscode2session(code);
				openid = openRes.openid;
				uni.setStorageSync("openid", openid);

				const user = await findByOpenId(openid)

				user.value = user || {
					openid
				};
			}
		})
	}
}

/**
 *  授权获取用户信息
 */
// export const getuserinfo = async () => {
// 	// 查看当前openid
// 	let openid = uni.getStorageSync("openid");
// 	if (!openid) {
// 		uni.login({
// 			success: async (res) => {
// 				const {
// 					code
// 				} = res;
// 				const openRes = await jscode2session(code);
// 				openid = openRes.openid;
// 				uni.setStorageSync("openid", openid);

// 				const success = await getUserInfoByOpenId();
// 				if (success) return;

// 				// 该接口只能在基础库小于3.0
// 				/*uni.getUserProfile({
// 					desc: "授权登录",
// 					provider: 'weixin',
// 					withCredentials: true,
// 					success(res) {
// 						const {
// 							userInfo
// 						} = res
// 						user.value.avatarUrl = userInfo.avatarUrl;
// 						user.value.username = userInfo.nickName;
// 						user.value.sex = userInfo.gender;
// 						user.value.country = userInfo.country;
// 						user.value.province = userInfo.province;
// 						user.value.city = userInfo.city;
// 						user.value.openid = openid;
// 						// 调用后端接口, 创建用户
// 						regist(user.value);
// 					},
// 					fail(err) {
// 						console.log(err);
// 					}
// 				})*/
// 			}
// 		})
// 	}

export const goLogin = () => {
	uni.navigateTo({
		url: "/pages/personCenter/login/login",
	})
}


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
export function logout() {
	user.value = {};
	uni.removeStorageSync("openid")
	// 回到首页
	uni.navigateBack().then(() => {
		console.log("~~~~~~~~", user);
	})
}

export function goAdvice() {
	uni.showToast({
		title: "待开发",
		icon: 'none'
	})

}