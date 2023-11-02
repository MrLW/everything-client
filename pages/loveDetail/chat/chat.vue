<template>
	<view>
		<lee-chatpanel :scroll-into-view="intoView" ref="chatpanel" :addChatItem="addChatItem"
			:getChatList="getChatList" :friendId="friendId" :chatItemList="chatItemList" :title="title"
			@refresherrefresh="refresherrefresh"></lee-chatpanel>
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

	const props = defineProps(['friendId', 'title'])
	const chatpanel = ref();
	let intoView = ref('');
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
</script>

<style lang="scss">

</style>