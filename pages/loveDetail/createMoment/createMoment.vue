<template>
	<view class="container">

		<view class="imageControl">
			<uni-file-picker limit="3" @select="select"></uni-file-picker>

		</view>

		<view class="main">
			<view class="title">
				<!-- 可以使用 CellGroup 作为容器 -->
				<view inset>
					<input v-model="moment.title" placeholder="分享你们此次恋爱的标题哦~"
						placeholder-style="color:darkgrey; font-size:28rpx" />
					<view class="line"></view>
					<textarea v-model="moment.content" rows="6" autosize type="textarea" placeholder="添加正文"
						placeholder-style="color:darkgrey; font-size:20rpx" />
					<view class="btnControllList">
						<lee-switch v-model="moment.public" color="#f16c61" />
						<button class="btn" @click="publish">{{ moment.public ? '发布': '草稿' }}</button>
					</view>
				</view>
			</view>
		</view>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="error" cancelText="取消" confirmText="删除" title="删除警告" content="确认删除此图片？"
					@confirm="deleteImage"></uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		createRecordDayLoveMoment
	} from '../../../api/recordDay';
	import {
		base64
	} from '../../../utils';



	const moment = reactive({
		title: '',
		content: '',
		public: true,
		images: []
	})
	let deleteImageIndex = 0;
	/**
	 *  选中文件之后的回调
	 */
	const select = async (file) => {
		const tmpFile = file.tempFiles[0];
		const imageUrl = await base64(tmpFile.url, 'jpg');
		moment.images.push(imageUrl);
	}



	/**
	 *  发布瞬间
	 */
	const publish = async () => {
		createRecordDayLoveMoment(moment).then(() => {
			uni.showToast({
				title: "发布成功",
				icon: 'none'
			})
			uni.navigateBack().then(() => {
				console.log("返回成功")
			}).catch(err => {
				console.log("返回失败")

			})
		})
	}

	/**
	 *  弹出删除对话框
	 */
	const alertDialog = ref();
	const showDeleteDialog = async (index) => {
		deleteImageIndex = index;
		alertDialog.value.open()
	}
	/**
	 *  删除图片
	 */
	const deleteImage = async () => {
		moment.images.splice(deleteImageIndex, 1)
	}
</script>

<style lang="scss">
	.container {
		height: 100%;

		.imageControl {
			padding: 30rpx 50rpx;
			display: flex;

			.images {
				display: flex;

				image {
					width: 160rpx;
					height: 160rpx;
					margin-right: 4rpx;
				}
			}
		}

		.main {
			padding: 20rpx 40rpx;

			.line {
				margin: 20rpx 0;
				background-color: darkgrey;
				width: 100%;
				height: 1rpx;
			}

			.btnControllList {
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;


				button {
					background-color: #f16c61;
					width: 70%;
					border-radius: 50rpx;
					color: white;
				}
			}
		}
	}
</style>