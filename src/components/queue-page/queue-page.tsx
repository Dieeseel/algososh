import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Queue } from "../../utils/utils";
import { TQueue } from "../../types";
import { TLetter } from "../../types";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<TLetter>(7))
  const [inputValue, setInputValue] = useState('')
  const [queueArray, setQueueArray] = useState<TQueue<TLetter>>({
    elements: Array(7).fill(null),
    head: 0,
    tail: 0
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const enqueueElement = async () => {
    const value = String(inputValue)
    const newLetter: TLetter = {
      letter: value,
      state: ElementStates.Default
    }

    queue.enqueue(newLetter);
    setInputValue('');

    const elements = queue.getElements();
    const array = [...elements.elements]
    const tail = queueArray.tail
    array[tail] = {
      letter: value,
      state: ElementStates.Changing
    }

    setQueueArray({
      elements: array,
      head: elements.head,
      tail: elements.tail
    })
    
    setTimeout(() => {
      array[tail] = {
        letter: value,
        state: ElementStates.Default
      }

      setQueueArray({
        elements: array,
        head: elements.head,
        tail: elements.tail
      })
    }, 400)
  }

  
  const dequeueElement = () => {
    const elements = queue.getElements();
    const array = [...elements.elements]
    const head = queueArray.head
    array[head] = {
      letter: array[head]?.letter,
      state: ElementStates.Changing
    }

    setQueueArray({
      elements: array,
      head: elements.head,
      tail: elements.tail
    });

    setTimeout(() => {
      queue.dequeue()
      const elements = queue.getElements();
      setQueueArray({
        elements: [...elements.elements],
        head: elements.head,
        tail: elements.tail
      });
    }, 400)
  }

  const clearQueue = () => {
    const newQueue = new Queue<TLetter>(7)
    queue.clear()
    setQueueArray({
      elements: Array(7).fill(null),
      tail: 0,
      head: 0
    })
    setQueue(newQueue)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main}>
          <form className={styles.form}>
            <Input type="text" 
                  maxLength={4} 
                  extraClass={styles.input} 
                  onChange={onChange} 
                  value={inputValue} 
            />
            <Button text="Добавить" 
                    onClick={() => enqueueElement()}
                    disabled={inputValue.length > 0 ? false : true} 
            />
            <Button text="Удалить" 
                    onClick={() => dequeueElement()}
                    />
            <Button text="Очистить"
                    extraClass={`ml-35`} 
                    onClick={() => clearQueue()}
                    
            />
          </form>

          <ul className={styles.output}>
            {
              queueArray.elements.map((item, index) => {
                return <li key={index}>
                         <Circle head={index === queueArray.head && !queue.isEmpty() ? 'head' : ''}
                                 tail={index === queueArray.tail - 1 && !queue.isEmpty()  ? 'tail' : ''} 
                                 letter={item?.letter}
                                 state={item?.state}
                                 />
                       </li>
              })
            }
          </ul>
        </div>
    </SolutionLayout>
  );
};
