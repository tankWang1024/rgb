<template>
	<view>
		<view class="title-box">
			<view class="rect">
				图片
			</view>
			<view class="rgb">
				<text>{{interText}}</text>
			</view>
			<view class="title-num">
				预测浓度
			</view>
		</view>
		<view v-for="(item,index) in rect" class="box">
			<canvas :canvas-id="index+'c'" v-bind:style="{width:'50px',height:'60px'}"></canvas>
			<view class="rgb">
				<text>{{inter[index].toFixed(4)}}</text>
			</view>
			<view class="num">{{MIC[index].toFixed(4)}}</view>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	export default {
		data() {
			return {
				MIC: [],
				rgbArr: [],
				rect: [],
				ctxn: [],
				interText:'',
				inter:[],
				imgInfo: null,
			}
		},
		methods: {

		},
		onReady() {
			for (let item of this.ctxn) {
				item.draw()
			}
		},
		onLoad() {
			this.rgbArr = app.globalData.rgbArr2;
			this.rect = app.globalData.rect2
			this.imgInfo = app.globalData.imgInfo2
			let linea = app.globalData.linea
			let lineb = app.globalData.lineb
			let yName = app.globalData.yName
			this.interText = yName
			switch (yName) {
				case 'R':
					console.log('R');
					for (let item of app.globalData.rgbArr2) {
						this.MIC.push((item['r'] - linea) / lineb)
						this.inter.push(item['r'])
					}
					break;
				case 'G':
					console.log('G');
					for (let item of app.globalData.rgbArr2) {
						this.MIC.push((item['g'] - linea) / lineb)
						this.inter.push(item['g'])
					}
					break;
				case 'B':
					console.log('B');
					for (let item of app.globalData.rgbArr2) {
						this.MIC.push((item['b'] - linea) / lineb)
						this.inter.push(item['b'])
					}
					break;
				case 'G/B':
					console.log('G/B');
					for (let item of app.globalData.rgbArr2) {
						this.MIC.push((item['g'] / item['b'] - linea) / lineb)
						this.inter.push(item['g'] / item['b'])
					}
					break;
				case 'R/B':
					console.log('R/B');
					for (let item of app.globalData.rgbArr2) {
						this.MIC.push((item['r'] / item['b'] - linea) / lineb)
						this.inter.push(item['r'] / item['b'])
					}
					break;
				case 'R/G':
					console.log('R/G');
					for (let item of app.globalData.rgbArr2) {
						this.MIC.push((item['r'] / item['g'] - linea) / lineb)
						this.inter.push(item['r'] / item['g'])
					}
					break;
			}
			
			let windowHeight = app.globalData.windowHeight
			let windowWidth = app.globalData.windowWidth
			for (let i = 0; i < this.rect.length; i++) {
				this.ctxn[i] = uni.createCanvasContext(i + 'c')
				// 放大系数
				let we = 50 / (Math.abs(this.rect[i].startx - this.rect[i].endx))
				let he = 60 / (Math.abs(this.rect[i].starty - this.rect[i].endy))
				this.ctxn[i].drawImage(this.imgInfo.path, -this.rect[i].startx * we, -this.rect[i].starty * he, windowWidth * we, (
					windowHeight - 100) * he)
			}
		}
	}
</script>

<style>
	.title-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 40rpx 20rpx;
		text-align: center;
	}

	.rect {
		width: 100rpx;
	}

	.title-num {
		width: 180rpx;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 40rpx 20rpx;
	}

	.rgb {
		flex: 1;
		text-align: center;
	}

	.num {
		width: 180rpx;
		text-align: center;
	}

	.rgb text {
		width: 160rpx;
		text-align: center;
	}

	.foot {
		width: 60%;
		margin: 80rpx auto 0;
	}

	.card-title {
		margin: 40rpx 0;
	}

	.card {
		padding: 20rpx;
		box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.2), 0 12rpx 40rpx 0 rgba(0, 0, 0, 0.19);
		border-radius: 20rpx;

	}

	.card-item {
		padding: 20rpx;
		border-bottom: 1rpx solid rgb(158, 166, 183);
	}

	.card-item image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 40rpx;
	}

	.btn {
		height: 70rpx;
		line-height: 70rpx;
		margin: 40rpx 0 80rpx;
		background-color: rgb(255, 196, 62);
		color: #FFFFFF;
	}
</style>
