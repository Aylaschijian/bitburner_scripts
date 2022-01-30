/** @param {NS} ns **/
export async function main(ns) {
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