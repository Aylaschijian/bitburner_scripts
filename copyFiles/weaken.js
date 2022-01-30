/** @param {NS} ns **/
export async function main(ns) {
    weaken(ns, ns.args[0], {stock: ns.args[1]})
}

function weaken(ns, target = "joesguns", opts = {stock: false}) {
    ns.weaken(target, opts);
}