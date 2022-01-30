/** @param {NS} ns **/
export async function main(ns) {

}
var hackPrograms = ['BruteSSH.exe', 'FTPCrack.exe', 'relaySMTP.exe', 'HTTPWorm.exe', 'SQLInject.exe'];
	
export function getPlayerPortlevel(ns){
	var count = 0;
	for (let hackProgram of hackPrograms) {
		if(ns.fileExists(hackProgram, "home")){
			count++;
		}
	}
	return count;
}
export function openPorts(ns, target){
	for (let hackProgram of hackPrograms) {
		if(ns.fileExists(hackProgram, "home")){
			if (hackProgram ==  'BruteSSH.exe') {
				ns.brutessh(target);
			}
			if (hackProgram ==  'FTPCrack.exe') {
				ns.ftpcrack(target);
			}
			if (hackProgram ==  'relaySMTP.exe') {
				ns.relaysmtp(target);
			}
			if (hackProgram ==  'HTTPWorm.exe') {
				ns.httpworm(target);
			}
			if (hackProgram ==  'SQLInject.exe') {
				ns.sqlinject(target);
			}		
			
		}
	}

}
export function openServerWithList(ns, list) {
	for(let serv of list) {
		openServer(ns, serv);
	}
}
function openServer(ns, target) {
	if(ns.hasRootAccess(target) == false) {
		ns.tprint("Open Ports on " + target)
		openPorts(ns, target);
		ns.nuke(target);
	}
}