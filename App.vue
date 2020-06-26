<script>
	export default {
		globalData: {
			// windowWidth: 0,
			// windowHeight: 0,
			//pixelRatio:1,
			// imgInfo: {
			// 	"path": "",
			// 	"width": 0,
			// 	"height": 0,
			// },
			// MIC: [],
			// rgbArr: [],
			// rect:[],
			MIC: ["1", "3", "2", "2", "5"],
			rgbArr: [{
				"r": 152.88227201257862,
				"g": 135.96128144654088,
				"b": 128.10416666666666
			}, {
				"r": 103.99124452782989,
				"g": 90.11757348342714,
				"b": 83.92370231394622
			}, {
				"r": 132.60180995475113,
				"g": 113.77149321266968,
				"b": 107.19683257918552
			}, {
				"r": 125.6574074074074,
				"g": 105.30324074074075,
				"b": 98.40046296296296
			}, {
				"r": 88.20408163265306,
				"g": 74.22704081632654,
				"b": 66.3078231292517
			}],
			windowWidth: 360,
			windowHeight: 572,
			imgInfo: {
				"errMsg": "getImageInfo:ok",
				"path": "file:///storage/emulated/0/Pictures/雅安博物馆/IMG_20170926_115457.jpg",
				"width": 4608,
				"height": 3456,
				"orientation": "up",
				"type": "jpeg"
			},
			rect: [{
				"startx": 146,
				"starty": 209,
				"endx": 194,
				"endy": 315
			}, {
				"startx": 303,
				"starty": 284,
				"endx": 344,
				"endy": 323
			}, {
				"startx": 210,
				"starty": 230,
				"endx": 227,
				"endy": 256
			}, {
				"startx": 259,
				"starty": 230,
				"endx": 271,
				"endy": 266
			}, {
				"startx": 316,
				"starty": 199,
				"endx": 340,
				"endy": 248
			}]


		},
		onLaunch: function() {
			let globalData = this.$options.globalData
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	body {
		height: 100%
	}
</style>
