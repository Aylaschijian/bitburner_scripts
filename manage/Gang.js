/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args[0] == "info_eq") {
		ns.tprint(getAllEqObj(ns));
		ns.exit();
	}
	if (ns.args[0] == "info_gang") {
		ns.tprint(getGangInfo(ns));
		ns.exit();
	}
	if (ns.args[0] == "info_task") {
		ns.tprint(getAllTaskInfos(ns));
		ns.exit();
	}
	if (ns.args[0] == "info_members") {
		ns.tprint(getMembersInfo(ns));
		ns.exit();
	}
	if (!ns.gang.inGang()) {
		ns.gang.createGang("NiteSec");
	}
	if (ns.gang.inGang()) {
		await recruitMembersandManage(ns);
	}

}

async function recruitMembersandManage(ns) {
	var memberinfos = getMembersInfo(ns);
	while (memberinfos.length <= 12) {
		var memberinfos = getMembersInfo(ns);
		var ganginfo = getGangInfo(ns);
		var gangtype = (ganginfo.isHacking == true) ? "hack" : "str";
		var taskinfos = getAllTaskInfos(ns);
		if (memberinfos.length != 12) {
			recruitMemberSetFirstTask(ns, gangtype);
		}
		ascendAllMembers(ns, memberinfos, gangtype);
		optimizeJob(ns, memberinfos, ganginfo, gangtype, taskinfos);
		optimizeEQ(ns, memberinfos, ganginfo, gangtype);
		await ns.sleep(3000);
	}
}
function optimizeJob(ns, memberinfos, ganginfo, gangtype, taskinfos) {
	var need = findHighestNeed(ns, memberinfos, ganginfo, gangtype);
	var solution = null;
	if (gangtype == "hack") {
		solution = {
			"wanted": findTaskbyArgs(ns, taskinfos, "isHacking", "baseWanted"),
			"money": findTaskbyArgs(ns, taskinfos, "isHacking", "baseMoney"),
			"rep": findTaskbyArgs(ns, taskinfos, "isHacking", "baseRespect")
		};
	}
	if (gangtype == "str") {
		solution = {
			"wanted": findTaskbyArgs(ns, taskinfos, "isCombat", "baseWanted"),
			"money": findTaskbyArgs(ns, taskinfos, "isCombat", "baseMoney"),
			"rep": findTaskbyArgs(ns, taskinfos, "isCombat", "baseRespect")
		}
	}

	setJobforAllMembers(ns, memberinfos, solution[need][0], gangtype);
}
function setJobforAllMembers(ns, memberinfos, task, gangtype) {
	for (let member of memberinfos) {
		var asc_mult = gangtype + "_asc_mult";
		if (member.general[asc_mult] > 40 && 10000 < member.general[gangtype]) {
			ns.gang.setMemberTask(member.name, task.name);
		}
		else {
			setTraining(ns, member.name, gangtype);
		}
	}
}
function findHighestNeed(ns, memberinfos, ganginfo) {
	if (ganginfo.wantedPenalty >= 1) {
		return "wanted";
	}
	if (memberinfos.length == 12) {
		return "money";
	}
	else {
		return "rep";
	}
}
function findTaskbyArgs(ns, taskinfos, filter, sort) {
	taskinfos = taskinfos.filter(element => element.stats[filter] == true);
	if ("sort" == "baseWanted") {
		return taskinfos.sort((a, b) => a.stats[sort] - b.stats[sort]);
	}
	return taskinfos.sort((a, b) => b.stats[sort] - a.stats[sort]);
}
function optimizeEQ(ns, memberinfos, ganginfo, gangtype) {
	for (let member of memberinfos) {
		var asc_mult = gangtype + "_asc_mult";
		if (member.general[asc_mult] > 40) {
			if (gangtype == "hack") {
				var type = "Rootkit";
			}
			if (gangtype == "str") {
				var type = "Weapon";
			}
			var eqsugs = getNeededEQ(ns, gangtype, type);
			if(member.general.upgrades.length < eqsugs.length) {
				for (let eqsug of eqsugs) {
					if (eqsug.cost + 5000000 < ns.getServerMoneyAvailable("home")) {
						ns.gang.purchaseEquipment(member.name, eqsug.name);
					}
				}
			}
		}
	}
}
function ascendAllMembers(ns, memberinfos, gangtype) {

	for (let info of memberinfos) {
		if (info.asc && info.asc[gangtype] > 1.1 && info.general.hack_asc_mult < 41) {
			ascendMember(ns, info.name, gangtype);
		}
	}
}
function ascendMember(ns, member, gangtype) {
	if (ns.gang.ascendMember(member) != "undefined"); {
		setTraining(ns, member, gangtype);
	}
}

function getMembersInfo(ns) {
	var members = ns.gang.getMemberNames();
	var memberinfo = [];
	for (let member of members) {
		memberinfo.push({ name: member, general: ns.gang.getMemberInformation(member), asc: ns.gang.getAscensionResult(member) })
	}
	return memberinfo;
}
function getGangInfo(ns) {
	return ns.gang.getGangInformation();
}
function recruitMemberSetFirstTask(ns, gangtype) {
	if (ns.gang.canRecruitMember()) {
		var members = ns.gang.getMemberNames();
		var name = nameGenerator(ns, members.length);
		if (ns.gang.recruitMember(name)) {
			setTraining(ns, name, gangtype);
		}
	}
}
function setTraining(ns, member, gangtype) {
	if (gangtype == "hack") {
		ns.gang.setMemberTask(member, "Train Hacking");
	}
	if (gangtype == "str") {
		ns.gang.setMemberTask(member, "Train Combat");
	}
	if (gangtype == "ch") {
		ns.gang.setMemberTask(member, "Train Charisma");
	}
}
function nameGenerator(ns, iteration) {
	var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	var max = alphabet.length;


	var idear = iteration.toString(max).split('');
	var returnstring = "";
	for (let l = 0; l < idear.length; l++) {
		var letter = parseInt(idear[l], max);
		if (l == 0) {
			returnstring = returnstring.concat(alphabet[letter].toUpperCase());
		}
		else {
			returnstring = returnstring.concat(alphabet[letter]);
		}
	}
	return returnstring;
}
function getAllTaskInfos(ns) {
	var tasklist = ns.gang.getTaskNames();
	var returnlist = [];
	for (let task of tasklist) {
		returnlist.push({ name: task, stats: ns.gang.getTaskStats(task) })
	}
	return returnlist;
}
function getAllHackingTask(ns) {
	var tasklist = getAllTaskInfos(ns);
	var returnlist = tasklist.filter(element => element.stats.isHacking === true && element.stats.isCombat === false)
	return returnlist;
}
function getAllEqObj(ns) {
	var eqlist = ns.gang.getEquipmentNames();
	var eqobjlist = []
	for (let eq of eqlist) {
		eqobjlist.push({ name: eq, cost: ns.gang.getEquipmentCost(eq), stats: ns.gang.getEquipmentStats(eq), type: ns.gang.getEquipmentType(eq) })
	}
	return eqobjlist;
}
function getNeededEQ(ns, sort, filter, list = getAllEqObj(ns)) {
	return list.filter(element => element.type == filter && element.cost < ns.getServerMoneyAvailable("home") && element.stats[sort]).sort((a, b) => b.stats[sort] - a.stats[sort])
}