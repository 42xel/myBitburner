import { NS } from "@ns";

const nukeNames = [
    "brutessh",
    "ftpcrack",
    "relaysmtp",
    "httpworm",
    "sqlinject",
    "nuke",
];

/** A function trying to nuke a server.
 *  @param {NS} ns - 
 * @returns - true if the server has been succesfully nuke, false otherwise. */
export function nuke(ns: NS, target: string ): boolean {
//    let enabledLog = [];
//    for (let fn of nukeNames) {
//        if ( ns.isLogEnabled(fn) ){
//            enabledLog.push(fn);
//            ns.disableLog(fn);
//        }
//    }
    
    try {
        ns.brutessh(target);
        ns.ftpcrack(target);
        ns.relaysmtp(target);
        ns.httpworm(target);
        ns.sqlinject(target);
    } catch (e) {ns.print(`${e}`);}
    try {
        ns.nuke(target);
        ns.toast(`target nuked : ${target}`, "success");
        return true;
    }
    catch (eNuke) {
        ns.toast(`target resisted nuking : ${target}`, "warning");
        ns.print(`${eNuke}`);
        return false;
    }
    
//    finally {
//        for (let fn of enabledLog)
//            ns.enableLog(fn);
//    }
}
/** A function trying to nuke a server.
 *  @param {NS} ns - 
 * @returns - The number of server nuked. */
export async function main(ns:NS) {
    if (ns.args.length == 0) {
        ns.tprint("ERROR Incorrect usage of nuke. usage: nuke [server1] [server2] ...")
        return -1;
    }
    let nbNuked = 0;
    for (let hostname of ns.args){
        if (nuke(ns, String(hostname))) ++nbNuked;
    }
    ns.tprint(`${nbNuked}/${ns.args.length} servers nuked. Look the toasts for deails.`);

    return nbNuked;
}
