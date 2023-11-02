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
};

/**
 *  更新用户头像
 * @param {Object} avatarBase64 头像的Base64
 */
export async function updateAvatarUrl(avatarBase64) {
	return request(({
		url: "/user/updateAvatarUrl",
		method: 'POST',
		data: {
			avatar: avatarBase64
		}
	}))
}
/**
 *  更新用户地区
 * @param {Object} codes 省市区的编码
 */
export async function updateArea(codes) {
	return request(({
		url: "/user/updateArea",
		method: 'POST',
		data: {
			codes: codes
		}
	}))
}

/**
 * 更新用户简介
 * @param {Object} desc 
 */
export async function updateDesc(desc) {
	return request({
		url: "/user/updateDesc",
		method: 'POST',
		data: {
			desc
		}
	})
}

/**
 * 更新用户名称
 * @param {Object} username
 */
export async function updateUsername(username) {
	return request({
		url: "/user/updateUsername",
		method: 'POST',
		data: {
			username
		}
	})
}

/**
 * 更新用户eid
 * @param {Object} eid
 */
export async function updateEid(eid) {
	return request({
		url: "/user/updateEid",
		method: 'POST',
		data: {
			eid
		}
	})
}

/**
 * 更新用户sex
 * @param {Object} sex
 */
export async function updateSex(sex) {
	return request({
		url: "/user/updateSex",
		method: 'POST',
		data: {
			sex: ~~sex
		}
	})
}

/**
 *  获取当前伴侣的信息
 */
export async function marryInfo() {
	return request({
		url: "/user/marry/info",
		method: 'GET',
	})
}

/**
 * 发送结婚申请
 * @param {Object} receId
 */
export async function marryApply(receEid) {
	return request({
		url: "/user/marry/apply",
		method: 'POST',
		data: {
			receEid
		}
	})
}
/**
 * 发送聊天消息
 * @param {Object} message
 */
export async function sendChatMessage(message) {
	return request({
		url: "/user/chat",
		method: 'POST',
		data: message
	})
}
/**
 * 发送邮箱验证码
 * @param {Object} email 邮箱
 */
export async function sendEmailCode(email) {
	return request({
		url: "/user/email/code",
		method: 'POST',
		data: {
			email
		}
	})
}
/**
 * 邮箱验证码登录
 * @param {Object} email 邮箱
 * @param {Object} code 验证码
 */
export async function verifyEmailCode(email, code) {
	return request({
		url: "/user/email/verify",
		method: 'POST',
		data: {
			email,
			code
		}
	})
}
/**
 *  获取好友的聊天记录
 * @param {Object} friendId 好友id
 * @param {Object} pageNum 第几页
 */
export function chatList(friendId, pageNum) {
	return request({
		url: "/user/chat",
		method: 'GET',
		data: {
			friendId,
			pageNum: pageNum,
			pageSize: 20
		}
	})
}
/**
 *  搜索用户
 * @param {Object} keyword eid
 */
export function searchUsers(keyword) {
	return request({
		url: "/user/search",
		method: 'GET',
		data: {
			keyword
		}
	})
}
/**
 *  关注用户
 * @param {Object} friendId
 */
export function subscribe(friendId) {
	return request({
		url: "/user/subscribe",
		method: 'POST',
		data: {
			friendId
		}
	})
}

/**
 *  获取当前用户的好友
 */
export function friends() {
	return request({
		url: "/user/friends",
		method: 'get',
	})
}

export async function checkSocketValid(sid) {
	return request({
		url: "/user/checkSocket",
		method: 'post',
		data: {
			sid
		}
	})
}