import { IStack, IQueue, TQueue, ILinkedList } from "../types";

export const swap = <T>(arr: T[],  firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};


export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  
  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    this.container.pop()
  };

  getElements = (): T[] => {
    return this.container
  }

  clearStack = (): void => {
    this.container = []
  }
}


export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item
    this.tail++
    this.length++
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null
    this.head++
    this.length--
  };

  clear = () => {
    this.container = []
  }

  getElements = (): TQueue<T> => {
    return {
      elements: this.container,
      head: this.head,
      tail: this.tail
    }
  }

  isEmpty = () => this.length === 0;
}


export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}


export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(element: T) {
    const node = new Node(element);
    let curr = this.head

    if (this.head === null) {
      this.head = node
    } else {
      node.next = curr
      this.head = node
    }
    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    
    if (this.head === null) {
      this.head = node
    } else {
      let curr = this.head

      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    
    this.size++;
  }


  deleteHead() {
    if (this.head === null) {
      return;
    }

    let curr = this.head
    this.head = curr.next
    this.size--;
  }

  deleteTail() {
    if (this.head === null) {
      return;
    }
  
    if (this.head.next === null) {
      this.head = null;
      this.size--;
      return;
    }
  
    let curr: Node<T> | null = this.head;
    let prev: Node<T> | null = null;
  
    while (curr.next !== null ) {
      prev = curr;
      curr = curr.next;

      if (curr && curr.next === null) {
        prev.next = null;
        this.size--;
      }
    }
  }

  addByIndex(val: number, element: T) {
    const newNode = new Node(element);

    if (val === 0) {
      this.prepend(element)
    } else {
      let curr: Node<T> | null = this.head;
      let prev: Node<T> | null = null;
      let i = 0;

      while (curr && i< val) {
        prev = curr;
        curr = curr.next;
        i++;
      }

      if (prev) {
        newNode.next = curr;
        prev.next = newNode;
      }
    }

    this.size++;
  }

  deleteByIndex(val: number) {
    if (this.head === null) {
      return;
    }

    let curr: Node<T> | null = this.head;
    let prev: Node<T> | null = null;
    let i = 0
  
    if (val === 0) {
      this.deleteHead()
    } else if (val === this.size - 1) {
      this.deleteTail()
    } else {
      while (curr && i < val) {
        prev = curr;
        curr = curr.next;
        i++;
      }
    
      if (curr) {
        if (prev) {
          prev.next = curr.next;
          this.size--;
        }
      }
    } 
  }

  getSize() {
    return this.size;
  }

  getArray() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res
  }
}