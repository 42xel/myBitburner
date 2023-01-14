/** @param {NS} ns */
export async function main(ns) {
	const [target, nbThreads] = ns.args;

	while (true){
		let nbGrow, nbHack;
		if(await ns.weaken(target) == 0.05 * nbThreads){
			nbGrow = 6;
			nbHack = 12;
		}
		else {
			nbGrow = 25;
			nbHack = 50;
		}
		let moneyThreshold;
		while (await ns.grow(target) != 1 && --nbGrow > 0)
			nbHack -= 2;
		while (nbHack-- > 0 && (moneyThreshold = await ns.hack(target) / 2) == 0 );
		while (nbHack-- > 0 && await ns.hack(target) > moneyThreshold );
	}
}