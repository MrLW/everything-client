import request from '@/utils/request.js'

const eventList = [
	{
		id: 1,
		type: 'love',
		className: 'icon-Love00002',
		startTime: '202-01-01',
		diffDays: 100
	},
	{
		id: 2,
		type: 'marry',
		className: 'icon-jiehunzhao',
		startTime: '2023-04-27',
		diffDays: 200
	},
	{
		id: 3,
		type: 'menses',
		className: 'icon-weishengjin',
		lastTime: '2023-01-01',
		startTime: '2023-04-27',
		diffDays: 100
	}
];

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
	return eventList.filter(event=>event.type == 'menses');
}