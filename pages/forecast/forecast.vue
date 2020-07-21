<template>
	<view class="box">
		<canvas canvas-id="myCanvas" id="myCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}" @touchstart="startArt"
		 @touchmove="moveArt" @touchcancel="cancelArt" @touchend="endArt"></canvas>
		<canvas canvas-id="rgbCanvas" id="rgbCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}"></canvas>

		<view class="toolbar">
			<view class="toolbar-item" @tap="copyRect">
				<image class="btn-img" :src="rect.length?'../../static/copy.svg':'../../static/copy2.svg'"></image>
				<text class="toolbar-text">复制</text>
			</view>
			<view class="toolbar-item" @tap="changeMove">
				<image class="btn-img" :src="moveFlag?'../../static/move.svg':'../../static/move2.svg'"></image>
				<text class="toolbar-text" :class="{'activate':moveFlag}">移动</text>
			</view>
			<view class="toolbar-item" @tap="revoke">
				<image class="btn-img" :src="rect.length?'../../static/last.svg':'../../static/last2.svg'"></image>
				<text class="toolbar-text">撤销</text>
			</view>
		</view>

		<view class="btn-box">
			<button @tap="changeName" class="btn large-btn">修改命名</button>
			<button @tap="getForecast" class="btn">去预测</button>
		</view>
		<prompt ref="prompt" @onConfirm="onConfirm" title="命名" btn_cancel="取消"></prompt>
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
				moveFlag: false,
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
			this.c_height = app.globalData.windowHeight - 130
			this.imgInfo = app.globalData.imgInfo2
			this.ctx = uni.createCanvasContext('myCanvas')
			this.ctx.setFontSize(26)

			this.rgbctx = uni.createCanvasContext('rgbCanvas')
			rotateImg(this)

		},
		methods: {
			changeName() {
				this.$refs.prompt.show();
			},
			setxy(startx,starty,endx,endy){
				this.startx = startx
				this.starty = starty
				this.endx = endx
				this.endy = endy
			},
			copyRect() {
				if (this.rect.length) {
					this.rect.push({
						startx: this.rect[0].startx + 10,
						starty: this.rect[0].starty + 10,
						endx: this.rect[0].endx + 10,
						endy: this.rect[0].endy + 10
					})
					this.setxy(this.rect[0].startx + 10,this.rect[0].starty + 10,this.rect[0].endx + 10,this.rect[0].endy + 10)
					this.ctx.strokeRect(this.rect[0].startx + 10, this.rect[0].starty + 20, this.rect[0].endx - this.rect[0].startx,
						this.rect[0].endy - this.rect[0].starty)
					this.ctx.fillText(this.rect.length, this.rect[-1].endx, this.rect[-1].starty)
					this.ctx.draw(true)
					this.getRGB()
				} else {
					return
				}
			},
			changeMove() {
				if (this.rect.length) {
					console.log('change')
					this.moveFlag = !this.moveFlag
				}
			},
			startArt(e) {
				if (this.moveFlag) {
					if (this.rect.length) {
						let disx = this.c_width
						let disy = this.c_height
						for (let i = 0; i < this.rect.length; i++) {
							if (Math.round(e.touches[0].x) > this.rect[i].startx &&
								Math.round(e.touches[0].x) < this.rect[i].endx &&
								Math.round(e.touches[0].y) > this.rect[i].starty &&
								Math.round(e.touches[0].y) < this.rect[i].endy) {
								let x = e.touches[0].x - this.rect[i].startx
								let y = e.touches[0].y - this.rect[i].startx
								if (x <= disx && y <= disy) {
									this.movingIndex = i;
									this.moveStartx = Math.round(e.touches[0].x)
									this.moveStarty = Math.round(e.touches[0].y)
								}
							}
						}
					} else {
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
					} else {
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
						let _startx = this.rect[this.movingIndex].startx + disX
						let _starty = this.rect[this.movingIndex].starty + disY
						let _endx = this.rect[this.movingIndex].endx + disX
						let _endy = this.rect[this.movingIndex].endy + disY
						this.$set(this.rect, this.movingIndex, {
							startx: _startx,
							starty: _starty,
							endx: _endx,
							endy: _endy
						})
						for (let item of this.rect) {
							this.ctx.setStrokeStyle('red')
							this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
							this.ctx.draw(true)
						}
						this.setxy(_startx,_starty,_endx,_endy)
						this.rgbArr.splice(this.rgbArr.length - 1, 1);
						this.getRGB()
						this.movingIndex = -1;
					} else {
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
		height: 100%;
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
		height: 70px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.toolbar {
		width: 80%;
		height: 60px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.toolbar-item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 10px;
		padding: 0 10px;
	}

	.toolbar-item:nth-of-type(1) {
		align-items: flex-start;
		margin-left: -10px;
	}

	.toolbar-item:nth-of-type(2) {
		align-items: center;
	}

	.toolbar-item:nth-of-type(3) {
		align-items: flex-end;
		margin-right: -10px;
	}

	.toolbar-text {
		margin-top: 4px;
		width: 40px;
		text-align: center;
		color: #8a8a8a;
	}

	.active-text {
		color: #FFFFFF;
	}

	.activate {
		color: rgb(255, 196, 62);
	}

	.btn-img {
		width: 50px;
		height: 40px;
	}

	.btn-box .btn {
		height: 40px;
		line-height: 40px;
		background-color: rgb(255, 196, 62);
		margin: 0;
	}

	.large-btn {
		width: 60%;
	}
</style>
