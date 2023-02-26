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
    }
    catch (e) {
        ns.print(`${e}`);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY291dC9udWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sU0FBUyxHQUFHO0lBQ2QsVUFBVTtJQUNWLFVBQVU7SUFDVixXQUFXO0lBQ1gsVUFBVTtJQUNWLFdBQVc7SUFDWCxNQUFNO0NBQ1QsQ0FBQztBQUVGOzsrRUFFK0U7QUFDL0UsTUFBTSxVQUFVLElBQUksQ0FBQyxFQUFNLEVBQUUsTUFBYztJQUMzQywwQkFBMEI7SUFDMUIsaUNBQWlDO0lBQ2pDLHFDQUFxQztJQUNyQyxrQ0FBa0M7SUFDbEMsZ0NBQWdDO0lBQ2hDLFdBQVc7SUFDWCxPQUFPO0lBRUgsSUFBSTtRQUNBLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN4QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBQztJQUMvQixJQUFJO1FBQ0EsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQixFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixNQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxLQUFLLEVBQUU7UUFDVixFQUFFLENBQUMsS0FBSyxDQUFDLDRCQUE0QixNQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVMLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsK0JBQStCO0lBQy9CLE9BQU87QUFDUCxDQUFDO0FBQ0Q7OzRDQUU0QztBQUM1QyxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFLO0lBQzVCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtRQUMvRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsS0FBSyxJQUFJLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFBRSxFQUFFLE9BQU8sQ0FBQztLQUM3QztJQUNELEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLDZDQUE2QyxDQUFDLENBQUM7SUFFckYsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9