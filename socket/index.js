import io from '@hyoga/uni-socket.io'
import {
	SOCKET_EVENT_NAME
} from '../utils/constant'
import env from '../utils/env'
import {
	handler
} from './handler'
import * as userapi from '../api/user.js'
export async function connect() {

	const sid = uni.getStorageSync('sid');
	if (sid) {
		// 检查该socket id 是否有效
		const {
			isValid
		} = await userapi.checkSocketValid(sid);
		if (isValid) return;
	}

	let socket = io(env.websocket, {
		transports: ['websocket', 'polling'],
		timeout: 5000,
	})
	socket.on('connect', function() {
		console.log("#######", socket, typeof socket, socket.id);
		uni.setStorageSync('sid', socket.id);

		const token = uni.getStorageSync("token");
		// 未进行http登录, 无需socket登录
		if (!token) return;
		socket.emit(SOCKET_EVENT_NAME.USER_LOGIN, {
			token: token
		})

		socket.on(SOCKET_EVENT_NAME.USER_CHAT_ADD, (res) => {
			handler.addChatItem(res)
		})
	})
}