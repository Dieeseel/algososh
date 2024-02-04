import React, { useState, ChangeEvent, useCallback} from "react";
import styles from './fibonacci-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([])
  const [isLoading, setLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitNumber = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true)
      const number = Number(inputValue)  
      getFibonacciNumbers(number)
    }, [inputValue]
  );
  
  const getFibonacciNumbers = async (n: number) => {
    let arr = [1]; 

    for (let i = 1; i < n + 1; i++) {
      setFibonacciArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, 500));
      arr.push(arr[i - 1] + (arr[i - 2] || 0));
    }
    setLoading(false)
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={styles.main}>
        <form className={styles.form} onSubmit={submitNumber}>
          <Input type="number" 
                 max={19} 
                 isLimitText={true} 
                 placeholder="Введите число" 
                 onChange={onChange} required
          />
          <Button text="Рассчитать" 
                  type="submit" 
                  isLoader={isLoading} 
                  disabled={inputValue.length > 0 && Number(inputValue) < 20 ? false : true} 
          />
        </form>

        <ul className={styles.output}>
          {
            fibonacciArray.map((number, index) => {
              return <li key={index}><Circle letter={String(number)} index={index} /></li>
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
