import { allServers } from "scout/allServers.js";
import { fileArray } from "algo/strings/paths.js";
import { nuke as nukeServer } from "scout/nuke";
//const toDeploy = "exchange/export/";
const home = "home";
/**
 * @param {NS} ns
 * @param {string|string[]} deploy - A string or a list of strings specifying files to scp from source.
 * Multiple files can be specified as an array or separated by semi colon in a single string.
 * If a filename ends with a '/', the whole corresponding directory is listed instead. */
export async function scout(ns, { nuke, filter, deploy, source, killall, fetch }) {
    if (filter == undefined && killall) {
        const filterSources = [source ?? ns.getHostname()].flat();
        filter = (hostname) => !(hostname in filterSources);
    }
    let deploySource;
    if (deploy) { //empty string is another way to say nothing. Could e used to mean everything instead, but no.
        if (typeof (source) == "object")
            for (deploySource of source)
                break;
        else
            deploySource = source;
        deploy = fileArray(ns, deploy, deploySource);
    }
    let nbVisited = 0;
    for (let hostname of allServers(ns, source)) {
        if (filter && !filter(hostname))
            continue;
        else {
            ++nbVisited;
            ns.print(`scout visiting : ${hostname} ${nuke ? "-nuke-" : ""}${killall ? "-killall-" : ""}${fetch ? "-fetch-" : ""}${deploy ? "-deploy : " + deploy : ""}`);
        }
        ;
        if (fetch)
            for (let extension of [".lit"]) //can't copy .msg, but .msg is the thing that goes to your home. And you probably don't want to fetch every single .txt either as those could be your own export files, or local files.
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
    if (filter.length == 1 && filter[0] === '_')
        filter = [""];
    function filterFunction(hostname) {
        //        ns.print(filter);
        for (let clause of filter)
            clauseFor: {
                //            ns.print(' ' + clause);
                for (let l of clause) {
                    //               ns.print(l);
                    switch (l) {
                        case "H":
                            if (hostname != home)
                                continue;
                            else
                                break clauseFor;
                        case "h":
                            if (hostname == home)
                                continue;
                            else
                                break clauseFor;
                        case "t":
                            if (ns.getServerMaxMoney(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "T":
                            if (!ns.getServerMaxMoney(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "w":
                            if (ns.getServerMaxRam(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "W":
                            if (!ns.getServerMaxRam(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "r":
                            if (ns.hasRootAccess(hostname))
                                continue;
                            else
                                break clauseFor;
                        case "R":
                            if (!ns.hasRootAccess(hostname))
                                continue;
                            else
                                break clauseFor;
                    }
                }
                return true;
            }
        return false;
    }
    return await scout(ns, { nuke: n, filter: filterFunction, deploy: scp.length && scp || undefined, source: ns.getHostname(), killall: k, fetch: f });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NvdXQvc2NvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsSUFBSSxJQUFJLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNoRCxzQ0FBc0M7QUFDdEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBO0FBRW5COzs7O3lGQUl5RjtBQUN6RixNQUFNLENBQUMsS0FBSyxVQUFVLEtBQUssQ0FBRSxFQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBb007SUFDalIsSUFBSSxNQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtRQUNoQyxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN6RCxNQUFNLEdBQUksQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDO0tBQ2hFO0lBQ0QsSUFBSSxZQUFZLENBQUM7SUFDakIsSUFBSSxNQUFNLEVBQUMsRUFBUSw4RkFBOEY7UUFDN0csSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUTtZQUFFLEtBQUssWUFBWSxJQUFJLE1BQU07Z0JBQUUsTUFBTTs7WUFDL0QsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMzQixNQUFNLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDaEQ7SUFDRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDckIsS0FBSyxJQUFJLFFBQVEsSUFB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