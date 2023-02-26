//todo : remove the vangurad part
import { allServers, createServerFilter } from "scout/allServers.js";
import { fileArray } from "algo/strings/paths.js";
import { nuke as nukeServer } from "/scout/nuke";
//const flags = [];
//const toDeploy = "exchange/export/";
const home = "home";
/**
 * @param {NS} ns
 * @param {string|string[]} deploy - A string or a list of strings specifying files to scp from source.
 * Multiple files can be specified as an array or separated by semi colon in a single string.
 * If a filename ends with a '/', the whole corresponding directory is listed instead. */
export async function scout(ns, { nuke, filter, deploy, sources = ["home"], killall, fetch }) {
    let deploySource;
    if (deploy) { //empty string is another way to say nothing. Could be used to mean everything instead, but no.
        if (typeof (sources) == "object")
            for (deploySource of sources)
                break;
        else
            deploySource = sources;
        deploy = fileArray(ns, deploy, deploySource);
    }
    let nbVisited = 0;
    for (let hostname of allServers(ns)) {
        if (filter && !filter(hostname))
            continue;
        else {
            ++nbVisited;
            ns.print(`scout visiting : ${hostname} ${nuke ? "-nuke-" : ""}${killall ? "-killall-" : ""}${fetch ? "-fetch-" : ""}${deploy ? "-deploy : " + deploy : ""}`);
        }
        ;
        if (fetch)
            for (let extension of [".lit", ".cct"]) //can't copy .msg, but .msg is the thing that goes to your home. And you probably don't want to fetch every single .txt either as those could be your own export files, or local files.
                for (let filename of ns.ls(hostname, extension))
                    if (filename.endsWith(extension)) {
                        ns.print(filename, home, hostname);
                        if (ns.scp(filename, home, hostname)) {
                            const msg = `INFO scout fetched : ${filename}\tfrom ${hostname}`;
                            ns.tprint(msg);
                            ns.print(msg);
                            //ns.toast(msg.slice(11), "info");
                        }
                    }
        if (killall)
            ns.killall(hostname, true);
        if (nuke)
            nukeServer(ns, hostname);
        if (deploy)
            ns.scp(deploy, hostname, deploySource);
        await ns.asleep(0);
    }
    return nbVisited;
}
/** @param {NS} ns */
export async function main(ns) {
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
        ]);
        if (!(n || k || f || (scp.length != 0)))
            throw "Scout : missing argument, expecting : -n(nuke) --scp (server copy) -f (fetch) or -k (killall)";
        //todo throw when invalid arguments.
    }
    catch (e) {
        ns.tprint(`ERROR : ${e}`);
        return 0;
    }
    let filterFunction = createServerFilter(ns, filter);
    return await scout(ns, { nuke: n, filter: filterFunction, deploy: scp.length && scp || undefined, sources: ns.getHostname(), killall: k, fetch: f });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NvdXQvc2NvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUNBQWlDO0FBSWpDLE9BQU8sRUFBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFFLElBQUksSUFBSSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFakQsbUJBQW1CO0FBQ25CLHNDQUFzQztBQUN0QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUE7QUFFbkI7Ozs7eUZBSXlGO0FBQ3pGLE1BQU0sQ0FBQyxLQUFLLFVBQVUsS0FBSyxDQUFFLEVBQUssRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQTRMO0lBQ3JSLElBQUksWUFBWSxDQUFDO0lBQ2pCLElBQUksTUFBTSxFQUFDLEVBQVEsK0ZBQStGO1FBQzlHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVE7WUFBRSxLQUFLLFlBQVksSUFBSSxPQUFPO2dCQUFFLE1BQU07O1lBQ2pFLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDNUIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLEtBQUssSUFBSSxRQUFRLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1FBQzdCLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUFFLFNBQVM7YUFDckM7WUFDRCxFQUFFLFNBQVMsQ0FBQTtZQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLFFBQVEs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