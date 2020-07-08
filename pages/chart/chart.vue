<template>
	<view class="qiun-charts" v-bind:style="{width:windowWidth+'px'}">
		<!-- <canvas canvas-id="canvasColumn" id="canvasColumn" v-bind:style="{width:windowWidth+'px',height:'300px'}"></canvas>
		<view class="foot">
			<view class="card">
				<view class="card-item">
					相关系数：{{conR.toFixed(4)}}
				</view>
				<view class="card-item">
					回归方程：y = {{linea.toFixed(4)}} {{lineb<0?'':'+'}}{{lineb.toFixed(4)}}*x
				</view>
			</view>
		</view> -->
		<view class="title">
			linear correlation: <text>{{conR.toFixed(4)}}</text>
		</view>
		<view class="sub-title">
			Regression Equation: <text>y={{linea.toFixed(4)}}{{lineb<0?'':'+'}}{{lineb.toFixed(4)}}*x</text>
		</view>
		<view class="content">
			<!-- #ifdef APP-PLUS || H5 -->
			<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"
			 v-bind:style="{width:windowWidth+'px',height:'400px'}"></view>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS || H5 -->
			<view>非 APP、H5 环境不支持</view>
			<!-- #endif -->
			<button class="btn" @tap="toForecast">去预测</button>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	// import uCharts from '../../components/uCharts/u-charts.js';

	// var _self; //  _self  <==>  this
	// var canvaColumn = null; // 实例
	export default {
		data() {
			return {
				windowWidth: 0,
				windowHeight: 0,
				conR: 0,
				linea: 0,
				lineb: 0,
				// yName:'',
				option: {
					label: {
						formatter: '',
						align: 'right'
					},
					background: '#FFFFFF',
					tooltip: {},
					legend: {
						data: [{
							name: '',
						}]
					},
					xAxis: {
						name: 'concentration',
						nameTextStyle: {
							fontSize: 10,
							align: 'right',
							verticalAlign: 'bottom',
						},
						type: 'value',
						scale: true,
						splitLine: {
							show: false
						}
					},
					yAxis: {
						name: '',
						nameTextStyle: {
							fontSize: 10,
							align: 'right',
							verticalAlign: 'bottom',
						},
						type: 'value',
						scale: true,
						splitLine: {
							lineStyle: {
								type: 'dotted'
							}
						}
					},
					series: [{
						type: 'scatter',
						data: [],
						symbolSize: 6,
					}, {
						type: 'line',
						symbol: 'none',
						data: []
					}, ]
				},
			}
		},
		methods: {

			onViewClick(options) {
				console.log(options)
			},

			toForecast() {
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
			// showColumn(canvasId, chartData) {
			// 	canvaColumn = new uCharts({
			// 		$this: _self,
			// 		canvasId: 'canvasColumn',
			// 		type: 'mix',
			// 		legend: true,
			// 		fontSize: 11,
			// 		background: '#FFFFFF',
			// 		pixelRatio: 1,
			// 		animation: true,
			// 		categories: chartData.categories,
			// 		series: chartData.series,
			// 		xAxis: {
			// 			disableGrid: true,
			// 		},
			// 		yAxis: {
			// 			gridType: 'dash',
			// 		},
			// 		dataLabel: true,
			// 		width: _self.windowWidth,
			// 		height: 300,
			// 		extra: {
			// 			column: {
			// 				width: _self.windowWidth * 0.45 / chartData.categories.length
			// 			}
			// 		}
			// 	});
			// },
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
			// _self = this;
			options.y = 'R'
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
						series[0].data.push(item['r'])
					}
					break;
				case 'G':
					console.log('G');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['g'])
					}
					break;
				case 'B':
					console.log('B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['b'])
					}
					break;
				case 'G/B':
					console.log('G/B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['g'] / item['b'])
					}
					break;
				case 'R/B':
					console.log('R/B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['r'] / item['b'])
					}
					break;
				case 'R/G':
					console.log('R/G');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['r'] / item['g'])
					}
					break;
				case '灰度':
					console.log('灰度');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(0.299 * item['r'] + 0.587 * item['g'] + 0.114 * item['b'])
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
			// console.log(app.globalData)
			for (let item of categories) {
				series[1].data.push(Number(item * this.lineb + this.linea))
			}
			let echart1 = []
			for (let i = 0; i < categories.length; i++) {
				let arr = []
				arr = [categories[i], series[0].data[i]]
				echart1.push(arr)
			}
			this.option.series[0].data = echart1
			let echart2 = []
			echart2.push([categories[0], Number(categories[0] * this.lineb + this.linea)])
			let index = categories.length - 1
			echart2.push([categories[index], Number(categories[index] * this.lineb + this.linea)])
			this.option.series[1].data = echart2
			// this.option.title.text = 'linear correlation: ' + this.conR.toFixed(4)
			this.option.yAxis.name = options.y

			// let line = {
			// 	categories,
			// 	series
			// }
			// _self.showColumn('canvasColumn', line)
		},
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style>
	.foot {
		width: 60%;
		margin: 80rpx auto 0;
	}

	.title {
		padding: 20rpx;
		color: rgb(107, 107, 107);
	}

	.title text {
		padding-left: 20rpx;
		font-weight: 700;
		color: rgb(91, 79, 240);
	}

	.sub-title {
		padding-left: 20rpx;
		color: #000000;
		font-size: 40rpx;
		font-weight: 700;
	}

	.sub-title text {
		color: rgb(91, 79, 240);
	}

	.btn {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		margin: 40rpx auto;
		background-color: rgb(255, 196, 62);
		color: #000000;
	}
</style>
