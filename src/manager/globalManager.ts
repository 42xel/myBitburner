import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS) {
    while (ns.run("scout.js"))
       await ns.sleep(3_600_000);
}