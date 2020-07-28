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
		// 		"path": "file:///storage/emulated/0/Tencent/QQ_Images/-2a69a55573036159.jpg",
		// 		"width": 443,
		// 		"height": 960,
		// 		"orientation": "up",
		// 		"type": "jpeg"
		// 	},
		// 	"imgInfo2": {},
		// 	"MIC": ["20", "50", "80"],
		// 	"rgbArr": [{
		// 		"r": 174.28571428571428,
		// 		"g": 123.06593406593407,
		// 		"b": 107.35897435897436
		// 	}, {
		// 		"r": 135.25274725274724,
		// 		"g": 142.35897435897436,
		// 		"b": 57.38095238095238
		// 	}, {
		// 		"r": 92.17216117216117,
		// 		"g": 124.62637362637362,
		// 		"b": 168.43223443223442
		// 	}, {
		// 		"r": 49.999069884364005,
		// 		"g": 55.35911261940674,
		// 		"b": 88.57875816993464
		// 	}],
		// 	"rgbArr2": [],
		// 	"rect": [{
		// 		"startx": 270,
		// 		"starty": 147,
		// 		"endx": 283,
		// 		"endy": 168
		// 	}, {
		// 		"startx": 170,
		// 		"starty": 167,
		// 		"endx": 183,
		// 		"endy": 188
		// 	}, {
		// 		"startx": 81,
		// 		"starty": 163,
		// 		"endx": 94,
		// 		"endy": 184
		// 	}],
		// 	"rect2": [],
		// 	"yName": "R",
		// 	"linea": 0,
		// 	"lineb": 0
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
		font-family: 'Times New Roman';
	}

	uni-page-body {
		height: 100%;
	}
</style>
