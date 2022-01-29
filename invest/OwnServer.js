/** @param {NS} ns **/
export async function main(ns) {

	if(ns.args[0] == "info") {
		getInfos(ns, ns.args[1]);
	}
	if(ns.args.length > 0) {
		ns.exit();
	}
	await buyMaxRam(ns);
}
function getInfos(ns, ram = ns.getPurchasedServerMaxRam()) {
	//ns.tprint(ns.getPurchasedServerCost(ram) <= ns.getServerMoneyAvailable("home"));
	ns.tprint(ns.getPurchasedServerCost(ram));
}
async function buyMaxRam(ns) {
	ns.disableLog("ALL");
	
	var ram = ns.getPurchasedServerMaxRam();

	var name = "attacker-0";
	
	while (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
		
		if(ns.getPurchasedServerCost(ram) <= ns.getServerMoneyAvailable("home")) {
			ns.purchaseServer(name, ram);
			await ns.sleep(1000);
			ns.run("OneFile/StartAttacking.js", 1);
		}
		else {
			await ns.sleep(1000);
		}
	}
}