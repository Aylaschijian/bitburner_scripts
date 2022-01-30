/** @param {NS} ns **/
export async function main(ns) {
    hack(ns, ns.args[0], {stock: ns.args[1]});
}

function hack(ns, target = "joesguns", opts = {stock: false}) {
    ns.hack(target, opts);
}