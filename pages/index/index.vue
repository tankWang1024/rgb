<template>
	<view class="content">
		<view class="main">
			<image class="logo-img" src="../../static/logo.svg" mode="scaleToFill"></image>
			<!-- <text>concentration\nmeasurement</text> -->
			<text>Intelligent\nDetection</text>
		</view>
		<view class="btn-box">
			<button class="btn" @tap="boxShow">start</button>
		</view>
		<view class="showbox" @tap="cancelBox" v-if="show">
			<view class="line line1" @tap="toCamera">camera</view>
			<view class="line line2" @tap="toAlbum">take a picture</view>
			<view class="line line3" @tap="cancelBox">cancel</view>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	export default {
		data() {
			return {
				show: false
			}
		},
		onLoad() {

		},
		methods: {
			cancelBox(e) {
				console.log(e)
				this.show= false
			},
			boxShow() {
				this.show = true;
			},
			toCamera() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: 'original',
					sourceType: ['camera'],
					success(res) {
						let tempFilePath = res.tempFilePaths[0]
						let systemInfo = uni.getSystemInfoSync()
						console.log(systemInfo)
						app.globalData.windowHeight = systemInfo.windowHeight
						app.globalData.windowWidth = systemInfo.windowWidth // 屏幕可视宽度
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
								console.log(err)
							},
						})
					},
					fail(err) {
						console.log('取消选图')
					}
				})
			},
			toAlbum() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: 'original',
					sourceType: ['album'],
					success(res) {
						let tempFilePath = res.tempFilePaths[0]
						let systemInfo = uni.getSystemInfoSync()
						console.log(systemInfo)
						app.globalData.windowHeight = systemInfo.windowHeight
						app.globalData.windowWidth = systemInfo.windowWidth // 屏幕可视宽度
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
								console.log(err)
							},
						})
					},
					fail(err) {
						console.log('取消选图')
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}

	.main {
		height: 70%;
		/* letter-spacing: 28rpx; */
		letter-spacing: 2px;
		font-size: 20px;
		text-align: center;
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

	.showbox {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		background-color: rgba(98, 98, 98, .65);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.line {
		width: 95%;
		margin: 0 auto;
		font-size: 36rpx;
		height: 2.3em;
		line-height: 2.3em;
		text-align: center;
		background-color: #FFFFFF;
		opacity: 1;
	}

	.line1 {
		border-radius: 10rpx 10rpx 0 0;
		border-bottom: 1px solid rgb(220, 220, 223);
	}

	.line2 {
		border-radius: 0 0 10rpx 10rpx;
	}

	.line3 {
		margin-top: 20rpx;
		margin-bottom: .5em;
		border-radius: 10rpx;
		font-weight: 600;
	}
</style>
