import {getSubarrayWithMaximumSum} from "/models/contracts/SubarrayWithMaximumSum/solver.js"
import {getLargestPrimeFactor} from "/models/contracts/FindLargestPrimeFactor/solver.js"
import {NumberOfways} from "/models/contracts/TotalWaystoSum/solver.js"
import {arrayJumpingGame} from "/models/contracts/ArrayJumpingGame/solve.js"
import {algorithmicStockTraderI, algorithmicStockTraderII, algorithmicStockTraderIII, algorithmicStockTraderIV } 
from "/modelscontracts/AlgTrading/solve.js"
import {uniquePathsInAGridI, uniquePathsInAGridII} from "/models/contracts/UniqPaths/solver.js"
import {generateIpAddresses} from "/models/contracts/GenerateIPAddresses/solver.js"
import {findValidMathExpressions} from "/models/contracts/FindAllValidMathExpressions/solver.js"
import {getSingleObject} from "/models/contracts/findContracts.js"
import {spiralizeMatrix} from "/models/contracts/SpiralizeMatrix/solve.js"
import {minimumPathSumInATriangle} from "/models/contracts/MinimumPathSuminaTriangle/solve.js"
import {sanitizeParenthesesInExpression} from "/models/contracts/SanitizeParenthesesinExpression/solve.js"
import {mergeOverlappingIntervals} from "/models/contracts/MergeOverlappingIntervals/solve.js"
var ContractsMap = {
	'Algorithmic Stock Trader I'	: algorithmicStockTraderI,
  	'Algorithmic Stock Trader II'	: algorithmicStockTraderII,
  	'Algorithmic Stock Trader III'	: algorithmicStockTraderIII,
  	'Algorithmic Stock Trader IV'	: algorithmicStockTraderIV,
	'Find Largest Prime Factor' 	: getLargestPrimeFactor,
	'Total Ways to Sum'				: NumberOfways,
	'Array Jumping Game'			: arrayJumpingGame,
	'Subarray with Maximum Sum'		: getSubarrayWithMaximumSum,
	'Unique Paths in a Grid I'		: uniquePathsInAGridI,
  	'Unique Paths in a Grid II'		: uniquePathsInAGridII,
	'Generate IP Addresses'			: generateIpAddresses,
	'Find All Valid Math Expressions' : findValidMathExpressions ,
	'Spiralize Matrix'				: spiralizeMatrix,
	'Minimum Path Sum in a Triangle' : minimumPathSumInATriangle,
	'Sanitize Parentheses in Expression' : sanitizeParenthesesInExpression,
	'Merge Overlapping Intervals'	: mergeOverlappingIntervals
}
/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args[0] == "info") {
		ns.tprint(getSingleObject(ns))
		ns.exit()
	} 
	solve(ns);
}
function solve (ns, list = getSingleObject(ns)) {
	list = list.filter (element => element.type in ContractsMap )
	for (let task of list) {
		var solution = ContractsMap[task.type](task.data)
		var solve = ns.codingcontract.attempt(solution, task.file, task.server, true)
		if( solve != "") {
			ns.tprint("solve success "+solve)
		}
		else {
			ns.tprint("solve not right")
		}
	}
}