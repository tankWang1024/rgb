<script>
	export default {
		globalData: {
			windowWidth: 0,
			windowHeight: 0,
			imgInfo: {},
			imgInfo2:{},
			MIC: [],
			rgbArr: [],
			rgbArr2:[],
			rect:[],
			rect2:[],
			yName:'',
			linea:0,
			lineb:0,
    },
		// globalData: {

		// 	"windowWidth": 360,
		// 	"windowHeight": 572,
		// 	"imgInfo": {
		// 		"errMsg": "getImageInfo:ok",
		// 		"path": "file:///storage/emulated/0/Pictures/QQ/8F220CCC495B2FEA48E2C01FC77EF4D6.jpg",
		// 		"width": 720,
		// 		"height": 960,
		// 		"orientation": "up",
		// 		"type": "jpeg"
		// 	},
		// 	"imgInfo2": {},
		// 	"MIC": ["2", "3", "4", "6", "8", "10", "11", "12"],
		// 	"rgbArr": [{
		// 		"r": 65.9090909090909,
		// 		"g": 138.3595041322314,
		// 		"b": 203.4090909090909
		// 	}, {
		// 		"r": 73.5625,
		// 		"g": 140.60416666666666,
		// 		"b": 212.42708333333334
		// 	}, {
		// 		"r": 89.86363636363636,
		// 		"g": 157.96464646464648,
		// 		"b": 219.27777777777777
		// 	}, {
		// 		"r": 111.24166666666666,
		// 		"g": 138.7,
		// 		"b": 209.14166666666668
		// 	}, {
		// 		"r": 118.9,
		// 		"g": 127.15384615384616,
		// 		"b": 182.62307692307692
		// 	}, {
		// 		"r": 143.03535353535352,
		// 		"g": 129.76262626262627,
		// 		"b": 166.0050505050505
		// 	}, {
		// 		"r": 130.390625,
		// 		"g": 115.984375,
		// 		"b": 147.78125
		// 	}, {
		// 		"r": 140.31739130434784,
		// 		"g": 114.03478260869565,
		// 		"b": 138.3304347826087
		// 	}],
		// 	"rgbArr2": [],
		// 	"rect": [{
		// 		"startx": 222,
		// 		"starty": 218,
		// 		"endx": 244,
		// 		"endy": 229
		// 	}, {
		// 		"startx": 223,
		// 		"starty": 187,
		// 		"endx": 247,
		// 		"endy": 191
		// 	}, {
		// 		"startx": 204,
		// 		"starty": 167,
		// 		"endx": 215,
		// 		"endy": 185
		// 	}, {
		// 		"startx": 161,
		// 		"starty": 126,
		// 		"endx": 173,
		// 		"endy": 146
		// 	}, {
		// 		"startx": 103,
		// 		"starty": 162,
		// 		"endx": 123,
		// 		"endy": 175
		// 	}, {
		// 		"startx": 111,
		// 		"starty": 220,
		// 		"endx": 133,
		// 		"endy": 229
		// 	}, {
		// 		"startx": 129,
		// 		"starty": 245,
		// 		"endx": 145,
		// 		"endy": 253
		// 	}, {
		// 		"startx": 156,
		// 		"starty": 260,
		// 		"endx": 166,
		// 		"endy": 283
		// 	}],
		// 	"rect2": [],
		// 	"yName": "G/B",
		// 	"linea": 56.54475490196081,
		// 	"lineb": 7.515392156862743
		// },

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
		height: 100%;
	}
	uni-page-body{
		height: 100%;
	}
</style>
