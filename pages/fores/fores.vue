<template>
	<view>
		<view class="title-box">
			<view class="rect">
				图片
			</view>
			<view class="num">
				序号
			</view>
			<view class="rgb">
				<text>{{interText}}</text>
			</view>
			<view class="num">
				预测浓度
			</view>
		</view>
		<view v-for="(item,index) in rect" class="box">
			<view class="canWarp">
				<canvas :canvas-id="index+'c'" v-bind:style="{width:'60px',height:'50px'}"></canvas>
			</view>
			<view class="num">
				{{index+1}}
			</view>
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
				interText: '',
				inter: [],
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
		onLoad(options) {
			uni.setNavigationBarTitle({
				title:options.title
			})
			let c_height = app.globalData.windowHeight - 130
			let c_width = app.globalData.windowWidth
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
				case '灰度':
					console.log('灰度');
					for (let item of app.globalData.rgbArr) {
						this.MIC.push((0.299 * item['r'] + 0.587 * item['g'] + 0.114 * item['b'] - linea) / lineb)
						this.inter.push(0.299 * item['r'] + 0.587 * item['g'] + 0.114 * item['b'])
					}
					break;
			}
			if(this.imgInfo.width < this.imgInfo.height){
				for (let i = 0; i < this.rect.length; i++) {
					this.ctxn[i] = uni.createCanvasContext(i + 'c')
					// 放大系数
					let we = 50 / (Math.abs(this.rect[i].startx - this.rect[i].endx))
					let he = 60 / (Math.abs(this.rect[i].starty - this.rect[i].endy))
					this.ctxn[i].drawImage(this.imgInfo.path, -this.rect[i].startx * we, -this.rect[i].starty * he, c_width * we, c_height * he)
				}
			}else {	// 旋转图片
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
		justify-content: center;
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
</style>
