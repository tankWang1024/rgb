<template>
	<view class="box">
		<canvas canvas-id="myCanvas" id="myCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}" @touchstart="startArt"
		 @touchmove="moveArt" @touchcancel="cancelArt" @touchend="endArt"></canvas>
		<canvas canvas-id="rgbCanvas" id="rgbCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}"></canvas>
		<view class="btn-box">
			<image class="btn-img" src="../../static/last.svg" @tap="revoke"></image>
			<button type="default" @tap="getRes" class="btn">确定</button>
		</view>
		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="填写浓度" btn_cancel="取消" v-bind:style="{width:c_width+'px',height:(c_height+100)+'px'}"></prompt>
	</view>
</template>

<script>
	import app from '../../App.vue'

	import prompt from '../../components/prompt.vue'

	import {
		dataGet
	} from '../../common/utils.js'

	export default {
		components: {
			prompt
		},
		data() {
			return {
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
				promptVal: "",
				MIC: [],
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
			revoke() {	// 撤销
				if (this.rect.length >= 1) {
					this.rect.splice(this.rect.length - 1, 1);
					this.rgbArr.splice(this.rgbArr.length - 1, 1);
					this.MIC.splice(this.MIC.length - 1, 1);
					this.ctx.draw()
					for (let item of this.rect) {
						this.ctx.setStrokeStyle('red')
						this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
						this.ctx.draw(true)
					}
				} else {
					// this.uni.showToast({
					// 	title: '',
					// 	icon:'none',
					// });
				}

			},
			getRes() {
				app.globalData.MIC = this.MIC;
				app.globalData.rgbArr = this.rgbArr
				app.globalData.rect = this.rect
				console.log(app.globalData.MIC)
				uni.navigateTo({
					url: '../res/res'
				})
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
						// console.log(res.data)
						let obj = dataGet(res.data)
						that.rgbArr.push(obj)
						// that.startx = 0,
						// that.starty = 0,
						// that.endx = 0,
						// that.endy = 0
					},
					fail(err) {

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
				// for (let item of this.rect) {	// 性能太差
				// 	this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
				// 	this.ctx.draw(true)
				// }
			},
			endArt(e) {
				this.ctx.closePath()
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

				// 填这次绘制区域的浓度
				this.$refs.prompt.show();
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
					this.$refs.prompt.hide();
					this.getRGB()
					this.MIC.push(e)
				}
			},
			onCancel() {
				this.$refs.prompt.hide();
				this.$refs.prompt.cost = ''
				this.promptVal = "";
				this.rect.splice(this.rect.length - 1, 1);
				this.ctx.draw()
				for (let item of this.rect) {
					this.ctx.setStrokeStyle('red')
					this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
					this.ctx.draw(true)
				}
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
	}

	.btn-box .btn {
		height: 80rpx;
		line-height: 80rpx;
		background-color: rgb(255, 196, 62);
		margin: 0;
	}
</style>
