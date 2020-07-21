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
		// 		"path": "file:///storage/emulated/0/Tencent/QQ_Images/-71fbfc4fde28f19e.jpg",
		// 		"width": 4000,
		// 		"height": 3000,
		// 		"orientation": "up",
		// 		"type": "jpeg"
		// 	},
		// 	"imgInfo2": {	"errMsg": "getImageInfo:ok",
		// 		"path": "file:///storage/emulated/0/Tencent/QQ_Images/-71fbfc4fde28f19e.jpg",
		// 		"width": 4000,
		// 		"height": 3000,
		// 		"orientation": "up",
		// 		"type": "jpeg"},
		// 	"MIC": [],
		// 	"rgbArr": [],
		// 	"rgbArr2": [],
		// 	"rect": [],
		// 	"rect2": [],
		// 	"yName": "Gray",
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
		font-family: 'Times New Roman';
	}

	uni-page-body {
		height: 100%;
	}
</style>
