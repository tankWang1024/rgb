<template>
	<view class="content">
		<view class="main">
			<image class="logo-img" src="../../static/logo.svg" mode="scaleToFill"></image>
			<!-- <text>concentration prediction</text> -->
			<text>浓度预测</text>
		</view>
		<view class="btn-box">
			<button class="btn" @click="toPhoto">开始检测</button>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			toPhoto() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: 'original',
					success(res) {
						let tempFilePath = res.tempFilePaths[0]
						let systemInfo = uni.getSystemInfoSync()
						console.log(systemInfo)
						app.globalData.windowHeight = systemInfo.windowHeight
						app.globalData.windowWidth = systemInfo.windowWidth	// 屏幕可视宽度
						uni.getImageInfo({
							src: tempFilePath,
							success(res) {
								console.log(res)
								app.globalData.imgInfo = res
								uni.navigateTo({
									url: '../canvas/canvas'
								})
							},
							fail(err) {
 
							},
						}) 
					},
					fail(err) {
						console.log('取消选图')
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}

	.main {
		height: 70%;
		letter-spacing: 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url(../../static/index.png);
		background-size: 100% 100%;
	}

	.logo-img {
		width: 140rpx;
		height: 140rpx;
		padding: 40rpx;
		background-color: rgb(92, 80, 241);
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}

	.btn-box {
		height: 30%;
		width: 70%;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.btn {
		background-color: rgb(92, 80, 241);
		color: #FFFFFF;
		flex: 1;
		letter-spacing: 2rpx;
	}
</style>
