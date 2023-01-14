import { NS } from "@ns";

import {weakenBasic, growBasic, hackBasic, generate} from "hackingBasic/exec.js"

/**
 * A rudimentary hacking proto-batcher, somewhat inefficient but robust.
 *  @param {NS} ns
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
		let moneyThreshold:number = 0;
		while (await growBasic(ns, host, target, nbThreadsgrow) != 1 && --nbGrow > 0)
			nbHack -= 2;
		while (nbHack-- > 0 && (moneyThreshold = await hackBasic(ns, host, target, nbThreadsHack)  / 2) == 0 );
		while (nbHack-- > 0 && await hackBasic(ns, host, target, nbThreadsHack) > moneyThreshold);
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
