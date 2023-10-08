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
export const loveRecordDayLoveMoment = async (id, incre) => {
	return request({
		url: '/recordDayLoveMoment/' + id + '/love',
		method: 'PATCH',
		data: {
			incre
		}
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
export const starRecordDayLoveMoment = async (id, incre) => {
	return request({
		url: '/recordDayLoveMoment/' + id + '/star',
		method: 'PATCH',
		data: {
			incre
		}
	});
};

/**
 *  创建评价
 */
export const createComment = async data => {
	return request({
		url: '/recordDayLoveComment',
		method: 'POST',
		data
	});
};
/**
 *  评价列表
 */
export const getCommentList = async momentId => {
	return request({
		url: '/recordDayLoveComment',
		method: 'GET',
		data: {
			momentId
		}
	});
}