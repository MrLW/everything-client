<template>
	count is : {{ count }} <br />
	countPlus is {{ countPlus }} <br />
	<button @click="increment">increment</button>
</template>

<script setup>
	import {
		useCountStore
	} from '../../store/count';
	import {
		storeToRefs
	} from 'pinia'
	const store = useCountStore();
	console.info("#store:", store);


	const increment = store.increment
	// storeToRefs: 保证store中的数据具有响应式
	const {
		count,
		countPlus
	} = storeToRefs(store);

	setTimeout(function() {
		store.$patch(function(state) {
			state.count++;
		})
	}, 3000)
</script>

<style>
</style>