import request from '@/utils/request.js'

/**
 *  获取恋爱的所有瞬间
 */
export const getRecordDayLoveMoment = async () => {
	return request({
		url: '/recordDayLoveMoment',
		method: 'GET',
	});
}
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
}
/**
 * 点赞瞬间id
 * @param {*} id 瞬间id
 * @returns 
 */
export const loveRecordDayLoveMoment = async id => {
	return request({
		url: '/recordDayLoveMoment/'+id + '/love',
		method: 'PATCH',
	});
}