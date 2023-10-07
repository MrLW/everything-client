import request from '@/utils/request.js'
import env from '../utils/env'

/**
 * 微信登录
 * @param {Object} openid 微信openid	
 */
export async function loginByWx(openid) {
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
export async function info() {
	return request({
		url: "/user/info",
		method: "GET",
	})
}

/**
 * 退出登录
 */
export async function userLogout() {
	return request({
		url: "/user/logout",
		method: "POST",
	})
}

// 更新用户信息
export async function updateUser(openid, user) {
	return request(({
		url: "/user/" + openid,
		method: 'PATCH',
		data: user
	}))
}

// 绑定手机号
export async function bindPhone(phone) {
	return request({
		url: "/account/bindPhone",
		method: 'PUT',
		data: {
			phone
		}
	})
}
// 重置密码
export async function resetPassword(password) {
	return request({
		url: "/account/resetPassword",
		method: 'PUT',
		data: {
			password
		}
	})
}

// 上传头像
export async function uploadPortrait(portraitPath) {
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