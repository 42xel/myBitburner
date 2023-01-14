import { weakenBasic, growBasic, hackBasic } from "hackingBasic/exec.js";
/**
 * A rudimentary hacking proto-batcher, somewhat inefficient but robust.
 *  @param {NS} ns
 */
export async function attack(ns, host, target, Ram) {
    const nbThreadsWeaken = Ram / 1.75;
    const nbThreadsgrow = nbThreadsWeaken;
    const nbThreadsHack = Ram / 1.7;
    ns.flags;
    while (true) {
        let nbGrow, nbHack;
        if (await weakenBasic(ns, host, target, nbThreadsWeaken) == 0.05 * nbThreadsWeaken) {
            nbGrow = 6;
            nbHack = 12;
        }
        else {
            nbGrow = 25;
            nbHack = 50;
        }
        let moneyThreshold = 0;
        while (await growBasic(ns, host, target, nbThreadsgrow) != 1 && --nbGrow > 0)
            nbHack -= 2;
        while (nbHack-- > 0 && (moneyThreshold = await hackBasic(ns, host, target, nbThreadsHack) / 2) == 0)
            ;
        while (nbHack-- > 0 && await hackBasic(ns, host, target, nbThreadsHack) > moneyThreshold)
            ;
    }
}
/** @param {NS} ns */
export async function test(ns) {
    ns.tail();
    await attack(ns, "home", "n00dles", 2);
}
/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    await test(ns);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja2luZ0Jhc2ljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhY2tpbmdCYXNpYy9oYWNraW5nQmFzaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFXLE1BQU0sc0JBQXNCLENBQUE7QUFFaEY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxNQUFNLENBQUMsRUFBTyxFQUFFLElBQVksRUFBRSxNQUFlLEVBQUUsR0FBWTtJQUNoRixNQUFNLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ25DLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztJQUN0QyxNQUFNLGFBQWEsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUE7SUFDUixPQUFPLElBQUksRUFBQztRQUNYLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNuQixJQUFHLE1BQU0sV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxJQUFJLElBQUksR0FBRyxlQUFlLEVBQUM7WUFDakYsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDWjthQUNJO1lBQ0osTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDWjtRQUNELElBQUksY0FBYyxHQUFVLENBQUMsQ0FBQztRQUM5QixPQUFPLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxDQUFDO1lBQzNFLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDYixPQUFPLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsR0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQUUsQ0FBQztRQUN2RyxPQUFPLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsR0FBRyxjQUFjO1lBQUMsQ0FBQztLQUMxRjtBQUNGLENBQUM7QUFFRCxxQkFBcUI7QUFDckIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTztJQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDUCxNQUFNLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDakMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQixNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNuQixDQUFDIn0=