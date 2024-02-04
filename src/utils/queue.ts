import { IQueue, TQueue } from "../types";

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

    getLength = (): number => {
      return this.length
    }
  
    isEmpty = () => this.length === 0;
}