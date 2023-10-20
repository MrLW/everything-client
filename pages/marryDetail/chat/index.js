import {
	ref
} from 'vue'
import {
	chatList,
	sendChatMessage
} from '../../../api/user';
export const chatItemList = ref([{
	id: 1,
	avatarUrl: 'http://192.168.20.221:3000/avatar/1696902854857.jpg',
	content: '请问你中午吃的什么？',
	userId: 2,
	isMe: false,
}, {
	id: 2,
	avatarUrl: 'http://192.168.20.221:3000/avatar/1696902854857.jpg',
	content: '我吃的小鸡炖蘑菇？',
	userId: 1,
	isMe: true,
}])

export const content = ref('')
export const friendId = ref(0);


export function addChatItem() {
	if (content.value == '') return;
	sendChatMessage({
		receId: friendId.value,
		content: content.value,
	})
	content.value = '';
}

export function getChatList(fId) {
	friendId.value = ~~fId;
	chatList(fId).then(res => {
		chatItemList.value = res;
		console.log("####res:", res)
	})
}