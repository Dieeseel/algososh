import React, { useState, useEffect, ChangeEvent } from "react";
import styles from './sorting-page.module.css'
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { TColumn } from "../../types";
import { 
  selectionSortDesc, 
  selectionSortAsc, 
  bubbleSortAsc, 
  bubbleSortDesc 
} from "../../utils/utils";


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
        selectionSortAsc(array, setArray, setLoadingAscSort)
      } else {
        setLoadingDescSort(true)
        selectionSortDesc(array, setArray, setLoadingDescSort)
      }
    } else {
      if (sortDirection === Direction.Ascending) { 
        setLoadingAscSort(true)
        bubbleSortAsc(array, setArray, setLoadingAscSort)
      } else {
        setLoadingDescSort(true)
        bubbleSortDesc(array, setArray, setLoadingDescSort)
      }
    }
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
