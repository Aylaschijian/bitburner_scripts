/** @param {NS} ns **/
export async function main(ns) {
    await runScripts(ns, ns.args[0], ns.args[1])
}
var scripts = [
    [   "weaken.js", 
        ns.getServerSecurityLevel(target)>ns.getServerMinSecurityLevel(target), 
        ns.getWeakenTime(target)
    ],
    [   "hack.js",
        ns.hackAnalyzeChance(target) && ns.getServerMaxMoney(target)*0.8 < ns.getServerMoneyAvailable(target),
        ns.getHackTime(target)
    ],
    [
        "grow.js",
        ns.getServerMaxMoney(target)*0.5 > ns.getServerMoneyAvailable(target),
        ns.getGrowTime(target)
    ],
]
async function runScripts(ns, target = "joesguns", boolean = {"stock": false}) {
    var host = ns.getHostname();
    var avaRam = (ns.getServerMaxRam(host)-ns.getServerUsedRam(host))
    while(true){
        for (let script of scripts) {
            if(script[1])
                await runScript(ns, script, host, avaRam, target, boolean);
        }
    }
}

async function runScript(ns, script, host, avaRam, target, boolean) {
    ns.run(script[0], avaRam/ns.getScriptRam(script[0], host), target, boolean);
    await ns.sleep(1+script[2])
}