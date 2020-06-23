<template>
	<view class="box">
		<canvas canvas-id="myCanvas" id="myCanvas" v-bind:style="{width:c_width+'px',height:c_height+'px'}" @touchstart="startArt"
		 @touchmove="moveArt" @touchcancel="cancelArt" @touchend="endArt"></canvas>
		 <image class="img" :style="{width:c_width+'px',height:c_height+'px'}" :src="imgSrc"></image>
	</view>
</template>

<script>
	import app from '../../App.vue'

	export default {
		data() {
			return {
				imgSrc: "",
				imgInfo: {},
				ctx: null,
				c_width: 0,
				c_height: 0,
				startx: 0,
				starty: 0,
				endx: 0,
				endy: 0,
				rect: [],
			}
		},
		onReady() {
			this.c_width = app.globalData.windowWidth
			this.c_height = app.globalData.windowHeight - 100
			this.imgSrc = app.globalData.imgInfo.path
			let ctx = uni.createCanvasContext('myCanvas')
			// ctx.drawImage(app.globalData.imgInfo.path, 0, 0, 360, 500) // --------------
			// ctx.draw(true)
			this.ctx = ctx;
		},
		onLoad() {

		},
		methods: {
			startArt(e) {
				this.startx = Math.round(e.touches[0].x)
				this.starty = Math.round(e.touches[0].y)
				// this.ctx.moveTo(this.startx,this.starty)
			},
			moveArt(e) {
				this.endx = Math.round(e.touches[0].x)
				this.endy = Math.round(e.touches[0].y)
				this.ctx.setStrokeStyle('red')
				this.ctx.strokeRect(this.startx, this.starty, this.endx - this.startx, this.endy - this.starty)
				this.ctx.draw()
				for(let item of this.rect){
					this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
					this.ctx.draw(true)
				}
			},
			endArt(e) {
				this.ctx.closePath()
				this.rect.push({
					startx: this.startx,
					starty: this.starty,
					endx:this.endx,
					endy:this.endy
				})
				for(let item of this.rect){
					this.ctx.strokeRect(item.startx, item.starty, item.endx - item.startx, item.endy - item.starty)
					this.ctx.draw(true)
				}
				
			},
			cancelArt() {
				console.log('cancel')
			}
		}
	}
</script>

<style>
	.box{
		position: relative;
	}
.img{
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
</style>
