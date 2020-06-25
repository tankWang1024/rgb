export const dataGet = function(arr) {
	let itemNum = arr.length / 4
	let rSum = 0,
		gSum = 0,
		bSum = 0;
	console.log(itemNum)
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
