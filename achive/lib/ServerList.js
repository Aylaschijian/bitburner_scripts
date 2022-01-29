import {getRichServerObject} from "lib/Server.js";
import * as PortHandler from "lib/PortHandler.js";
/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	if (ns.args[0] == "target") {
		ns.tprint(getTarget(ns));
		ns.exit();
	}
	if (ns.args[0] == "targetlist") {
		ns.tprint(getTargetList(ns));
		ns.exit();
	}
	if (ns.args[0] == "allservobj") {
		ns.tprint(getServerObjList(ns));
		ns.exit();
	}
	if (ns.args[0] == "bestexpserver") {
		ns.tprint(getServerObjList(ns).sort((a,b) => b.exp - a.exp)[0]);
		ns.exit();
	}
	
}
var ramneed = 2.65;
export function getServerList(ns) {
	var startPoint = "home";
	var startlist = ns.scan(startPoint);
	var endlist = scanServerList(ns, startlist);
	var returnlist = getServerListRecursiv(ns, startlist, endlist);
	return returnlist;
}
export function getServerObjList(ns) {
	var serverlist = getServerList(ns);
	return makeObjList(ns, serverlist);
}
function makeObjList(ns, serverlist) {
	var returnlist = [];
	for (let server of serverlist) {
		let object = getRichServerObject(ns, server);
		returnlist.push(object);
	}
	return returnlist;
}
function getServerListRecursiv(ns, startlist, endlist) {
	if (arrayEquals(startlist.sort(), endlist.sort())) {
		return endlist;
	}
	else {
		var oldlist = endlist;
		var newlist = scanServerList(ns, endlist);
		return getServerListRecursiv(ns, oldlist, newlist);
	}
}
function scanServerList(ns, serverlist) {
	var returnlist = [];
	for(let server of serverlist) {
		returnlist = returnlist.concat(ns.scan(server));
		
	}
	returnlist = returnlist.concat(serverlist);
	returnlist = unifyServerList(ns, returnlist);
	return returnlist;
}
export function unifyServerList(ns, serverlist) {
	var uniq = [...new Set(serverlist)];
	return uniq;
}
function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
export function getAttackerServerList (ns) {
	var serverlist = getServerObjList(ns);
	var attackerlist = serverlist.filter (element => element.numOpenPortsRequired <= PortHandler.getPlayerPortlevel(ns));
	attackerlist = attackerlist.filter (element => element.maxRam > ramneed);
	var ownservers = makeObjList(ns, ns.getPurchasedServers());
	attackerlist = attackerlist.concat(ownservers);
	var attackerlist = unifyServerList(ns, attackerlist);
	return attackerlist;
}
export function getTarget(ns) {
	var hacklevelfilter = getTargetList(ns);
	var target = getServerofObjServerList(ns, hacklevelfilter, "rating_total", "max" );
	return target;
}
export function getTargetList(ns) {
	var serverlist = getServerObjList(ns);
	var portsfilter = serverlist.filter(element => element.numOpenPortsRequired <= PortHandler.getPlayerPortlevel(ns) );
	var hacklevelfilter = portsfilter.filter (element => element.requiredHackingSkill <= ns.getHackingLevel());
	var moneyfilter = hacklevelfilter.filter (element => element.moneyMax >= 1)
	return moneyfilter.sort((a,b) => b.rating_total - a.rating_total);
}
function getServerofObjServerList (ns, serverlist, value, direction) {
	var returnserver = "unset";
	var compare = "unset"
	for (let server of serverlist) {
		if (compare == "unset") {
			returnserver = server;
			compare = server[value];
		}
		if (direction === "max") {
			if ( compare < server[value]) {
				returnserver = server;
				compare = server[value];
			}
		}
		if (direction === "min") {
			if ( compare > server[value]) {
				returnserver = server;
				compare = server[value];
			}
		}
	}
	return returnserver;
}