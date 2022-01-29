/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	await investinHacknet(ns);
}

async function investinHacknet(ns) {
	// var goal = ns.hacknet.getPurchaseNodeCost() < 1000000;
	//var goal = ns.hacknet.numNodes() < 20;
	await purchaseNodeOrWait(ns);

	while (ns.hacknet.numNodes() < 10) {
		let obj = findLowestInvestObj(ns);
		await buyforObj(ns, obj);
		await sleep(ns);
	}
	while (!isallNodesMaxedOut(ns)) {
		let objlist = getAllInvestObj(ns).slice(0, -1);
		let obj = findLowestInvestObj(ns, objlist);
		await buyforObj(ns, obj);
		await sleep(ns);
	}
}
async function buyforObj(ns, obj) {
	switch (obj.type) {
		case "level":
			await purchaseLevelOrWait(ns, obj);
			break;
		case "ram":
			await purchaseRamOrWait(ns, obj);
			break;
		case "cores":
			await purchaseCoreOrWait(ns, obj);
			break;
		case "node":
			await purchaseNodeOrWait(ns);
			break;
	}

}
function getAllInvestObj(ns) {
	let levelobj = getLowestLevelUpgrade(ns);
	let ramobj = getLowestRamUpgrade(ns);
	let coresobj = getLowestCoreUpgrade(ns);
	let nodeobj = { cost: ns.hacknet.getPurchaseNodeCost(), node: ns.hacknet.numNodes(), type: "node" };
	return [levelobj, ramobj, coresobj, nodeobj];
}
function findLowestInvestObj(ns, investObjs = getAllInvestObj(ns)) {
	let obj = "unset";
	for (let invest of investObjs) {
		if (obj == "unset") {
			obj = invest;
		}
		if (invest.cost < obj.cost) {
			obj = invest;
		}
	}
	return obj;
}
async function sleep(ns) {
	await ns.sleep(1);
}
function updateNodestats(ns) {
	nodestats = getHacknetStats(ns);
}
async function purchaseNodeOrWait(ns) {
	let isBought = true;
	while (isBought) {
		if (ns.getServerMoneyAvailable("home") > ns.hacknet.getPurchaseNodeCost()) {
			if(ns.hacknet.purchaseNode()) {
				isBought = false;
			}
		} else {
			await sleep(ns);
		}
	}
}
async function purchaseRamOrWait(ns, ramnode) {
	let isBought = true;
	while (isBought) {
		if (ns.getServerMoneyAvailable("home") >= ramnode.cost) {
			if (ns.hacknet.upgradeRam(ramnode.node, 1)) {
				isBought = false;
			}
		}
		else {
			await sleep(ns);
		}
	}
}
async function purchaseLevelOrWait(ns, levelnode) {
	let isBought = true;
	do {
		if (ns.getServerMoneyAvailable("home") >= levelnode.cost) {
			if(ns.hacknet.upgradeLevel(levelnode.node, 1)) {
				isBought = false;
				break;
			}
		}
		else {
			await sleep(ns);
		}
	} while (isBought)
}
async function purchaseCoreOrWait(ns, corenode) {
	let isBought = true;
	while (isBought) {
		if (ns.getServerMoneyAvailable("home") >= corenode.cost) {
			ns.hacknet.upgradeCore(corenode.node, 1);
			isBought = false;
			break;
		}
		else {
			await sleep(ns);
		}
	}
}
function getLowestLevelUpgrade(ns) {
	let nodes = ns.hacknet.numNodes();
	let comparelvl = 200;
	let returnindex = -1;
	for (let i = 0; i < nodes; i++) {
		let level = ns.hacknet.getNodeStats(i).level;
		if (level <= comparelvl) {
			comparelvl = level;
			returnindex = i;
		}
	}
	return { cost: ns.hacknet.getLevelUpgradeCost(returnindex), node: returnindex, type: "level" }
}
function getLowestRamUpgrade(ns) {
	let nodes = ns.hacknet.numNodes();
	let comparelvl = 64;
	let returnindex = -1;
	for (let i = 0; i < nodes; i++) {
		let level = ns.hacknet.getNodeStats(i).ram;
		if (level <= comparelvl) {
			comparelvl = level;
			returnindex = i;
		}
	}
	return { cost: ns.hacknet.getRamUpgradeCost(returnindex), node: returnindex, type: "ram" };
}
function getLowestCoreUpgrade(ns) {
	let nodes = ns.hacknet.numNodes();
	let returnindex = -1;
	let comparelvl = 16;
	for (let i = 0; i < nodes; i++) {
		let level = ns.hacknet.getNodeStats(i).cores;
		if (level <= comparelvl) {
			comparelvl = level;
			returnindex = i;
		}
	}
	return { cost: ns.hacknet.getCoreUpgradeCost(returnindex), node: returnindex, type: "cores" };
}
function getHacknetStats(ns) {
	let nodes = ns.hacknet.numNodes();
	let total_ram = 0;
	let total_cores = 0;
	let total_level = 0;
	for (let i = 0; i < nodes; i++) {
		let nodestat = ns.hacknet.getNodeStats(i);
		total_ram += nodestat.ram;
		total_cores += nodestat.cores;
		total_level += nodestat.level;
	}
	return {
		ram: total_ram,
		cores: total_cores,
		level: total_level
	};
}

function factiongoalNetburners(ns, nodestatobj) {
	if (nodestatobj.level <= 100 && nodestatobj.cores <= 4 && nodestatobj.ram <= 8) {
		return true;
	}
	return false;
}
function isNodeMaxedOut(ns, index) {
	let nodeobj = ns.hacknet.getNodeStats(index);
	if (nodeobj.level == 200 && nodeobj.cores == 16 && nodeobj.ram == 64) {
		return true;
	}
	return false;
}
function isallNodesMaxedOut(ns) {
	let nodes = ns.hacknet.numNodes();
	for (let i = 0; i < nodes; i++) {
		if (!isNodeMaxedOut(ns, i)) {
			return false;
		}
	}
	return true;
}