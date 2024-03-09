import styles from './string.module.css'
import { useState, useCallback, ChangeEvent } from "react";
import { reverseText } from "../../utils/utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
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
      reverseText(letters, setLettersValue, setLoading)
    }, [inputValue]
  );
  

  return (
    <SolutionLayout title="Строка">
      <div className={styles.main}>
        <form className={styles.form} onSubmit={submitText}>
          <Input isLimitText={true} maxLength={11} onChange={onChange} value={inputValue} required/>
          <Button text='Развернуть' 
                  type="submit"
                  isLoader={isLoading} 
                  disabled={inputValue.length > 0 ? false : true} 
                  
          />
        </form>

        <ul className={styles.output}>
          {
            lettersValue.map((item, index) => {
              return <li key={index}><Circle letter={item.letter} state={item.state} /></li>
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
