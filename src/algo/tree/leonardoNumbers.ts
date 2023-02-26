console.clear();
// todo : write results in txt files
/** Computes the Leonardo sequence in a memoized way */
export function leonardoSequence(n:number): number {
    console.log(`leonardoSequence(${n})`);
    if (n < - 0) throw `negatif input to leonardoSequence`;
    if (isNaN(n)) {throw  `NaN input to leonardoSequence`;}
    let r = leonardoSequence.data[n];
    if (r != undefined)
        return r;
    else
        return leonardoSequence.data[n] = leonardoSequence(n - 2) + leonardoSequence(n - 1) + 1;
}
leonardoSequence.data = [1,1];
//the golden ratio
const phi = (1 + Math.sqrt(5))/2
//const phiBar = (1 - Math.sqrt(5))/2
const logphi = Math.log(phi)
const dominantCoef = 1 + Math.sqrt(5)/10;
//L_n = a phi^n + b phiBar^n + c
//c = c + c + 1
//L_n = a phi^n + b phiBar^n - 1
//
//a + b - 1 = 1
//a phi + b phiBar - 1 = 1
//
//a + b = 2
//a - b  = 1/sqrt(5)
//
//a = 1 + sqrt5/10
//b = 1 - sqrt5/10

/** Computes a pseudo inverse of the Leonardo sequence. 
 * @param l
 * @returns the largest integer n such that leonardoSequence(n) is no greater than l.
*/
export function leonardoInverse (l:number) {
    //find the greatest leonardo number lesser or equal to n,
    //by making a completely safe and very close guess, and adjusting.
    for ( var n = Math.max(Math.floor(Math.log(l/dominantCoef)/logphi), 1) - 1; leonardoSequence(n) <= l; ++n);
    return n - 1;
}

/** Returns the Leonardo height of a node.
 * @param {number}idx - the index of the input node
 * @returns Leonardo height of a node. Such a height h of idx satisfies that the tree rooted on idx is of size L_h.
 */
export function leonardoHeight(idx:number){
    var n = leonardoHeight.data[idx];
    if (n != undefined)
        return n;
    
    //remove initial stretches one after the other up until we're at the root of one.
    for(let i = idx + 1 ; i -= leonardoSequence(n = leonardoInverse(i)) ; );
    
    return leonardoHeight.data[idx] = n;
}
leonardoHeight.data = [1];

/** The number of elements of {@link leonardoHeight} to initialize. */
const initializeNumber = 137;
/** A funtion to initialize {@link leonardoHeight} and {@link leonardoSequence} in a more straighforwad manner. */
function * initializeGen () : Generator<number, any,number>{
    var counter : number = 0;
    let i = 1;
    for(let height = 1; ; ++height){
        //the new root of the tree
        //use initializeIt.next(n) to initialize but not beyond n, and initializeIt.next(-1) to just know how far initialisazion is.
        while ((yield counter) < counter);
        ++counter;
        leonardoSequence.data[height] = counter;
        leonardoHeight.data[counter - 1] = height;

        //filling the small tree
        for (i = 0 ; i < leonardoSequence(height - 1) ; ++i){
        //use initializeIt.next(n) to initialize but not beyond n, and initializeIt.next(-1) to just know how far initialisazion is.
            while ((yield counter) < counter);
            ++counter;
            leonardoHeight.data[counter - 1] = leonardoHeight.data[i];
        };
    }
}
export var initializeIt = initializeGen ();
initializeIt.next();

for (let i = 1; i <= initializeNumber; ++i)
    initializeIt.next(initializeNumber);

import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    ns.tprint("test of " + ns.getScriptName() + ' :' ) ;
    let [n=10] = ns.args;

    for (var s = "", i = -1, max = 0; ++i < n ; s+=ns.sprintf("%d\t", max = leonardoSequence(i)));
    ns.tprint("leonardoSequence :\t" + s);
    for (s = "", i = -1, max = Math.min(max, 83); ++i < max ; s+=ns.sprintf("%d\t", leonardoInverse(i)));
    ns.tprint("leonardoInverse :\t" + s);
    for (s = "", i = -1; ++i < max ; s+=ns.sprintf("%d\t", leonardoHeight(i)));
    ns.tprint("leonardoHeight :\t" + s);
}

