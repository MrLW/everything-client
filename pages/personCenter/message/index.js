import {
	messages,
	updateMessage
} from '../../../api/message.js'

import {
	ref
} from 'vue'
import {
	friendId
} from '../../marryDetail/chat/index.js'

export const messageList = ref([])

export const getMessageList = () => {
	messages().then(res => {
		messageList.value = res;
	})
}

export const agree = (message) => {
	const {
		id,
		status,
		sender
	} = message;
	if (status == 'complete') {
		uni.navigateTo({
			url: "/pages/marryDetail/chat/chat?friendId=" + sender.id
		})
	} else {
		updateMessage(id).then(() => {
			const item = messageList.value.find(item => item.id == id);
			item.status = 'complete'
		})
	}
}