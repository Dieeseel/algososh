import { ElementStates } from "./element-states"

export type TLetter = {
    letter: string | undefined
    state: ElementStates
}

export type TColumn = {
    number: number
    state: ElementStates
}

export type TQueue<T> = {
    elements: (T | null)[], 
    head: number, 
    tail: number
}


export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getElements: () => void
    clearStack: () => void
}

export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    clear: () => void
    getElements: () => TQueue<T>
    isEmpty: () => boolean
}

export interface ILinkedList<T> {
    append: (element: T) => void;
    getSize: () => number;
    getArray: () => T[];
}