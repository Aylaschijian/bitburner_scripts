import {getServerList} from "lib/ServerList.js";
/** @param {NS} ns **/
export async function main(ns) {
	await copyfilestohome(ns);
}
async function copyfilestohome(ns) {
	var serverlist = getServerList(ns);
	for (let server of serverlist) {
		var files = ns.ls(server, ".lit");
		if(files.length > 0) {
			await ns.scp(files, server, "home")
		}
		
	}
}