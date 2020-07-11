<template>
	<view>
		<view class="title-box">
			<view class="rect">
				图片
			</view>
			<view class="num">
				浓度
			</view>
			<view class="rgb">
				<text>R</text><text>G</text><text>B</text>
			</view>
		</view>
		<view v-for="(item,index) in rect" class="box">
			<view class="canWarp">
				<canvas :canvas-id="index+'c'" v-bind:style="{width:'60px',height:'50px'}"></canvas>
			</view>
			<view class="num">{{MIC[index]}}</view>
			<view class="rgb">
				<text>{{rgbArr[index].r.toFixed(2)}}</text>
				<text>{{rgbArr[index].g.toFixed(2)}}</text>
				<text>{{rgbArr[index].b.toFixed(2)}}</text>
			</view>
		</view>
		<view class="foot">
			<view class="card-title">
				选择关系
			</view>
			<view class="card">
				<view class="card-item" v-for="(item,index) in yArr" @tap="checkY(index)" :class="[index === selectIndex?'selectItem':'']">
					<image :src="index == selectIndex?'../../static/check.svg':''"></image>
					<view class="item-text">
						{{item}}
					</view>
				</view>
			</view>
			<button class="btn" @tap="toChart">确定</button>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	export default {
		data() {
			return {
				windowWidth: 0,
				windowHeight: 0,
				MIC: [],
				rgbArr: [],
				rect: [],
				ctxn: [],
				imgInfo: null,
				yArr: ['G/B', 'R/B', 'R/G', 'R', 'G', 'B', '灰度'],
				selectIndex: 0,
			}
		},
		methods: {
			checkY(index) {
				this.selectIndex = index
				let y = this.yArr[index]
			},
			toChart() {
				uni.navigateTo({
					url: '../chart/chart?y=' + this.yArr[this.selectIndex]
				})
			}
		},
		onReady() {
			for (let item of this.ctxn) {
				item.draw()
			}
		},
		onLoad() {
			this.MIC = app.globalData.MIC;
			this.rgbArr = app.globalData.rgbArr;
			this.rect = app.globalData.rect
			this.windowWidth = app.globalData.windowWidth
			this.windowHeight = app.globalData.windowHeight
			this.imgInfo = app.globalData.imgInfo
			let c_height = app.globalData.windowHeight - 100
			let c_width = app.globalData.windowWidth

			if (this.imgInfo.width < this.imgInfo.height) {
				for (let i = 0; i < this.rect.length; i++) {
					this.ctxn[i] = uni.createCanvasContext(i + 'c')
					// 放大系数
					let we = 60 / (Math.abs(this.rect[i].startx - this.rect[i].endx))
					let he = 50 / (Math.abs(this.rect[i].starty - this.rect[i].endy))
					this.ctxn[i].drawImage(this.imgInfo.path, -this.rect[i].startx * we, -this.rect[i].starty * he, c_width * we,
						c_height * he)
				}
			} else {	// 旋转图片
				for (let i = 0; i < this.rect.length; i++) {
					this.ctxn[i] = uni.createCanvasContext(i + 'c')
					// 放大系数
					let xe = 50 / (Math.abs(this.rect[i].starty - this.rect[i].endy))
					let ye = 60 / (Math.abs(this.rect[i].startx - this.rect[i].endx))
					this.ctxn[i].rotate(Math.PI / 2)
					this.ctxn[i].translate(0, -60)
					this.ctxn[i].scale(xe,ye)
					this.ctxn[i].drawImage(this.imgInfo.path,-this.rect[i].starty,this.rect[i].endx -c_width, c_height, c_width)
				}
			}

		}
	}
</script>

<style>
	.title-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 40rpx;
		text-align: center;
		background-color: #000000;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.rect {
		width: 120rpx;
		text-align: center;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 40rpx 0;
		margin: 0 40rpx;
		border-bottom: 1px solid rgb(210, 210, 210);
		font-size: 28rpx;
		text-align: center;
	}

	.rgb {
		flex: 1;
		display: flex;
		justify-content: space-around;
	}

	.num {
		width: 200rpx;
		text-align: center;
	}

	.canWarp {
		border-radius: 20rpx;
		overflow: hidden;
	}

	.rgb text {
		flex: 1;
	}

	.foot {
		margin: 80rpx 40rpx;
	}

	.card-title {
		margin: 40rpx 0;
	}

	.card {
		display: grid;
		grid-template-columns: repeat(2, 47%);
		grid-gap: 6%;
	}

	.card-item {
		width: 100%;
		height: 160rpx;
		color: #FFFFFF;
		border-radius: 30rpx;
		padding: 40rpx;
		margin: 16rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border: 1px solid rgb(187, 187, 187);
		color: rgb(176, 176, 176);
	}

	.card-item image {
		width: 40rpx;
		height: 40rpx;
		padding: 8rpx;
		box-sizing: border-box;
		border-radius: 50%;
		background-color: #FFFFFF;
		border: 1px solid rgb(176, 176, 176);
	}

	.item-text {
		height: 38rpx;
		font-size: 38rpx;
		text-align: right;
	}

	.selectItem {
		background-color: rgb(92, 80, 241);
		color: #FFFFFF;
		border: none;
	}

	.selectItem image {
		border: none;
	}

	.btn {
		border-radius: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		/* box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.2), 0 12rpx 40rpx 0 rgba(0, 0, 0, 0.19); */
		margin: 60rpx 0 80rpx;
		color: #000000;
		background-color: rgb(255, 196, 62);
		font-size: 32rpx;
	}
</style>
