/** @param {NS} ns */
export async function main(ns) {
    while (ns.run("scout.js"))
       await ns.sleep(3_600_000);
}