import { getAttackerServerList, getTargetList } from "lib/ServerList.js";
import * as PortHandler from "lib/PortHandler.js";
import { killAllHack, killAllWeak, killAllGrow } from "lib/KillScripts.js";
/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	ns.tprint("Preparation beginns");
	await ns.sleep(10000);
	killAllScripts(ns);
	await prepareServers(ns);
	await ns.sleep(10000);
	ns.tprint("Preparation done");
	ns.spawn("WGH/Manager.js", 1)
}

function killAllScripts(ns) {
	killAllHack(ns);
	killAllWeak(ns);
	killAllGrow(ns);
}
async function prepareServers(ns) {
	var attackerlist = getAttackerServerList(ns);
	var targetlist = getTargetList(ns);
	PortHandler.openServerWithList(ns, targetlist);
	PortHandler.openServerWithList(ns, attackerlist);
	await pushScriptstoServerList(ns, attackerlist);
}
async function pushScriptstoServerList(ns, list) {
	for (let serv of list) {
		let servername = serv.hostname;
		if (servername != "home") {
			var scripts = ["hack.js", "grow.js","weak.js" ]
			await ns.scp(scripts, "home", servername);
		}
	}

}