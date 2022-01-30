/** @param {NS} ns **/
export async function main(ns) {

}

function hasAccess(ns) {
    var boolean = false;
    try {
        ns.getSymbols();
        boolean = true;
    }
    catch {
        
    }
    return boolean;
}

