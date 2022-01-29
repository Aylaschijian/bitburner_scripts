import {getServerList} from "lib/ServerList.js";
/** @param {NS} ns **/
export async function main(ns) {
	killAllHackWeakGrow(ns);
	killAllHack(ns);
	killAllWeak(ns);
	killAllGrow(ns);
	killAllShare(ns);
}
export function killAllHackWeakGrow(ns) {
	var serverlist = getServerList(ns);
	for (let server of serverlist) {
		if (ns.scriptKill("/OneFile/hackweakgrow.js", server)){
			ns.tprint("kill hackweakgrow success on " + server);
		}
		
	}
}
export function killAllHack(ns) {
	var serverlist = getServerList(ns);
	for (let server of serverlist) {
		if (ns.scriptKill("/WGH/hack.js", server)){
			ns.tprint("kill hack success on " + server);
		}
		
	}
}
export function killAllWeak(ns) {
	var serverlist = getServerList(ns);
	for (let server of serverlist) {
		if (ns.scriptKill("/WGH/weak.js", server)){
			ns.tprint("kill weak success on " + server);
		}
		
	}
}
export function killAllGrow(ns) {
	var serverlist = getServerList(ns);
	for (let server of serverlist) {
		if (ns.scriptKill("/WGH/grow.js", server)){
			ns.tprint("kill grow success on " + server);
		}
		
	}
}
export function killAllShare(ns) {
	var serverlist = getServerList(ns);
	for (let server of serverlist) {
		if (ns.scriptKill("/misc/Share.js", server)){
			ns.tprint("kill Share success on " + server);
		}
		
	}
}