<template>
	<view class="qiun-charts" v-bind:style="{width:windowWidth+'px',height:'300px'}">
		<canvas canvas-id="canvasColumn" id="canvasColumn" v-bind:style="{width:windowWidth+'px',height:'300px'}"></canvas>
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
				// yName:'',
			}
		},
		methods: {
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: 'canvasColumn',
					type: 'line',
					legend: true,
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {},
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
			console.log(options.y)

			this.windowWidth = app.globalData.windowWidth
			this.windowHeight = app.globalData.windowHeight
			let categories = app.globalData.MIC.map((cur, index) => {
				return Number(cur)
			})
			let series = []
			series[0] = {}
			series[0].name = '浓度——' + options.y;
			series[0].color = '#000000'
			series[0].data = []
			switch (options.y) {
				case 'R':
					console.log('R');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['r'].toFixed(2))
					}
					break;
				case 'G':
					console.log('G');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['g'].toFixed(2))
					}
					break;
				case 'B':
					console.log('B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push(item['b'].toFixed(2))
					}
					break;
				case 'G/B':
					console.log('G/B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push((item['g']/item['b']).toFixed(2))
					}
					break;
				case 'R/B':
					console.log('R/B');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push((item['r']/item['b']).toFixed(2))
					}
					break;
				case 'R/G':
					console.log('R/G');
					for (let item of app.globalData.rgbArr) {
						series[0].data.push((item['r']/item['g']).toFixed(2))
					}
					break;
			}

			this.bubleSort(categories, series[0].data)
			let line = {
				categories,
				series
			}
			_self.showColumn('canvasColumn', line)
		},

	}
</script>

<style>

</style>
