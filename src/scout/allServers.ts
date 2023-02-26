import { NS } from "@ns";

/** 
 * @param {NS} ns
 * @description a generator to iterate over all the servers.
 */
export function* allServers (ns: NS): Generator<string, void, unknown> {
	{
		let visited = new Set(["home"]);
		for (let hostname of visited) {
			yield hostname;
			for (let neighbour of ns.scan(hostname)) {
				visited.add(neighbour)
			}
		}
    }
}

const home = "home"
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
export function createServerFilter (ns:NS, filterSpecifier: string[] = ['']){
//	if (filterSpecifier.length == 1 && filterSpecifier[0] === '_') filterSpecifier = [""];
	return function (hostname:string){
		for (let clause of filterSpecifier)clauseFor:{
			for (let l of clause){
				switch (l){
					case "H":
						if (hostname != home) continue;
						else break clauseFor;
					case "h":
						if (hostname == home) continue;
						else break clauseFor;
					case "t":
						if (ns.getServerMaxMoney(hostname)) continue;
						else break clauseFor;
					case "T":
						if (!ns.getServerMaxMoney(hostname)) continue;
						else break clauseFor;
					case "w":
						if (ns.getServerMaxRam(hostname)) continue;
						else break clauseFor;
					case "W":
						if (!ns.getServerMaxRam(hostname)) continue;
						else break clauseFor;
					case "r":
						if (ns.hasRootAccess(hostname)) continue;
						else break clauseFor;
					case "R":
						if (!ns.hasRootAccess(hostname)) continue;
						else break clauseFor;
					case "p" :
						if (ns.getServer(hostname).purchasedByPlayer) continue;
						else break clauseFor;
					case "P" :
						if (!(ns.getServer(hostname).purchasedByPlayer)) continue;
						else break clauseFor;
				}
			}
			return true;
		}
		return false;
	}
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
export function createServerFilterLight (ns:NS, filterSpecifier: string[] = ['']){
	return function (hostname:string){
		for (let clause of filterSpecifier)clauseFor:{
			for (let l of clause){
				switch (l){
					case "H":
						if (hostname != home) continue;
						else break clauseFor;
					case "h":
						if (hostname == home) continue;
						else break clauseFor;
					case "t":
						if (ns.getServerMaxMoney(hostname)) continue;
						else break clauseFor;
					case "T":
						if (!ns.getServerMaxMoney(hostname)) continue;
						else break clauseFor;
					case "w":
						if (ns.getServerMaxRam(hostname)) continue;
						else break clauseFor;
					case "W":
						if (!ns.getServerMaxRam(hostname)) continue;
						else break clauseFor;
					case "r":
						if (ns.hasRootAccess(hostname)) continue;
						else break clauseFor;
					case "R":
						if (!ns.hasRootAccess(hostname)) continue;
						else break clauseFor;
				}
			}
			return true;
		}
		return false;
	}
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
export function* someServers (ns: NS, filter: (server : string) => boolean = () => true, source: Iterable<string> =["home"], hideLog = true): Generator<string, void, unknown> {
    let toEnable = [], toDisable = [
        "scan",
		"getServerMaxMoney",
		"getServerMaxRam",
		"hasRootAccess",
		"getPurchasedServers",
        //functions to disable
    ];
	if(hideLog)
		for (let fn of toDisable) {
			if (ns.isLogEnabled(fn) ){
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
				visited.add(neighbor)
			}
		}
    }
    finally{
        for (let fn of toEnable)
        ns.enableLog(fn);
    }
}


//////////////////////////////////////////////////////////////////////////
/** @param {NS} ns */
export async function main(ns: NS) {
}