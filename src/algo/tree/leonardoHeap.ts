import { ImplicitBinaryTree, Heap } from "@4xel"
import { leonardoSequence, leonardoInverse, leonardoHeight } from "algo/tree/leonardoNumbers.js"

const defaultCompareFunction = <A>(a : A, b : A) => 
( a == b ? 0 : a < b ? -1 : + 1)
const arithCompareFunction = <A>(a : A, b : A) => 
( a as any - (b as any) )

/** A class to interface arrays as leonardo trees.
 */
class LeonardoTree<Value extends NonNullable<any>> implements ImplicitBinaryTree<number, Value>{
    data:Value[];

    get root() {return this.size - 1; }

    #size? : number;
    get size():number { return this.#size ?? this.data.length; }
    set size(size:number|undefined){ this.#size = size; }

    value = (tkey: number) => this.data[tkey];
    /** truthy return if node tkey is a right child, falsy if it is a left one. */
    isRight = (tkey: number) => leonardoHeight(tkey+1) - 1;
    #parent (tkey: number) : number {
        return this.isRight(tkey) ? tkey + 1 :
            tkey + 1 + leonardoSequence(leonardoHeight(tkey) - 1);
    }
    #stepParent (tkey: number) : number {
        return tkey + leonardoSequence(leonardoInverse(this.root - tkey ));
    }
//    stepParent (tkey: number) : number | undefined {
//        let r = this.#stepParent(tkey);
//        return this.isRight(tkey) ? undefined :
//            r < this.size ? r : undefined;
//    }
    parent (tkey: number) : number | undefined {
        let p;
        return tkey == this.root ? undefined :
            this.isRight(tkey) ? 1 + tkey :
            (p=this.#parent(tkey)) < this.size ? p :
            this.#stepParent(tkey)
    }
    #left (tkey: number) : number{
        return tkey - 1 - leonardoSequence(leonardoHeight(tkey) - 2);
    }
    left (tkey: number) : number | undefined{
        let height = leonardoHeight(tkey);
        return height > 1 ?
            tkey - 1 - leonardoSequence(height - 2) :
            undefined;
    }
    #right = (tkey: number) => tkey - 1;
    right (tkey: number) : number | undefined {
        return leonardoHeight(tkey) > 1 ?
            tkey - 1 :
            undefined;
    }
    #stepChild (tkey: number) : number {
        return tkey - leonardoSequence(leonardoHeight(tkey));
    }
    stepChild (tkey: number) : number | undefined {
        if (this.#parent(tkey) < this.size) return;  //0 is not a parent ok
        let r = this.#stepChild(tkey);
        return r >= 0 ? r : undefined;
    }
    /**
     * Returns the list of children.
     * @param {number} tkey the position of the parent
     * @param {boolean} bStepChild a boolean which tells whether to consider stepchild
     * @returns {number[]} the array on children indices.
     * @description Returns an array of numbers listing the position of childeren of tkey
     */
    children (tkey: number, bStepChild: boolean = false) : number[] {
        console.log(`getting the children of node ${tkey}`) ;
        let r = [];
        if (leonardoHeight(tkey) > 1)
            r.push(this.#right(tkey), this.#left(tkey));
        switch (bStepChild && ((tkey as number|undefined) = this.stepChild(tkey))){
            case false :
            case undefined :
                console.log(`no stepChild`);
                if (!bStepChild) 
                    console.log(`reason : not interested (bStepChild -> ${bStepChild})`);
                else
                    console.log(`reason : undefined stepChild (this.stepChild(initialTkey)) -> ${tkey})`);
                break;
            default : 
                r.push(tkey);
        }
        return r;
    }

    constructor (values:Value[] = []){
        this.data = values;
//        this[Symbol.iterator] = this.data[Symbol.iterator];
//doesn't work smh :
// Property '[Symbol.iterator]' has no initializer and is not definitely assigned in the constructor.ts(2564)
    }
    
    [Symbol.iterator](): IterableIterator<Value> {
        return this.data[Symbol.iterator]();
    }
}

/** A class to interface Arrays as Leonardo heaps. */
export class LeonardoHeap<Value extends NonNullable<any>> extends LeonardoTree<Value> implements Heap<Value> {
    get size():number { return super.size; }
    set size ( size: number | undefined ) {
        if (size && (size < 0 || size % 1)) throw "wrong value for LeonardoHeap.size, expected non negative integer, got : " + size; 
        let oldSize = this.size;
        super.size = size;
        switch (this.size) {
            case 0: case 1: break;
            case oldSize - 1 :
                if (leonardoHeight(this.size) > 1){
                    let stepChild = this.stepChild(this.root);
                    if (stepChild) this.#sink(stepChild) ;
                }
            case oldSize + 1 :
                this.#sink(this.root) ;
            case oldSize:
                break;
            default :
                this.#shake();//optimization possible but not very necessary.
        }
    }

    //set by the constructor ok.
    #cmp!: (a: Value, b: Value) => number
    /** 
     * @returns a number akin to a - b (positive iff a should arrive later, ie. be lower in the heap) 
     */
    get cmp () { return this.#cmp; }
    set cmp (f) {
        this.#cmp = f;
        this.#shake();
     }
    peek = () => this.data.at(-1);
    push (value: Value) {
        this.data.push(value);
        this.#sink(this.root);
    }
    pop () {//some optimization possible.
        try {return this.data.pop();}
        finally{
            if (leonardoHeight(this.size) > 1){
                //Property is potentially violated at either child of the deleted node
                this.#sink(this.stepChild(this.root) as number) ;
                this.#sink(this.root) ;
            }
        } 
    }
    replace (newValue: Value) : Value | undefined {
        try {return this.data.pop();}
        finally{ 
            this.data.push(newValue);
            this.#sink(this.root) ; 
        }
    }
    
    get isEmpty () { return this.size == 0 }

    /** Swims a node up both a binary tree and fetches.
     * @param {number} tkey the position to sift from
     * @description : restore heap properties if violated only at {@link tkey}
     * */
    #swim(tkey:number) {
        let val = this.value(tkey);
        for (let p, v;
            (p = this.parent(tkey)) != undefined && 
            0 < this.#cmp(val, v = this.value(p));)
        {
            this.data[tkey] = v;
            tkey = p;
        }
        this.data[tkey] = val;
    }
    /** sinks a node down both tree and fetches 
     * @param {number} tkey the position to sink from
     * @param {boolean} bSink a boolean which tells whether to consider stepchild
     * @description : restores heap properties if violated only at {@link tkey}*/
    #sink(tkey:number, bSink: boolean = true): void {
        let val = this.value(tkey);
        for (let children, topc, valTopc;
            (children = this.children(tkey, bSink)).length;
            tkey = topc) {
            //top child
            topc = children.reduce((prev,cur) => {
                return this.#cmp(this.value(prev), this.value(cur)) > 0 ? prev : cur;
            }, children[0])
            valTopc = this.value(topc);
            if (this.#cmp(val,valTopc) < 0){
                this.data[tkey] = valTopc;
            }
            else
                break;
        }
        this.data[tkey] = val;
    };
    
    /** Orders the heap
     * @description Instores heap properties with no assumption on the current values.
     * Takes less time if the values are almost ordered. */
    #shake() {
        if (!this.size) return;
        let l = leonardoSequence(leonardoInverse(this.size));
        for (var i = 0 ; i < l ; ++i) 
            this.#sink(i, false);
        for(;i<this.size;++i)
            this.#sink(i);
    }
    /** Orders the heap
     * @description Instores heap properties with no assumption on the current values.
     * Takes less time if the values are almost ordered. */
    shake = this.#shake;

    /** Sorts the data as an array, in place adaptive.
     * @description 
     * Sorts data in place. This method mutates data and returns a reference to it */
    sort(cmp?: (a: Value, b: Value) => number): Value[] {
        if (cmp != undefined)
            this.cmp = cmp;
        for (;this.size;--this.size) console.log(this.data);
        this.size = undefined;
        return this.data;
    }

    constructor(cmp: ((a: Value, b: Value) => number) = defaultCompareFunction,
            data:Iterable<Value> = [] ) {
        if (!Array.isArray(data)) data = [...data];
        super(data as Value[]);
        this.cmp = cmp; //also shakes the heap ok.
    }

    * popAll () : IterableIterator<Value>  {
        for(var r; (r = this.pop()) !== undefined;)
            yield r;
    }
}


/** Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.

[11,2,22,1].sort((a, b) => a - b)

Sorts an array in place. This method mutates the array and returns a reference to the same array. */
export function smoothsort(array : any[], compareFn?: ((a: any, b: any) => number) | undefined)
{
    return new LeonardoHeap(compareFn, array).sort();
}

const TEST_INPUT_TYPE : number = 1;
const TEST_CODE : number = 2;

import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    switch (TEST_INPUT_TYPE) {
        case 1 :
            let l = ns.args[0] ?? 10;
            if (typeof(l) !== "number") throw `wrong argument : ${l}. args[0] must be a number`;
            let m = ns.args[1] ?? 100;
            if (typeof(m) !== "number") throw `wrong argument : ${m}. args[1] must be a number`;
            for (var r : number[] = []; l--; r.push(Math.floor(m * Math.random())));
            break;
        case 2 :
            var r = [...ns.args as number[]];
            break;
        default :
            throw 'invalide TEST_INPUT_TYPE'
    }
    
    ns.tprint(`input array:\n${r}`);
    let rSorted = [...r].sort(arithCompareFunction);
    ns.tprint(`sorted copy:\n${rSorted}`);
    let LtR = new LeonardoHeap(arithCompareFunction, r);
    ns.tprint(`heapified input:\n${r}`);
    switch (TEST_CODE) {
        case 1 :
            smoothsort(r);
            ns.tprint(`smoothsorted input:\n${r}`);
            break;
        case 2 :
            ns.tprint(`all popped input:\n${[...LtR.popAll()]}`);
            ns.tprint(`intial input after popping:\n${r}`);
            break;
        default :
            throw 'invalide TEST_CODE'
    }
}