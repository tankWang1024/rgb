<script>
	export default {
		globalData: {
			windowWidth: 0,
			windowHeight: 0,
			imgInfo: {
				"path": "",
				"width": 0,
				"height": 0,
			},
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
