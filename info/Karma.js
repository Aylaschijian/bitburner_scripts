/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint(getKarma(ns))
}

function getKarma(ns) {
	return ns.heart.break();
}