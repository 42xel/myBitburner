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
export function nuke(ns, target) {
    //    let enabledLog = [];
    //    for (let fn of nukeNames) {
    //        if (ns.isLogEnabled(fn) ){
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
    }
    catch { }
    try {
        ns.nuke(target);
        ns.toast(`target nuked : ${target}`, "success");
        return true;
    }
    catch (e) {
        ns.toast(`target resisted nuking : ${target}`, "warning");
        ns.print(`${e}`);
        return false;
    }
    //    finally {
    //        for (let fn of nukeNames)
    //            ns.enableLog(fn);
    //    }
}
/** A function trying to nuke a server.
 *  @param {NS} ns -
 * @returns - The number of server nuked. */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.tprint("ERROR Incorrect usage of nuke. usage: nuke [server1] [server2] ...");
        return -1;
    }
    let nbNuked = 0;
    for (let hostname of ns.args) {
        if (nuke(ns, String(hostname)))
            ++nbNuked;
    }
    ns.tprint(`${nbNuked}/${ns.args.length} servers nuked. Look the toasts for deails.`);
    return nbNuked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY291dC9udWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sU0FBUyxHQUFHO0lBQ2QsVUFBVTtJQUNWLFVBQVU7SUFDVixXQUFXO0lBQ1gsVUFBVTtJQUNWLFdBQVc7SUFDWCxNQUFNO0NBQ1QsQ0FBQztBQUVGOzsrRUFFK0U7QUFDL0UsTUFBTSxVQUFVLElBQUksQ0FBQyxFQUFNLEVBQUUsTUFBYztJQUMzQywwQkFBMEI7SUFDMUIsaUNBQWlDO0lBQ2pDLG9DQUFvQztJQUNwQyxrQ0FBa0M7SUFDbEMsZ0NBQWdDO0lBQ2hDLFdBQVc7SUFDWCxPQUFPO0lBRUgsSUFBSTtRQUNBLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN4QjtJQUFDLE1BQU0sR0FBRTtJQUVWLElBQUk7UUFDQSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLE1BQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLEVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLE1BQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0wsZUFBZTtJQUNmLG1DQUFtQztJQUNuQywrQkFBK0I7SUFDL0IsT0FBTztBQUNQLENBQUM7QUFDRDs7NENBRTRDO0FBQzVDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUs7SUFDNUIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvRUFBb0UsQ0FBQyxDQUFBO1FBQy9FLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDYjtJQUNELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixLQUFLLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUFFLEVBQUUsT0FBTyxDQUFDO0tBQzdDO0lBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sNkNBQTZDLENBQUMsQ0FBQztJQUVyRixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDIn0=