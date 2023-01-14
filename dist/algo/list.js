class LinkedList {
    #head;
    get head() {
        return (this.#head ?? this.#head) && this.#head.value;
    }
    get tail() {
        return (this.#head ?? this.#head) && this.#constructFromLink(this.#head.next);
    }
    push(elt) {
        this.#head = { value: elt, next: this.#head };
        return;
    }
    pop() {
        if (this.#head == undefined)
            return undefined;
        let r = this.#head.value;
        this.#head = this.#head.next;
        return r;
    }
    #constructFromLink(x) {
        let r = new LinkedList();
        r.#head = x;
        return r;
    }
    constructor(x) {
        this.#head = undefined;
        for (let elt of x ?? [])
            this.push(elt);
    }
    prototype;
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hbGdvL2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxVQUFVO0lBQ2QsS0FBSyxDQUFpQjtJQUN0QixJQUFJLElBQUk7UUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDeEQsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsSUFBSSxDQUFFLEdBQVU7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQzFDLE9BQU87SUFDVCxDQUFDO0lBQ0QsR0FBRztRQUNELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM3QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxrQkFBa0IsQ0FBRSxDQUFtQjtRQUNyQyxJQUFJLENBQUMsR0FBRyxJQUFJLFVBQVUsRUFBUyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1osT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0QsWUFBWSxDQUFrQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELFNBQVMsQ0FBVTtDQUNwQiJ9