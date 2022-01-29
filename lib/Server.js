/** @param {NS} ns **/
export async function main(ns) {
	for (let arg of ns.args) {
		ns.tprint(getRichServerObject(ns, arg));
	}
}
export function getRichServerObject(ns, servername) {
	var object = ns.getServer(servername);
	object.weaken_time = ns.getWeakenTime(servername) / 10000;
	object.chances = ns.hackAnalyzeChance(servername);
	object.hackThreads = catchZeroNull(ns.hackAnalyzeThreads(servername, object.moneyAvailable), object.serverGrowth);
	object.moneymultiplier = (object.moneyMax / catchZeroNull(object.moneyAvailable, object.serverGrowth));
	object.catchmoneymultiplier =  catchZeroNull(object.moneymultiplier, object.serverGrowth);
	object.forecastthreads = (object.hackThreads * object.catchmoneymultiplier);
	object.nshackAnalyze = ns.hackAnalyze(servername);
	object.neededthreads_hack = 1 / catchZeroNull(object.nshackAnalyze, -1);
	object.neededthreads_weak = (object.hackDifficulty - object.minDifficulty) / ns.weakenAnalyze(1,1);
	object.neededthreads_grow = calculateGrowThreads(ns, object);
	object.neededthreads = Math.max(object.neededthreads_hack, object.neededthreads_weak, object.neededthreads_grow);
	object.neededthreadsobj = {weak: object.neededthreads_weak, grow: object.neededthreads_grow, hack:object.neededthreads_hack}
	//object.exp = (object.baseDifficulty * (1 / catchZeroNull(object.chances, 0.000001)) / object.weaken_time);
	//object.rating_money = (object.moneyMax * object.moneyMax * (object.serverGrowth * object.chances)) / object.weaken_time;
	object.exp = object.baseDifficulty / object.weaken_time
	object.rating_money = object.moneyMax / object.weaken_time
	object.rating_total = object.exp * object.rating_money;
	return object;
}

function catchZeroNull(number, insteadReturn) {
	if (number == 0 | number == null | number < 0 | typeof number != "number") {
		return insteadReturn;
	}
	return number;
}
function calculateGrowThreads(ns, object) {
	if(object.moneyMax == object.moneyAvailable || object.moneyMax == 0) {
		return 0;
	}
	if(object.moneyMax > object.moneyAvailable && object.moneyAvailable != 0) {
		return ns.growthAnalyze(object.hostname, object.moneyMax/object.moneyAvailable);
	}
	return ns.growthAnalyze(object.hostname, object.moneyMax/1);
}

export function autocomplete(data, args) {
  return [...data.servers];
}