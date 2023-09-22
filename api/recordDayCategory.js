import request from '@/utils/request.js'

/**
 *  获取分类列表列表
 */
export const getRecordDayCategoryList = async () => {
	return request({
		url: '/recordDayCategory',
		method: 'GET',
	});
}
