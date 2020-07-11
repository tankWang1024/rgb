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
		// 	"path": "file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/uniapp_temp_1594434189847/camera/1594434253024.jpg",
		// 	"width": 4608,
		// 	"height": 3456,
		// 		"orientation": "up",
		// 		"type": "jpeg"
		// 	},
		// 	"imgInfo2": {},
		// 	"MIC": ["1", "1", "1", "1"],
		// 	"rgbArr": [{
		// 		"r": 62.96209145191703,
		// 		"g": 34.75500209511837,
		// 		"b": 109.47508773308192
		// 	},{
		// 		"r": 62.96209145191703,
		// 		"g": 34.75500209511837,
		// 		"b": 109.47508773308192
		// 	},{
		// 		"r": 62.96209145191703,
		// 		"g": 34.75500209511837,
		// 		"b": 109.47508773308192
		// 	}, {
		// 		"r": 62.96209145191703,
		// 		"g": 34.75500209511837,
		// 		"b": 109.47508773308192
		// 	}],
		// 	"rgbArr2": [],
		// 	"rect": [{
		// 		"startx": 211,
		// 		"starty": 46,
		// 		"endx": 249,
		// 		"endy": 91
		// 	}, {
		// 		"startx": 211,
		// 		"starty": 103,
		// 		"endx": 248,
		// 		"endy": 138
		// 	}, {
		// 		"startx": 212,
		// 		"starty": 152,
		// 		"endx": 251,
		// 		"endy": 193
		// 	}, {
		// 		"startx": 211,
		// 		"starty": 208,
		// 		"endx": 250,
		// 		"endy": 248
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

	uni-page-body {
		height: 100%;
	}
</style>
