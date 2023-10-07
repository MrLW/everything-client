import request from '@/utils/request.js'
import env from '../utils/env'
// 登录
export function tryLogin(user) {
	return request({
		url: "/account/login",
		method: "POST",
		data: user
	})
}
// 注册
export function regist(user) {
	return request({
		url: "/user/regist",
		method: "POST",
		data: user
	})
}
/**
 * 根据openid 查找用户
 * @param {Object} openid 微信openid	
 */
export function loginByWx(openid) {
	return request({
		url: "/user/loginByWx",
		method: "POST",
		data: {
			openid
		}
	})
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function info() {
	return request({
		url: "/user/info",
		method: "GET",
	})
}

/**
 * 退出登录
 */
export function userLogout() {
	return request({
		url: "/user/logout",
		method: "POST",
	})
}

// 更新用户信息
export function updateUser(openid, user) {
	return request(({
		url: "/user/" + openid,
		method: 'PATCH',
		data: user
	}))
}

// 绑定手机号
export function bindPhone(phone) {
	return request({
		url: "/account/bindPhone",
		method: 'PUT',
		data: {
			phone
		}
	})
}
// 重置密码
export function resetPassword(password) {
	return request({
		url: "/account/resetPassword",
		method: 'PUT',
		data: {
			password
		}
	})
}

// 上传头像
export function uploadPortrait(portraitPath) {
	let url = `${env.baseUrl}/account/uploadPortrait`;
	const token = uni.getStorageSync("token")
	uni.uploadFile({
		url: url,
		filePath: portraitPath,
		name: 'file',
		header: {
			"Authorization": token
		},
		success(res) {
			console.info("上传文件:", res)
		},
		fail(err, b) {
			console.error(err, b)
		},
	})
}