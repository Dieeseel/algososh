import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import styles from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils";
import { TLetter } from "../../types";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [lettersValue, setLettersValue] = useState<TLetter[]>([])
  const [isLoading, setLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitText = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const letters = inputValue.split('').map((letter) => {
        return {
          letter: letter,
          state: ElementStates.Default
        }
      })
      setLoading(true)
      setLettersValue(letters);
      reverseText(letters)
    }, [inputValue]
  );
  
  const reverseText = async (text: TLetter[]) => {
    const arr = text;
    let start = 0
    let end = arr.length - 1;
    
    for (start; start <= end; start++, end--) {
      arr[start].state = ElementStates.Changing
      arr[end].state = ElementStates.Changing
      setLettersValue([...arr])

      await new Promise(resolve => setTimeout(resolve, 1000));
      swap(arr, start, end);
      arr[start].state = ElementStates.Modified
      arr[end].state = ElementStates.Modified
      setLettersValue([...arr])
    } 
    setLoading(false)
  };


  return (
    <SolutionLayout title="Строка">
      <div className={styles.main}>
        <form className={styles.form} onSubmit={submitText}>
          <Input isLimitText={true} maxLength={11} onChange={onChange} required/>
          <Button text='Развернуть' 
                  type="submit"
                  isLoader={isLoading} 
                  disabled={inputValue.length > 0 ? false : true} 
                  
          />
        </form>

        <ul className={styles.output}>
          {
            lettersValue.map((item, index) => {
              return <li key={index}><Circle letter={item.letter} state={item.state}/></li>
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
