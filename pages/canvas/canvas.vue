<template>
	<view class="box">
		<canvas canvas-id="myCanvas" id="myCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}" @touchstart="startArt"
		 @touchmove="moveArt" @touchcancel="cancelArt" @touchend="endArt"></canvas>
		<canvas canvas-id="rgbCanvas" id="rgbCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}"></canvas>
		<view class="toolbar">
			<view class="toolbar-item" @tap="copyRect">
				<image class="btn-img" :src="rect.length?'../../static/copy.svg':'../../static/copy2.svg'"></image>
				<text class="toolbar-text" :class="{'active-text':rect.length}"> add</text>
			</view>
			<view class="toolbar-item" @tap="changeMove">
				<image class="btn-img" :src="moveFlag?'../../static/sel.svg':'../../static/sel2.svg'"></image>
				<text class="toolbar-text" :class="{'activate':!moveFlag}">draw</text>
			</view>
			<view class="toolbar-item" @tap="revoke">
				<image class="btn-img" :src="rect.length?'../../static/last.svg':'../../static/last2.svg'"></image>
				<text class="toolbar-text" :class="{'active-text':rect.length}">revoke</text>
			</view>
		</view>
		<view class="btn-box">
			<!-- <button @tap="changeGradient" class="gradient" :class="{'activebtn':gradientFlag}">{{gradientState}}</button> -->
			<button @tap="writeC" class="gradient" :class="{'activebtn':!next}">set concentration</button>
			<button @tap="getRes" class="btn">confirm</button>
		</view>
		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="填写浓度值" btn_cancel="取消"></prompt>
		<!-- <prompt2 ref="prompt2" @onConfirm="onConfirm2" @onCancel="onCancel2" title="填写浓度" btn_cancel="取消"></prompt2> -->
	</view>
</template>

