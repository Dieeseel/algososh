import React, { useState, ChangeEvent, useEffect } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { TLetter } from "../../types";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<string>())
  const [inputValue, setInputValue] = useState('')
  const [stackArray, setStackArray] = useState<TLetter[]>([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const pushItem = () => {
    stack.push(String(inputValue));
    setInputValue('');
  
    const elements = stack.getElements();
    setStackArray([...elements.map((item, index) => ({
      letter: item,
      state: index === elements.length - 1 ? ElementStates.Changing : ElementStates.Default
    }))]);

    setTimeout(() => {
      setStackArray(prevArray => [
        ...prevArray.map(item => ({ ...item, state: ElementStates.Default })),
      ]);
    }, 400);
  }

  const deleteItem = () => {
    const elements = stack.getElements();
    setStackArray([...elements.map((item, index) => ({
      letter: item,
      state: index === elements.length - 1 ? ElementStates.Changing : ElementStates.Default
    }))]);
    
    setTimeout(() => {
      stack.pop()
      setStackArray(prevArray => [...prevArray.slice(0, -1)]); 
    }, 400);
  }

  const clearStack = () => {
    stack.clearStack()
    setStackArray([])
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <form className={styles.form}>
          <Input type="text" 
                 maxLength={4} 
                 extraClass={styles.input} 
                 onChange={onChange} 
                 value={inputValue} 
          />
          <Button text="Добавить" 
                  onClick={() => pushItem()} 
                  disabled={inputValue.length > 0 ? false : true} 
          />
          <Button text="Удалить" 
                  onClick={() => deleteItem()} 
                  disabled={stackArray.length === 0 ? true : false}/>
          <Button text="Очистить"
                  extraClass={`ml-35`} 
                  onClick={() => clearStack()} 
                  disabled={stackArray.length === 0 ? true : false} 
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
