import {killAllHackWeakGrow, killAllShare} from "lib/KillScripts.js";
import {getServerList} from "lib/ServerList.js";
/** @param {NS} ns **/
export async function main(ns) {
	if(ns.args[0] == "killall") {
		killAllShare(ns);
		ns.exit();
	}
	ns.disableLog("ALL");
	killAllHackWeakGrow(ns);
	await copyShareFiletoServers(ns),
	execShareonAllServers(ns)
}
var shareFile = "/misc/Share.js";
async function copyShareFiletoServers(ns, list = getServerList(ns)) {
	for (let server of list) {
		await copyFiletoServer(ns, server);
	}
}
async function copyFiletoServer(ns, servername) {
	if(servername != "home") 
		await ns.scp(shareFile, "home", servername);
}

function execShareonAllServers(ns, list = getServerList(ns)) {
	list = list.filter (element => ns.getServerMaxRam(element) > 0)
	for (let server of list) {
		var neededRamFile = ns.getScriptRam(shareFile);
		var serverRam = ns.getServerMaxRam(server)-ns.getServerUsedRam(server);
		var threads = serverRam/neededRamFile
		if(threads > 1) {
			ns.exec(shareFile, server, threads )
		}
	}
}