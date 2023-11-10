import {
	defineStore
} from 'pinia'
import {
	computed,
	ref
} from 'vue'

export const useCountStore = defineStore('count', () => {
	// state
	let count = ref(0);

	// action
	function increment() {
		count.value++;
	}
	// getter
	const countPlus = computed(() => count.value + 1)

	return {
		count,
		increment,
		countPlus
	}
})