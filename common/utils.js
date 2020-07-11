export const dataGet = function(arr) {
	let itemNum = arr.length / 4
	let rSum = 0,
		gSum = 0,
		bSum = 0;
	for (let i = 0; i < arr.length; i++) {
		if (i % 4 == 0) {
			rSum += arr[i]
			gSum += arr[i + 1]
			bSum += arr[i + 2]

		} else {
			continue;
		}
	}
	return {
		r: rSum / itemNum,
		g: gSum / itemNum,
		b: bSum / itemNum
	}
}

export const rotateImg = function(_this) { // this:{imgInfo:{width,height,path},c_width,c_height,rgbctx}
	let imgw = _this.c_height
	let imgh = _this.c_width
	if (_this.imgInfo.width < _this.imgInfo.height) {
		console.log('竖屏')
		_this.rgbctx.drawImage(_this.imgInfo.path, 0, 0, _this.imgInfo.width, _this.imgInfo.height, 0, 0, _this.c_width,
			_this.c_height)
	} else {
		_this.rgbctx.save()
		console.log('横屏')
		_this.rgbctx.translate(_this.c_width, 0)
		_this.rgbctx.rotate(Math.PI / 2)
		uni.getImageInfo({
			src: _this.imgInfo.path,
			success() {
				_this.rgbctx.drawImage(_this.imgInfo.path, 0, 0, _this.imgInfo.width, _this.imgInfo.height, 0,
					0, imgw, imgh)
				// 恢复canvas(0,0)原点
				_this.rgbctx.restore()
			}
		})
	}
	return _this
}

export const showRotateImgs = function(_this) {

}
