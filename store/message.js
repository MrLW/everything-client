import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'
import * as messageApi from '../api/message'

export const useMessageStore = defineStore('message', () => {
	const messageList = ref([])

	function getMessageList() {
		return messageApi.messages().then(res => {
			messageList.value = res;
		})
	}
	return {
		messageList,
		getMessageList,
	}
})