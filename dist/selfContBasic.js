/** @param {NS} ns */
export async function main(ns) {
    const [target, nbThreads] = ns.args;
    while (true) {
        let nbGrow, nbHack;
        if (await ns.weaken(target) == 0.05 * nbThreads) {
            nbGrow = 6;
            nbHack = 12;
        }
        else {
            nbGrow = 25;
            nbHack = 50;
        }
        let moneyThreshold;
        while (await ns.grow(target) != 1 && --nbGrow > 0)
            nbHack -= 2;
        while (nbHack-- > 0 && (moneyThreshold = await ns.hack(target) / 2) == 0)
            ;
        while (nbHack-- > 0 && await ns.hack(target) > moneyThreshold)
            ;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZkNvbnRCYXNpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxmQ29udEJhc2ljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFFO0lBQzVCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztJQUVwQyxPQUFPLElBQUksRUFBQztRQUNYLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNuQixJQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsU0FBUyxFQUFDO1lBQzlDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ1o7YUFDSTtZQUNKLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLGNBQWMsQ0FBQztRQUNuQixPQUFPLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQztZQUNoRCxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2IsT0FBTyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFBRSxDQUFDO1FBQzNFLE9BQU8sTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFjO1lBQUUsQ0FBQztLQUNoRTtBQUNGLENBQUMifQ==