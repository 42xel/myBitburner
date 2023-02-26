import { NS, ScriptArg } from "@ns";
import { FlagsSchemaParameter, ScriptArgsObject, FlagsTupleFull, FlagsTuple, FlagsElementInterface, Autocomplete, AutocompleteData, Iterated } from "@4xel"

const bInferTypeFromString: boolean = true;

export const ScriptArgType = {
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
export type ScriptArgType = ScriptArgTypeList[keyof ScriptArgTypeList]

/**  */
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


//function isEnumKey<E>(e : { [key:E] : E }, t : any): t is E {
//    return (t as any in e)
//}
//function isScriptArgType(t : FlagsTuple[1]): t is ScriptArgType {
//    return typeof(t) == "string" && isEnumKey<ScriptArgType>(ScriptArgType,t);
//}

//todo? autocomplete default param?

class FlagParam implements FlagsElementInterface{
    static readonly helpDefaultList : FlagsTupleFull = ["help|h", ScriptArgType.Boolean, false, "Use this flag to display help about this script or a particular option"];
    #tuple:FlagsTupleFull = FlagParam.helpDefaultList;

    #pns? : Promise<NS>;
    #pdata? : Promise<AutocompleteData>;

    schema: [string, string | number | boolean | string[]][];
    autocomplete: Autocomplete;
    flags: ((ns: NS) => { [key: string]: string[] | ScriptArg; _: string[]; }) | ((data: AutocompleteData) => { [key: string]: string[] | ScriptArg; _: string[]; } | undefined) | ((args: ScriptArg[]) => { [key: string]: string[] | ScriptArg; _: string[]; } | undefined);
    helpPrompt: (ns: NS, x?: { [key: string]: string[] | ScriptArg; _: string[]; } | undefined) => void;
    galfs: (x: { [key: string]: string[] | ScriptArg; _: string[]; } | undefined) => ScriptArg[];
    helpString?: string | undefined;

    //TODO : objet literal parameter and JSDOC
    constructor(tuple : FlagsTuple){
        this.#tuple
    }

    static fillFlagsObject(tuple : FlagsTuple) : FlagsTupleFull {
        //todo check tuple[0] format
        //todo catch error and throw em back ?
        var errors = [], result = [];
        switch (tuple.length) {
            case 4 :
//                return ["Flag","Type","DefaultValue","HelpString"].map((x, i)=>this[`#get${x}From${x}`](tuple[i]));   //fun but nightmarishly dynamic.
                try { result.push(this.#getFlagFromFlag(tuple[0])); }                    catch (e) { errors.push(e); }
                try { result.push(this.#getTypeFromType(tuple[1])); }                    catch (e) { errors.push(e); }
                try { result.push(this.#getDefaultValueFromDefaultValue(tuple[2])); }    catch (e) { errors.push(e); }
                try { result.push(this.#getHelpStringFromHelpString(tuple[3])); }        catch (e) { errors.push(e); }
                break;
            case 3 :
            case 2 :
            case 1 :
                //try to interpret tuple as [type]
                try { result[1] = this.#getTypeFromType(tuple[0]); }                    catch (e) { errors.push(e); }
                //try to interpret tuple as [flag]
                //try to interpret tuple as [defaultValue]
            case 0 :
                throw Error("Empty tuple");
        }
    }
    static #getFlagFromFlag(flag:Iterated<FlagsTupleFull>) : FlagsTupleFull[0] {
        //it must be a string, comprised of a list of words (aliases of the same parameter) pipe separated
        //or a string array also providing a list of alias
        var flags : string[] = Array.isArray(flag) ? [...flag.values()] :
            typeof(flag) == "string" ? [...flag.split('|')] : 
            (()=>{throw TypeError("`flag` must be a string or a string array.");})();
        return flags.length ?
            flags.flatMap((v)=>v.match(/\w+/) ?? (()=>{throw TypeError("Each flag must be an sequence of alpha numéric characters.")})()) :
            (()=>{throw TypeError("Empty array given as `flags`.")})()
    }
    static #getTypeFromType(type:Iterated<FlagsTupleFull>) : FlagsTupleFull[1] {
        //It must be a ScriptArgType, that is a constant or a symbol
        return typeof(type) == "symbol" ? type :
            typeof(type) == "string" ? 
                (Object.hasOwn as (_:Object, type:any)=>type is keyof ScriptArgTypeList)(ScriptArgType, type) ?  ScriptArgType[type] :
                (()=>{throw TypeError("String `type` does not describe a valid type.");})() :
            (()=>{throw TypeError("Argument `type` must be a ScriptArgType symbol or string.");})();
    }
    static #getDefaultValueFromDefaultValue(value:Iterated<FlagsTupleFull>) : FlagsTupleFull[2] {
        //It must be a ScriptArg, or a string array
        switch (typeof(value)) {
            case "object" : if (!Array.isArray(value) && value !== null)
                throw TypeError("Argument `defaultValue` must be a boolean, a number, a string, null, or a string array.");
            case "boolean" :
            case "number" :
            case "string" :
                return value;
            default : throw TypeError("Argument `defaultValue` must be a boolean, a number, a string, null, or a string array.");
        }
    }
    static #getHelpStringFromHelpString(help:Iterated<FlagsTupleFull>) : FlagsTupleFull[3] {
        //It must be a string, or undefined.
        return typeof(help ??= "%s") == "string" ? help :
            (()=>{throw TypeError("If given, `helpString` must be a string.");})()
    }
    static #getFlagFromType(type:FlagsTupleFull[1]) : FlagsTupleFull[0] {
        //uses typename as parameter name
        return type.description!.toLowerCase();
    }
    /** do not use */
    static #getFlagFromDefaultValue(value:FlagsTupleFull[2]) : FlagsTupleFull[0] & never {
        //uses typename as parameter name, so it doesn't make sense to get it from default value.
        throw Error("Can't retrieve `flag` from `defaultValue`");
    }
    static #getTypeFromFlags(flags:FlagsTupleFull[0]) : FlagsTupleFull[1] {
        //Depends on whether its a type name, and its length.
        const flag = (typeof(flags) == "string") ? flags : flags[0];
        return (Object.hasOwn as (_:Object, type:any)=>type is keyof ScriptArgTypeList)(ScriptArgType, flag) ?  ScriptArgType[flag] :
            flag.length == 1 ? ScriptArgType.Boolean : 
            ScriptArgType.String ;
    }
    static #getTypeFromDefaultValue(value:FlagsTupleFull[0]) : FlagsTupleFull[1] {
        //Doesn't go through the hassle of identifying strings.
        const t = typeof(value);
        switch (t) {
            case "object" : 
                if (Array.isArray(value))
                    return ScriptArgType.StringArray;
                else return ScriptArgType.String;   //null => string
            case "boolean" :
            case "number" :
            case "string" :
                return ScriptArgType[t];
//                return ScriptArgType[t.replace(/^\w/, String.prototype.toUpperCase) as Capitalize<typeof t>]
        }
    }
    static async #aGetTypeFromDefaultValue(flags:FlagsTupleFull[0]) : FlagsTupleFull[1] | never {
        //Does go through the hassle of identifying strings as servers, scripts or text.
        //since the whole point of better flags is to be declared at top level, type inferrence shall await a ns or autocomplete data object.
        //or not, you could also write JSON import it instead of ns.reading it.
        throw Error("not implemented yet.");
    }
    /** do not use */
    static #getDefaultValueFromFlags(flags:FlagsTupleFull[1]) : FlagsTupleFull[2] & never  {
        //doesn't make sense
        throw Error("Can't retrieve `defaultValue` from `flag`");
    }
    static #getDefaultValueFromType(flags:FlagsTupleFull[1]) : FlagsTupleFull[2] {
        //the whole point of not giving a default value is to allow for undefined value.
        return null;
    }

