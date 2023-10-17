import {
	messages,
	updateMessage
} from '../../../api/message.js'

import {
	ref
} from 'vue'

export const messageList = ref([])

export const getMessageList = () => {
	messages().then(res => {
		messageList.value = res;
	})
}

export const agree = (id, status) => {
	if (status == 'complete') {
		uni.navigateTo({
			url: "/pages/marryDetail/chat/chat"
		})
	} else {
		updateMessage(id).then(() => {
			const item = messageList.value.find(item => item.id == id);
			item.status = 'complete'
		})
	}
}