import request from '@/utils/request.js'

export const getEventCategoryList = async () => {
	return [{
			id: 1,
			value: 1,
			text: '结婚日',
			type: 'marry'
		},
		{
			id: 2,
			value: 2,
			text: '姨妈日',
			type: 'menses',
		},
		{
			id: 3,
			value: 3,
			text: '生日',
			type: 'birthday'
		}, {
			id: 4,
			value: 4,
			text: '恋爱',
			type: 'love'
		}
	]
}
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
		url: "/events/"+id,
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