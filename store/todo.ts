import {
	defineStore
} from 'pinia'
import {
	Ref,
	ref
} from 'vue'
import {
	toast
} from '../utils';
import * as todoApi from '../api/todo'

export enum TODO_TAG {
	ALL = 'all',
	DONE = 'done',
	NO = 'no'
}

export type Todo = {
	id : number;
	title : string;
	content : string;
	startDay : string;
	startTime : string;
	duration : number;
	done : Boolean;
}
// 定义TODO的数组对象
export type TodoArray = Ref<Todo[]>

export const useTodoStore = defineStore('todo', () => {
	// state
	let todolist : TodoArray = ref([])

	let todo = ref({});
	let date = new Date();
	// 当前选中的日期
	let selectDate = ref(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

	// 选中的标签
	let selectTag = ref(TODO_TAG.NO);

	// 用于在列表头部显示的文字
	const currentTaskDay = ref('今日');

	async function updateDone(todoitem : Todo) {
		todoitem.done = !todoitem.done;
		// 
		if (todoitem.done)
			toast('完成任务')
		return todoApi.updateDone(todoitem.id, todoitem.done).then(() => getTodoList())
	}

	async function getTodoList() {
		return todoApi.getTodoList(1, 10, selectDate.value, selectTag.value).then(res => {
			todolist.value.splice(0, todolist.value.length, ...res)
		})
	}

	async function createTodo() {
		return todoApi.createTodo(todo.value).then(() => {
			toast("添加成功");
			// 重置
			todo.value = {};
			// 更新TODO列表
			getTodoList()
			// 返回列表
			uni.navigateBack()
		}).catch(() => toast("添加失败"))
	}

	function cancel() {
		todo.value = {};
		uni.navigateBack();
	}


	function selectDay(item : { year : number; month : number; day : number }) {
		selectDate.value = `${item.year}-${item.month}-${item.day}`;
		currentTaskDay.value = item.year == date.getFullYear() && item.month == date.getMonth() + 1 && item
			.day == date.getDate() ? '今日' : `${item.month}/${item.day}`;
		getTodoList()
	}
	// 根据标签筛选TODO列表
	function filterTodo(indexValue : TODO_TAG) {
		selectTag.value = indexValue;
		getTodoList()
	}
	// 根据id获取todo
	async function getTodoById(id : number) {
		return todoApi.findTodoById(id).then(res => todo.value = res)
	}

	async function updateTodo(id : number) {
		return todoApi.updateTodo(id, todo.value).then(() => {
			toast("更新成功");
			// 重置
			todo.value = {};
			// 更新TODO列表
			getTodoList()
			// 返回列表
			uni.navigateBack()
		})
	}

	return {
		currentTaskDay,
		selectTag,
		todo,
		todolist,
		updateDone,
		getTodoList,
		createTodo,
		cancel,
		selectDay,
		filterTodo,
		getTodoById,
		updateTodo,
	}
})