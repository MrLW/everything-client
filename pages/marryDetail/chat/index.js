import {
	ref
} from 'vue'
import {
	chatList,
	sendChatMessage
} from '../../../api/user';
export const chatItemList = ref([])

export const content = ref('')
export const friendId = ref(0);


export function addChatItem() {
	if (content.value == '') return;

	return new Promise((resolve, reject) => {
		sendChatMessage({
			receId: friendId.value,
			content: content.value,
		}).then(res => {
			content.value = '';
			resolve(res)
		}).catch(err => content.value = '' && reject(err))
	})
}

export function getChatList(fId) {
	friendId.value = ~~fId;
	return new Promise((resolve, reject) => {
		chatList(fId).then(res => {
			chatItemList.value = res;
			resolve(chatItemList)
		}).catch(err => reject(err))
	})
}