import { NS } from "@ns";
import { Tree, BinaryTree } from "../CustomDefinitions";
import { SomePartialTest0, SomePartialTest1 } from "../CustomDefinitionsTest";

function isPrime (n: number){
    let m = Math.sqrt(n);
    if (!(m%1)) return false;
    for (let d = 3; d<=m; d+=2){
        if (!(n%d)) return false;
    }
    return true;
}

function add<T> (a:T, b:T)
{
    
}

/** @param {NS} ns */
export async function _main(ns: NS): Promise<void> {
    ns.write("toto.txt",'','w');
    for(let [i,n] = [1,Number.isNaN(Number(ns.args[0])) ? 0 : Number(ns.args[0])] ; n>0; ++i){
        var f:undefined|((p:number)=>[Number,Number,Number]|[Number]) = f ?? function(p:any) {
            for(let a = Math.ceil(Math.sqrt(p)); a < p**2;++a ){
                var c:number|undefined = c ?? a-1;
                let b = Math.sqrt((a**2-p)/2)
                if (b%1) continue;
                else return [a,b,a-c];
            }
            return [c!];
        }

        for (let p of [8*i-1, 8*i+1]){
            if (isPrime(p)) --n;
            else continue;
            let [a,b,c] = f(p)
            if (a) {
                ns.write("toto.txt",`${a}**2\t - 2 * ${b}**2\t = ${p}\t\t${c}\n`, 'a');
            } else {
                ns.write("toto.txt",`Ce nombre est un contre exemple : ${p}\t\t${c}\n`, 'a');
            }
        }
    }
    ns.tprint(enu2);
}

declare enum FactionWorkType {
    hacking = "hacking",
    field = "fd",
    security = "security",
  }

enum Direction {
    Up ,
    Down = 6,
    Left,
    Right = 'r',
  }

//  let enu :FactionWorkType = FactionWorkType.field;
  let enu2 : Direction = Direction.Down ;

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    for (let elt in Direction){
        ns.tprint(`${elt}\t${Direction[elt]}`);
    }
}