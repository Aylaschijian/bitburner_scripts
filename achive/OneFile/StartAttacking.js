import {getAttackerServerList,getTargetList } from "lib/ServerList.js";
import * as PortHandler from "lib/PortHandler.js";
import {killAllHackWeakGrow, killAllShare} from "lib/KillScripts.js";
/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	killAllShare(ns);
	killAllHackWeakGrow(ns);
	await ns.sleep(100);

	var targetlist = getTargetList(ns);
	var attackerlist = getAttackerServerList(ns);
	await startAttackingList(ns,attackerlist, targetlist);
}
/** @param {NS} ns **/

async function startAttackingList(ns, attackerlist, targetlist) {
	var targetindex = 0;
	var ramneed = ns.getScriptRam("/OneFile/hackweakgrow.js");
	var attackerthreadcounter = 0;
	var targetthreadcounter = 0;
	PortHandler.openServerWithList(ns, targetlist);
	PortHandler.openServerWithList(ns, attackerlist);
	var homeReturn = await startAttackingfromHome(ns, targetlist, targetindex, ramneed);
	await ns.sleep(1);
	
	targetindex = homeReturn[0];
	targetthreadcounter = homeReturn[1];
	attackerthreadcounter = homeReturn[2];
	if( targetindex >= targetlist.length) {
		targetindex = 0;
		attackerthreadcounter = 0;
	 	targetthreadcounter = 0;
	}
	if( targetindex < targetlist.length) {
			
		for (let attacker of attackerlist) {
			var targetobj = targetlist[targetindex];
			var target = targetobj.hostname;
			var servername = attacker.hostname;
			if(servername == "home") {
				continue;
			}
			else {
				var possiblethread = (attacker.maxRam - attacker.ramUsed)/ramneed;
				if(targetthreadcounter == 0) {
					targetthreadcounter += targetobj.neededthreads;
					ns.tprint(targetthreadcounter+" "+attackerthreadcounter);
				}
				if(await startAttacking(ns, servername, target, possiblethread)){
					attackerthreadcounter += possiblethread;
					var stillneeded = targetthreadcounter-attackerthreadcounter;
					ns.tprint(stillneeded);
					if(attackerthreadcounter >= targetthreadcounter) {
						targetindex++;
						attackerthreadcounter = 0;
						targetthreadcounter = 0;
						if(targetindex >= targetlist.length) {
							targetindex = 0;
						}
					}
				}
				await ns.sleep(1);
			}
		}
	}

}
async function startAttackingfromHome(ns, targetlist, targetindex, ramneed) {
	if(ns.scriptRunning("/OneFile/hackweakgrow.js", "home") == false) {
		var hostobj = ns.getServer("home");
		var maxRam = hostobj.maxRam;
		var ramUsed = hostobj.ramUsed;
		var ramatleast = ns.getScriptRam("/OneFile/StartAttacking.js") 
		ramatleast += ns.getScriptRam("/contracts/solveContracts.js")
		ramatleast += ns.getScriptRam("/stock/StockManager.js")
		ramatleast += ns.getScriptRam("/Watchdog.js")
		if (ramatleast > ramUsed) {
			ramUsed = ramatleast;
		}
		ns.tprint("ramUsed "+ramUsed)
		ns.tprint("ramatleast "+ramatleast)
		var possiblethread = (maxRam - ramUsed )/ramneed;
		ns.tprint("possiblethread "+possiblethread);
		var counter = 1;
		while(possiblethread >= 1) {
			await ns.sleep(1);
			var targetobj = targetlist[targetindex];
			var target = targetobj.hostname;
			var thread = targetobj.neededthreads * counter;
			var lastthread = possiblethread;
			var stillneededthreads = targetobj.neededthreads - possiblethread;
			ns.tprint("targetthread "+thread + " counter "+counter);
			if(possiblethread < thread) {
				thread = possiblethread;
			}
			if(thread > 1) {
				await ns.sleep(1);

				if (ns.isRunning("/OneFile/hackweakgrow.js", "home", target)) {
					if(ns.kill("/OneFile/hackweakgrow.js","home", target )) {
						possiblethread +=  targetobj.neededthreads * (counter-1);
					}
				}
				possiblethread = possiblethread - thread;
				
				if(ns.run("/OneFile/hackweakgrow.js", thread, target)) {
					ns.tprint("home attacks "+target+" "+targetindex+" with "+ thread + " still needed "+ stillneededthreads);
					if (possiblethread >= 4) {
						targetindex++;
					}
						
				}
			}
			else {
				targetindex++;
			}
			if(targetindex >= targetlist.length) {
				targetindex = 0;
				counter++;
			}
		}
		var freeRam = ns.getServer("home").maxRam - ramUsed;
		var needRamShare = ns.getScriptRam("/misc/Share.js")
		if (freeRam > needRamShare) {
			ns.run("/misc/Share.js", (freeRam/needRamShare))
		}
	}
	return [targetindex, stillneededthreads , lastthread ];
}
async function startAttacking(ns, servername, target, thread) {

	if(servername != "home") {
		await ns.scp("/OneFile/hackweakgrow.js", "home", servername);
	}
	
	if (thread >= 1) {
		if(ns.exec("/OneFile/hackweakgrow.js", servername, thread, target) != 0){
			ns.tprint("Start Attacking "+target+ " on "+ servername+ " with "+thread+" still needed + ");
			return true;
		}
	}
	return false;
}