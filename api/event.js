import request from '@/utils/request.js'

/**
 *  获取事件列表
 */
export const getEventList = async () => {
	return request({
		url: '/events',
		method: 'GET',
	});
}
/**
 *  添加事件
 */
export const addEvent = async (event) => {
	return request({
		url: "/events",
		method: "POST",
		data: event
	})
}
/**
 *  删除事件
 */
export const deleteEvent = async id => {
	return request({
		url: "/events/" + id,
		method: "DELETE",
		data: event
	})
}

/**
 *  获取姨妈日的记录
 */
export const getMensesList = async () => {
	return request({
		url: "/events/menses",
		method: "GET",
	})
}