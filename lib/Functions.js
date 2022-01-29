/** @param {NS} ns **/
export async function main(ns) {
    //ns.tprint(unifyArray([0,1]))
    //ns.tprint(unifyArray([2,2,3,4,5,5]))
}

export function unifyArray(array) {
    var uniq = [...new Set(array)];
	return uniq;
}

export function hasAccesstoFn(ns, fn) {
    try {
        ns[fn]
        return true;
    }
    catch {
        return false;
    }
}