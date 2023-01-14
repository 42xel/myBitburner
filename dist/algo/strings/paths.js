/** a function which explodes a string into a list of all the corresponding files
 * @param {NS} ns
 * @param {string|string[]} desc - A string or a list of strings specifying files.
 * Multiple files can be specified as an array or separated by semi colon in a single string.
 * If a filename ends with a '/', the whole corresponding directory is listed instead.
 * @param {string} hostname - The name where to search the files. */
export function fileArray(ns, desc, hostname) {
    hostname ??= ns.getHostname();
    switch (typeof (desc)) {
        case "string":
            desc = [desc];
        case "object":
            desc = desc.map((str) => str.split(';').map((path) => {
                if (path.at(-1) == "/")
                    return ns.ls(hostname, path);
                else
                    return path;
            })).flat(2);
            break;
        default: const _exhaustiveCheck = desc;
    }
    return desc;
}
//future dev? iterator, Class/prototype
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWxnby9zdHJpbmdzL3BhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7OztvRUFLb0U7QUFDcEUsTUFBTSxVQUFVLFNBQVMsQ0FBRSxFQUFNLEVBQUUsSUFBdUIsRUFBRSxRQUFpQjtJQUN6RSxRQUFRLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLFFBQVEsT0FBTSxDQUFDLElBQUksQ0FBQyxFQUFDO1FBQ2pCLEtBQUssUUFBUTtZQUNULElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLEtBQUssUUFBUTtZQUNULElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FDdkMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDTCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUyxFQUFFLElBQUksQ0FBQyxDQUFDOztvQkFFOUIsT0FBTyxJQUFJLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQ0wsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNO1FBQ1YsT0FBUSxDQUFDLENBQUMsTUFBTSxnQkFBZ0IsR0FBUyxJQUFJLENBQUM7S0FDakQ7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsdUNBQXVDIn0=