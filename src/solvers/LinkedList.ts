export default class LinkedList {
  private current: LinkedList;
  private next: LinkedList;
  private prev: LinkedList;

  constructor(public value: number = 0, next?: LinkedList, prev?: LinkedList) {
    this.current = this;
    this.next = next || this;
    this.prev = prev || this;
  }

  public addAfter(value: number, numberOfItems: number): LinkedList {
    let after = this.current;
    for (let i = 0; i < numberOfItems; i++) {
      after = after.next;
    }

    const newNode: LinkedList = new LinkedList(value, after.next, after);
    after.next.prev = newNode;
    after.next = newNode;
    return newNode;
  }

  public moveBack(numberOfItems: number): LinkedList {
    let pointer = this.current;
    for (let i = 0; i < numberOfItems; i++) {
      pointer = pointer.prev;
    }

    return pointer;
  }

  public removeCurrent() {
    this.current.next.prev = this.current.prev;
    this.current.prev.next = this.current.next;
    return this.current.next;
  }
}
