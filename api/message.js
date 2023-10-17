import request from '@/utils/request.js'

/**
 *  获取所有省市区
 */
export const messages = async () => {
	return request({
		url: '/message',
		method: 'GET',
	});
}

export const updateMessage = async (id) => {
	return request({
		url: '/message/aggre/' + id,
		method: 'PUT',
	});
}