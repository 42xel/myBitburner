/** @param {NS} ns */
export async function withDisableLog(ns) {
    let toEnable = [], toDisable = [
    //functions to disable
    ];
    for (let fn of toDisable) {
        if (ns.isLogEnabled(fn)) {
            toEnable.push(fn);
            ns.disableLog(fn);
        }
    }
    try {
        //your code goes here
        return;
    }
    finally {
        for (let fn of toEnable)
            ns.enableLog(fn);
    }
}
/** @param {NS} ns */
export async function main(ns) {
    let toEnable = [], toDisable = [
        "scan",
        //functions to disable
    ];
    for (let fn of toDisable) {
        if (ns.isLogEnabled(fn)) {
            toEnable.push(fn);
            ns.disableLog(fn);
        }
    }
    try {
        //your code goes here
        ns.tprint(ns.scan());
        return;
    }
    finally {
        for (let fn of toEnable)
            ns.enableLog(fn);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aERpc2FibGVkTG9nVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmV0dGVyTlMvd2l0aERpc2FibGVkTG9nVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsY0FBYyxDQUFDLEVBQU07SUFDdkMsSUFBSSxRQUFRLEdBQUcsRUFBRSxFQUFFLFNBQVMsR0FBYTtJQUNyQyxzQkFBc0I7S0FDekIsQ0FBQztJQUNGLEtBQUssSUFBSSxFQUFFLElBQUksU0FBUyxFQUFFO1FBQ3RCLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDckI7S0FDSjtJQUNELElBQUk7UUFDUixxQkFBcUI7UUFDYixPQUFPO0tBQ1Y7WUFDTTtRQUNILEtBQUssSUFBSSxFQUFFLElBQUksUUFBUTtZQUN2QixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUVELHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQzdCLElBQUksUUFBUSxHQUFHLEVBQUUsRUFBRSxTQUFTLEdBQUc7UUFDM0IsTUFBTTtRQUNOLHNCQUFzQjtLQUN6QixDQUFDO0lBQ0YsS0FBSyxJQUFJLEVBQUUsSUFBSSxTQUFTLEVBQUU7UUFDdEIsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQjtLQUNKO0lBQ0QsSUFBSTtRQUNSLHFCQUFxQjtRQUNiLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckIsT0FBTztLQUNWO1lBQ007UUFDSCxLQUFLLElBQUksRUFBRSxJQUFJLFFBQVE7WUFDdkIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQjtBQUNMLENBQUMifQ==