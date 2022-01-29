import {getRichServerObject} from "lib/Server.js";
import {getAttackerServerList, unifyServerList} from "lib/ServerList.js";
/** @param {NS} ns **/
export async function main(ns) {

	ns.tprint("Watchdog beginns");
	await ns.sleep(10000);
	await watchlists(ns);
	await ns.sleep(10000);
	ns.tprint("Watchdog ends");
	ns.spawn("WGH/Preparations.js", 1);
}

async function watchlists(ns) {
	var list_weak = getTargetList(ns, "weak");
	var list_grow = getTargetList(ns, "grow");
	var list_hack = getTargetList(ns, "hack");
	var lists = {"weak" : list_weak, "grow" : list_grow, "hack" : list_hack};
	//var needs = ["weak", "grow", "hack"]
	var needs = ["weak"]
	for (let need of needs) {
		for (let list of lists[need]) {
			ns.tprint(list);
			await checkLists(ns, list, need);
		}
	}

}
function getTargetList(ns, need) {
	var serverlist = getAttackerServerList(ns);
	var resultlist = []
	for (let server of serverlist) {
		let servername = server.hostname;
		let scriptlist = ns.ps(servername);
		var scriptname = need+".js";
		for (let script of scriptlist) {
			if (script.filename == scriptname) {
				resultlist.push(script.args);
			}
		} 
	}
	resultlist = unifyServerList(ns, resultlist);
	return resultlist;
}
async function checkLists (ns, list, attribut) {
	while (list && list.length > 0) {
		
		var timer = 1;
		var newlist = []
		for(let servername of list) {
			let server = getRichServerObject(ns, servername);
			var attribute = "neededthreads_"+attribut;
			if (server[attribute] > 1) {
				newlist.push(server);
				var estimed = (getTimers(ns, servername)[attribut]);
				if(timer < estimed) {
					timer = estimed;
				}
			}
		}
		list = newlist;
		ns.tprint("Dog sleeps for "+timer)
		await ns.sleep(timer);
	}
}
function getTimers(ns, host) {
	return {
		grow: ns.getGrowTime(host), 
		weak: ns.getWeakenTime(host), 
		hack: ns.getHackTime(host)
	};
}