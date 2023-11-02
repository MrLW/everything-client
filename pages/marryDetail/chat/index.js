import {
	ref
} from 'vue'
import {
	chatList,
	sendChatMessage
} from '../../../api/user';
import {
	toast
} from '../../../utils';
export const chatItemList = ref([])

export const content = ref('')
export const friendId = ref(0);
export const pageNum = ref(1);


export function addChatItem() {
	if (content.value == '') return Promise.reject();

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
		chatList(fId, pageNum.value).then(res => {
			if (res.length == 0) {
				toast("没有更多数据了~~~")
				return resolve(chatItemList)
			}
			chatItemList.value = [...res, ...chatItemList.value, ]
			resolve(chatItemList)
		}).catch(err => reject(err))
	})
}