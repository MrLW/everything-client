import request from '@/utils/request.js'

/**
 *  获取恋爱的所有瞬间
 */
export const getRecordDayLoveMoment = async () => {
	return request({
		url: '/recordDayLoveMoment',
		method: 'GET',
	});
};

/**
 * 创建恋爱顺间
 * @param {*} data 
 * @returns 
 */
export const createRecordDayLoveMoment = async (data) => {
	return request({
		url: '/recordDayLoveMoment',
		method: 'POST',
		data
	});
};

/**
 * 点赞瞬间id
 * @param {*} id 瞬间id
 * @returns 
 */
export const loveRecordDayLoveMoment = async id => {
	return request({
		url: '/recordDayLoveMoment/' + id + '/love',
		method: 'PATCH',
	});
};

/**
 *  瞬间详情
 */
export const momentDetail = id => {
	return request({
		url: '/recordDayLoveMoment/' + id,
		method: 'GET',
	});
};

/**
 * 收藏瞬间id
 * @param {*} id 瞬间id
 * @returns 
 */
export const starRecordDayLoveMoment = async id => {
	return request({
		url: '/recordDayLoveMoment/' + id + '/star',
		method: 'PATCH',
	});
};