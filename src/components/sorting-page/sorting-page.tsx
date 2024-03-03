import React, { useState, useEffect, ChangeEvent } from "react";
import styles from './sorting-page.module.css'
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { TColumn } from "../../types";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TColumn[]>([])
  const [selectedTypeSort, setSelectedTypeSort] = useState('selection')
  const [isLoadingAscSort, setLoadingAscSort] = useState(false)
  const [isLoadingDescSort, setLoadingDescSort] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTypeSort(e.target.value)
  }
  
  useEffect(() => {
    randomArr()
  }, [])


  const randomArr = (): void => {
    const arraySize = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    const generatedArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 101));

    const arrWithStates = generatedArr.map((number) => {
      return {
        number: number,
        state: ElementStates.Default
      }
    })
    setArray(arrWithStates)
  }


  const sortArray = (sortDirection: Direction) => {
    if (selectedTypeSort === 'selection') {
      if (sortDirection === Direction.Ascending) { 
        setLoadingAscSort(true)
        selectionSortAsc(array)
      } else {
        setLoadingDescSort(true)
        selectionSortDesc(array)
      }
    } else {
      if (sortDirection === Direction.Ascending) { 
        setLoadingAscSort(true)
        bubbleSortAsc(array)
      } else {
        setLoadingDescSort(true)
        bubbleSortDesc(array)
      }
    }
  }

  const selectionSortDesc = async (arr: TColumn[]) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      let maxIndex = i;
      array[i].state = ElementStates.Changing
      setArray([...array])

      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing
        setArray([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number > array[maxIndex]?.number) {
          maxIndex = j;
        }
        array[j].state = ElementStates.Default
        setArray([...array])
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
      setArray([...array])
    }
    setLoadingDescSort(false)
  }


  const selectionSortAsc = async (arr: TColumn[]) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      array[i].state = ElementStates.Changing
      setArray([...array])

      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing
        setArray([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number < array[minIndex]?.number) {
          minIndex = j;
        }
        array[j].state = ElementStates.Default
        setArray([...array])
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
      setArray([...array])
    }
    setLoadingAscSort(false)
  };

  const bubbleSortAsc = async (arr: TColumn[]) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length  - 1 - i; j++) {
        array[j].state = ElementStates.Changing
        array[j + 1].state = ElementStates.Changing
        setArray([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number > array[j + 1]?.number) {
          swap(array, j, j + 1)
        }
        array[j].state = ElementStates.Default;
        setArray([...array])
      }
      array[array.length- i - 1].state = ElementStates.Modified;
    }
    setArray([...array])
    setLoadingAscSort(false)
  }

  const bubbleSortDesc = async (arr: TColumn[]) => {
    const array = [...arr]

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length  - 1 - i; j++) {
        array[j].state = ElementStates.Changing
        array[j + 1].state = ElementStates.Changing
        setArray([...array])

        await new Promise(resolve => setTimeout(resolve, 400));
        if (array[j]?.number < array[j + 1]?.number) {
          swap(array, j, j + 1)
        }
        array[j].state = ElementStates.Default;
        setArray([...array])
      }
      array[array.length- i - 1].state = ElementStates.Modified;
    }
    setArray([...array])
    setLoadingDescSort(false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <form className={styles.form}>
          <div className={styles.sortType}>
            <RadioInput value='selection' 
                        label='Выбор' 
                        checked={selectedTypeSort === 'selection'} 
                        onChange={onChange} 
                        name="radioGroup"
            />
            <RadioInput value='bubble' 
                        label='Пузырёк'
                        checked={selectedTypeSort === 'bubble'} 
                        onChange={onChange} 
                        name="radioGroup"
            />
          </div>

          <div className={styles.sortView}>
            <Button sorting={Direction.Ascending} 
                    extraClass={styles.buttonAsc}
                    text='По возрастанию' 
                    type='button'
                    isLoader={isLoadingAscSort} 
                    disabled={isLoadingAscSort || isLoadingDescSort ? true : false} 
                    onClick={() => sortArray(Direction.Ascending)} 
            />
            <Button sorting={Direction.Descending} 
                    extraClass={styles.buttonDesc}
                    text='По убыванию' 
                    type='button'
                    isLoader={isLoadingDescSort} 
                    disabled={isLoadingAscSort || isLoadingDescSort ? true : false} 
                    onClick={() => sortArray(Direction.Descending)} 
            />
          </div>

          <Button text="Новый массив" 
                  onClick={randomArr} 
                  disabled={isLoadingAscSort || isLoadingDescSort ? true : false} 
          /> 
        </form>

        <ul className={styles.output}>
          {
            array.map((item, index) => {
              return <li key={index}><Column  index={item.number} state={item.state}/></li>
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
