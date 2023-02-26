import { leonardoSequence, leonardoInverse, leonardoHeight } from "algo/tree/leonardoNumbers.js";
const defaultCompareFunction = (a, b) => (a == b ? 0 : a < b ? -1 : +1);
const arithCompareFunction = (a, b) => (a - b);
/** A class to interface arrays as leonardo trees.
 */
class LeonardoTree {
    data;
    get root() { return this.size - 1; }
    #size;
    get size() { return this.#size ?? this.data.length; }
    set size(size) { this.#size = size; }
    value = (tkey) => this.data[tkey];
    /** truthy return if node tkey is a right child, falsy if it is a left one. */
    isRight = (tkey) => leonardoHeight(tkey + 1) - 1;
    #parent(tkey) {
        return this.isRight(tkey) ? tkey + 1 :
            tkey + 1 + leonardoSequence(leonardoHeight(tkey) - 1);
    }
    #stepParent(tkey) {
        return tkey + leonardoSequence(leonardoInverse(this.root - tkey));
    }
    //    stepParent (tkey: number) : number | undefined {
    //        let r = this.#stepParent(tkey);
    //        return this.isRight(tkey) ? undefined :
    //            r < this.size ? r : undefined;
    //    }
    parent(tkey) {
        let p;
        return tkey == this.root ? undefined :
            this.isRight(tkey) ? 1 + tkey :
                (p = this.#parent(tkey)) < this.size ? p :
                    this.#stepParent(tkey);
    }
    #left(tkey) {
        return tkey - 1 - leonardoSequence(leonardoHeight(tkey) - 2);
    }
    left(tkey) {
        let height = leonardoHeight(tkey);
        return height > 1 ?
            tkey - 1 - leonardoSequence(height - 2) :
            undefined;
    }
    #right = (tkey) => tkey - 1;
    right(tkey) {
        return leonardoHeight(tkey) > 1 ?
            tkey - 1 :
            undefined;
    }
    #stepChild(tkey) {
        return tkey - leonardoSequence(leonardoHeight(tkey));
    }
    stepChild(tkey) {
        if (this.#parent(tkey) < this.size)
            return; //0 is not a parent ok
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
    children(tkey, bStepChild = false) {
        console.log(`getting the children of node ${tkey}`);
        let r = [];
        if (leonardoHeight(tkey) > 1)
            r.push(this.#right(tkey), this.#left(tkey));
        switch (bStepChild && (tkey = this.stepChild(tkey))) {
            case false:
            case undefined:
                console.log(`no stepChild`);
                if (!bStepChild)
                    console.log(`reason : not interested (bStepChild -> ${bStepChild})`);
                else
                    console.log(`reason : undefined stepChild (this.stepChild(initialTkey)) -> ${tkey})`);
                break;
            default:
                r.push(tkey);
        }
        return r;
    }
    constructor(values = []) {
        this.data = values;
        //        this[Symbol.iterator] = this.data[Symbol.iterator];
        //doesn't work smh :
        // Property '[Symbol.iterator]' has no initializer and is not definitely assigned in the constructor.ts(2564)
    }
    [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
    }
}
/** A class to interface Arrays as Leonardo heaps. */
export class LeonardoHeap extends LeonardoTree {
    get size() { return super.size; }
    set size(size) {
        if (size && (size < 0 || size % 1))
            throw "wrong value for LeonardoHeap.size, expected non negative integer, got : " + size;
        let oldSize = this.size;
        super.size = size;
        switch (this.size) {
            case 0:
            case 1: break;
            case oldSize - 1:
                if (leonardoHeight(this.size) > 1) {
                    let stepChild = this.stepChild(this.root);
                    if (stepChild)
                        this.#sink(stepChild);
                }
            case oldSize + 1:
                this.#sink(this.root);
            case oldSize:
                break;
            default:
                this.#shake(); //optimization possible but not very necessary.
        }
    }
    //set by the constructor ok.
    #cmp;
    /**
     * @returns a number akin to a - b (positive iff a should arrive later, ie. be lower in the heap)
     */
    get cmp() { return this.#cmp; }
    set cmp(f) {
        this.#cmp = f;
        this.#shake();
    }
    peek = () => this.data.at(-1);
    push(value) {
        this.data.push(value);
        this.#sink(this.root);
    }
    pop() {
        try {
            return this.data.pop();
        }
        finally {
            if (leonardoHeight(this.size) > 1) {
                //Property is potentially violated at either child of the deleted node
                this.#sink(this.stepChild(this.root));
                this.#sink(this.root);
            }
        }
    }
    replace(newValue) {
        try {
            return this.data.pop();
        }
        finally {
            this.data.push(newValue);
            this.#sink(this.root);
        }
    }
    get isEmpty() { return this.size == 0; }
    /** Swims a node up both a binary tree and fetches.
     * @param {number} tkey the position to sift from
     * @description : restore heap properties if violated only at {@link tkey}
     * */
    #swim(tkey) {
        let val = this.value(tkey);
        for (let p, v; (p = this.parent(tkey)) != undefined &&
            0 < this.#cmp(val, v = this.value(p));) {
            this.data[tkey] = v;
            tkey = p;
        }
        this.data[tkey] = val;
    }
    /** sinks a node down both tree and fetches
     * @param {number} tkey the position to sink from
     * @param {boolean} bSink a boolean which tells whether to consider stepchild
     * @description : restores heap properties if violated only at {@link tkey}*/
    #sink(tkey, bSink = true) {
        let val = this.value(tkey);
        for (let children, topc, valTopc; (children = this.children(tkey, bSink)).length; tkey = topc) {
            //top child
            topc = children.reduce((prev, cur) => {
                return this.#cmp(this.value(prev), this.value(cur)) > 0 ? prev : cur;
            }, children[0]);
            valTopc = this.value(topc);
            if (this.#cmp(val, valTopc) < 0) {
                this.data[tkey] = valTopc;
            }
            else
                break;
        }
        this.data[tkey] = val;
    }
    ;
    /** Orders the heap
     * @description Instores heap properties with no assumption on the current values.
     * Takes less time if the values are almost ordered. */
    #shake() {
        if (!this.size)
            return;
        let l = leonardoSequence(leonardoInverse(this.size));
        for (var i = 0; i < l; ++i)
            this.#sink(i, false);
        for (; i < this.size; ++i)
            this.#sink(i);
    }
    /** Orders the heap
     * @description Instores heap properties with no assumption on the current values.
     * Takes less time if the values are almost ordered. */
    shake = this.#shake;
    /** Sorts the data as an array, in place adaptive.
     * @description
     * Sorts data in place. This method mutates data and returns a reference to it */
    sort(cmp) {
        if (cmp != undefined)
            this.cmp = cmp;
        for (; this.size; --this.size)
            console.log(this.data);
        this.size = undefined;
        return this.data;
    }
    constructor(cmp = defaultCompareFunction, data = []) {
        if (!Array.isArray(data))
            data = [...data];
        super(data);
        this.cmp = cmp; //also shakes the heap ok.
    }
    *popAll() {
        for (var r; (r = this.pop()) !== undefined;)
            yield r;
    }
}
/** Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.

[11,2,22,1].sort((a, b) => a - b)

Sorts an array in place. This method mutates the array and returns a reference to the same array. */
export function smoothsort(array, compareFn) {
    return new LeonardoHeap(compareFn, array).sort();
}
const TEST_INPUT_TYPE = 1;
const TEST_CODE = 2;
/** @param {NS} ns */
export async function main(ns) {
    switch (TEST_INPUT_TYPE) {
        case 1:
            let l = ns.args[0] ?? 10;
            if (typeof (l) !== "number")
                throw `wrong argument : ${l}. args[0] must be a number`;
            let m = ns.args[1] ?? 100;
            if (typeof (m) !== "number")
                throw `wrong argument : ${m}. args[1] must be a number`;
            for (var r = []; l--; r.push(Math.floor(m * Math.random())))
                ;
            break;
        case 2:
            var r = [...ns.args];
            break;
        default:
            throw 'invalide TEST_INPUT_TYPE';
    }
    ns.tprint(`input array:\n${r}`);
    let rSorted = [...r].sort(arithCompareFunction);
    ns.tprint(`sorted copy:\n${rSorted}`);
    let LtR = new LeonardoHeap(arithCompareFunction, r);
    ns.tprint(`heapified input:\n${r}`);
    switch (TEST_CODE) {
        case 1:
            smoothsort(r);
            ns.tprint(`smoothsorted input:\n${r}`);
            break;
        case 2:
            ns.tprint(`all popped input:\n${[...LtR.popAll()]}`);
            ns.tprint(`intial input after popping:\n${r}`);
            break;
        default:
            throw 'invalide TEST_CODE';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVvbmFyZG9IZWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FsZ28vdHJlZS9sZW9uYXJkb0hlYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQTtBQUVoRyxNQUFNLHNCQUFzQixHQUFHLENBQUksQ0FBSyxFQUFFLENBQUssRUFBRSxFQUFFLENBQ25ELENBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQTtBQUNoQyxNQUFNLG9CQUFvQixHQUFHLENBQUksQ0FBSyxFQUFFLENBQUssRUFBRSxFQUFFLENBQ2pELENBQUUsQ0FBUSxHQUFJLENBQVMsQ0FBRSxDQUFBO0FBRXpCO0dBQ0c7QUFDSCxNQUFNLFlBQVk7SUFDZCxJQUFJLENBQVM7SUFFYixJQUFJLElBQUksS0FBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuQyxLQUFLLENBQVc7SUFDaEIsSUFBSSxJQUFJLEtBQVksT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksQ0FBQyxJQUFxQixJQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVyRCxLQUFLLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsOEVBQThFO0lBQzlFLE9BQU8sR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksR0FB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