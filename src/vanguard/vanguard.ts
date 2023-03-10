//todo : remove the scout part

import { NS } from "@ns";

import {allServers, createServerFilter, someServers} from "scout/allServers.js";
import {fileArray} from "algo/strings/paths.js";
import { nuke as nukeServer } from "/scout/nuke";

//const flags = [];
//const toDeploy = "exchange/export/";
const home = "home"

/** 
 * @param {NS} ns
 * @param {string|string[]} deploy - A string or a list of strings specifying files to scp from source.
 * Multiple files can be specified as an array or separated by semi colon in a single string.
 * If a filename ends with a '/', the whole corresponding directory is listed instead. */
export async function scout( ns:NS, {nuke, filter, deploy, sources = ["home"], killall, fetch }: { nuke?: boolean; filter?: ((arg0: string) => any); deploy?: string | string[]; sources?: Iterable<string>; killall?: boolean; fetch?: boolean /*, scriptToKill?, exec?, execParam?*/; }): Promise<number> {
    let deploySource;
    if (deploy){       //empty string is another way to say nothing. Could be used to mean everything instead, but no.
        if (typeof (sources) == "object") for (deploySource of sources) break;
        else deploySource = sources;
        deploy = fileArray(ns, deploy, deploySource);
    }
    let nbVisited = 0;
	for (let hostname of allServers(ns)){
        if (filter && !filter(hostname)) continue;
        else { 
            ++nbVisited
            ns.print(`scout visiting : ${hostname} ${nuke ? "-nuke-" : ""}${killall ? "-killall-" : ""}${fetch ? "-fetch-" : ""}${deploy ? "-deploy : " + deploy : ""}`);
        };
        if (fetch)
            for (let extension of [".lit", ".cct"]) //can't copy .msg, but .msg is the thing that goes to your home. And you probably don't want to fetch every single .txt either as those could be your own export files, or local files.
                for (let filename of ns.ls(hostname, extension))
                    if (filename.endsWith(extension)){ns.print(filename, home, hostname);
                        if (ns.scp(filename, home, hostname)){
                            const msg = `INFO scout fetched : ${filename}\tfrom ${hostname}`;
                            ns.tprint(msg);
                            ns.print(msg);
                            //ns.toast(msg.slice(11), "info");
                        }   
                    }
        if (killall) ns.killall(hostname, true);
        if (nuke) nukeServer(ns, hostname);
        if (deploy) ns.scp(deploy, hostname, deploySource);
        await ns.asleep(0);
	}
    return nbVisited;
}

/** @param {NS} ns */
export async function main(ns: NS) {
    ns.disableLog("asleep");

    try {
        var { n, k, scp, filter, f } = ns.flags([
            ['n', false],
            ['k', false],
            ['f', false],
            ["source", [ns.getHostname()]],
            ["scp", []],
            ["filter", ["H"]],
            //todo : predifined filters.
            //done : Targets (maxMoney>0), Workers(maxRam>0), Home, Root access, 
            //Source, seLf, Owned.
            //Lowercase means included uppercase means excluded
        ]) as { n:boolean, k:boolean, f:boolean, scp:string[], filter:string[] , _:[]};

        if (!(n || k || f || (scp.length != 0)))
            throw "Scout : missing argument, expecting : -n(nuke) --scp (server copy) -f (fetch) or -k (killall)";
        
//todo throw when invalid arguments.
    } catch (e) {
        ns.tprint(`ERROR : ${e}`);
        return 0;
    }

    let filterFunction = createServerFilter(ns, filter);

    return await scout(ns, { nuke: n, filter: filterFunction, deploy: scp.length && scp || undefined, sources: ns.getHostname(), killall: k, fetch: f });
}