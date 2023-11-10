import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'

export const usePageStore = defineStore('page', () => {
	// state
	const pageNum = ref(1);
	const pageSize = ref(8);

	return {
		pageNum,
		pageSize
	}
})