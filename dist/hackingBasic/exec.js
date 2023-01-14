const scriptDir = "exchange/export/";
/** Generates warpers for executing basic hacking scripts
 * these warpers behave roughly like their ns function counterpart :
 * they write in the tail log of the caller and return a promise
 * resolving into a number describing the result of the function.
 * @param {string} action */
export function generate(action) {
    const scriptname = `${scriptDir + action}Basic.js`;
    return async function (ns, host, target, nbThreads) {
        if (nbThreads < 1)
            throw `${action}Basic : nbThreads must be 1 or greater.`;
        const pid = ns.exec(scriptname, host, nbThreads, target);
        if (pid == 0)
            throw `${action}Basic : exec failed.`;
        let p = ns.getPortHandle(pid);
        await ns.asleep(0);
        ns.print(`${ns.getScriptLogs(pid).pop()}(pid=${pid})`);
        await p.nextWrite();
        ns.print(`${ns.getScriptLogs(pid).pop()}(pid=${pid})`);
        const r = p.read();
        await ns.asleep(0);
        return r;
    };
}
/**
 * @param {NS} ns
 * @param {string} host */
export const hackBasic = generate("hack");
/** @param {NS} ns
 * @param {string} host */
export const growBasic = generate("grow");
/**
 * @param {NS} ns
 * @param {string} host */
export const weakenBasic = generate("weaken");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYWNraW5nQmFzaWMvZXhlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQTtBQUVwQzs7Ozs0QkFJNEI7QUFDNUIsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFhO0lBQ2xDLE1BQU0sVUFBVSxHQUFHLEdBQUcsU0FBUyxHQUFHLE1BQU0sVUFBVSxDQUFDO0lBQ25ELE9BQU8sS0FBSyxXQUFXLEVBQU0sRUFBRSxJQUFZLEVBQUUsTUFBYyxFQUFHLFNBQWlCO1FBQzNFLElBQUksU0FBUyxHQUFHLENBQUM7WUFDYixNQUFNLEdBQUcsTUFBTSx5Q0FBeUMsQ0FBQTtRQUM1RCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxJQUFJLENBQUM7WUFDUixNQUFNLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQTtRQUN6QyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBWSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRDs7MEJBRTBCO0FBQzFCLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUM7MEJBQzBCO0FBQzFCLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUM7OzBCQUUwQjtBQUMxQixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDIn0=