import {findContracts} from "contracts/findContracts.js"
/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	var scriptsandbooleans = getscriptsandbooleans(ns);
	if (ns.args[0] == "info") {
		for (let script of Object.keys(scriptsandbooleans)) {
			ns.tprint(ns.scriptRunning(script, "home"));
		}
		ns.exit();
	}
	await testandrunScripts(ns,scriptsandbooleans);
}
function calcThreadsShareJS(ns) {
	ns.enableLog("getServerMaxRam")
	ns.enableLog("getServerUsedRam")
	ns.enableLog("getScriptRam");
	var result = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home") - ns.getScriptRam("/contracts/solveContracts.js")) / ns.getScriptRam("/misc/Share.js");
	ns.print(result)
	return result;
}
function getscriptsandbooleans(ns){
	var scriptsandbooleans = {
		"/contracts/solveContracts.js" 	: findContracts(ns).length>0,
		"/invest/HacknetInvester.js" 	: ns.hacknet.numNodes() < 1,
		"/invest/OwnServer.js"			: ns.getServerMaxRam("home") > ns.getPurchasedServerMaxRam() && ns.getPurchasedServers().length < ns.getPurchasedServerLimit(),
		"/stock/StockManager.js"		: ns.stock.purchase4SMarketData() && ns.stock.purchase4SMarketDataTixApi(),
		//"/misc/Share.js"				: calcThreadsShareJS(ns) > 1 && ns.getPlayer().factions.length > 3
	}
	ns.disableLog("ALL");
	return scriptsandbooleans
}
async function testandrunScripts(ns, scriptsandbooleans = getscriptsandbooleans(ns)) {
	while(true) {
		for (let script of Object.keys(scriptsandbooleans)) {
			ns.print(script + " " + scriptsandbooleans[script] +" " +ns.scriptRunning(script, "home"))
			if(!ns.scriptRunning(script, "home") && scriptsandbooleans[script]) {
				if (script == "/mis/Share.js") {
					var threads = calcThreadsShareJS(ns)
					ns.run(script, threads)
				} else {
					ns.run(script, 1)
				}
				
			}
		}
		
		await ns.sleep(30000)
		scriptsandbooleans = getscriptsandbooleans(ns)
	}
}