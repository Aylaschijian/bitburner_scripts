import {getServerList} from "lib/ServerList.js";
/** @param {NS} ns **/
export async function main(ns) {
	var needle = ns.args[0];
	if(getServerMap(ns).includes(needle)) {
		ns.tprint("search for "+needle);
		//ns.tprint(getDistanceToHome(ns, needle))
		printRoute(ns, needle);
	}
	else {
		ns.tprint("wrong needle");
	}
}
function printRoute(ns, needle) {
	var distance = getDistanceToHome(ns, needle);
	var route = [{"server": needle, "distance": distance}];

	for (let i = 0; i < distance; i++) {

		route = route.concat(getNextWithMinDist(ns, route[i]["server"]))
	}
	return ns.tprint(route.sort((a,b) => a.distance - b.distance));
}
function getNextWithMinDist(ns, server) {
	var next = getNext(ns, server);
	var	array = []
	for (let n of next) {
		array.push({"server": n, "distance": getDistanceToHome(ns, n)})
	}
	return array.sort((a,b) => a.distance - b.distance)[0];
}
function getNext(ns, server) {
	return ns.scan(server);
}

function calculateDistancetoHome(ns, server, alreadyvisit = []) {
	if(server == "home") {
		return 0;
	}
	if (alreadyvisit.includes(server)) {
		return 100;
	}
	else {
		var nexts = getNext(ns, server);
		var nextdatas = []
		for (let next of nexts) {
			nextdatas.push({"distance": calculateDistancetoHome(ns, next, alreadyvisit.concat(server)), "server": next})
		}

		nextdatas.sort((a,b) => a.distance - b.distance)

		return 1 + nextdatas[0].distance;
	}
}
function getDistanceToHome(ns, server) {
	return calculateDistancetoHome(ns, server);
}
function getServerMap(ns) {
	var serverlist = getServerList(ns);
	return serverlist;
}

export function autocomplete(data, args) {
  return [...data.servers];
}