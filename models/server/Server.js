/** @param {NS} ns **/
export async function main(ns) {

}

export function getLightWightObj(ns, host) {
    return {
        "hostname"  : host,
        "time_weaken": ns.getWeakenTime(host),
        "baseSec"   : ns.getServerBaseSecurityLevel(host),
        "growth"    : ns.getServerGrowth(host),
        "maxMoney"  : ns.getServerMaxMoney(host),
        "maxRam"    : ns.getServerMaxRam(host),
        "minSec"    : ns.getServerMinSecurityLevel(host),
        "avaMoney"  : ns.getServerMoneyAvailable(host),
        "PortsReq"  : ns.getServerNumPortsRequired(host),
        "usedRam"   : ns.getServerUsedRam(host),
        "HackingReq": ns.getServerRequiredHackingLevel(host),
        "secLevel"  : ns.getServerSecurityLevel(host),
        "hasRoot"   : ns.hasRootAccess(host),
    }
}
export function getBaseObj(ns, host) {
    return ns.getServer(host)
}	

export function getRichObj(ns, host) {
    return null;
}

export function autocomplete(data, args) {
    return [...data.servers];
}

	

	
	
	
	