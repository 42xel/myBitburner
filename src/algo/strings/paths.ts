import { NS } from "@ns";

/** a function which explodes a string into a list of all the corresponding files
 * @param {NS} ns
 * @param {string|string[]} desc - A string or a list of strings specifying files.
 * Multiple files can be specified as an array or separated by semi colon in a single string.
 * If a filename ends with a '/', the whole corresponding directory is listed instead.
 * @param {string} hostname - The name where to search the files. */
export function fileArray (ns: NS, desc: string | string[], hostname?: string) {
    hostname ??= ns.getHostname();
    switch (typeof(desc)){
        case "string" : 
            desc = [desc];
        case "object" :
            desc = desc.map((str) => str.split(';').map(
                (path) => {
                    if (path.at(-1) == "/")
                        return ns.ls(hostname!, path);
                    else
                        return path;
                })
            ).flat(2);
            break;
        default : const _exhaustiveCheck:never = desc;
    }
    return desc;
}

//future dev? iterator, Class/prototype