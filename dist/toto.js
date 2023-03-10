function isPrime(n) {
    let m = Math.sqrt(n);
    if (!(m % 1))
        return false;
    for (let d = 3; d <= m; d += 2) {
        if (!(n % d))
            return false;
    }
    return true;
}
function add(a, b) {
}
/** @param {NS} ns */
export async function _main(ns) {
    ns.write("toto.txt", '', 'w');
    for (let [i, n] = [1, Number.isNaN(Number(ns.args[0])) ? 0 : Number(ns.args[0])]; n > 0; ++i) {
        var f = f ?? function (p) {
            for (let a = Math.ceil(Math.sqrt(p)); a < p ** 2; ++a) {
                var c = c ?? a - 1;
                let b = Math.sqrt((a ** 2 - p) / 2);
                if (b % 1)
                    continue;
                else
                    return [a, b, a - c];
            }
            return [c];
        };
        for (let p of [8 * i - 1, 8 * i + 1]) {
            if (isPrime(p))
                --n;
            else
                continue;
            let [a, b, c] = f(p);
            if (a) {
                ns.write("toto.txt", `${a}**2\t - 2 * ${b}**2\t = ${p}\t\t${c}\n`, 'a');
            }
            else {
                ns.write("toto.txt", `Ce nombre est un contre exemple : ${p}\t\t${c}\n`, 'a');
            }
        }
    }
    ns.tprint(enu2);
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 6] = "Down";
    Direction[Direction["Left"] = 7] = "Left";
    Direction["Right"] = "r";
})(Direction || (Direction = {}));
//  let enu :FactionWorkType = FactionWorkType.field;
let enu2 = Direction.Down;
/** @param {NS} ns */
export async function main(ns) {
    for (let elt in Direction) {
        ns.tprint(`${elt}\t${Direction[elt]}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG90by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b3RvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLFNBQVMsT0FBTyxDQUFFLENBQVM7SUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUM1QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLEdBQUcsQ0FBSyxDQUFHLEVBQUUsQ0FBRztBQUd6QixDQUFDO0FBRUQscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsS0FBSyxDQUFDLEVBQU07SUFDOUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLEtBQUksSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBQztRQUNyRixJQUFJLENBQUMsR0FBMkQsQ0FBQyxJQUFJLFVBQVMsQ0FBSztZQUMvRSxLQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsR0FBb0IsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLENBQUMsR0FBQyxDQUFDO29CQUFFLFNBQVM7O29CQUNiLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QjtZQUNELE9BQU8sQ0FBQyxDQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRCxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQztZQUN6QixJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUUsRUFBRSxDQUFDLENBQUM7O2dCQUNmLFNBQVM7WUFDZCxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEIsSUFBSSxDQUFDLEVBQUU7Z0JBQ0gsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUMxRTtpQkFBTTtnQkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQyxxQ0FBcUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hGO1NBQ0o7S0FDSjtJQUNELEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQVFELElBQUssU0FLRjtBQUxILFdBQUssU0FBUztJQUNWLHFDQUFFLENBQUE7SUFDRix5Q0FBUSxDQUFBO0lBQ1IseUNBQUksQ0FBQTtJQUNKLHdCQUFXLENBQUE7QUFDYixDQUFDLEVBTEUsU0FBUyxLQUFULFNBQVMsUUFLWDtBQUVILHFEQUFxRDtBQUNuRCxJQUFJLElBQUksR0FBZSxTQUFTLENBQUMsSUFBSSxDQUFFO0FBRXpDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQzdCLEtBQUssSUFBSSxHQUFHLElBQUksU0FBUyxFQUFDO1FBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxQztBQUNMLENBQUMifQ==