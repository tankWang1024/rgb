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

export const getMinDis = function(arr){
	let minDistance = Math.abs(arr[0] - arr[1])
	for(let i=0; i<arr.length; i++){
		
	}
}