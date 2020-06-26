<template>
	<view>
		<view class="title-box">
			<view class="rect">
				图片
			</view>
			<view class="title-num">
				浓度
			</view>
			<view class="rgb">
				<text>R</text><text>G</text><text>B</text>
			</view>
		</view>
		<view v-for="(item,index) in rect" class="box">
			<canvas :canvas-id="index+'c'" v-bind:style="{width:'50px',height:'60px'}"></canvas>
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
				<view class="card-item" v-for="(item,index) in yArr" @tap="checkY(index)">
					<image :src="index == selectIndex?'../../static/xing1.svg':'../../static/xing2.svg'" ></image>
					{{item}}
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
				yArr: ['G/B', 'R/B', 'R/G', 'R', 'G', 'B'],
				selectIndex: 0,
			}
		},
		methods:{
			checkY(index){
				this.selectIndex = index
				let y = this.yArr[index]
				
			},
			toChart(){
				uni.navigateTo({
					url:'../chart/chart?y='+this.yArr[this.selectIndex]
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
		width: 120rpx;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 40rpx 20rpx;
	}

	.rgb {
		display: flex;
		justify-content: space-around;
	}

	.num {
		width: 120rpx;
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
