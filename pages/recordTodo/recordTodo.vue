<template>
	<view class="today">
		<text>{{ currentTaskDay }}任务</text>
		<text class="iconfont icon-xiala" @click="showCaendar"
			:style="{ transform: 'rotate('+xialaDirect+'deg)'} "></text>

		<view class="tags">
			<view class="all tag" @click="filterTodo(TODO_TAG.ALL)" :class="{ active: selectTag ==  TODO_TAG.ALL }">
				all
			</view>
			<view class="done tag" @click="filterTodo(TODO_TAG.DONE)" :class="{ active: selectTag == TODO_TAG.DONE }">
				done
			</view>
			<view class="nodone tag" @click="filterTodo(TODO_TAG.NO)" :class="{ active: selectTag == TODO_TAG.NO }">
				no
			</view>
		</view>
	</view>
	<view class="line"></view>
	<lee-calendar ref="canendar" @selectDay="selectDay" :isShow="show"></lee-calendar>
	<view class="todolist" v-if="todolist.length > 0 ">
		<view class="todoitem" v-for="(todoitem, index) in todolist" :key="todoitem.id"
			@click="goEditTodoPage(todoitem.id)">
			<view class="index">{{ index+1 }}.</view>
			<view class="title" :class="{ isDone: todoitem.done }">{{ todoitem.title}}
			</view>
			<view class="complete" :class="{ isDone: todoitem.done }"
				:style="{ background:  todoitem.done ? 'darkgrey': 'none'} " @click.stop="complete(todoitem)"></view>
		</view>
	</view>
	<lee-empty v-else></lee-empty>

	<uni-fab ref="fab" :pattern="FAB_PATTERN" horizontal="right" @fabClick="goCreateTodoPage"></uni-fab>
</template>

<script setup>
	import {
		storeToRefs
	} from 'pinia';
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		useTodoStore,
		TODO_TAG,
	} from '../../store/todo';
	import leeEmpty from '../../components/lee-empty/lee-empty.vue'
	import {
		FAB_PATTERN
	} from '../../utils/constant';
	import {
		goCreateTodoPage,
		goEditTodoPage,
	} from '../../utils/page';
	const show = ref(false)
	const todoStore = useTodoStore();
	const xialaDirect = ref(-90)
	const {
		updateDone,
		getTodoList,
		selectDay,
		filterTodo,
	} = todoStore;
	const {
		todolist,
		selectTag,
		currentTaskDay,
	} = storeToRefs(todoStore)

	onMounted(function() {
		getTodoList()
	})
	const canendar = ref();

	function complete(item) {
		return updateDone(item)
	}

	function showCaendar() {
		show.value = !show.value;
		xialaDirect.value = xialaDirect.value ? 0 : -90;
	}
</script>

<style lang="scss">
	.today {
		padding: 0 15rpx;
		display: flex;
		height: 60rpx;
		align-items: center;

		.icon-xiala {
			font-size: 30rpx;
			transition: transform .4s linear;
		}

		.tags {
			display: flex;
			flex: 1;
			justify-content: flex-end;

			.tag {
				border: 2rpx solid darkgrey;
				width: 80rpx;
				font-size: 30rpx;
				text-align: center;
				margin-right: 10rpx;
				border-radius: 10rpx;
			}

			.active {
				background-color: darkgrey;
			}
		}
	}

	.line {
		height: 1rpx;
		background-color: darkgrey;
		margin-top: 20rpx;
	}


	.todolist {
		padding: 0 15rpx;

		.todoitem {
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 30rpx;
			border-radius: 10rpx;
			box-shadow: 4rpx 4rpx 4rpx darkgrey;
			display: flex;
			align-items: center;

			.title {
				flex: 1;
				font-size: 32rpx;
			}

			.complete {
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				border: 1rpx solid darkgrey;
			}

			.isDone {
				text-decoration: line-through;
			}
		}


	}
</style>