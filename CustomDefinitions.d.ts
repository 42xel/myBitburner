import { NS, ScriptArg } from "@ns";
import { ScriptArgType } from "./src/cli/flagsParam.js"

//////////////////////// Somewhat generic tools ////////////////////////
/**
 * Make some properties in T optional
 */
type SomePartial<T, TOptional extends keyof T> = Partial<Pick<T, TOptional>> & Omit<T, TOptional>;
/**
 * Create a type with proerties of T transformed in parametrized getters.
 * @todo see wether it's possible to transform optional A|undefined into
 * optional ((Ikey) => A) | undefined,
 * as opposed to optional ((Ikey) => A | undefined) | undefined
 */
type Gettify<T, IKey> = {
    [K in keyof T] : (tkey : IKey) => T[K];
}
/** Return the type of the element iterated over. */
type Iterated<T> = T extends Iterable<infer A> ? A : never;

//////////////////////// trees ////////////////////////

/* a template with Self as a parameter type allows reuse with modification, or to flatten.
*/
interface TreeNodeInterfaceTemplate<Self, Value> {
    value : Value;
    parent : Self | undefined;
    children : Iterable<Self>;

    tree? : TreeInterfaceTemplate<Self, Value>;
}
/** The node of a tree */
export type TreeNode<Value> = TreeNodeInterfaceTemplate<TreeNode<Value>,Value> ;
interface TreeInterfaceTemplate<Node, Value> extends Iterable<Value> {
    root : Node;
    size? : number;
}
export type Tree<Value> = TreeInterfaceTemplate<TreeNode<Value>,Value> ;

type ImplicitTreeNode<Node, Value> = Gettify<TreeNodeInterfaceTemplate<Node, Value>, Node>;
/** An implicit tree, without an explicit structure to store node links */
export interface ImplicitTree<Node, Value> extends TreeInterfaceTemplate<Node,Value>, ImplicitTreeNode<Node, Value> {}

interface BinaryTreeNodeInterfaceTemplate<Self, Value> extends SomePartial<TreeNodeInterfaceTemplate<Self, Value>, "children"> {
    left : Self | undefined;
    right : Self | undefined;
}
export type BinaryTreeNode<Value> = BinaryTreeNodeInterfaceTemplate<BinaryTreeNode<Value>,Value> ;
export type BinaryTree<Value> = TreeInterfaceTemplate<BinaryTreeNode<Value>,Value> ;

type ImplicitBinaryTreeNode<Node, Value> = Gettify<BinaryTreeNodeInterfaceTemplate<Node, Value>, Node>;
/** An implicit tree, without an explicit structure to store node links */
export interface ImplicitBinaryTree<Node, Value> extends TreeInterfaceTemplate<Node,Value>, ImplicitBinaryTreeNode<Node, Value> {}

/** A heap interface
 *  @Public */
export interface Heap<Value> extends Iterable<Value> {
    /** A comparison function to specify the heap structure
     * @param a the first value to compare
     * @param b the second value to compare
     */
    cmp? : ((a:Value,b:Value) => boolean) | ((a:Value,b:Value) => number);
    //Basic Operations
    /** peeks at the top of the heap without deleting it.
     * @returns the value at the top of the heap
     */
    peek:()=>Value | undefined;
    /** pushes a value in the heap.
     * @param value the value to push
     */
    push:(value:Value)=>void;
    /** deletes the top of the heap.
     * @returns the value removed from the top of the heap
     */
    pop:()=> Value | undefined;
    /** deletes the top of the heap.
     */
    delete?:()=>void;
    /** 
     * replaces the value at the top of the heap
     * @param newValue the new value to push.
     * @returns the old value.
     * @description more efficient than pop() then push() since only one sifting is necessary.
     */
    replace:((newValue : Value)=>Value) | ((newValue:Value)=>void);
    
    //Inspection
    size?:number;
    isEmpty?:boolean;
}

//////////////////////// cli realted stuffs ////////////////////////
export type FlagsSchemaParameter = Iterated<Parameters<NS["flags"]>> //smh Iterated<FlagsSchemaList> doesn't unpack a second time, investigate.
export type ScriptArgsObject = ReturnType<NS["flags"]>

export type FlagsTupleFull = [flag : string | string[], type : ScriptArgType, defaultValue : string[] | ScriptArg | null, helpString? : string ] ;
export type FlagsTuple = Partial<FlagsTupleFull>

//export type FlagsTuple = [flag : string, type : ScriptArgType, defaultValue : string[] | ScriptArg, helpString? : string ] |
//    [flag : string, type : ScriptArgType, helpString? : string ] | 
//    [flag : string, helpString? : string ] |
//    [flag : string, defaultValue : string[] | boolean | number, helpString? : string ] |
//    [flag : string, defaultValue : string, helpString : string ];
//export type FlagsTuple = [flag : string, type?: ScriptArgType, defaultValue?: string[] | ScriptArg | null, helpString? : string ] |
//    [flag : string, defaultValue: string[] | ScriptArg | null, helpString?: string ];// |
//    //[flag : string, helpString : string ];

//export type FlagsSchemaObject = { [key:string] : ScriptArg | string[], _:string[]};

interface AutocompleteData {
    servers : string[];
    scripts : string[];
    txts : string[];
    flags : (schema : FlagsSchemaParameter) => ScriptArgsObject|undefined;
}
type Autocomplete = (data:AutocompleteData, args:ScriptArg[]) => string[];

export interface FlagsElementInterface {
    /**
     * The flags schema as required by (ns.)flags()
     */
    schema:FlagsSchemaParameter;
    autocomplete:Autocomplete;
    
    /** The equivalent of the flags function in main, autocomplete or as a standalone */
    flags:((ns: NS) => ScriptArgsObject) | ((data: AutocompleteData) => ScriptArgsObject|undefined) | ((args : ScriptArg[]) => ScriptArgsObject|undefined) ;
    /** A help prompt for invalid script args or when the --help parameter is given */
    helpPrompt:(ns:NS , x?:ScriptArgsObject) => void ;
    /** Transforms an object { ParamName : value } into a corresponding list of arguments, to be used for example with spreading and ns.run */
    galfs:(x : ScriptArgsObject|undefined) => ScriptArg[];  //prob static though.

    /** A text to display when help is requested n this particular object */
    helpString?:string;

//    man:()=>void;
//    manualPre?:string
//    manualPost?:string
}

//aliases : "n|nuke"

//todo usage then multi usage
//usage extends FlagsSchemaInterface ; usages extends Iterable<usage>, usage