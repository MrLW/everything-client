<template>
	<view class="container">
		<view class="item">
			<view class="label ">
				标题
			</view>
			<input class="input" type="text" placeholder="" v-model="todo.title">
		</view>
		<view class="item">
			<view class="label ">
				详情
			</view>
			<input class="input" type="text" v-model="todo.content">
		</view>
		<view class="item">
			<view class="label ">
				开始日期
			</view>
			<lee-calendar ref="calendar" :isShow="calShow" @selectDay="selectDay"></lee-calendar>
			<input class="input" type="text" v-model="todo.startDay" disabled @click="switchShow">
		</view>
		<view class="item">
			<view class="label ">
				开始时间
			</view>
			<picker class="input" mode="time" :value="todo.startTime" start="09:01" end="21:01" @change="selectTime">
				<input style="font-size: 20rpx;" type="text" v-model="todo.startTime" disabled>
			</picker>
		</view>
		<view class="item">
			<view class="label ">
				耗时(分钟)
			</view>
			<input class="input" type='number' placeholder="" maxlength="3" v-model.number="todo.duration">
		</view>
		<view class="btn">
			<view class="cancel" @click="cancel">
				取消
			</view>
			<view class="submit" @click="updateTodo(id)">
				更新
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		storeToRefs
	} from 'pinia';
	import {
		useTodoStore
	} from '../../../store/todo';

	const props = defineProps(['id'])

	const todoStore = useTodoStore();
	const {
		createTodo,
		cancel,
		getTodoById,
		updateDone,
		updateTodo,
	} = todoStore
	const {
		todo,
	} = storeToRefs(todoStore)
	const canendar = ref();
	const calShow = ref(false);
	onMounted(function () {
		getTodoById(props.id)
	})

	function switchShow() {
		calShow.value = !calShow.value;
	}

	function selectDay(item) {
		todo.value.startDay = `${item.year}-${item.month}-${item.day}`
	}

	function selectTime(e) {
		const time = e.detail.value;
		todo.value.startTime = time;
	}
</script>

<style lang="scss">
	.item {
		display: flex;
		align-items: flex-end;
		margin: 10rpx 20rpx;
		font-size: 26rpx;

		.label {
			width: 100rpx;
			text-align: center;
			font-size: 20rpx;
		}

		.input {
			border-bottom: 1rpx solid black;
			width: 80%;
			margin: 0 auto;
			padding: 10rpx 0;
			font-size: 20rpx;
		}
	}


	.btn {
		margin-top: 30rpx;
		display: flex;

		.cancel,
		.submit {
			border: 2rpx solid darkgrey;
			width: 100rpx;
			height: 50rpx;
			border-radius: 10rpx;
			margin: 0 auto;
			text-align: center;
			font-size: 30rpx;
			line-height: 50rpx;
		}
	}
</style>