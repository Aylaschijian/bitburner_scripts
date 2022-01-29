/** @param {NS} ns **/
export async function main(ns) {
	if (!ns.args[0]) {
		var target = ns.getHostname();
	} else {
		var target = ns.args[0];
	}
	
	
	while (true) {
		//var attacker = ns.getServer(ns.getHostname());
		var threads = (attacker.maxRam - attacker.ramUsed); 
		var currentmoney = ns.getServerMoneyAvailable(target);
		var currentsec = ns.getServerSecurityLevel(target);
		if (minsec + 3 <= currentsec) {
			ns.run("weak.js", threads, target )
		}
		if (currentmoney <= maxMoney * 0.85) {
			ns.run("grow.js", threads, target );
		}
		if (currentmoney >= maxMoney * 0.50) {
			ns.run("hack.js", threads, target );
		}

	}	
}