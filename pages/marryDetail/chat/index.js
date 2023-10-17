import {
	ref
} from 'vue'
import {
	sendMessage
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


export function addChatItem() {
	if (content.value == '') return;
	chatItemList.value.push({
		id: chatItemList.value.length + 1,
		content: content.value,
		isMe: true,
		avatarUrl: 'http://192.168.20.221:3000/avatar/1696902854857.jpg',
		userId: 1
	})
	content.value = '';
	// 

	sendMessage({
		recvId: 1,
		content: content.value,
	})
}