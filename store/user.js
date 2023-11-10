import {
	defineStore,
	storeToRefs
} from 'pinia'
import {
	computed,
	ref
} from 'vue'
import * as userApi from '../api/user';
import {
	toast
} from '../utils';
import {
	formdata
} from './moment';
import {
	usePageStore
} from './page';

const UPDATA_DATA_TYPE = {
	APPEND: 'append',
	REPLACE: 'replace'
}
export const useUserStore = defineStore('user', () => {
	// state
	let user = ref({
		id: 0,
		eid: "",
		username: "",
		sex: 0,
		birthday: "",
		collects: 0,
		loves: 0,
		subs: 0,
		district: "",
		birthday: "",
		avatarUrl: "",
		email: "",
		chatContactList: [],
		publicMoments: []
	});

	const sexList = ref(['女', '男'])

	const sexText = computed(() => sexList.value.find(item => item.value == user.value.sex).text)

	function updateUser(value) {
		user.value = Object.assign(user.value, value);
	}

	/**
	 *  获取用户信息详情
	 */
	function getUserinfo() {
		return userApi.info().then(res => user.value = Object.assign(user.value, res))
	}

	/**
	 *  微信授权登录
	 */
	const login = async () => {
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
	 *  跳转到登录页面
	 */
	function goLogin() {
		if (user.value.eid) return;
		uni.navigateTo({
			url: "/pages/personCenter/login/login",
		})
	}

	/**
	 *  进入设置页面
	 */
	function goSetting() {
		uni.navigateTo({
			url: "/pages/personCenter/setting/setting",
		})
	}

	/**
	 *  跳转到用户编辑页面
	 */
	function goEditUserPage() {
		uni.navigateTo({
			url: "/pages/personCenter/edit/edit",
		})
	}

	/**
	 *  更新用户的省市区
	 * @param {Object} e 
	 */
	function updateUserArea(e) {
		const codes = e.detail.value.map(item => item.value);
		return userApi.updateArea(codes).then(() => {
			user.value.province = codes[0]
			user.value.city = codes[1]
			user.value.district = codes[2]
		})
	}

	/**
	 *  退出登录
	 */
	async function logout() {
		user.value = {};
		uni.removeStorageSync("openid")
		const token = await uni.getStorageInfoSync("token")
		userApi.userLogout(token);
		// 回到首页
		uni.navigateBack().then(() => {})
	}

	function goAdvice() {
		toast("待开发")
	}

	function goMessagePage() {
		uni.navigateTo({
			url: "/pages/personCenter/message/message",
		})
	}

	function updateUserBirthday(e) {
		userApi.updateBirthday(e.detail.value).then(() => {
			toast('修改成功')
			user.value.birthday = e.detail.value;
		})
	}

	function updateUserSex(e) {
		userApi.updateSex(e.detail.value).then(() => {
			uni.showToast({
				icon: 'none',
				title: '修改成功'
			})
			user.value.sex = e.detail.value;
		}).catch(err => console.error(err))
	}
	/**
	 *  保存用户简介
	 */
	function saveDesc() {
		return userApi.updateDesc(user.value.desc).then(() => {
			uni.showToast({
				icon: 'none',
				title: '保存成功'
			})
			uni.navigateBack()
		})
	}

	/**
	 *  保存用户简介
	 */
	function saveEid() {
		return userApi.updateEid(user.value.eid).then((res) => {
			uni.showToast({
				icon: 'none',
				title: '保存成功'
			})
			uni.navigateBack()
		})
	}

	/**
	 *  保存用户简介
	 */
	function saveUsername() {
		return userApi.updateUsername(user.value.username).then(() => {
			uni.showToast({
				icon: 'none',
				title: '保存成功'
			})
			uni.navigateBack()
		})
	}

	function incrementUserLoves(incre) {
		user.value.loves += incre
	}

	/**
	 *  获取聊天记录列表
	 */
	function getChatContacts() {
		return userApi.friends().then(res => {
			user.value.chatContactList = res;
		})
	}

	/**
	 * 关注用户
	 * @param {Object} friendId
	 */
	function subscribe(friendId) {
		return userApi.subscribe(friendId).then(() => {
			toast("关注成功");
		}).catch(err => {
			toast('关注失败');
		})
	}

	function publicMoments(pageNum = 1, pageSize = 8, type = UPDATA_DATA_TYPE.APPEND) {
		return userApi.getPublicMoments(pageNum.value, pageSize.value).then(res => {
			type == UPDATA_DATA_TYPE.APPEND ? user.value.publicMoments.splice(user.value.publicMoments
					.length, 0, ...
					formdata(
						res)) :
				user.value.publicMoments.splice(0, user.value.publicMoments.length, ...formdata(res));
			return res;
		})
	};

	return {
		user,
		sexList,
		sexText,
		getUserinfo,
		login,
		goLogin,
		goSetting,
		goEditUserPage,
		updateUserArea,
		logout,
		goAdvice,
		goMessagePage,
		subscribe,
		updateUser,
		updateUserBirthday,
		updateUserSex,
		saveDesc,
		saveEid,
		saveUsername,
		login,
		incrementUserLoves,
		getChatContacts,
		publicMoments,
	}
})