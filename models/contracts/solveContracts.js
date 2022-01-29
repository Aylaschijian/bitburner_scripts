import {getSubarrayWithMaximumSum} from "/contracts/SubarrayWithMaximumSum/solver.js"
import {getLargestPrimeFactor} from "/contracts/FindLargestPrimeFactor/solver.js"
import {NumberOfways} from "/contracts/TotalWaystoSum/solver.js"
import {arrayJumpingGame} from "/contracts/ArrayJumpingGame/solve.js"
import {algorithmicStockTraderI, algorithmicStockTraderII, algorithmicStockTraderIII, algorithmicStockTraderIV } from "contracts/AlgTrading/solve.js"
import {uniquePathsInAGridI, uniquePathsInAGridII} from "/contracts/UniqPaths/solver.js"
import {generateIpAddresses} from "/contracts/GenerateIPAddresses/solver.js"
import {findValidMathExpressions} from "/contracts/FindAllValidMathExpressions/solver.js"
import {getSingleObject} from "/contracts/findContracts.js"
import {spiralizeMatrix} from "/contracts/SpiralizeMatrix/solve.js"
import {minimumPathSumInATriangle} from "/contracts/MinimumPathSuminaTriangle/solve.js"
import {sanitizeParenthesesInExpression} from "/contracts/SanitizeParenthesesinExpression/solve.js"
import {mergeOverlappingIntervals} from "/contracts/MergeOverlappingIntervals/solve.js"
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
	solveTaks(ns);
}
function solveTaks (ns, list = getSingleObject(ns)) {
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