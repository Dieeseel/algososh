import { IStack } from "../types";

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
  