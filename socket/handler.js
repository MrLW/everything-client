import {
	chatItemList
} from "../pages/marryDetail/chat";

export const handler = {
	addChatItem: function(chatItem) {
		console.info("chatItem: ", chatItem);
		chatItemList.value.push(chatItem)
	}
}