/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint(getSubarrayWithMaximumSum(input));
}

var input = [-3,10,-4,-4,1,2,-6,-1,0,8,9,5,3,-1,1,-5,10,-5,-9,2,4,10,4,7,-10,-10,-2,7,1,8,2,-9,0,-8,-10,3,5,-10,4]

export function getSubarrayWithMaximumSum(input) {
	var sum = 0;
	var max = 0;

	for (let i = 0; i < input.length; i++) {
		var number = input[i];
		sum += number;
		if(sum  < 0) {
			sum = 0;
		} 
		if (sum > max) {
			max = sum;
		}
	}
	return max;
}