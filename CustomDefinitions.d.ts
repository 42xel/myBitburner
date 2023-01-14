//export type ListHead<Value> = (Value | undefined);
interface ListInterfaceTemplate {
    head: any;
    tail: any;
    pop:Function;
    push:Function;
}
interface EmptyList<Value> extends ListInterfaceTemplate {
    head:undefined;
    tail:undefined;
    pop:()=>undefined;
    push:(elt:Value)=>void;
//   constructor:(x:Iterable<Value>|null) => List<Value>
}
interface NonEmtyList<Value> extends ListInterfaceTemplate {
    head:Value;
    tail:List<Value>;
    pop:()=>Value;
    push:(elt:Value)=>void;
//   constructor:(x:Iterable<Value>|null) => List<Value>
}

export type ListLink<Value> = {
    value:Value;
    next:undefined|ListLink<Value>;
    previous?:undefined|ListLink<Value>;
//    constructor:(x:Value)=>ListLink<Value>    //would be for the interface
}

/** @public */
export interface List<Value>{
    head:undefined|Value;
    tail:undefined|List<Value>;
    push:(elt:Value)=>void;
    pop:()=>undefined|Value;
//    constructor:(t:Iterable<Value>|null)=> unknown;// List<Value>;
}


/** @public */
export interface TreeNode<Value> {
    value: Value ;
    parent: TreeNode<Value> | undefined;
    children?:Iterable<TreeNode<Value>>|undefined ;
}
type _TreeNode<Value> = {

}

/** @public */
export interface BinaryTreeNode<Value> extends TreeNode<Value> {
    parent:BinaryTreeNode<Value> | undefined;
    left:BinaryTreeNode<Value> | undefined;
    right:BinaryTreeNode<Value> | undefined;
    children?:[BinaryTreeNode<Value>, BinaryTreeNode<Value>] | undefined;
}

///** @public */
type GeneratorFunctionTreeNode<Value> = (_:null) => Generator<Value,any,any>

/** @public */
export interface Tree<Value> extends Iterable<Value> {
    root:TreeNode<Value>;
    BFS?:GeneratorFunctionTreeNode<Value>;
    DFSprefixe?: GeneratorFunctionTreeNode<Value>;
    DFSpostfixe?:GeneratorFunctionTreeNode<Value>;
}


//, cmp?:(a:Value,b:Value) => Number
/** @public */
export interface Heap<Value> extends Iterable<Value> {
    peek:()=>Value;
    insert:(element:Value)=>void;
    pop:()=>Value;
    remove?:()=>void;
    replace:(element:Value)=>Value;

    create:()=>Heap<Value>;
 //   heapify: create a heap out of given array of elements
    
    merge?:(...heaps:Readonly<Heap<Value>[]>)=> Heap<Value>[]
    meld?:(...heaps:Heap<Value>[])=> Heap<Value>[]

//    shake?:;
//    setorder?;;
}


/** @public */
export interface Pointed<Temp,Obj extends Temp,Pointer> {

}

/** @public */
export interface MaxHeap<Value> extends Heap<Value> {
    find_max?:()=>Value;
    delete_max?:()=>Value;
    increase_key:(element:Value)=>void;
    decrease_max?:(element:Value)=>void;
    decrease_key?:(element:Value)=>void;
}