import { NS } from "@ns";

import {weakenBasic, growBasic, hackBasic} from "./execToFunc.js"

/**
 * A rudimentary hacking proto-batcher, somewhat inefficient but robust.
 *  @param {NS} ns
 *  @description reuses the self contained algorithm in a not self contained way.
 */
export async function attack(ns : NS, host :string, target : string, Ram : number): Promise<void> {
	const nbThreadsWeaken = Ram / 1.75;
	const nbThreadsgrow = nbThreadsWeaken;
	const nbThreadsHack = Ram / 1.7;
	ns.flags
	while (true){
		let nbGrow, nbHack;
		if(await weakenBasic(ns, host, target, nbThreadsWeaken) == 0.05 * nbThreadsWeaken){
			nbGrow = 6;
			nbHack = 12;
		}
		else {
			nbGrow = 25;
			nbHack = 50;
		}
		let moneyThreshold: number = 0, moneyGain: number;
		while ( nbGrow-- > 0 && await growBasic(ns, host, target, nbThreadsgrow) != 1)
			nbHack -= 2;
		while (nbHack-- > 0 && (moneyThreshold = await hackBasic(ns, host, target, nbThreadsHack)  / 2) == 0 );
		while (nbHack-- > 0 && ((moneyGain = await hackBasic(ns, host, target, nbThreadsHack)) > moneyThreshold || moneyGain == 0));
	}
}

/** @param {NS} ns */
export async function test(ns : NS) {
	ns.tail();
    await attack(ns, "home", "n00dles", 2);
}

/** @param {NS} ns */
export async function main(ns : NS) {
	ns.disableLog("ALL");
    await test(ns);
}
