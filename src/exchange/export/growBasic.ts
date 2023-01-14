import { NS } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    const [target] = ns.args;
    ns.writePort(ns.pid, await ns.grow(target as string));
}