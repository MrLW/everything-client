import {
	chatItemList
} from "../pages/marryDetail/chat";

export const handler = {
	addChatItem: function(chatItem) {
		const exist = !!chatItemList.value.find(item => chatItem.id == item.id);
		console.log("#chatItem: ", chatItem, chatItemList.value, !!exist)
		if (!exist) {
			chatItemList.value.push(chatItem);
		}
	}
}