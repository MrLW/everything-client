import {
	currentSocket
} from ".";
import {
	chatItemList
} from "../pages/marryDetail/chat";
import {
	getMessageList
} from "../pages/personCenter/message";
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
		// 刷新消息列表
		getMessageList()
	}
}