//
//        switch (typeof(value)) {
//            case "object" : if (!Array.isArray(value) && value !== null)
//                throw TypeError("`defaultValue` must be a boolean, a number, a string, null, or a string array.");
//            case "boolean" :
//            case "number" :
//            case "string" :
//                return value;
//            default : throw TypeError("`defaultValue` must be a boolean, a number, a string, null, or a string array.");
//        }
//    }
//
//        return typeof(type) == "symbol" ? type :
//            typeof(type) == "string" ? 
//                (Object.hasOwn as (_:Object, type:any)=>type is keyof ScriptArgTypeList)(ScriptArgType, type) ?  ScriptArgType[type] :
//                (()=>{throw TypeError("String `type` does not describe a valid type.");})() :
//            (()=>{throw TypeError("`type` must be a ScriptArgType symbol or string.");})();
//    }
//
//    static #fillFlagsObject_getType(...[flag, type, defaultValue, helpString] : FlagsTuple) : FlagsTupleFull{
//        switch (typeof(type)) { 
//            case "symbol" : //tuple[1] is a ScriptArgType
//                return this.#fillFlagsObject_getDefaultValue(flag, type, defaultValue, helpString);
//                //tuple[1] is likely a defaultParam
//            case "string" : //here, it can be a type, a defaultParam or a helpString.
//            if (type.match(/\s/)){ //it has a space, so  it's help string
//                if (defaultValue ?? helpString !=undefined ) {
//                    throw Error("Tuple too big. Strings containing space are helpString and can't be default value, and thus must be given last.");
//                } else {
//                    return this.#fillFlagsObject_getDefaultValue(flag, this.#getTypeFromFlag(flag), null, type);
//                }
//            } else if (type in ScriptArgType) {
//                type
////                [type, defaultValue] = [ScriptArgType.String, tuple[1]];
//                break;
//            }
//            case "boolean" :
//            case "number" :
//                if (helpString != undefined) throw Error("Tuple too big. To explicitely specify a ScriptArgType, tuple[1] must be a symbol or a string");
//                return this.#fillFlagsObject_getDefaultValue(flag, typeof(type), type, defaultValue);
//            break;
//            case "object" : //string[]|null
//            if(Array.isArray(type)){
//
//            }
//                [ScriptArgType.StringArray, tuple[1]] : [ScriptArgType.String, tuple[1]] ;
//            case "undefined" :
//        }
//    }
//    static #fillFlagsObject_getDefaultValue(...[flag, type, defaultValue, helpString] : FlagsTuple) : FlagsTupleFull{
//
//    }
//    static #getTypeFromFlag(flag: FlagsTupleFull[0]) : FlagsTupleFull[1] {
//        return flag.match(/\w+/)![0].length == 1 ? ScriptArgType.Boolean : ScriptArgType.String;
//    }
//            /*
//        
//        
//            switch (tuple.length) {
//                case 1:
//                    //if only the name is given, assume boolean for single letter, string otherwise
                    [type, defaultValue] = flag.length == 1 ? [ScriptArgType.Boolean, false] : [ScriptArgType.String, null];
                    break;
                default :
                    if (isScriptArgType(tuple[1])){ //tuple[1] is type
                        type = tuple[1];
                    }
                    else {
                        let typeof1;
                        switch (typeof1 =typeof(tuple[1])) { //maybe tuple[1] is defaultValue
                            case "boolean" :
                                [type, defaultValue] = [ScriptArgType.Boolean, tuple[1]];
                                break;
                            case "number" :
                                [type, defaultValue] = [ScriptArgType.Number, tuple[1]];
                                break;
                            case "object" : //string[]|null
                                [type, defaultValue] = Array.isArray(tuple[1]) ?
                                    [ScriptArgType.StringArray, tuple[1]] : [ScriptArgType.String, tuple[1]] ;
                                break;
                            case "string" : //
                        }
                    }
                case 4:
            }
        
            helpString ??= "";
            return [flag, type, defaultValue, helpString];*/
}


export class CLIUsage implements FlagsElementInterface {
    /*
		autocomplete
		schema
		help
		check/autochek
		type
			autocomplete
			autocheck
    */
    #schemaObject: FlagsSchemaObject;

    get schema (): [string, string | number | boolean | string[]][]{
        let r = [];
        if (this.#schemaObject.help)

        return r;
    };
    autocomplete: Autocomplete;
    flags: ((ns: NS) => { [key: string]: string[] | ScriptArg; _: string[]; }) | ((data: AutocompleteData) => { [key: string]: string[] | ScriptArg; _: string[]; } | undefined) | ((args: ScriptArg[]) => { [key: string]: string[] | ScriptArg; _: string[]; } | undefined);
    helpPrompt: (ns: NS, x?: { [key: string]: string[] | ScriptArg; _: string[]; } | undefined) => void;
    galfs: (x: { [key: string]: string[] | ScriptArg; _: string[]; } | undefined) => ScriptArg[];
    helpString?: string | undefined;
//    schemaObject;
//    schema;
//    autocomplete(){};
//    help(){};
//    check(){};
//    
    constructor (schema : FlagsSchemaObject) {
        this.#schemaObject = schema;

    }
}

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    ns.flags()
    throw Error("placeholder");
}

