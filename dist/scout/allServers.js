/**
 * @param {NS} ns
 * @description a generator to iterate over all the servers.
 */
export function* allServers(ns) {
    {
        let visited = new Set(["home"]);
        for (let hostname of visited) {
            yield hostname;
            for (let neighbour of ns.scan(hostname)) {
                visited.add(neighbour);
            }
        }
    }
}
const home = "home";
/** A helper function to create server filters.
 * @param {NS} ns
 * @param {string[]} filterSpecifier an array of strings specifying the filter to apply.
 * Each letter corresponds to an elementary test :
 * - h: home
 * - t: is targettable (MaxMoney > 0)
 * - w: worker  (MaxRam > 0)
 * - r: root access
 * - p: is a purchased server.
 *
 * A capital letter denote the complement set.
 *
 * Each string corresponds to a conjonction: to be accepted, a server must pass every elementary test of that string.
 *
 * The array corresponds to a disjonction: to be accepted, a server must pass at least one test.
 *
 * @remark Home counts as a pruchased server. Use "pH" to only get purchased servers as returned by {@link ns.getPurchasedServers}.
 * @description A helper function to create server filters. Best used with {@link someServers}.
 *  */
export function createServerFilter(ns, filterSpecifier = ['']) {
    //	if (filterSpecifier.length == 1 && filterSpecifier[0] === '_') filterSpecifier = [""];
    return function (hostname) {
        for (let clause of filterSpecifier)
            clauseFor: {
                for (let l of clause) {
                    switch (l) {
                        case "H":
                            if (hostname != home)
                                continue;
                            else
                                break clauseFor;
                        case "h":
                            if (hostname == home)
                                continue;
                            else
                                break clauseFor;
                        case "t":
                            if (ns.getServerMaxMoney(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "T":
                            if (!ns.getServerMaxMoney(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "w":
                            if (ns.getServerMaxRam(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "W":
                            if (!ns.getServerMaxRam(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "r":
                            if (ns.hasRootAccess(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "R":
                            if (!ns.hasRootAccess(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "p":
                            if (ns.getServer(hostname).purchasedByPlayer)
                                continue;
                            else
                                break clauseFor;
                        case "P":
                            if (!(ns.getServer(hostname).purchasedByPlayer))
                                continue;
                            else
                                break clauseFor;
                    }
                }
                return true;
            }
        return false;
    };
}
/** A helper function to create server filters.
 * @param {NS} ns
 * @param {string[]} filterSpecifier an array of strings specifying the filter to apply.
 * Each letter corresponds to an elementary test :
 * - h: home
 * - t: is targettable (MaxMoney > 0)
 * - w: worker  (MaxRam > 0)
 * - r: root access
 *
 * A capital letter denote the complement set.
 *
 * Each string corresponds to a conjonction: to be accepted, a server must pass every elementary test of that string.
 *
 * The array corresponds to a disjonction: to be accepted, a server must pass at least one test.
 *
 * @remark Home counts as a pruchased server. Use "pH" to only get purchased servers as returned by {@link ns.getPurchasedServers}.
 * @description A lighter version of {@link createServerFilter}. Best used with {@link someServers}.
 *  */
export function createServerFilterLight(ns, filterSpecifier = ['']) {
    return function (hostname) {
        for (let clause of filterSpecifier)
            clauseFor: {
                for (let l of clause) {
                    switch (l) {
                        case "H":
                            if (hostname != home)
                                continue;
                            else
                                break clauseFor;
                        case "h":
                            if (hostname == home)
                                continue;
                            else
                                break clauseFor;
                        case "t":
                            if (ns.getServerMaxMoney(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "T":
                            if (!ns.getServerMaxMoney(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "w":
                            if (ns.getServerMaxRam(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "W":
                            if (!ns.getServerMaxRam(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "r":
                            if (ns.hasRootAccess(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "R":
                            if (!ns.hasRootAccess(hostname))
                                continue;
                            else
                                break clauseFor;
                    }
                }
                return true;
            }
        return false;
    };
}
/** A generator to iterate over some servers.
 * @param {NS} ns
 * @param filter a predicate to select ony some servers. The helper funcion {@link createServerFilter} can help building a variety of filters.
 * @param {(string | Iterable<string>)?} source
 * @description A generator to iterate over all the servers with more constraints and parameters than {@link allServers}.
 * It is arguably better than using [...allServers()].filter(filter) because:
 * - There is no need to create additional arrays
 * - Logging of commonly used auxiliary functions is disabled
 */
export function* someServers(ns, filter = () => true, source = ["home"], hideLog = true) {
    let toEnable = [], toDisable = [
        "scan",
        "getServerMaxMoney",
        "getServerMaxRam",
        "hasRootAccess",
        "getPurchasedServers",
        //functions to disable
    ];
    if (hideLog)
        for (let fn of toDisable) {
            if (ns.isLogEnabled(fn)) {
                toEnable.push(fn);
                ns.disableLog(fn);
            }
        }
    try {
        let visited = new Set(source);
        for (let hostname of visited) {
            if (filter(hostname))
                yield hostname;
            for (let neighbor of ns.scan(hostname)) {
                visited.add(neighbor);
            }
        }
    }
    finally {
        for (let fn of toEnable)
            ns.enableLog(fn);
    }
}
//////////////////////////////////////////////////////////////////////////
/** @param {NS} ns */
export async function main(ns) {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsU2VydmVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY291dC9hbGxTZXJ2ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7R0FHRztBQUNILE1BQU0sU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFFLEVBQU07SUFDbEM7UUFDQyxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEMsS0FBSyxJQUFJLFFBQVEsSUFBSSxPQUFPLEVBQUU7WUFDN0IsTUFBTSxRQUFRLENBQUM7WUFDZixLQUFLLElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDdEI7U0FDRDtLQUNFO0FBQ0wsQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQTtBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Ba0JNO0FBQ04sTUFBTSxVQUFVLGtCQUFrQixDQUFFLEVBQUssRUFBRSxrQkFBNEIsQ0FBQyxFQUFFLENBQUM7SUFDM0UseUZBQXlGO0lBQ3hGLE9BQU8sVUFBVSxRQUFlO1FBQy9CLEtBQUssSUFBSSxNQUFNLElBQUksZUFBZTtZQUFDLFNBQVMsRUFBQztnQkFDNUMsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxFQUFDO3dCQUNULEtBQUssR0FBRzs0QkFDUCxJQUFJLFFBQVEsSUFBSSxJQUFJO2dDQUFFLFNBQVM7O2dDQUMxQixNQUFNLFNBQVMsQ0FBQzt3QkFDdEIsS0FBSyxHQUFHOzRCQUNQLElBQUksUUFBUSxJQUFJLElBQUk7Z0NBQUUsU0FBUzs7Z0NBQzFCLE1BQU0sU0FBUyxDQUFDO3dCQUN0QixLQUFLLEdBQUc7NEJBQ1AsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO2dDQUFFLFNB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