/** @param {NS} ns **/
export async function main(ns) {

}

function getGoals() {
    var goals = {
        "end" : isBackdoorAble("w0r1d_d43m0n") && hasAug("The Red Pill"),
        "hackFaction_First": isBackdoorAble("CSEC"),
        "hackFaction_Second": isBackdoorAble("avmnite-02h"),
        "hackFaction_Third": isBackdoorAble("I.I.I.I"),
        "hackFaction_fourth": isBackdoorAble("run4theh111z"),
        "joined_Daedelus" : inFaction("Daedelus"),
        "isinGang": inGang(),
        "PortOpener1": hasAug("CashRoot Starter Kit")
    }
    return goals;
}
function isBackdoorAble(servername) {
    return canOpenPorts(servername) && hasReqHackingSkill(servername);
}