import { getAttackerServerList, getTargetList, unifyServerList } from "lib/ServerList.js";
//import {getRichServerObject} from "lib/Server.js";
/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL"); 
	ns.tprint("Manager beginns");
	await ns.sleep(10000);
	//ns.tprint(getAttackerServerList(ns));
	var list = manageAttacker(ns);
	await ns.sleep(10000);
	ns.tprint("Manager ends");
	ns.spawn("WGH/Watchdog.js", 1);
}
function manageAttacker(ns) {
	var attackerlist = getAttackerServerList(ns);
	//var attackerlist = [getRichServerObject(ns, "n00dles")];
	var targetlist = getTargetList(ns);
	var realtargetlists = {weak: [], hack: [], grow: []};
	var ramObj = getNeededRam(ns);
	var targetindex = 0;
	var used_threadsojb = {weak: 0, grow: 0, hack: 0};
	for (let attacker of attackerlist) {
		var target = targetlist[targetindex];
		var need = target.neededthreadsobj;
		var power = (attacker.maxRam - attacker.ramUsed);
		var powerused = 0;
		var powerobj = {weak: power/ramObj.weak, grow: power/ramObj.grow, hack:power/ramObj.hack};
		if (powerobj.weak < 1 && powerobj.grow < 1, powerobj.hack < 1) {
			continue;
		}
		var tasks = ["weak", "grow", "hack"]
		for (let task of tasks) {
			if (need[task] > 1 && powerused == 0) {
				if(assignServertoTask(ns, task, attacker, target, powerobj[task])) {
					powerused = powerobj[task];
					used_threadsojb[task] += powerused;
					if(!realtargetlists[task].includes(target.hostname)) {
						realtargetlists[task].push(target.hostname);
					}
				}
			}
		}

		
		if (needNewTarget(ns, need, used_threadsojb)) {
			targetindex ++;
			used_threadsojb.weak = 0;
			used_threadsojb.hack = 0;
			used_threadsojb.grow = 0;
		}
	}

	return realtargetlists;
}
function needNewTarget(ns, need, used) {
	ns.tprint(need);
	ns.tprint(used);
	var boolean = (
		need.weak < used.weak || 
		need.hack < used.hack ||
		need.grow < used.grow )
	ns.tprint(boolean);
	return boolean
}
function assignServertoTask(ns, kind, attacker, target, thread) {
	var scriptname = kind+".js";
	if (!ns.isRunning(scriptname, attacker.hostname, thread, target.hostname)) {
		return doexec(ns, scriptname, attacker.hostname, thread, target.hostname);
	}
	else {
		return false;
	}
}
function doexec (ns, scriptname, attacker, threads, target) {
	return ns.exec(scriptname, attacker, threads, target);
}

function getNeededRam(ns) {
	return {
		grow: ns.getScriptRam("grow.js", "home"),
		weak: ns.getScriptRam("weak.js", "home"),
		hack: ns.getScriptRam("hack.js", "home"),
	};
}