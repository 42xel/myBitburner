/** @param {NS} ns */
export async function withDisableLog(ns) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aERpc2FibGVkTG9nVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmV0dGVyTlMvd2l0aERpc2FibGVkTG9nVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsY0FBYyxDQUFDLEVBQU07SUFDdkMsSUFBSSxRQUFRLEdBQUcsRUFBRSxFQUFFLFNBQVMsR0FBRztRQUMzQixNQUFNO1FBQ04sc0JBQXNCO0tBQ3pCLENBQUM7SUFDRixLQUFLLElBQUksRUFBRSxJQUFJLFNBQVMsRUFBRTtRQUN0QixJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCO0tBQ0o7SUFDRCxJQUFJO1FBQ1IscUJBQXFCO1FBQ2IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyQixPQUFPO0tBQ1Y7WUFDTTtRQUNILEtBQUssSUFBSSxFQUFFLElBQUksUUFBUTtZQUN2QixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQyJ9