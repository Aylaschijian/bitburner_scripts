/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint(await calcPossWays(ns, 50))
	ns.tprint(NumberOfways(50, 49))
}

var input = 4

function getTotalWaystoSum(ns, input = input) {
	var getWays = calculateWays(ns, input);
	return getWays.length;
}

function calculateWays(ns, input){
	var ways = [] // input = 4 => ways [3 + 1, 2 + 2, 2 + 1 + 1, 1 + 1 + 1 +  1 ]
	var baseArray = calculateJust1(input)
	ways.push(baseArray);
}

function calculateJust1(input) {
	var returnarray = []
	for (let i = 0; i < input; i++) {
		returnarray.push(1)
	}
	return returnarray;
}
function sortArraysBtoS(array) {
	return array.sort((a,b) => b - a)
}
function getSumofArray(array) {
	var sum = 0;
	for (let add of array){
		sum += add;
	}
	return sum;
}
export function NumberOfways(N)
{
    var K = N-1
    // Initialize a list
    let dp = Array.from({length: N +1}, (_, i) => 0);
   
    // Update dp[0] to 1
    dp[0] = 1;
 
    // Iterate over the range [1, K + 1]
    for(let row = 1; row < K + 1; row++)
    {
 
        // Iterate over the range [1, N + 1]
        for(let col = 1; col < N + 1; col++)
        {
             
            // If col is greater
            // than or equal to row
            if (col >= row)
               
                // Update current
                // dp[col] state
                dp[col] = dp[col] + dp[col - row];
          }
    }
 
    // Return the total number of ways
    return(dp[N]);
}
export async function calcPossWays (ns, number) {
	await ns.sleep(1);
	ns.print(number)
	if (number == 1) {
		return 0;
	}
	if (number == 2) {
		return 1;
	}
	if (number > 2) {
		return await calcPossWays (ns, number-1)*2
	}
}
function calculatePossibleWays(array, ns) {
	ns.tprint(array)
	if (typeof array == "array") {
		var array = sortArraysBtoS(array);
	} else if (typeof array == "number") {
		var array = sortArraysBtoS([array]);
	}
	
	if (array.length % 2 == 0) {
		if (array.length == 2) {
			if (array[0] == 1 && array [1] == 1) {
				return 1
			}
			if (array[0] > 1 && array [1] == 1) {
				return calculatePossibleWays(array[0],ns) + 1
			}
			if (array[0] > 1 && array [1] > 1) {
				return calculatePossibleWays(array[0],ns) + calculatePossibleWays(array[1],ns)
			}
		}
	}
	if (array.length % 2 == 1) {
		if (array.length == 1) {
			if (array[0] == 1) {
				return 0;
			}
			if (array[0] > 1 && array[0]-1 == 1) {
				return calculatePossibleWays([array[0]-1, 1],ns);
			}
			if (array[0] > 1 && array[0]-1 > 1) {
				return calculatePossibleWays([array[0]-1, array[0]-1],ns);
			}

		}
		if (array.length > 1) {
			if (array[0] == 1) {
				return 1;
			}
			if (array[0] > 1) {
				return calculatePossibleWays(array[0],ns) + calculatePossibleWays(array.shift(),ns)
			}
		}
	}
}