<template>
	<view>
		<lee-chatpanel :addChatItem="addChatItem" :getChatList="getChatList" :friendId="friendId"
			:chatItemList="chatItemList" :title="title"></lee-chatpanel>
	</view>
</template>

<script setup>
	import {
		addChatItem,
		getChatList,
		chatItemList,
	} from '../../marryDetail/chat';
	defineProps(['friendId', 'title'])
</script>

<style lang="scss">

</style>