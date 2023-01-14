import { NS } from "@ns";
/** @param {NS} ns */
export async function withDisableLog(ns: NS): Promise<void> {
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
//your code goes here
        ns.tprint(ns.scan());
        return;
    }
    finally{
        for (let fn of toEnable)
        ns.enableLog(fn);
    }
}

