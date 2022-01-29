import {getPlayerPortlevel} from "/lib/PortHandler.js";
/** @param {NS} ns **/
export async function main(ns) {
	startProgrammdevelopment(ns);
}

function startProgrammdevelopment (ns) {
	while (getPlayerPortlevel(ns) <= 5) {
		if (ns.getHackingLevel() >= 50) {
			if(ns.singularity.createProgram("BruteSSH.exe")) {
				ns.run("Start.ns");
			}
		}
		if (ns.getHackingLevel() >= 100) {
			if(ns.singularity.createProgram("FTPCrack.exe")) {
				ns.run("Start.ns");
			}
		}
		if (ns.getHackingLevel() >=  250 ) {
			if(ns.singularity.createProgram("relaySMTP.exe")) {
				ns.run("Start.ns");
			}
		}
		if (ns.getHackingLevel() >= 500) {
			if(ns.singularity.createProgram("HTTPWorm.exe") ){
				ns.run("Start.ns");
			}
		}
		if (ns.getHackingLevel() >= 750) {
			if(ns.singularity.createProgram("SQLInject.exe")) {
				ns.run("Start.ns");
			}
		}
	}
}