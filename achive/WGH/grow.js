/** @param {NS} ns **/
export async function main(ns) {
	var hostname = ns.args[0];
	while(true) {
		await ns.grow(hostname);
	}	
}