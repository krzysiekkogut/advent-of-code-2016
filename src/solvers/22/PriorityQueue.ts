interface IPriorityQueueItem<T> {
  item: T;
  next: IPriorityQueueItem<T> | null;
}

export default class PriorityQueue<T> {
  private head: IPriorityQueueItem<T> | null;

  constructor(private priorotySelector: (item: T) => number) {
    this.head = null;
  }

  public isEmpty(): boolean {
    return !this.head;
  }

  public queue(item: T): void {
    if (!this.head) {
      this.head = { item, next: null };
      return;
    }

    let before = null;
    let after: IPriorityQueueItem<T> | null = this.head;
    while (after && this.priorotySelector(after.item) < this.priorotySelector(item)) {
      before = after;
      after = after.next;
    }

    if (!before) {
      const newHead = { item, next: this.head };
      this.head = newHead;
    } else {
      const newNode = { item, next: before.next };
      before.next = newNode;
    }
  }

  public remove(item: T): void {
    let before = null;
    let after: IPriorityQueueItem<T> | null = this.head;
    while (after && after.item !== item) {
      before = after;
      after = after.next;
    }

    if (after === this.head) {
      this.dequeue();
    }

    if (after) {
      before!.next = after.next;
    }
  }

  public changePriority(item: T): void {
    this.remove(item);
    this.queue(item);
  }

  public dequeue(): T {
    if (!this.head) {
      throw new Error('Queue is empty');
    }

    const result = this.head.item;
    this.head = this.head.next;
    return result;
  }
}
