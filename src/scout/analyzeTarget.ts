import { NS } from "@ns";
/** A function analysing the quality of a server as a target
 * @param {NS} ns
 * @param {boolean} instant - Wether you want instant gain, given currently available money (true), or maximum gains (false). Default false.
 * @param {boolean} sustainable - Wether to acocunt for weakining the server (true) or not (false). Default true.
 * @param {number} nbHackThreads - The number of threads to hack with. Default 1.
 * @returns - The potential income of the server in dollar per GB and per second. */
export function analyzeTarget (ns: NS, hn: string, instant: boolean = false, sustainable: boolean = true, nbHackThreads: number = 1): number {
	let hT = ns.getHackTime(hn);

	let moneyP = nbHackThreads * ns.hackAnalyze(hn) * ns.hackAnalyzeChance(hn);
	let ramTime = nbHackThreads * hT;

	if (sustainable) {
		let wT = 4 * hT// ns.getWeakenTime(hn);
		let gT = 4 / 5 * wT // ns.getGrowTime(hn);

		let nbGrowThreads = ns.growthAnalyze(hn, 1 / (1 - moneyP));
		let nbWeakenThreads = (nbHackThreads * 0.002 + nbGrowThreads * 0.004) / 0.005;
		ramTime += nbGrowThreads * gT + nbWeakenThreads * wT;
	}

	let serverMoney = instant ? ns.getServerMoneyAvailable(hn) : ns.getServerMaxMoney(hn);
	return 1000 * moneyP * serverMoney / ramTime;
}

//import allServers from "/allServers.js"
/** @param {NS} ns */
export async function main(ns:NS) {
	test(ns);
}
/** @param {NS} ns */
export async function test(ns: NS) {
	let serverList:string[]|[string,number][] = ["home", "n00dles", "foodnstuff", "sigma-cosmetics","joesguns"];
	
	serverList = serverList.map((a):[string,number] => [a, analyzeTarget(ns, a)])
	serverList.sort(
		(a, b) => b[1] - a[1]
	)
	for (let s of serverList) {
		ns.tprint(`${s[0].padEnd(20)} : ${s[1].toFixed(2)} $/GB/s`);
	}
}