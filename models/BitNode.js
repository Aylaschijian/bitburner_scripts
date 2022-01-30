/** @param {NS} ns **/
export async function main(ns) {

}


/** {"HackingLevelMultiplier":1, "StrengthLevelMultiplier":1, "DefenseLevelMultiplier":1,
 * "DexterityLevelMultiplier":1,"AgilityLevelMultiplier":1,"CharismaLevelMultiplier":1,
 * "ServerGrowthRate":1,"ServerMaxMoney":2,"ServerStartingMoney":0.5,
 * "ServerStartingSecurity":2,"ServerWeakenRate":1,"HomeComputerRamCost":1,
 * "PurchasedServerCost":1,"PurchasedServerSoftcap":1.2,"PurchasedServerLimit":1,
 * "PurchasedServerMaxRam":1,"CompanyWorkMoney":1,"CrimeMoney":0.5,"HacknetNodeMoney":0.2,
 * "ManualHackMoney":1,"ScriptHackMoney":0.15,"ScriptHackMoneyGain":1,"CodingContractMoney":1,
 * "ClassGymExpGain":1,"CompanyWorkExpGain":1,"CrimeExpGain":1,"FactionWorkExpGain":1,
 * "HackExpGain":0.5,"FactionPassiveRepGain":1,"FactionWorkRepGain":1,"RepToDonateToFaction":1,
 * "AugmentationMoneyCost":2,"AugmentationRepCost":1,"InfiltrationMoney":1.5,"InfiltrationRep":1.5,
 * "FourSigmaMarketDataCost":1,"FourSigmaMarketDataApiCost":1,"CorporationValuation":0.5,"CorporationSoftCap":1,
 * "BladeburnerRank":1,"BladeburnerSkillCost":1,"GangSoftcap":1,"DaedalusAugsRequirement":1,"StaneksGiftPowerMultiplier":1.3,
 * "StaneksGiftExtraSize":0,"WorldDaemonDifficulty":1.5} */
function getMulitpliers(ns) {
    return ns.getBitNodeMultipliers()
}