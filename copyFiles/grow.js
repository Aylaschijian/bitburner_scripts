/** @param {NS} ns **/
export async function main(ns) {
    grow(ns, ns.args[0], {stock: ns.args[1]})
}

function grow(ns, target = "joesguns", opts = {stock: false}) {
    ns.grow(target, opts);
}