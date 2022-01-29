/** @param {NS} ns **/
export async function main(ns) {

}

export function unifyArray(array) {
    var uniq = [...new Set(array)];
	return uniq;
}

export function hasAccessFn(ns, fn) {
    try {
        ns[fn](ns)
        return true;
    }
    catch {
        return false;
    }
}