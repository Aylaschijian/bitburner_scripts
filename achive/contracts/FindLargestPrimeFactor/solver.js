/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint(getLargestPrimeFactor(input));
}
var input = 398640605
export function getLargestPrimeFactor(input = input) {
	var i=2;
	while (i<=input){
		if (input%i == 0){
			input/=i;    
		}else{
			i++;
		}
	}
	return i;
}