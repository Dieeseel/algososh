import React, { ChangeEvent, useState, useEffect } from "react";
import styles from './list-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "../../utils/utils";
import { TLetter } from "../../types";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>())
  const [inputValueText, setInputValueText] = useState('')
  const [inputValueIndex, setInputValueIndex] = useState<number | null>(null)
  const [listArray, setListArray] = useState<TLetter[]>([])
  const [addingIndexElement, setAddingIndexElement] = useState<number | null>(null)
  const [removingIndexElement, setRemovingIndexElement] = useState<number | null>(null)
  const [currentElement, setCurrentElement] = useState<string | undefined>('')
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [isRemovingHead, setIsRemovingHead] = useState(false)
  const [actionType, setActionType] = useState('')
  const [isDisableButton, setDisable]= useState(false)

  useEffect(() => {  
    generateRandomList(list);
    
    const array = list.getArray()
    const updateArray = updateListArray([...array])
    setListArray([...updateArray])
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      setInputValueText(e.target.value)
    } else {
      setInputValueIndex(Number(e.target.value))
      
      if (e.target.value === '') {
        setInputValueIndex(null)
      }
    }
  }

  const updateListArray = (arr: string[]): TLetter[] => {
    return arr.map((item) => {
      return {
        letter: item,
        state: ElementStates.Default
      }
    })
  }

  const generateRandomList = (list: LinkedList<string>): void => {
    const characters = '0123456789';
    const maxElements = 6;
  
    for (let i = 0; i < Math.ceil(Math.random() * maxElements); i++) {
      const randomValue = Array.from({ length: 3 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
      list.append(randomValue);
    }
  };

  const prependItem = async () => {
    setDisable(true)
    setActionType('prepend')
    const element = inputValueText
    setCurrentElement(element)
    setAddingIndexElement(0)
    setIsAdding(true) 
    setInputValueText('')

    await new Promise(resolve => setTimeout(resolve, 600));
    setIsAdding(false)
    setAddingIndexElement(null)

    list.prepend(element) 
    const array = list.getArray()
    const updateArray = updateListArray([...array])
    updateArray[0].state = ElementStates.Modified
    setListArray([...updateArray])

    await new Promise(resolve => setTimeout(resolve, 600));
    updateArray[0].state = ElementStates.Default
    setListArray([...updateArray])
    setCurrentElement('')
    setDisable(false)
    setActionType('')
  }


  const appendItem = async () => {
    const element = inputValueText
    setDisable(true)
    setActionType('append')
    setCurrentElement(element)
    setAddingIndexElement(listArray.length - 1)
    setIsAdding(true) 
    setInputValueText('')

    await new Promise(resolve => setTimeout(resolve, 600));
    setIsAdding(false)
    setAddingIndexElement(null)

    list.append(inputValueText)
    const array = list.getArray()
    const updateArray = updateListArray([...array])
    updateArray[updateArray.length - 1].state = ElementStates.Modified
    setListArray([...updateArray])
    
    await new Promise(resolve => setTimeout(resolve, 600));
    updateArray[updateArray.length - 1].state = ElementStates.Default
    setListArray([...updateArray])
    setCurrentElement('')
    setActionType('')
    setDisable(false)
  }


  const deleteHeadItem = async () => {
    const element = listArray[0].letter
    setActionType('deleteHead')
    setDisable(true)
    setCurrentElement(element)
    setRemovingIndexElement(0)
    setIsRemovingHead(true)
    setIsRemoving(true)
    listArray[0].letter = undefined

    await new Promise(resolve => setTimeout(resolve, 600));
    setIsRemoving(false)
    setRemovingIndexElement(null)
    setIsRemovingHead(false)
    list.deleteHead()

    const array = list.getArray()
    setListArray(updateListArray([...array]))
    setCurrentElement('')
    setActionType('')
    setDisable(false)
  }


  const deleteTailItem = async () => {
    const element = listArray[listArray.length - 1].letter
    setDisable(true)
    setActionType('deleteTail')
    setCurrentElement(element)
    setRemovingIndexElement(listArray.length - 1)
    setIsRemoving(true)
    listArray[listArray.length - 1].letter = undefined

    await new Promise(resolve => setTimeout(resolve, 600));
    setIsRemoving(false)
    setRemovingIndexElement(null)
    list.deleteTail()

    const array = list.getArray()
    setListArray(updateListArray([...array]))
    setCurrentElement('')
    setActionType('')
    setDisable(false)
  }


  const addItemByIndex = async () => {
    let array = list.getArray()
    let updateArray = updateListArray([...array])
    const index = inputValueIndex
    const element = inputValueText
    setDisable(true)
    setActionType('addByIndex')
    setCurrentElement(element)
    setIsAdding(true) 
    setInputValueText('')
    setInputValueIndex(null)

    if (index !== null) {
      for (let i = 0; i <= index; i++) {
        setAddingIndexElement(i)
        if (i > 0) {
          updateArray[i - 1].state = ElementStates.Changing
          setListArray([...updateArray])
        }
        await new Promise(resolve => setTimeout(resolve, 600))
      }

      list.addByIndex(index, element)
      array = list.getArray()
      updateArray = updateListArray([...array])
      setIsAdding(false)
      setAddingIndexElement(null)
      updateArray[index].state = ElementStates.Modified
      setListArray([...updateArray])

      await new Promise(resolve => setTimeout(resolve, 600));
      updateArray[index].state = ElementStates.Default
      setListArray([...updateArray])
      setCurrentElement('')
      setActionType('')
      setDisable(false)
    }
  }

  const deleteItemByIndex = async () => {
    let array = list.getArray()
    let updateArray = updateListArray([...array])
    const index = inputValueIndex
    setInputValueText('')
    setInputValueIndex(null)
    setActionType('deleteByIndex')
    setDisable(true)
    setInputValueIndex(null)

    if (index !== null) {
      for (let i = 0; i <= index; i++) {
        setRemovingIndexElement(i)
        updateArray[i].state = ElementStates.Changing
        setListArray([...updateArray])
        await new Promise(resolve => setTimeout(resolve, 1000))

      }
      updateArray[index].letter = undefined
      updateArray[index].state = ElementStates.Default
      setListArray([...updateArray])
      setCurrentElement(listArray[index].letter)
      setRemovingIndexElement(index)
      setIsRemoving(true)

      await new Promise(resolve => setTimeout(resolve, 600))
      list.deleteByIndex(index)

      setIsRemoving(false)
      setRemovingIndexElement(null)
      
      array = list.getArray()
      updateArray = updateListArray([...array])
      setListArray([...updateArray])
    }
    setDisable(false)
    setActionType('')
  }


  return (
    <SolutionLayout title="Связный список">
      <div className={styles.main}>
        <div className={styles.main}>
          <form className={styles.form}>
            <div className={styles.fieldContainer}>
              <Input extraClass={styles.input} 
                     isLimitText={true} maxLength={4} 
                     type="text" onChange={onChange} 
                     value={inputValueText}
              />
              <Button text='Добавить в head' 
                      extraClass={styles.button} 
                      onClick={() => prependItem()} 
                      isLoader={actionType === 'prepend' ? true : false}
                      disabled={inputValueText.length <= 0 || isDisableButton ? true : false}
              />
              <Button text='Добавить в tail' 
                      extraClass={styles.button} 
                      onClick={() => appendItem()}
                      isLoader={actionType === 'append' ? true : false}
                      disabled={inputValueText.length <= 0 || isDisableButton ? true : false}
              />
              <Button text='Удалить из head' 
                      extraClass={styles.button} 
                      onClick={() => deleteHeadItem()}
                      isLoader={actionType === 'deleteHead' ? true : false}
                      disabled={list.getSize() <= 0 || isDisableButton ? true : false}
              />
              <Button text='Удалить из tail' 
                      extraClass={styles.button} 
                      onClick={() => deleteTailItem()}
                      isLoader={actionType === 'deleteTail' ? true : false}
                      disabled={list.getSize() <= 0 || isDisableButton ? true : false}
              />
            </div>
            <div className={styles.fieldContainer}>
              <Input extraClass={styles.input} 
                     type="number" 
                     onChange={onChange} 
                     max={list.getSize() - 1} 
                     value={inputValueIndex === null ? '' : String(inputValueIndex)}
              />
              <Button text='Добавить по индексу' extraClass={styles.button}
                      onClick={() => addItemByIndex()}
                      isLoader={actionType === 'addByIndex' ? true : false}
                      disabled={inputValueIndex !== null && inputValueText.length > 0 
                      && inputValueIndex <= list.getSize() ? false : true}
              />
              <Button text='Удалить по индексу' 
                      extraClass={styles.button}
                      onClick={() => deleteItemByIndex()}
                      isLoader={actionType === 'deleteByIndex' ? true : false}
                      disabled={inputValueIndex !== null 
                      && inputValueIndex <= list.getSize() - 1 ? false : true} 
              />
            </div>
          </form>

          <ul className={styles.output}>
            {
              listArray.map((item, index) => {
                return <li key={index} className={styles.listItem}>
                        {
                          isAdding && index === addingIndexElement ? 
                            <Circle letter={currentElement} 
                                    isSmall 
                                    extraClass={styles.smallCircleTop} 
                                    state={ElementStates.Changing}/> 
                          : false
                        }
                        <div className={styles.circleItem}>
                          <Circle head={index !== 0 ? '' : addingIndexElement===0 ? '' : 'head'}
                                  index={index}
                                  state={item.state}
                                  tail={index !== listArray.length - 1 ? '' 
                                          :  (removingIndexElement===0 && isRemovingHead) 
                                            || (removingIndexElement===listArray.length -1 && currentElement)
                                            ? '' : 'tail'}
                                  letter={item.letter}
                          />
                          {
                            index === listArray.length - 1 ? false : <ArrowIcon />
                          }
                        </div>
                        {
                          isRemoving && index === removingIndexElement ? 
                            <Circle letter={currentElement} 
                                    isSmall 
                                    extraClass={styles.smallCircleBottom} 
                                    state={ElementStates.Changing}/> 
                          : false
                        }
                      </li>
              })
            }
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};
