<template>
	<view>
		<lee-chatpanel ref="chatpanel" :addChatItem="addChatItem" :getChatList="getChatList" :friendId="friendId"
			:chatItemList="chatItemList" :title="title" @refresherrefresh="refresherrefresh"></lee-chatpanel>
	</view>
</template>

<script setup>
	import {
		addChatItem,
		getChatList,
		chatItemList,
		pageNum,
	} from '../../marryDetail/chat';
	import {
		ref
	} from 'vue'
	import {
		currentSocket
	} from '../../../socket';
	import {
		SOCKET_EVENT_NAME
	} from '../../../utils/constant';

	const props = defineProps(['friendId', 'title'])
	const chatpanel = ref();
	// 重置
	pageNum.value = 1;
	chatItemList.value = []
	getChatList(props.friendId)
		.then((res) => {
			const list = res.value;
			chatpanel.value.onload(`et-` + list[list.length - 1].id);
		})

	function refresherrefresh() {
		pageNum.value++
		getChatList(props.friendId).then(() => {
			chatpanel.value.closerefresherrefresh()
		})
	}

	currentSocket && currentSocket.value && currentSocket.value.on(SOCKET_EVENT_NAME.USER_CHAT_UPDATE_INTOVIEW, function({
		id
	}) {
		chatpanel.value.updateIntoViewId(id)
	})
</script>

<style lang="scss">

</style>