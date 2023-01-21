/**
 * A type depending on how T and S relate to each other
 */
//type EquivalentOrExtend<T,S,Eq,Ex,Def> = T extends S ? S extends T ? Eq: Ex: Def
/**
 * A type depending on how T and S relate to each other
*/
type Equivalent<T,S,Eq,Def> = T extends S ? S extends T ? Eq: Def: Def

export type ReplaceRec<T,S,Substitute> = {
    [P in keyof T]:Equivalent<T[P],T,Substitute,
    never
    >
}


/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

export type bla = ReplaceRec<boolean|{bla:number},number,string>;


/**
 * From T, pick a set of properties whose keys are in the union K,
 * And replace appearance of type T by itself.
 */
//type PickRec<T,K extends keyof T> = {
//    [P in K]: T[P] extends T ? PickRec<T[P],K> : 
//    T[P] extends  infer S| infer T ? T2 | PickRec<T[P],K> :
//};
//
//type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
//type Pick<T, K extends keyof T> = {
//    [P in K]: T[P];
//};

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

/** @ */
export interface List<Value>{
    head:undefined|Value;
    tail:undefined|List<Value>;
    push:(elt:Value)=>void;
    pop:()=>undefined|Value;
//    constructor:(t:Iterable<Value>|null)=> unknown;// List<Value>;
}


/**  */
export interface TreeNode<Value> {
    value: Value ;
    parent: TreeNode<Value> | undefined;
    children?:Iterable<TreeNode<Value>>|undefined ;
}
type _TreeNode<Value> = {

}

/** @ */
export interface BinaryTreeNode<Value> extends TreeNode<Value> {
    parent:BinaryTreeNode<Value> | undefined;
    left:BinaryTreeNode<Value> | undefined;
    right:BinaryTreeNode<Value> | undefined;
    children?:[BinaryTreeNode<Value>, BinaryTreeNode<Value>] | undefined;
}

///**  */
type GeneratorFunctionTreeNode<Value> = (_:null) => Generator<Value,any,any>

/**  */
export interface Tree<Value> extends Iterable<Value> {
    root:TreeNode<Value>;
    BFS?:GeneratorFunctionTreeNode<Value>;
    DFSprefixe?: GeneratorFunctionTreeNode<Value>;
    DFSpostfixe?:GeneratorFunctionTreeNode<Value>;
}


//, cmp?:(a:Value,b:Value) => Number
/**  */
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

/**  */
export interface Pointed<Temp,Obj extends Temp,Pointer> {

}

/**  */
export interface MaxHeap<Value> extends Heap<Value> {
    find_max?:()=>Value;
    delete_max?:()=>Value;
    increase_key:(element:Value)=>void;
    decrease_max?:(element:Value)=>void;
    decrease_key?:(element:Value)=>void;
}