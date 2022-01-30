/** @param {NS} ns **/
export async function main(ns) {

}
export function getServerList(ns) {
	var startPoint = "home";
	var startlist = ns.scan(startPoint);
	var endlist = scanServerList(ns, startlist);
	var returnlist = getServerListRecursiv(ns, startlist, endlist);
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