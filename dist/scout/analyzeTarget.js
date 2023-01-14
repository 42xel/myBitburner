/** A function analysing the quality of a server as a target
 * @param {NS} ns
 * @param {boolean} instant - Wether you want instant gain, given currently available money (true), or maximum gains (false). Default false.
 * @param {boolean} sustainable - Wether to acocunt for weakining the server (true) or not (false). Default true.
 * @param {number} nbHackThreads - The number of threads to hack with. Default 1.
 * @returns - The potential income of the server in dollar per GB and per second. */
export function analyzeTarget(ns, hn, instant = false, sustainable = true, nbHackThreads = 1) {
    let hT = ns.getHackTime(hn);
    let moneyP = nbHackThreads * ns.hackAnalyze(hn) * ns.hackAnalyzeChance(hn);
    let ramTime = nbHackThreads * hT;
    if (sustainable) {
        let wT = 4 * hT; // ns.getWeakenTime(hn);
        let gT = 4 / 5 * wT; // ns.getGrowTime(hn);
        let nbGrowThreads = ns.growthAnalyze(hn, 1 / (1 - moneyP));
        let nbWeakenThreads = (nbHackThreads * 0.002 + nbGrowThreads * 0.004) / 0.005;
        ramTime += nbGrowThreads * gT + nbWeakenThreads * wT;
    }
    let serverMoney = instant ? ns.getServerMoneyAvailable(hn) : ns.getServerMaxMoney(hn);
    return 1000 * moneyP * serverMoney / ramTime;
}
//import allServers from "/allServers.js"
/** @param {NS} ns */
export async function main(ns) {
    test(ns);
}
/** @param {NS} ns */
export async function test(ns) {
    let serverList = ["home", "n00dles", "foodnstuff", "sigma-cosmetics", "joesguns"];
    serverList = serverList.map((a) => [a, analyzeTarget(ns, a)]);
    serverList.sort((a, b) => b[1] - a[1]);
    for (let s of serverList) {
        ns.tprint(`${s[0].padEnd(20)} : ${s[1].toFixed(2)} $/GB/s`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl6ZVRhcmdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY291dC9hbmFseXplVGFyZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7OztvRkFLb0Y7QUFDcEYsTUFBTSxVQUFVLGFBQWEsQ0FBRSxFQUFNLEVBQUUsRUFBVSxFQUFFLFVBQW1CLEtBQUssRUFBRSxjQUF1QixJQUFJLEVBQUUsZ0JBQXdCLENBQUM7SUFDbEksSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixJQUFJLE1BQU0sR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0UsSUFBSSxPQUFPLEdBQUcsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUVqQyxJQUFJLFdBQVcsRUFBRTtRQUNoQixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBLENBQUEsd0JBQXdCO1FBQ3ZDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBLENBQUMsc0JBQXNCO1FBRTFDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksZUFBZSxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUssR0FBRyxhQUFhLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzlFLE9BQU8sSUFBSSxhQUFhLEdBQUcsRUFBRSxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUM7S0FDckQ7SUFFRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLE9BQU8sSUFBSSxHQUFHLE1BQU0sR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBQzlDLENBQUM7QUFFRCx5Q0FBeUM7QUFDekMscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUs7SUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ1YsQ0FBQztBQUNELHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ2hDLElBQUksVUFBVSxHQUE4QixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTVHLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDN0UsVUFBVSxDQUFDLElBQUksQ0FDZCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JCLENBQUE7SUFDRCxLQUFLLElBQUksQ0FBQyxJQUFJLFVBQVUsRUFBRTtRQUN6QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1RDtBQUNGLENBQUMifQ==