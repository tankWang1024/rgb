<script>
	export default {
		globalData: {
			windowWidth: 360,
			windowHeight: 572,
			imgInfo: {
				"path": "file:///storage/emulated/0/Pictures/雅安博物馆/IMG_20170926_113312.jpg",
				"width": 4608,
				"height": 3456,
			},
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
