<template>
	<view class="qiun-charts" v-bind:style="{width:windowWidth+'px'}">
		<canvas canvas-id="canvasColumn" id="canvasColumn" v-bind:style="{width:windowWidth+'px',height:'300px'}"></canvas>
		<view class="foot">
			<view class="card">
				<view class="card-item">
					相关系数：{{conR.toFixed(4)}}
				</view>
				<view class="card-item">
					回归方程：y = {{linea.toFixed(4)}} {{lineb<0?'':'+'}}{{lineb.toFixed(4)}}*x 
				</view>
			</view>
			<button class="btn" @tap="toForecast">去预测</button>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	import uCharts from '../../components/uCharts/u-charts.js';

	var _self; //  _self  <==>  this
	var canvaColumn = null; // 实例
	export default {
		data() {
			return {
				windowWidth: 0,
				windowHeight: 0,
				conR: 0,
				linea: 0,
				lineb: 0,
				// yName:'',
			}
		},
		methods: {
			toForecast(){
				uni.chooseImage({
					count: 1,
					sizeType: 'original',
					success(res) {
						let tempFilePath = res.tempFilePaths[0]
						uni.getImageInfo({
							src: tempFilePath,
							success(res) {
								console.log(res)
								app.globalData.imgInfo2 = res
								uni.navigateTo({
									url: '../forecast/forecast'
								})
							},
							fail(err) {
				 
							},
						}) 
					},
					fail(err) {
						console.log('取消选图')
					}
				})
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: 'canvasColumn',
					type: 'mix',
					legend: true,
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: 1,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						gridType: 'dash',
					},
					dataLabel: true,
					width: _self.windowWidth,
					height: 300,
					extra: {
						column: {
							width: _self.windowWidth * 0.45 / chartData.categories.length
						}
					}
				});
			},
			connectionR(arrx, arry, sumx, sumy) {
				let xiyi = 0
				let xi2 = 0
				let yi2 = 0
				let length = arrx.length
				for (let i = 0; i < length; i++) {
					xiyi += arrx[i] * arry[i]
					xi2 += arrx[i] * arrx[i]
					yi2 += arry[i] * arry[i]
				}
				let averx = sumx / length
				let avery = sumy / length
				let fenzi = xiyi - length * averx * avery
				let fenmuLine = xi2 - length * averx * averx
				let fenmu = Math.pow(fenmuLine * (yi2 - length * avery * avery), 1 / 2)
				let conR = Math.abs(fenzi / fenmu)
				let lineb = fenzi / fenmuLine
				let linea = avery - lineb * averx
				let obj = {
					conR,
					lineb,
					linea
				}
				return obj
			},
			bubleSort(arrx, arry) {
				let tempx = 0;
				let tempy = 0;
				for (let i = 0; i < arrx.length; i++) {
					for (let j = 0; j < arrx.length - i; j++) {
						if (arrx[j] > arrx[j + 1]) {
							this.swap(arrx, j)
							this.swap(arry, j)
						}
					}
				}
			},
			swap(arr, i) { // i与i+1换
				let temp = arr[i + 1];
				arr[i + 1] = arr[i];
				arr[i] = temp
			}
		},
		onLoad(options) {
			_self = this;
			app.globalData.yName = options.y
			this.windowWidth = app.globalData.windowWidth
			this.windowHeight = app.globalData.windowHeight
			let categories = app.globalData.MIC.map((cur, index) => {
				return Number(cur)
			})
			let series = [{
				name: '原数据',
				type: 'point',
				color: '#ff0000',
				textColor: '#ff0000',
				textSize: 10,
				data: []
			}, {
				name: '浓度 - ' + options.y,
				type: 'line',
				dataLabel: false,
				color: '#000000',
				// textColor:'#FFFFFF',
				format() {
					return ''
				},
				data: []
			}]
			switch (options.y) {
				case 'R':
					console.log('R');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(Number(item['r'].toFixed(2)))
					}
					break;
				case 'G':
					console.log('G');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(Number(item['g'].toFixed(2)))
					}
					break;
				case 'B':
					console.log('B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(Number(item['b'].toFixed(2)))
					}
					break;
				case 'G/B':
					console.log('G/B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(Number((item['g'] / item['b']).toFixed(2)))
					}
					break;
				case 'R/B':
					console.log('R/B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(Number((item['r'] / item['b']).toFixed(2)))
					}
					break;
				case 'R/G':
					console.log('R/G');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(Number((item['r'] / item['g']).toFixed(2)))
					}
					break;
			}

			this.bubleSort(categories, series[0].data)
			let sumx = categories.reduce((accu, cur) => {
				return accu + cur;
			})
			let sumy = series[0].data.reduce((accu, cur) => {
				return accu + cur;
			});
			let obj = this.connectionR(categories, series[0].data, sumx, sumy)
			this.conR = obj.conR
			this.linea = obj.linea
			this.lineb = obj.lineb
			app.globalData.linea = obj.linea
			app.globalData.lineb = obj.lineb
			
			for (let item of categories) {
				series[1].data.push(Number(item * this.lineb + this.linea))
			}
			let line = {
				categories,
				series
			}
			_self.showColumn('canvasColumn', line)
		},

	}
</script>

<style>
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

	.btn {
		height: 70rpx;
		line-height: 70rpx;
		margin: 40rpx 0 80rpx;
		background-color: rgb(255, 196, 62);
		color: #FFFFFF;
	}
</style>
