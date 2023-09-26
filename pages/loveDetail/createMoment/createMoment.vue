<template>
	<view class="container">

		<view class="imageControl">
			<view class="images">
				<image :src="item" mode="" v-for="(item, index) in moment.images" @click="previewImage(item)"
					@longpress="showDeleteDialog(index)"></image>
			</view>
			<van-uploader :after-read="afterRead" />
		</view>

		<view class="main">
			<view class="title">
				<!-- 可以使用 CellGroup 作为容器 -->
				<van-cell-group inset>
					<van-field v-model="moment.title" placeholder="分享你们此次恋爱的标题哦~" />

					<van-field v-model="moment.content" rows="6" autosize type="textarea" placeholder="分享你们此次恋爱的内容哦~" />
					<view class="btnControllList">
						<van-switch v-model="moment.public" active-color="#f16c61" />
						<button class="btn" @click="publish">{{ moment.public ? '发布': '草稿' }}</button>
					</view>
				</van-cell-group>

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
		showImagePreview
	} from 'vant';
	const moment = reactive({
		title: '',
		content: '',
		public: false,
		images: []
	})
	let deleteImageIndex = 0;
	/**
	 *  选中文件之后的回调
	 */
	const afterRead = (file) => {
		if (moment.images.length >= 3) {
			uni.showToast({
				title: "最多上传3张图片",
				icon: 'none'
			})
			return false;
		}
		moment.images.push(file.content);
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
	 *  预览图片
	 */
	const previewImage = async (url) => {
		showImagePreview([url])
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
			.btnControllList {
				padding: 20rpx 20rpx;
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