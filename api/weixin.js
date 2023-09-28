import request from '@/utils/request.js'

/**
 * code 换取 openid
 * @param {Object} code 微信授权得到的code
 */
export function jscode2session(code) {
	return request({
		url: "/weixin/jscode2session",
		method: "POST",
		data: {
			code
		}
	})
}