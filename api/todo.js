import request from '@/utils/request.js'


export const getTodoList = async (pageNum, pageSize, startDay, selectTag) => {
	return request({
		url: '/todo',
		method: 'GET',
		data: {
			pageNum,
			pageSize,
			startDay,
			selectTag
		}
	});
}
// 更新TODO
export const updateDone = async (id, done) => {
	return request({
		url: '/todo/' + id + '/done',
		method: 'PUT',
		data: {
			done
		}
	});
}
// 创建TODO
export const createTodo = async (data) => {
	return request({
		url: '/todo',
		method: 'POST',
		data
	});
}
// 根据id 获取TODO
export const findTodoById = async id => {
	return request({
		url: '/todo/' + id,
		method: 'GET',
	});
}
// 根据id 更新todo
export const updateTodo = async (id, todo) => {
	return request({
		url: '/todo/' + id,
		method: 'PUT',
		data: todo
	});
}