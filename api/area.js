import request from '@/utils/request.js'

/**
 *  获取所有省市区
 */
export const getAreaInfo = async () => {
	return request({
		url: '/area/all',
		method: 'GET',
	});
}