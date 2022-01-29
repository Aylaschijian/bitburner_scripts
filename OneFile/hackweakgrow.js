//import { openPorts } from "PortHandler.js";
/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	ns.enableLog("getServerMaxMoney");
	ns.enableLog("getServerMoneyAvailable");
	ns.enableLog("hack");

	if (!ns.args[0]) {
		var hostname = ns.getHostname();
	} else {
		var hostname = ns.args[0];
	}


	//openPorts(ns, hostname);
	//ns.nuke(hostname);

	while (ns.hasRootAccess(hostname)) {
		var minsec = ns.getServerMinSecurityLevel(hostname);
		var reqLevel = ns.getServerRequiredHackingLevel(hostname);
		var maxMoney = ns.getServerMaxMoney(hostname);
		var currentmoney = ns.getServerMoneyAvailable(hostname);
		var currentsec = ns.getServerSecurityLevel(hostname);
		if (minsec + 3 <= currentsec) {
			await ns.weaken(hostname);
		}
		if (currentmoney <= maxMoney * 0.85) {
			await ns.grow(hostname);
		}
		if (ns.getHackingLevel() >= reqLevel && currentmoney >= maxMoney * 0.50) {
			await ns.hack(hostname);
		}

	}
}