/** @param {NS} ns **/
export async function main(ns) {

}

function checkFocus(ns) {
	if (isFocused(ns) != true) {

	}
}

function isFocusChangeNeeded(ns) {
	return !(ns.singularity.isFocused() && ns.singularity.isBusy());
}