<script>
	import app from '../../App.vue'

	import prompt from '../../components/prompt.vue'
	// import prompt2 from '../../components/prompt2.vue'

	import {
		dataGet,
		rotateImg
	} from '../../common/utils.js'

	export default {
		components: {
			prompt,
			// prompt2
		},
		data() {
			return {
				next: true,
				gradientFlag: false,
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
				promptVal: 0,
				MIC: [],
			}
		},
		computed: {
			// gradientState() {
			// 	return this.gradientFlag ? '关闭梯度绘制' : '开启梯度绘制'
			// }
		},
		onReady() {
			this.rgbctx.draw()
		},
		onLoad() {
			this.c_width = app.globalData.windowWidth
			this.c_height = app.globalData.windowHeight - 130
			this.imgInfo = app.globalData.imgInfo

			this.ctx = uni.createCanvasContext('myCanvas')
			this.rgbctx = uni.createCanvasContext('rgbCanvas')
			rotateImg(this) // 是否旋转图片
		},
		methods: {
			writeC() {
				if (this.rect.length > this.MIC.length) {
					this.$refs.prompt.show()
				}
			},
			copyRect() { // 复制，并改为移动状态,未获取rgb，默认用户会移动这个复制得到的矩形框
				if (this.next) {
					if (this.rect.length) {
						this.rect.push({
							startx: this.rect[0].startx + 10,
							starty: this.rect[0].starty + 10,
							endx: this.rect[0].endx + 10,
							endy: this.rect[0].endy + 10
						})
						this.ctx.strokeRect(this.rect[0].startx + 10, this.rect[0].starty + 20, this.rect[0].endx - this.rect[0].startx,
							this.rect[0].endy - this.rect[0].starty)
						this.ctx.draw(true)
						// if (!this.gradientFlag) { // 梯度状态下先不输入浓度
						// 	this.$refs.prompt.show()
						// }
						this.moveFlag = true
						this.next = false
					} else {
						return
					}
				} else {
					uni.showToast({
						title: '未填写浓度，无法进行下一步',
						icon: 'none'
					})
				}
			},
			changeMove() {
				console.log('change')
				this.moveFlag = !this.moveFlag
			},
			startArt(e) {
				if (this.moveFlag) {
					if (this.rect.length) {
						let disx = this.c_width
						let disy = this.c_height
						for (let i = 0; i < this.rect.length; i++) {
							let movex = Math.floor((this.rect[i].endx - this.rect[i].startx) / 2)
							let movey = Math.floor((this.rect[i].endy - this.rect[i].starty) / 2)
							// console.log(e.touches[0].x,e.touches[0].y)
							// console.log(this.rect[i])
							// console.log(movex,movey)
							if (Math.round(e.touches[0].x) > this.rect[i].startx &&
								Math.round(e.touches[0].x) < this.rect[i].endx + movex &&
								Math.round(e.touches[0].y) > this.rect[i].starty &&
								Math.round(e.touches[0].y) < this.rect[i].endy + movey) {
								let x = e.touches[0].x - this.rect[i].startx
								let y = e.touches[0].y - this.rect[i].starty
								if (x <= disx && y <= disy) {
									disx = x
									disy = y
									this.movingIndex = i;
									this.moveStartx = Math.round(e.touches[0].x)
									this.moveStarty = Math.round(e.touches[0].y)
								}
							}
						}
						// console.log(this.movingIndex)
					} else {
						console.log('无矩形可以移动')
						return
					}

				} else {
					if (this.next) {
						this.startx = Math.round(e.touches[0].x)
						this.starty = Math.round(e.touches[0].y)
					} else {
						uni.showToast({
							title: '未填写浓度，无法进行下一步',
							icon: 'none'
						})
					}
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
						this.ctx.draw()
					} else {
						return
					}
				} else {
					if (this.next) {
						this.endx = Math.round(e.touches[0].x)
						this.endy = Math.round(e.touches[0].y)
						this.ctx.strokeRect(this.startx, this.starty, this.endx - this.startx, this.endy - this.starty)
						this.ctx.draw()
					} else {
						return
					}
				}
			},
			endArt(e) {
				if (this.moveFlag) {
					if (this.movingIndex >= 0) {
						let endx = Math.round(e.changedTouches[0].x)
						let endy = Math.round(e.changedTouches[0].y)
						let disX = endx - this.moveStartx
						let disY = endy - this.moveStarty
						let startx = this.rect[this.movingIndex].startx + disX
						let starty = this.rect[this.movingIndex].starty + disY
						endx = this.rect[this.movingIndex].endx + disX
						endy = this.rect[this.movingIndex].endy + disY
						this.rect[this.movingIndex] = {
							startx: startx,
							starty: starty,
							endx: endx,
							endy: endy
						}
						this.startx = startx
						this.starty = starty
						this.endx = endx
						this.endy = endy
						this.ctx.draw()
						for (let item of this.rect) {
							this.ctx.setStrokeStyle('red')
							this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
							this.ctx.draw(true)
						}
						this.movingIndex = -1;
						// let that = this
						// console.log(this.rect[this.movingIndex])
						// uni.canvasGetImageData({
						// 	canvasId: 'rgbCanvas',
						// 	x:  that.rect[that.movingIndex].startx,
						// 	y: that.rect[that.movingIndex].starty,
						// 	width: that.rect[that.movingIndex].endx - that.rect[that.movingIndex].startx,
						// 	height: that.rect[that.movingIndex].endy - that.rect[that.movingIndex].starty,
						// 	success(res) {
						// 		let obj = dataGet(res.data)
						// 		that.rgbArr[that.movingIndex] = obj
						// 		console.log(that.rgbArr)
						// 		that.ctx.draw()
						// 		for (let item of that.rect) {
						// 			that.ctx.setStrokeStyle('red')
						// 			that.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
						// 			that.ctx.draw(true)
						// 		}
						// 		that.movingIndex = -1;
						// 	},
						// 	fail(err) {
						// 		console.log(err)
						// 	}
						// },that)
					} else {
						return
					}

				} else {
					if (this.next) {
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
						this.next = false
					} else {
						return
					}
					// if (!this.gradientFlag) {
					// 	// 非梯度状态，填这次绘制区域的浓度
					// 	this.$refs.prompt.show();
					// }
				}
			},
			// changeGradient() {
			// 	this.gradientFlag = !this.gradientFlag
			// 	if (this.gradientFlag) { // 开启
			// 	} else { // 关闭
			// 		let count = this.rect.length - this.MIC.length
			// 		console.log('矩形' + count)
			// 		if (count) {
			// 			this.$refs.prompt2.show()
			// 		}
			// 	}
			// },

			revoke() { // 撤销
				if (this.rect.length >= 1) {
					console.log(this.rgbArr.length, this.MIC.length, this.rect.length)
					// if (this.MIC.length == this.rect.length) { // 开启梯度再撤销时，浓度数量跟矩形一样就一起撤销
					// 	this.MIC.splice(this.MIC.length - 1, 1);
					// 	this.rgbArr.splice(this.rgbArr.length - 1, 1);
					// 	console.log('同时撤销了浓度值')
					// }
					if (this.next) {
						this.MIC.splice(this.MIC.length - 1, 1);
						this.rgbArr.splice(this.rgbArr.length - 1, 1);
					}
					this.rect.splice(this.rect.length - 1, 1);
					console.log(this.MIC, this.rgbArr, this.rect)
					this.ctx.draw()
					for (let item of this.rect) {
						this.ctx.setStrokeStyle('red')
						this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
						this.ctx.draw(true)
					}
					this.next = true
				} else {}

			},
			getRes() {
				if (this.MIC.length == this.rect.length) {
					app.globalData.MIC = this.MIC;
					app.globalData.rgbArr = this.rgbArr
					app.globalData.rect = this.rect
					uni.navigateTo({
						url: '../res/res'
					})
				} else {
					uni.showToast({
						title: '未填写浓度，无法进行下一步',
						icon: 'none'
					})
					// this.$refs.prompt2.show()
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
					this.MIC.push(e)
					this.next = true
					this.$refs.prompt.hide();
					this.getRGB()
				}
			},
			onCancel() {
				this.promptVal = "";
				// this.rect.splice(this.rect.length - 1, 1);
				// this.ctx.draw()
				// for (let item of this.rect) {
				// 	this.ctx.setStrokeStyle('red')
				// 	this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
				// 	this.ctx.draw(true)
				// }
			},
			// onConfirm2(starter, gradient) {
			// 	console.log(starter, gradient);
			// 	let that = this;
			// 	let length = this.MIC.length
			// 	for (let i = this.MIC.length; i < this.rect.length; i++) {
			// 		this.MIC.push(starter + (i - length) * gradient)
			// 		uni.canvasGetImageData({
			// 			canvasId: 'rgbCanvas',
			// 			x: this.rect[i].startx,
			// 			y: this.rect[i].starty,
			// 			width: this.rect[i].endx - this.rect[i].startx,
			// 			height: this.rect[i].endy - this.rect[i].starty,
			// 			success(res) {
			// 				let obj = dataGet(res.data)
			// 				that.rgbArr.push(obj)
			// 				that.startx = 0
			// 				that.starty = 0
			// 				that.endx = 0
			// 				that.endy = 0
			// 			},
			// 			fail(err) {
			// 				console.log(err)
			// 			}
			// 		}, that)
			// 	}
			// 	this.gradientFlag = false
			// 	this.$refs.prompt2.hide();
			// },
			// onCancel2() {
			// 	this.$refs.prompt2.hide();
			// 	this.gradientFlag = true
			// },

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
		width: 100%;
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

	.gradient {
		height: 40px;
		line-height: 40px;
		width: 65%;
		outline: none;
		background-color: rgb(182, 182, 182);
	}

	.activebtn {
		background-color: rgb(255, 196, 62);
	}
</style>
