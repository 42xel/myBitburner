import { NS } from "@ns";
/** @param {NS} ns */
export function* allServers (ns: NS, source?: string | Iterable<string>): Generator<string, void, unknown> {
    let toEnable = [], toDisable = [
        "scan",
        //functions to disable
    ];
    for (let fn of toDisable) {
        if (ns.isLogEnabled(fn) ){
            toEnable.push(fn);
            ns.disableLog(fn);
        }
    }
	
    try {
		var visited:Set<string>;
		source ??= "home"
		switch (typeof(source)){
			case "string" : visited = new Set([source]); break;
			case "object" : visited = new Set(source); break;
			default : const _exhaustiveCheck:never = source; visited = new Set();
		}
	
		for (let hostname of visited) {
			yield hostname;
			for (let neighbor of ns.scan(hostname)) {
				visited.add(neighbor)
			}
		}
    }
    finally{
        for (let fn of toEnable)
        ns.enableLog(fn);
    }

}

/** @param {NS} ns */
export async function test(ns: NS): Promise<void> {
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
export async function main(ns: NS) {
    return test(ns);
}