import { NS, ScriptArg } from "@ns";
import { FlagsSchemaParameter, ScriptArgsObject, FlagsTupleFull, FlagsTuple, FlagsElementInterface, Autocomplete, AutocompleteData, Iterated } from "@4xel"
//
import { HelpElement } from "./helpElement";

type PrintfTypeSpecifier = 
    'b' | // — yields an integer as a binary number
    'c' | // — yields an integer as the character with that ASCII value
    'd' | // or i — yields an integer as a signed decimal number
    'e' | // — yields a float using scientific notation
    'u' | // — yields an integer as an unsigned decimal number
    'f' | // — yields a float as is; see notes on precision above
    'g' | // — yields a float as is; see notes on precision above
    'o' | // — yields an integer as an octal number
    's' | // — yields a string as is
    't' | // — yields true or false
    'T' | // — yields the type of the argument1
    'v' | // — yields the primitive value of the specified argument
    'x' | // — yields an integer as a hexadecimal number (lower-case)
    'X' | // — yields an integer as a hexadecimal number (upper-case)
    'j' ; // — yields a JavaScript object or array as a JSON encoded string

/** 
 * @remark null vs undefined default value: Definition of defaultValue : 
 * usage : ?
 * @todo ? add stringify and parse. Add constructor from class.
 */
class ScriptArgType<Name extends string = string, BaseType = any> extends HelpElement {
    name: Name; //for now useless, but might or might not lead to very cool stuff if constructor from class is ever implemented.
    check?: (v: any) => boolean;
    values?: () => Iterable<BaseType>;
    defaultValue?: BaseType;
    help: typeof HelpElement["help"];

    #ns?: NS;

    constructor (name: Name, {check, values, defaultValue}: {check?: (v: any) => boolean, values?: () => Iterable<BaseType>, defaultValue?: BaseType},
        {helpFormat, helpString, helpStrings, BaseTypeLetter = 's'}:
            {helpFormat?: HelpElement["helpFormat"], helpString?: HelpElement["helpString"], helpStrings?: HelpElement["helpStrings"],
                BaseTypeLetter: PrintfTypeSpecifier})
    {
        // @todo ? handle depth
        helpFormat ??= () => `type ${name}${this.check ? '': " (no check)"}. ${this.helpString != undefined ? "%s" : ''}Default: ${this.defaultValue}. 
        ${this.values ?  "Values:\n%j": ''}`;
        helpStrings ??= () => [
            typeof this.helpString == "function" ? this.helpString() : this.helpString,
            (this.values ? [...this.values()] : undefined),
        ].filter((x) => x != undefined);

        super(helpFormat, helpString, helpStrings);
        this.name = name;
        this.check = check;
        this.values = values;
        this.defaultValue = defaultValue;

        this.help = 
    }  
}
/*
function ScriptArgTypeBuilder<BaseType> (name: string, check?: (v:any) => v is BaseType, values?: Generator<BaseType>, defaultValue?: BaseType)  { //singleton Factory
    return new class ScriptArgTypeChild extends ScriptArgType<BaseType> implements ScriptArgType<BaseType> {
        static check? = check;
        values? = values;
        defaultValue? = defaultValue;
    } ()
}
*/

//const c:ClassDecorator;
//const s = 'toto';
//type bla = ScriptArgType<"bla">
//type bal = ScriptArgType<typeof s>


export const ScriptArgTypes = {
    String : Symbol.for("String"),
    string : Symbol.for("String"),
        Server : Symbol.for("Server"),
            Target : Symbol.for("Target"),
            Worker : Symbol.for("Worker"),
            Collaborator : Symbol.for("Collaborator"),
            Slave : Symbol.for("Slave"),
        Script : Symbol.for("Script"),
        Text : Symbol.for("Text"),
    Number : Symbol.for("Number"),
    number : Symbol.for("Number"),
//        Integer : Symbol.for("Integer"),
//        NonNegative : Symbol.for("NonNegative"),
//        Positive : Symbol.for("Positive"),
//        NonPositive : Symbol.for("NonPositive"),
//        Negative : Symbol.for("Negative"),
    Boolean : Symbol.for("Boolean"),
    boolean : Symbol.for("Boolean"),
    StringArray : Symbol.for("StringArray"),
    Stringarray : Symbol.for("StringArray"),
        //meta/modifier
//        Array : Symbol.for("Array"),
}
export type ScriptArgTypeList = typeof ScriptArgType
export type ScriptArgTypes = ScriptArgTypeList[keyof ScriptArgTypeList]

//ScriptArgType.Home = Symbol.for("Home");

/**  
const defaultArgs = {
    String : '',
    Servers : "home",
        Targets : "n00dles",
        Workers : "iron-gym",
        Collaborators : "Home",
        Slaves : "foodnstuff",
    Scripts : ,
    Texts,
Number,
//        Integer,
//        NonNegative,
//        Positive,
//        NonPositive,
//        Negative,
Boolean,
StringArray,
    //meta/modifier
//        Array,  //
}
*/

//function isEnumKey<E>(e : { [key:E] : E }, t : any): t is E {
//    return (t as any in e)
//}
//function isScriptArgType(t : FlagsTuple[1]): t is ScriptArgType {
//    return typeof(t) == "string" && isEnumKey<ScriptArgType>(ScriptArgType,t);
//}


/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    ns.flags([]);
    throw Error("placeholder");
}

