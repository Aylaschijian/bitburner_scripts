/** @param {NS} ns **/
export async function main(ns) {
	var hostname = ns.args[0];
	var counter = 0;
	while(ns.args[1]>counter) {
		await ns.weaken(hostname);
		counter++;
	}	
}