<template>
	<view class="box">
		<canvas canvas-id="myCanvas" id="myCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}" @touchstart="startArt"
		 @touchmove="moveArt" @touchcancel="cancelArt" @touchend="endArt"></canvas>
		<canvas canvas-id="rgbCanvas" id="rgbCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}"></canvas>
		<image class="btn-img" :src="rect.length?'../../static/last.svg':'../../static/last2.svg'" @tap="revoke"></image>
		<view class="btn-box">
			<button type="default" @tap="changeGradient" class="btn gradient">{{gradientState}}</button>
			<button type="default" @tap="getRes" class="btn">确定</button>
		</view>
		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="填写浓度值" btn_cancel="取消" v-bind:style="{width:c_width+'px',height:(c_height+100)+'px'}"></prompt>
		<prompt2 ref="prompt2" @onConfirm="onConfirm2" @onCancel="onCancel2" title="填写浓度" btn_cancel="取消" v-bind:style="{width:c_width+'px',height:(c_height+100)+'px'}"></prompt2>
	</view>
</template>

<script>
	import app from '../../App.vue'

	import prompt from '../../components/prompt.vue'
	import prompt2 from '../../components/prompt2.vue'

	import {
		dataGet
	} from '../../common/utils.js'

	export default {
		components: {
			prompt,
			prompt2
		},
		data() {
			return {
				gradientFlag: false,
				imgInfo: {},
				ctx: null,
				rgbctx: null,
				c_width: 0,
				c_height: 0,
				startx: 0,
				starty: 0,
				endx: 0,
				endy: 0,
				rect: [],
				rgbArr: [],
				promptVal: 0,
				MIC: [],
			}
		},
		computed: {
			gradientState() {
				return this.gradientFlag ? '关闭梯度绘制' : '开启梯度绘制'
			}
		},
		onReady() {
			this.rgbctx.draw()
		},
		onLoad() {
			this.c_width = app.globalData.windowWidth
			this.c_height = app.globalData.windowHeight - 100
			this.imgInfo = app.globalData.imgInfo
			this.ctx = uni.createCanvasContext('myCanvas')

			this.rgbctx = uni.createCanvasContext('rgbCanvas')
			this.rgbctx.drawImage(this.imgInfo.path, 0, 0, app.globalData.windowWidth, this.c_height)

		},
		watch: {},
		methods: {
			changeGradient() {
				this.gradientFlag = !this.gradientFlag
				if (this.gradientFlag) { // 开启
				

				} else { // 关闭
					let count = this.rect.length - this.MIC.length
					console.log('矩形' + count)
					if(count){
						this.$refs.prompt2.show()
					}
				}
			},

			revoke() { // 撤销
				if (this.rect.length >= 1) {
					console.log(this.rgbArr.length,this.MIC.length,this.rect.length)
					if (this.MIC.length == this.rect.length) { // 开启梯度再撤销时，浓度数量跟矩形一样就一起撤销
						this.MIC.splice(this.MIC.length - 1, 1);
						this.rgbArr.splice(this.rgbArr.length - 1, 1);
						console.log('同时撤销了浓度值')
					}
					this.rect.splice(this.rect.length - 1, 1);
					
					this.ctx.draw()
					for (let item of this.rect) {
						this.ctx.setStrokeStyle('red')
						this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
						this.ctx.draw(true)
					}
				} else {
				}

			},
			getRes() {
				if(this.MIC.length == this.rect.length){
					app.globalData.MIC = this.MIC;
					app.globalData.rgbArr = this.rgbArr
					app.globalData.rect = this.rect
					uni.navigateTo({
						url: '../res/res'
					})
				}else{
					this.$refs.prompt2.show()
				}
				
			},
			getRGB() {
				let that = this;
				uni.canvasGetImageData({
					canvasId: 'rgbCanvas',
					x: that.startx,
					y: that.starty,
					width: that.endx - that.startx,
					height: that.endy - that.starty,
					success(res) {
						let obj = dataGet(res.data)
						that.rgbArr.push(obj)
						that.startx = 0,
							that.starty = 0,
							that.endx = 0,
							that.endy = 0
					},
					fail(err) {
						console.log(err)
					}
				}, that)
			},
			startArt(e) {
				this.startx = Math.round(e.touches[0].x)
				this.starty = Math.round(e.touches[0].y)
			},
			moveArt(e) {
				this.endx = Math.round(e.touches[0].x)
				this.endy = Math.round(e.touches[0].y)
				this.ctx.setStrokeStyle('red')
				this.ctx.strokeRect(this.startx, this.starty, this.endx - this.startx, this.endy - this.starty)
				this.ctx.draw()
			},
			endArt(e) {
				this.endx = Math.round(e.changedTouches[0].x)
				this.endy = Math.round(e.changedTouches[0].y)

				this.ctx.closePath()
				if (this.startx > this.endx) {
					let temp = this.startx
					this.startx = this.endx
					this.endx = temp
				}
				if (this.starty > this.endy) {
					let temp = this.starty
					this.starty = this.endy
					this.endy = temp
				}
				this.rect.push({
					startx: this.startx,
					starty: this.starty,
					endx: this.endx,
					endy: this.endy
				})
				this.ctx.draw()
				for (let item of this.rect) {
					this.ctx.setStrokeStyle('red')
					this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
					this.ctx.draw(true)
				}
				if (!this.gradientFlag) {
					// 非梯度状态，填这次绘制区域的浓度
					this.$refs.prompt.show();
				}
			},
			cancelArt() {
				console.log('cancel')
			},
			onConfirm(e) {
				console.log(e);
				let _cost = e;
				if (_cost == '' || isNaN(_cost)) {
					uni.showToast({
						title: '请输入有效浓度',
						icon: 'none'
					})
					return;
				} else {
					this.promptVal = e;
					this.getRGB()
					this.MIC.push(e)
					this.$refs.prompt.hide();
				}
			},
			onCancel() {
				this.$refs.prompt2.hide();
				this.promptVal = "";
				this.rect.splice(this.rect.length - 1, 1);
				this.ctx.draw()
				for (let item of this.rect) {
					this.ctx.setStrokeStyle('red')
					this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
					this.ctx.draw(true)
				}
			},
			onConfirm2(starter, gradient) {
				console.log(starter, gradient);
				let that = this;
				let length = this.MIC.length
				for (let i = this.MIC.length; i < this.rect.length; i++) {
					this.MIC.push(starter + (i - length) * gradient)
					uni.canvasGetImageData({
						canvasId: 'rgbCanvas',
						x: this.rect[i].startx,
						y: this.rect[i].starty,
						width: this.rect[i].endx - this.rect[i].startx,
						height: this.rect[i].endy - this.rect[i].starty,
						success(res) {
							let obj = dataGet(res.data)
							that.rgbArr.push(obj)
							that.startx = 0
							that.starty = 0
							that.endx = 0
							that.endy = 0
						},
						fail(err) {
							console.log(err)
						}
					}, that)
				}
				this.gradientFlag = false
				this.$refs.prompt2.hide();
			},
			onCancel2() {
				this.$refs.prompt2.hide();
				this.gradientFlag = true
			},

		}
	}
</script>

<style>
	.box {
		position: relative;
		background-color: #000000;
		z-index: 0;
	}

	.img {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}

	#rgbCanvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -999;
	}

	.btn-box {
		width: 80%;
		height: 100px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn-img {
		width: 100rpx;
		height: 80rpx;
		margin-right: 20rpx;
		position: absolute;
		right: 10%;
		bottom: 90px;
	}

	.btn-box .btn {
		height: 80rpx;
		line-height: 80rpx;
		background-color: rgb(255, 196, 62);
		margin: 0;
	}

	.gradient {
		width: 70%;
	}
</style>
