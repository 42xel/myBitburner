import {List, ListLink} from "/../CustomDefinitions";

class LinkedList<Value> implements List<Value>  {
  #head?:ListLink<Value>
  get head(){
    return (this.#head ?? this.#head) && this.#head.value;
  }
  get tail(){
    return (this.#head ?? this.#head) && this.#constructFromLink(this.#head.next);
  }
  push (elt: Value){
    this.#head = {value:elt, next:this.#head};
    return;
  }
  pop() {
    if (this.#head == undefined) return undefined;
    let r = this.#head.value;
    this.#head = this.#head.next;
    return r;
  }
  #constructFromLink (x?: ListLink<Value>) {
    let r = new LinkedList<Value>();
    r.#head = x;
    return r;
  }
  constructor(x?:Iterable<Value>) {
    this.#head = undefined;
    for(let elt of x??[])
        this.push(elt);
  }
  prototype?:unknown;
}
