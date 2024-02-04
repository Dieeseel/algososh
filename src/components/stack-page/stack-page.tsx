import React, { useState, ChangeEvent, useEffect, FormHTMLAttributes } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "../../utils/stack";
import { Circle } from "../ui/circle/circle";
import { TLetter } from "../../types";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<string>())
  const [inputValue, setInputValue] = useState('')
  const [stackArray, setStackArray] = useState<TLetter[]>([])
  const [isAdding, setAdding] = useState(false)
  const [isRemoving, setRemoving] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const pushItem = async () => {
    setAdding(true)
    setInputValue('');
    stack.push(String(inputValue));
  
    const elements = stack.getElements();
    setStackArray([...elements.map((item, index) => ({
      letter: item,
      state: index === elements.length - 1 ? ElementStates.Changing : ElementStates.Default
    }))]);

    await new Promise(resolve => setTimeout(resolve, 500));
    setStackArray(prevArray => [
      ...prevArray.map(item => ({ ...item, state: ElementStates.Default })),
    ]);

    setAdding(false)
  }

  const deleteItem = async () => {
    setRemoving(true)
    
    const elements = stack.getElements();
    setStackArray([...elements.map((item, index) => ({
      letter: item,
      state: index === elements.length - 1 ? ElementStates.Changing : ElementStates.Default
    }))]);
    

    await new Promise(resolve => setTimeout(resolve, 500));
    stack.pop()
    setStackArray(prevArray => [...prevArray.slice(0, -1)]); 
    setRemoving(false)
  }

  const clearStack = () => {
    stack.clearStack()
    setStackArray([])
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input type="text" 
                 maxLength={4} 
                 extraClass={styles.input} 
                 onChange={onChange} 
                 value={inputValue} 
          />
          <Button text="Добавить" 
                  onClick={() => pushItem()} 
                  isLoader={isAdding}
                  disabled={inputValue.length === 0 || isAdding || isRemoving ? true : false} 
          />
          <Button text="Удалить" 
                  onClick={() => deleteItem()} 
                  isLoader={isRemoving}
                  disabled={stackArray.length === 0 || isAdding || isRemoving ? true : false}/>
          <Button text="Очистить"
                  extraClass={`ml-35`} 
                  onClick={() => clearStack()} 
                  disabled={stackArray.length === 0 || isAdding || isRemoving  ? true : false} 
          />
        </form>

        <ul className={styles.output}>
          {
            stackArray.map((item, index) => {
              if (index === stackArray.length - 1) {
                return <li key={index}><Circle head='top' state={item.state} letter={item.letter} index={index}/></li>
              } else {
                return <li  key={index}><Circle state={item.state} letter={item.letter} index={index}/></li>
              }
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
