<template>
	<view class="box">
		<canvas canvas-id="myCanvas" id="myCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}" @touchstart="startArt"
		 @touchmove="moveArt" @touchcancel="cancelArt" @touchend="endArt"></canvas>
		<canvas canvas-id="rgbCanvas" id="rgbCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}"></canvas>
		<view class="btn-box">
			<image class="btn-img" :src="rect.length?'../../static/last.svg':'../../static/last2.svg'" @tap="revoke"></image>
			<image class="btn-img" :src="rect.length?'../../static/move.svg':'../../static/move2.svg'" @tap="changeMove"></image>
			<button type="default" @tap="getForecast" class="btn">去预测</button>
		</view>
		<prompt ref="prompt" @onConfirm="onConfirm" title="命名" btn_cancel="取消" v-bind:style="{width:c_width+'px',height:(c_height+100)+'px'}"></prompt>
	</view>
</template>

<script>
	import app from '../../App.vue'
	import prompt from '../../components/prompt3.vue'

	import {
		dataGet,
		rotateImg
	} from '../../common/utils.js'
	var title = ""
	export default {
		components: {
			prompt
		},
		data() {
			return {
				movingIndex: -1,
				moveStartx: '',
				moveStarty: '',
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
				MIC: [],
				promptVal: "",
			}
		},
		onReady() {
			this.rgbctx.draw()
			this.$refs.prompt.show();
		},
		onLoad() {
			this.c_width = app.globalData.windowWidth
			this.c_height = app.globalData.windowHeight - 100
			this.imgInfo = app.globalData.imgInfo2
			this.ctx = uni.createCanvasContext('myCanvas')
			this.ctx.setFontSize(26)

			this.rgbctx = uni.createCanvasContext('rgbCanvas')
			rotateImg(this)

		},
		methods: {
			changeMove() {
				if (this.rect.length) {
					console.log('change')
					this.moveFlag = !this.moveFlag
				}
			},
			startArt(e) {
				if (this.moveFlag) {
					if (this.rect.length) {
						for (let i = 0; i < this.rect.length; i++) {
							if (Math.round(e.touches[0].x) > this.rect[i].startx &&
								Math.round(e.touches[0].x) < this.rect[i].endx &&
								Math.round(e.touches[0].y) > this.rect[i].starty &&
								Math.round(e.touches[0].y) < this.rect[i].endy) {
								this.movingIndex = i;
								this.moveStartx = Math.round(e.touches[0].x)
								this.moveStarty = Math.round(e.touches[0].y)
								break;
							}
						}
					}else{
						return
					}
				} else {
					this.startx = Math.round(e.touches[0].x)
					this.starty = Math.round(e.touches[0].y)
				}
			},
			moveArt(e) {
				this.ctx.setStrokeStyle('red')
				if (this.moveFlag) {
					if (this.movingIndex >= 0) {
						let endx = Math.round(e.touches[0].x)
						let endy = Math.round(e.touches[0].y)
						let disX = endx - this.moveStartx
						let disY = endy - this.moveStarty
						let width = this.rect[this.movingIndex].endx - this.rect[this.movingIndex].startx
						let height = this.rect[this.movingIndex].endy - this.rect[this.movingIndex].starty
						this.ctx.strokeRect(this.rect[this.movingIndex].startx + disX, this.rect[this.movingIndex].starty + disY, width,
							height)
						console.log('移动')
					}else{
						return
					}
				} else {
					this.endx = Math.round(e.touches[0].x)
					this.endy = Math.round(e.touches[0].y)
					this.ctx.strokeRect(this.startx, this.starty, this.endx - this.startx, this.endy - this.starty)
				}
				this.ctx.draw()
			},
			endArt(e) {
				if (this.moveFlag) {
					if (this.movingIndex >= 0) {
						let endx = Math.round(e.changedTouches[0].x)
						let endy = Math.round(e.changedTouches[0].y)
						let disX = endx - this.moveStartx
						let disY = endy - this.moveStarty
						this.rect[this.movingIndex] = {
							startx: this.rect[this.movingIndex].startx + disX,
							starty: this.rect[this.movingIndex].starty + disY,
							endx: this.rect[this.movingIndex].endx + disX,
							endy: this.rect[this.movingIndex].endy + disY
						}
						for (let item of this.rect) {
							this.ctx.setStrokeStyle('red')
							this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
							this.ctx.draw(true)
						}
						this.movingIndex = -1;
					}else{
						return
					}
				} else {
					this.endx = Math.round(e.changedTouches[0].x)
					this.endy = Math.round(e.changedTouches[0].y)
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
					this.ctx.closePath()
					this.ctx.draw();
					for (let i = 0; i < this.rect.length; i++) {
						this.ctx.setStrokeStyle('red')
						this.ctx.setFillStyle('red')
						this.ctx.strokeRect(this.rect[i].startx, this.rect[i].starty, this.rect[i].endx - this.rect[i].startx, this.rect[
								i]
							.endy - this.rect[i].starty)
						this.ctx.fillText(i + 1, this.rect[i].endx, this.rect[i].starty) // 序号
						this.ctx.draw(true)
					}
					this.getRGB()
				}
			},
			onConfirm(e) {
				title = e;
				this.$refs.prompt.hide();
			},
			revoke() { // 撤销
				if (this.rect.length >= 1) {
					this.rect.splice(this.rect.length - 1, 1);
					this.rgbArr.splice(this.rgbArr.length - 1, 1);
					this.ctx.draw()
					for (let i = 0; i < this.rect.length; i++) {
						this.ctx.setStrokeStyle('red')
						this.ctx.setFillStyle('red')
						this.ctx.strokeRect(this.rect[i].startx, this.rect[i].starty, this.rect[i].endx - this.rect[i].startx, this.rect[
								i]
							.endy - this.rect[i].starty)
						this.ctx.fillText(i + 1, this.rect[i].endx, this.rect[i].starty) // 序号
						this.ctx.draw(true)
					}
				}
			},
			getForecast() {
				app.globalData.rgbArr2 = this.rgbArr
				app.globalData.rect2 = this.rect
				uni.navigateTo({
					url: '../fores/fores?title=' + title
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
						let obj = dataGet(res.data)
						that.rgbArr.push(obj)
					},
					fail(err) {

					}
				}, that)
			},
			cancelArt() {
				console.log('cancel')
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
