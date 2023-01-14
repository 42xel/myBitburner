/** @param {NS} ns */
export function* allServers(ns, source) {
    let toEnable = [], toDisable = [
        "scan",
        //functions to disable
    ];
    for (let fn of toDisable) {
        if (ns.isLogEnabled(fn)) {
            toEnable.push(fn);
            ns.disableLog(fn);
        }
    }
    try {
        var visited;
        source ??= "home";
        switch (typeof (source)) {
            case "string":
                visited = new Set([source]);
                break;
            case "object":
                visited = new Set(source);
                break;
            default:
                const _exhaustiveCheck = source;
                visited = new Set();
        }
        for (let hostname of visited) {
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
/** @param {NS} ns */
export async function test(ns) {
    let s;
    //	ns.tprint("hi");
    //	let servers = allServers(ns);
    for (let servers = allServers(ns); s = servers.next().value;) {
        //		await ns.sleep(0); //it sometimes freezes somehow
        ns.tprint(s);
    }
    ns.tprint("\n\n");
    for (let s of allServers(ns, ["n00dles"])) {
        //		await ns.sleep(0); //it sometimes freezes somehow
        ns.tprint(s);
    }
    ns.tprint("\n\n");
}
/** @param {NS} ns */
export async function main(ns) {
    return test(ns);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsU2VydmVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY291dC9hbGxTZXJ2ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLHFCQUFxQjtBQUNyQixNQUFNLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBRSxFQUFNLEVBQUUsTUFBa0M7SUFDbkUsSUFBSSxRQUFRLEdBQUcsRUFBRSxFQUFFLFNBQVMsR0FBRztRQUMzQixNQUFNO1FBQ04sc0JBQXNCO0tBQ3pCLENBQUM7SUFDRixLQUFLLElBQUksRUFBRSxJQUFJLFNBQVMsRUFBRTtRQUN0QixJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCO0tBQ0o7SUFFRCxJQUFJO1FBQ04sSUFBSSxPQUFtQixDQUFDO1FBQ3hCLE1BQU0sS0FBSyxNQUFNLENBQUE7UUFDakIsUUFBUSxPQUFNLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDdEIsS0FBSyxRQUFRO2dCQUFHLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuRCxLQUFLLFFBQVE7Z0JBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDakQ7Z0JBQVUsTUFBTSxnQkFBZ0IsR0FBUyxNQUFNLENBQUM7Z0JBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7U0FDckU7UUFFRCxLQUFLLElBQUksUUFBUSxJQUFJLE9BQU8sRUFBRTtZQUM3QixNQUFNLFFBQVEsQ0FBQztZQUNmLEtBQUssSUFBSSxRQUFRLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTthQUNyQjtTQUNEO0tBQ0U7WUFDTTtRQUNILEtBQUssSUFBSSxFQUFFLElBQUksUUFBUTtZQUN2QixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3BCO0FBRUwsQ0FBQztBQUVELHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ2hDLElBQUksQ0FBQyxDQUFDO0lBQ04sbUJBQW1CO0lBRW5CLGdDQUFnQztJQUNoQyxLQUFLLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRztRQUMvRCxxREFBcUQ7UUFDbkQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNiO0lBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQixLQUFLLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO1FBQzVDLHFEQUFxRDtRQUNuRCxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFDRCxxQkFBcUI7QUFDckIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=