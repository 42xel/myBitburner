import { NS } from "@ns";
//A class to generate formatted help strings

export class HelpElement {
    //virtual fields to appease Typescript
    //toconsider: double their use as default values.
    static get helpFormat(): string | ((depth?: number)=>string) {
        return "You're not suppose to see this virtual HelpElement property, did one of us forgot to bind help method ?\n%s";
    }
    helpFormat: typeof HelpElement["helpFormat"];
    static helpString?: string | ((depth?: number)=> string);
    helpString?: typeof HelpElement["helpString"];
    static helpStrings?: (depth?: number) => Iterable<any>;
    helpStrings?: typeof HelpElement["helpStrings"];

    static #ns?:NS;

    /** generate a help string.
     * @todo reimplement/import sprintf from : https://github.com/alexei/sprintf.js
     * @remark must be bound to an instance before use.
     * */
    static help(depth : number) {
        var helpFormat = typeof this.helpFormat == "function" ? this.helpFormat(depth) : this.helpFormat;
        var helpString = typeof this.helpString == "function" ? this.helpString(depth) : this.helpString;
        return this.#ns ? this.#ns.sprintf(helpFormat, [helpString, ...[this.helpStrings ? this.helpStrings(depth) : []]].filter((x)=> x != undefined)) :
            (() => {throw new Error("sprintf not implemented, ns required");})()
    }
    constructor (helpFormat: HelpElement["helpFormat"] = "%s", helpString?: HelpElement["helpString"], helpStrings?: HelpElement["helpStrings"]) {
        this.helpFormat = helpFormat;
        this.helpString = helpString;
        this.helpStrings = helpStrings;
    }
}

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    throw Error("placeholder");
}