import io from '@hyoga/uni-socket.io'
import {
	SOCKET_EVENT_NAME
} from '../utils/constant'
import env from '../utils/env'
import {
	handler
} from './handler'

const socket = io(env.websocket, {
	transports: ['websocket', 'polling'],
	timeout: 5000,
})
socket.on('connect', function() {
	socket.emit(SOCKET_EVENT_NAME.USER_LOGIN, {
		token: uni.getStorageSync("token")
	})

	socket.on(SOCKET_EVENT_NAME.USER_CHAT_ADD, (res) => {
		handler.addChatItem(res)
	})
})