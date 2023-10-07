<template>
	<view class="container">
		<view class="main">
			<view class="header">
				<view class="tip">欢迎您来到</view>
				<view class="title">{{title}}</view>
			</view>
			<view class="content">
				<view class="modules">
					<view class="moduleItem" v-for="moduleItem in modules" :key="moduleItem.id"
						@click="goPage(moduleItem)">
						<text class="iconfont icon-teshuriqi" :class="moduleItem.className"></text>
						<text>
							{{ moduleItem.name }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue'
	import {
		title,
		modules,
		goPage,
	} from '.';
	import {
		login
	} from '../personCenter';
	onMounted(function() {
		login()
	})
</script>

<style lang="scss">
	.container {

		height: 100%;
		background-image: linear-gradient(to right bottom, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));

		.main {
			height: 100%;
			width: 80%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

			.header {
				.tip {
					text-align: center;
					font-size: 20rpx;
				}

				.title {
					font-size: 40rpx;
					margin-top: 80rpx;
				}
			}

			.content {
				.modules {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
				}

				.moduleItem {
					width: 120rpx;
					height: 120rpx;
					text-align: center;
					white-space: normal;
					font-size: 26rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.iconfont {
						font-size: 40rpx;
					}
				}
			}
		}
	}
</style>