import {
	currentSocket
} from ".";
import {
	chatItemList
} from "../pages/marryDetail/chat";
import {
	useMessageStore
} from "../store/message";
import {
	toast
} from "../utils";

export const handler = {
	addChatItem: function(chatItem) {
		const exist = !!chatItemList.value.find(item => chatItem.id == item.id);
		if (!exist) {
			chatItemList.value.push(chatItem);
		}
	},
	frendApply: function() {
		toast("您收到一个好友申请~")
		const {
			getMessageList
		} = useMessageStore()
		// 刷新消息列表
		getMessageList()
	}
}