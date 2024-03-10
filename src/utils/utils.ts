import { TLetter, TColumn } from "../types";
import { ElementStates } from "../types/element-states";
import { SetStateAction, Dispatch } from "react";

export const swap = <T>(arr: T[],  firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const reverseText = async (
    text: TLetter[], 
    setLetterFunction: Dispatch<SetStateAction<TLetter[]>>,
    setLoadingFunction: Dispatch<SetStateAction<boolean>>
) => {
    const arr = text;
    let start = 0
    let end = arr.length - 1;
    
    for (start; start <= end; start++, end--) {
      arr[start].state = ElementStates.Changing
      arr[end].state = ElementStates.Changing
      setLetterFunction([...arr])

      await new Promise(resolve => setTimeout(resolve, 1000));
      swap(arr, start, end);
      arr[start].state = ElementStates.Modified
      arr[end].state = ElementStates.Modified
      setLetterFunction([...arr])
    } 

    setLoadingFunction(false)
    return arr
};


export const selectionSortDesc = async (
    arr: TColumn[], 
    setArrayFunction: Dispatch<SetStateAction<TColumn[]>>,
    setLoadingFuntcion: Dispatch<SetStateAction<boolean>>
) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      let maxIndex = i;
      array[i].state = ElementStates.Changing
      setArrayFunction([...array])

      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing
        setArrayFunction([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number > array[maxIndex]?.number) {
          maxIndex = j;
        }
        array[j].state = ElementStates.Default
        setArrayFunction([...array])
      }

      if (maxIndex !== i) {
        swap(array, i, maxIndex)
        array[maxIndex].state = ElementStates.Default
      } 
      else {
        array[maxIndex].state = ElementStates.Modified
      }

      array[maxIndex].state = ElementStates.Default
      array[i].state = ElementStates.Modified
      setArrayFunction([...array])
    }

    setLoadingFuntcion(false)
    return array
}


export const selectionSortAsc = async (
    arr: TColumn[], 
    setArrayFunction: Dispatch<SetStateAction<TColumn[]>>,
    setLoadingFuntcion: Dispatch<SetStateAction<boolean>>
) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      array[i].state = ElementStates.Changing
      setArrayFunction([...array])

      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing
        setArrayFunction([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number < array[minIndex]?.number) {
          minIndex = j;
        }
        array[j].state = ElementStates.Default
        setArrayFunction([...array])
      }

      if (minIndex !== i) {
        swap(array, i, minIndex)
        array[minIndex].state = ElementStates.Default
      }
      else {
        array[minIndex].state = ElementStates.Modified
      }

      array[minIndex].state = ElementStates.Default
      array[i].state = ElementStates.Modified
      setArrayFunction([...array])
    }

    setLoadingFuntcion(false)
    return array
}

export const bubbleSortAsc = async (
    arr: TColumn[], 
    setArrayFunction: Dispatch<SetStateAction<TColumn[]>>,
    setLoadingFuntcion: Dispatch<SetStateAction<boolean>>
) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length  - 1 - i; j++) {
        array[j].state = ElementStates.Changing
        array[j + 1].state = ElementStates.Changing
        setArrayFunction([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number > array[j + 1]?.number) {
          swap(array, j, j + 1)
        }
        array[j].state = ElementStates.Default;
        setArrayFunction([...array])
      }
      array[array.length- i - 1].state = ElementStates.Modified;
    }
    setArrayFunction([...array])
    setLoadingFuntcion(false)
    
    return array
}


export const bubbleSortDesc = async (
    arr: TColumn[], 
    setArrayFunction: Dispatch<SetStateAction<TColumn[]>>,
    setLoadingFuntcion: Dispatch<SetStateAction<boolean>>
) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length  - 1 - i; j++) {
        array[j].state = ElementStates.Changing
        array[j + 1].state = ElementStates.Changing
        setArrayFunction([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number < array[j + 1]?.number) {
          swap(array, j, j + 1)
        }
        array[j].state = ElementStates.Default;
        setArrayFunction([...array])
      }
      array[array.length- i - 1].state = ElementStates.Modified;
    }
    setArrayFunction([...array])
    setLoadingFuntcion(false)

    return array
}