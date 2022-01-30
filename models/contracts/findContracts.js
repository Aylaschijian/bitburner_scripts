import {getServerList} from "/models/server/ServerList.js";
/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args[0] == "info") {
		ns.tprint(getSingleObject(ns))
		ns.exit()
	} 
}

export function findContracts(ns) {
	var serverlist = getServerList(ns);
	var contractsserver = [];
	for (let server of serverlist) {
		var files = ns.ls(server, ".cct");
		if (files.length > 0) {
			contractsserver = contractsserver.concat({"server": server, "files" : files})
		}
	}
	return contractsserver;
}

export function getSingleObject(ns, serverlist = findContracts(ns)) {
	var returnlist = [];
	for (let server of serverlist) {
		for (let file of server.files){
			returnlist.push({
				"server"	: server.server, 
				"file" 		: file, 
				"type"		: ns.codingcontract.getContractType(file, server.server),
				"data"		: ns.codingcontract.getData(file, server.server),
				"desc"		: ns.codingcontract.getDescription(file, server.server),
				"tries"		: ns.codingcontract.getNumTriesRemaining(file, server.server)
			})
		}
	}
	return returnlist;
}