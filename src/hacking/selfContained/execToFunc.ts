import { NS } from "@ns";

const scriptDir = "exchange/export/"

/** Generates warpers for executing basic hacking scripts
 * these warpers behave roughly like their ns function counterpart :
 * they write in the tail log of the caller and return a promise
 * resolving into a number describing the result of the function.
 * @param {string} action */
export function generate(action:string): (ns: NS, host: string, target: string, nbThreads: number) => Promise<number>{
    const scriptname = `${scriptDir + action}Basic.js`;
    return async function (ns: NS, host: string, target: string , nbThreads: number): Promise<number> {
        if (nbThreads < 1)
            throw `${action}Basic : nbThreads must be 1 or greater.`
        const pid = ns.exec(scriptname, host, nbThreads, target);
        if (pid == 0)
            throw `${action}Basic : exec failed.`
        let p = ns.getPortHandle(pid);
        await ns.asleep(0);
        ns.print(`${ns.getScriptLogs(pid).pop()}(pid=${pid})`);
        await p.nextWrite();
        ns.print(`${ns.getScriptLogs(pid).pop()}(pid=${pid})`);
        const r = p.read() as number;
//        await ns.asleep(0);
        return r;
    }
}

/** 
 * @param {NS} ns
 * @param {string} host
 * @param {string} target
 * @param {number} nbThreads 
 * */
export const hackBasic = generate("hack");
/** 
 * @param {NS} ns
 * @param {string} host
 * @param {string} target
 * @param {number} nbThreads 
 * */
export const growBasic = generate("grow");
/** 
 * @param {NS} ns
 * @param {string} host
 * @param {string} target
 * @param {number} nbThreads 
 * */
export const weakenBasic = generate("weaken");
